const fs = require('fs-extra');
const ts = require('typescript');

class TypeScriptAnalyzer {
  constructor(config) {
    this.config = config;
  }

  async analyze() {
    const files = await this.findTypeScriptFiles();
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

  async findTypeScriptFiles() {
    const { glob } = require('glob');
    const files = await glob('**/*.{ts,tsx}', {
      ignore: [
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/.git/**',
        '**/coverage/**',
        '**/*.d.ts'
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
      const sourceFile = ts.createSourceFile(
        filePath,
        content,
        ts.ScriptTarget.Latest,
        true
      );

      // Analyze imports
      const imports = this.extractImports(sourceFile);
      analysis.dependencies.push(...imports);

      // Analyze exports
      const exports = this.extractExports(sourceFile);
      analysis.modules.push(...exports);

      // Analyze components (classes, interfaces, functions)
      const components = this.extractComponents(sourceFile, filePath);
      analysis.components.push(...components);

    } catch (error) {
      console.warn(`Failed to parse TypeScript file ${filePath}: ${error.message}`);
    }

    return analysis;
  }

  extractImports(sourceFile) {
    const imports = [];
    
    function visit(node) {
      if (ts.isImportDeclaration(node)) {
        const moduleSpecifier = node.moduleSpecifier.getText().slice(1, -1); // Remove quotes
        const importClause = node.importClause;
        
        if (importClause) {
          if (importClause.name) {
            imports.push({
              type: 'import',
              name: importClause.name.getText(),
              from: moduleSpecifier,
              path: sourceFile.fileName,
              isDefault: true
            });
          }
          
          if (importClause.namedBindings) {
            if (ts.isNamedImports(importClause.namedBindings)) {
              importClause.namedBindings.elements.forEach(element => {
                imports.push({
                  type: 'import',
                  name: element.name.getText(),
                  from: moduleSpecifier,
                  path: sourceFile.fileName,
                  isDefault: false
                });
              });
            }
          }
        }
      }
      
      ts.forEachChild(node, visit);
    }
    
    visit(sourceFile);
    return imports;
  }

  extractExports(sourceFile) {
    const exports = [];
    
    function visit(node) {
      if (ts.isExportDeclaration(node)) {
        const moduleSpecifier = node.moduleSpecifier?.getText().slice(1, -1);
        
        if (node.exportClause) {
          if (ts.isNamedExports(node.exportClause)) {
            node.exportClause.elements.forEach(element => {
              exports.push({
                type: 'export',
                name: element.name.getText(),
                from: moduleSpecifier,
                path: sourceFile.fileName
              });
            });
          }
        }
        } else if (ts.isExportAssignment(node) || (node.modifiers && node.modifiers.some(mod => mod.kind === ts.SyntaxKind.ExportKeyword))) {
        // Handle export assignments and export modifiers
        if (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node)) {
          const name = node.name?.getText();
          if (name) {
            exports.push({
              type: 'export',
              name: name,
              path: sourceFile.fileName,
              kind: ts.SyntaxKind[node.kind]
            });
          }
        }
      }
      
      ts.forEachChild(node, visit);
    }
    
    visit(sourceFile);
    return exports;
  }

  extractComponents(sourceFile, filePath) {
    const components = [];
    
    function visit(node) {
      if (ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node) || 
          ts.isFunctionDeclaration(node) || ts.isVariableDeclaration(node)) {
        
        const name = node.name?.getText();
        if (name) {
          components.push({
            type: 'component',
            name: name,
            path: filePath,
            kind: ts.SyntaxKind[node.kind],
            isExported: node.modifiers && node.modifiers.some(mod => mod.kind === ts.SyntaxKind.ExportKeyword)
          });
        }
      }
      
      ts.forEachChild(node, visit);
    }
    
    visit(sourceFile);
    return components;
  }
}

module.exports = { TypeScriptAnalyzer };
