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
    const githubToken = core.getInput('github_token');
    const outputPath = core.getInput('output_path');
    const configFile = core.getInput('config_file');
    const languages = core.getInput('languages').split(',').map(lang => lang.trim());

    // Initialize GitHub client
    const octokit = github.getOctokit(githubToken);
    const context = github.context;

    // Load configuration
    const config = await loadConfig(configFile);

    // Initialize components
    const codeAnalyzer = new CodeAnalyzer(config);
    const diagramGenerator = new DiagramGenerator(config);
    const gitManager = new GitManager(octokit, context);

    core.info('Starting architecture diagram generation...');

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

    // Write diagrams to files
    const generatedFiles = [];
    for (const [name, content] of Object.entries(diagrams)) {
      const filePath = path.join(outputPath, `${name}.md`);
      await fs.writeFile(filePath, content);
      generatedFiles.push(filePath);
      core.info(`Generated diagram: ${filePath}`);
    }

    // Commit changes if any files were generated
    if (generatedFiles.length > 0) {
      try {
        await gitManager.commitChanges(outputPath, 'docs: Update architecture diagrams');
        core.info('Committed diagram updates to repository');
      } catch (error) {
        core.warning(`Failed to commit changes: ${error.message}`);
        core.info('Diagrams were generated but not committed to repository');
      }
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

module.exports = { main };
