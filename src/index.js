const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs-extra');
const path = require('path');
const { CodeAnalyzer } = require('./analyzers/codeAnalyzer');
const { DiagramGenerator } = require('./generators/diagramGenerator');
const { GitManager } = require('./utils/gitManager');

async function main() {
  try {
    // Get inputs
    const githubToken = core.getInput('github_token') || process.env.GITHUB_TOKEN || '';
    const outputPath = core.getInput('output_path') || 'docs/architecture';
    const configFile = core.getInput('config_file') || '.diagrammer.yml';
    const autoCommit = core.getInput('auto_commit') !== 'false';
    const languagesInput = core.getInput('languages');
    const languages = (languagesInput && languagesInput.length > 0
      ? languagesInput
      : 'javascript,typescript').split(',').map(lang => lang.trim());

    // Initialize GitHub client
    let octokit = null;
    try {
      if (githubToken) {
        octokit = github.getOctokit(githubToken);
      }
    } catch (e) {
      core.warning(`Octokit not initialized (missing/invalid token): ${e.message}`);
    }
    const context = github.context;

    // Load configuration
    const config = await loadConfig(configFile);

    // Initialize components
    const codeAnalyzer = new CodeAnalyzer(config);
    const diagramGenerator = new DiagramGenerator(config);
    const gitManager = new GitManager(octokit, context);

    core.info('Starting architecture diagram generation...');
    
    // Debug: Show current working directory
    const cwd = process.cwd();
    core.info(`Current working directory: ${cwd}`);
    core.info(`Output path: ${outputPath}`);

    // Analyze the codebase
    core.info('Analyzing codebase...');
    const analysis = await codeAnalyzer.analyzeCodebase(languages);
    
    if (!analysis || Object.keys(analysis).length === 0) {
      core.info('No components found to diagram');
      return;
    }

    // Generate diagrams
    core.info('Generating diagrams...');
    const diagrams = await diagramGenerator.generateDiagrams(analysis);

    // Ensure output directory exists (create parent directories if needed)
    await fs.ensureDir(outputPath);
    core.info(`Created output directory: ${outputPath}`);

    // Organize and write diagrams to files
    const generatedFiles = [];
    const organizedStructure = diagramGenerator.getOrganizedFileStructure(diagrams);
    
    // Create organized directory structure
    for (const [folderPath, files] of Object.entries(organizedStructure)) {
      const fullPath = path.join(outputPath, folderPath);
      await fs.ensureDir(fullPath);
      
      for (const file of files) {
        const filePath = path.join(fullPath, file.name);
        const absolutePath = path.resolve(filePath);
        await fs.writeFile(filePath, file.content);
        
        // Fix file permissions (in case files were created by root)
        try {
          await fs.chmod(filePath, 0o644);
        } catch (error) {
          core.warning(`Could not fix permissions for ${filePath}: ${error.message}`);
        }
        
        generatedFiles.push(filePath);
        core.info(`Generated diagram: ${filePath}`);
        core.info(`Absolute path: ${absolutePath}`);
      }
    }

    // Clean up old files in root directory (keep only README.md)
    const rootFiles = await fs.readdir(outputPath);
    for (const file of rootFiles) {
      if (file !== 'README.md' && file !== 'diagrams' && file !== 'exports' && !file.startsWith('.')) {
        const filePath = path.join(outputPath, file);
        const stat = await fs.stat(filePath);
        if (stat.isFile()) {
          await fs.remove(filePath);
          core.info(`Cleaned up old file: ${filePath}`);
        }
      }
    }

    // Generate README index
    const readmePath = path.join(outputPath, 'README.md');
    const readmeContent = generateArchitectureReadme(organizedStructure, analysis);
    await fs.writeFile(readmePath, readmeContent);
    generatedFiles.push(readmePath);
    core.info(`Generated index: ${readmePath}`);

    // Commit changes if any files were generated and auto-commit is enabled
    if (generatedFiles.length > 0) {
      if (autoCommit) {
        core.info(`Generated ${generatedFiles.length} files, attempting to commit...`);
        try {
          await gitManager.commitChanges(outputPath, 'docs: Update architecture diagrams [skip ci]');
          core.info('Committed diagram updates to repository');
        } catch (error) {
          core.warning(`Failed to commit changes: ${error.message}`);
          core.info('Diagrams were generated but not committed to repository');
          core.info('This is not a critical error - the diagrams are still available');
          core.info('To disable auto-commit, set auto_commit: false in your workflow');
        }
      } else {
        core.info(`Generated ${generatedFiles.length} files, auto-commit is disabled`);
        core.info('To enable auto-commit, set auto_commit: true in your workflow');
      }
    } else {
      core.info('No files were generated, skipping commit');
    }

    core.info('Architecture diagram generation completed successfully!');

  } catch (error) {
    core.setFailed(`Action failed: ${error.message}`);
    core.error(error.stack);
  }
}

async function loadConfig(configFile) {
  try {
    if (await fs.pathExists(configFile)) {
      const configContent = await fs.readFile(configFile, 'utf8');
      return require('yaml').parse(configContent);
    }
  } catch (error) {
    core.warning(`Failed to load config file ${configFile}: ${error.message}`);
  }
  
  // Return default configuration
  return {
    diagram: {
      theme: 'default',
      direction: 'TB',
      nodeSpacing: 50,
      rankSpacing: 100
    },
    analysis: {
      includeTests: false,
      includeNodeModules: false,
      maxDepth: 5
    }
  };
}

// Run the action
if (require.main === module) {
  main();
}

function generateArchitectureReadme(organizedStructure, analysis) {
  const timestamp = new Date().toISOString().slice(0, 10);
  
  let readme = `# Architecture Documentation

This directory contains automatically generated architecture diagrams for the project.

*Generated on ${timestamp} by [Diagrammer GitHub Action](https://github.com/samjhill/diagrammer)*

## 📁 Directory Structure

`;

  // Overview diagrams
  if (organizedStructure['diagrams/overview/'].length > 0) {
    readme += `### 🏗️ Overview Diagrams
*High-level architecture and system overview*

`;
    organizedStructure['diagrams/overview/'].forEach(file => {
      const diagramName = file.name.replace('.md', '').replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      readme += `- [${diagramName}](diagrams/overview/${file.name})\n`;
    });
    readme += '\n';
  }

  // Focus diagrams
  if (organizedStructure['diagrams/focus/'].length > 0) {
    readme += `### 🔍 Focus Diagrams
*Detailed views of specific layers and modules*

`;
    organizedStructure['diagrams/focus/'].forEach(file => {
      const diagramName = file.name.replace('.md', '').replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      readme += `- [${diagramName}](diagrams/focus/${file.name})\n`;
    });
    readme += '\n';
  }

  // Interactive diagrams
  if (organizedStructure['diagrams/interactive/'].length > 0) {
    readme += `### 🖱️ Interactive Diagrams
*Clickable diagrams with source code links*

`;
    organizedStructure['diagrams/interactive/'].forEach(file => {
      const diagramName = file.name.replace('.md', '').replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      readme += `- [${diagramName}](diagrams/interactive/${file.name})\n`;
    });
    readme += '\n';
  }

  // Export files
  readme += `### 📤 Export Files
*PNG and SVG versions for presentations and documentation*

- [PNG Images](exports/png/) - High-quality images for presentations
- [SVG Graphics](exports/svg/) - Scalable vector graphics for documentation

`;

  // Analysis summary
  if (analysis) {
    readme += `## 📊 Analysis Summary

- **Components**: ${analysis.components?.length || 0} analyzed
- **Dependencies**: ${analysis.dependencies?.length || 0} relationships
- **Languages**: ${[...new Set(analysis.components?.map(c => c.language) || [])].join(', ') || 'Unknown'}
- **Architectural Patterns**: ${analysis.patterns ? Object.keys(analysis.patterns).filter(p => analysis.patterns[p].count > 0).length : 0} detected

`;
  }

  readme += `## 🚀 Usage

### Viewing Diagrams
- **Markdown files**: View directly in GitHub or any Markdown viewer
- **Interactive versions**: Click on nodes to view source code
- **Export files**: Use PNG/SVG files in presentations and documentation

### Updating Diagrams
Diagrams are automatically regenerated when:
- Code changes are pushed to the repository
- The GitHub Action workflow is triggered
- Manual regeneration is requested

---

*For more information about Diagrammer, visit [github.com/samjhill/diagrammer](https://github.com/samjhill/diagrammer)*
`;

  return readme;
}

module.exports = { main };
