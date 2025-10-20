const fs = require('fs-extra');

class JavaScriptAnalyzer {
  constructor(config) {
    this.config = config;
  }

  async analyze() {
    const files = await this.findJavaScriptFiles();
    const analysis = {
      components: [],
      dependencies: [],
      modules: []
    };

    for (const file of files) {
      try {
        const content = await fs.readFile(file, 'utf8');
        const fileAnalysis = this.analyzeFile(file, content);
        
        analysis.components.push(...fileAnalysis.components);
        analysis.dependencies.push(...fileAnalysis.dependencies);
        analysis.modules.push(...fileAnalysis.modules);
      } catch (error) {
        console.warn(`Failed to analyze ${file}: ${error.message}`);
      }
    }

    return analysis;
  }

  async findJavaScriptFiles() {
    const { glob } = require('glob');
    const files = await glob('**/*.{js,jsx}', {
      ignore: [
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/.git/**',
        '**/coverage/**',
        '**/tests/**',
        'tests/**'
      ]
    });
    return files;
  }

  analyzeFile(filePath, content) {
    const analysis = {
      components: [],
      dependencies: [],
      modules: []
    };

    try {
      // Simple regex-based analysis for JavaScript
      // This is a basic implementation - could be enhanced with proper AST parsing
      
      // Extract imports
      const imports = this.extractImports(content, filePath);
      analysis.dependencies.push(...imports);

      // Extract exports
      const exports = this.extractExports(content, filePath);
      analysis.modules.push(...exports);

      // Extract components (classes, functions)
      const components = this.extractComponents(content, filePath);
      analysis.components.push(...components);

    } catch (error) {
      console.warn(`Failed to analyze JavaScript file ${filePath}: ${error.message}`);
    }

    return analysis;
  }

  extractImports(content, filePath) {
    const imports = [];
    
    // Match various import patterns
    const importPatterns = [
      /import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g,
      /import\s*{\s*([^}]+)\s*}\s*from\s+['"]([^'"]+)['"]/g,
      /import\s*\*\s+as\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g,
      /const\s+(\w+)\s*=\s*require\(['"]([^'"]+)['"]\)/g
    ];

    importPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        if (match[1] && match[2]) {
          const names = match[1].split(',').map(name => name.trim());
          names.forEach(name => {
            imports.push({
              type: 'import',
              name: name,
              from: match[2],
              path: filePath,
              isDefault: !match[1].includes('{')
            });
          });
        }
      }
    });

    return imports;
  }

  extractExports(content, filePath) {
    const exports = [];
    
    // Match various export patterns
    const exportPatterns = [
      /export\s+default\s+(\w+)/g,
      /export\s+(?:const|let|var|function|class)\s+(\w+)/g,
      /export\s*{\s*([^}]+)\s*}/g,
      /module\.exports\s*=\s*(\w+)/g
    ];

    exportPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        if (match[1]) {
          const names = match[1].split(',').map(name => name.trim());
          names.forEach(name => {
            exports.push({
              type: 'export',
              name: name,
              path: filePath
            });
          });
        }
      }
    });

    return exports;
  }

  extractComponents(content, filePath) {
    const components = [];
    
    // Match class declarations
    const classPattern = /class\s+(\w+)/g;
    let match;
    while ((match = classPattern.exec(content)) !== null) {
      components.push({
        type: 'component',
        name: match[1],
        path: filePath,
        kind: 'ClassDeclaration'
      });
    }

    // Match function declarations
    const functionPattern = /function\s+(\w+)/g;
    while ((match = functionPattern.exec(content)) !== null) {
      components.push({
        type: 'component',
        name: match[1],
        path: filePath,
        kind: 'FunctionDeclaration'
      });
    }

    // Match arrow functions assigned to variables
    const arrowFunctionPattern = /(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s+)?\(/g;
    while ((match = arrowFunctionPattern.exec(content)) !== null) {
      components.push({
        type: 'component',
        name: match[1],
        path: filePath,
        kind: 'ArrowFunction'
      });
    }

    return components;
  }
}

module.exports = { JavaScriptAnalyzer };
