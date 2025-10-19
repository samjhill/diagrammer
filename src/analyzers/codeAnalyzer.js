const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const { TypeScriptAnalyzer } = require('./typescriptAnalyzer');
const { JavaScriptAnalyzer } = require('./javascriptAnalyzer');

class CodeAnalyzer {
  constructor(config) {
    this.config = config;
    this.analyzers = {
      typescript: new TypeScriptAnalyzer(config),
      javascript: new JavaScriptAnalyzer(config)
    };
  }

  async analyzeCodebase(languages = ['javascript', 'typescript']) {
    const analysis = {
      components: [],
      dependencies: [],
      modules: []
    };

    for (const language of languages) {
      if (this.analyzers[language]) {
        const languageAnalysis = await this.analyzers[language].analyze();
        analysis.components.push(...languageAnalysis.components);
        analysis.dependencies.push(...languageAnalysis.dependencies);
        analysis.modules.push(...languageAnalysis.modules);
      }
    }

    // Remove duplicates and organize
    analysis.components = this.deduplicate(analysis.components);
    analysis.dependencies = this.deduplicate(analysis.dependencies);
    analysis.modules = this.deduplicate(analysis.modules);

    return analysis;
  }

  deduplicate(items) {
    const seen = new Set();
    return items.filter(item => {
      const key = `${item.type}-${item.name}-${item.path}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  async findFiles(language, extensions) {
    const { glob } = require('glob');
    const patterns = extensions.map(ext => `**/*${ext}`);
    const files = [];
    
    for (const pattern of patterns) {
      const matches = await glob(pattern, {
        ignore: [
          '**/node_modules/**',
          '**/dist/**',
          '**/build/**',
          '**/.git/**',
          '**/coverage/**'
        ]
      });
      files.push(...matches);
    }

    return files;
  }
}

module.exports = { CodeAnalyzer };
