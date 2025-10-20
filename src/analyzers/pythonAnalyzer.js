const fs = require('fs-extra');
const path = require('path');

class PythonAnalyzer {
  constructor(config) {
    this.config = config;
    this.extensions = ['.py'];
  }

  async analyze() {
    const files = await this.findFiles();
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
        console.warn(`Error analyzing ${file}:`, error.message);
      }
    }

    return analysis;
  }

  analyzeFile(filePath, content) {
    const analysis = {
      components: [],
      dependencies: [],
      modules: []
    };

    const relativePath = path.relative(process.cwd(), filePath);
    const fileName = path.basename(filePath, '.py');
    
    // Extract imports (dependencies)
    const imports = this.extractImports(content);
    imports.forEach(importItem => {
      analysis.dependencies.push({
        type: 'import',
        name: importItem.name,
        source: importItem.source,
        path: relativePath,
        isExternal: !importItem.isLocal
      });
    });

    // Extract classes
    const classes = this.extractClasses(content);
    classes.forEach(className => {
      analysis.components.push({
        type: 'class',
        name: className,
        path: relativePath,
        language: 'python'
      });
    });

    // Extract functions
    const functions = this.extractFunctions(content);
    functions.forEach(funcName => {
      analysis.components.push({
        type: 'function',
        name: funcName,
        path: relativePath,
        language: 'python'
      });
    });

    // Create module entry
    analysis.modules.push({
      type: 'module',
      name: fileName,
      path: relativePath,
      language: 'python',
      exports: [...classes, ...functions]
    });

    return analysis;
  }

  extractImports(content) {
    const imports = [];
    const lines = content.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      // Standard imports: import module
      const standardImport = trimmed.match(/^import\s+([a-zA-Z_][a-zA-Z0-9_.]*)/);
      if (standardImport) {
        imports.push({
          name: standardImport[1],
          source: 'import',
          isLocal: this.isLocalImport(standardImport[1])
        });
      }
      
      // From imports: from module import item
      const fromImport = trimmed.match(/^from\s+([a-zA-Z_][a-zA-Z0-9_.]*)\s+import\s+(.+)/);
      if (fromImport) {
        const module = fromImport[1];
        const items = fromImport[2].split(',').map(item => item.trim());
        
        items.forEach(item => {
          // Handle "as" aliases
          const cleanItem = item.split(' as ')[0].trim();
          imports.push({
            name: cleanItem,
            source: module,
            isLocal: this.isLocalImport(module)
          });
        });
      }
      
      // Handle relative imports: from .module import item
      const relativeImport = trimmed.match(/^from\s+(\.+[a-zA-Z_][a-zA-Z0-9_.]*)\s+import\s+(.+)/);
      if (relativeImport) {
        const module = relativeImport[1];
        const items = relativeImport[2].split(',').map(item => item.trim());
        
        items.forEach(item => {
          const cleanItem = item.split(' as ')[0].trim();
          imports.push({
            name: cleanItem,
            source: module,
            isLocal: true
          });
        });
      }
    }
    
    return imports;
  }

  extractClasses(content) {
    const classes = [];
    const classRegex = /^class\s+([a-zA-Z_][a-zA-Z0-9_]*)/gm;
    let match;
    
    while ((match = classRegex.exec(content)) !== null) {
      classes.push(match[1]);
    }
    
    return classes;
  }

  extractFunctions(content) {
    const functions = [];
    // Match both standalone functions and async functions (including methods in classes)
    // Match def at start of line or with indentation
    const functionRegex = /^(?:\s+)?(?:async\s+)?def\s+([a-zA-Z_][a-zA-Z0-9_]*)/gm;
    let match;
    
    while ((match = functionRegex.exec(content)) !== null) {
      functions.push(match[1]);
    }
    
    return functions;
  }

  isLocalImport(moduleName) {
    // Check if it's a relative import or local module
    // External modules typically have dots and are not relative
    return moduleName.startsWith('.') || 
           moduleName.startsWith('..') ||
           (!moduleName.includes('.') && !this.isKnownExternalModule(moduleName));
  }

  isKnownExternalModule(moduleName) {
    // List of known external Python modules
    const externalModules = [
      'os', 'sys', 'json', 'datetime', 'typing', 'collections', 'itertools',
      'functools', 'operator', 'math', 'random', 'string', 're', 'urllib',
      'http', 'socket', 'threading', 'multiprocessing', 'subprocess',
      'pandas', 'numpy', 'requests', 'django', 'flask', 'fastapi',
      'sqlalchemy', 'pytest', 'unittest', 'asyncio', 'aiohttp'
    ];
    return externalModules.includes(moduleName);
  }

  async findFiles() {
    const { glob } = require('glob');
    const patterns = this.extensions.map(ext => `**/*${ext}`);
    const files = [];
    
    for (const pattern of patterns) {
      const matches = await glob(pattern, {
        ignore: [
          '**/node_modules/**',
          '**/dist/**',
          '**/build/**',
          '**/.git/**',
          '**/coverage/**',
          '**/__pycache__/**',
          '**/venv/**',
          '**/env/**',
          '**/.venv/**',
          '**/.env/**'
        ]
      });
      files.push(...matches);
    }

    return files;
  }
}

module.exports = { PythonAnalyzer };
