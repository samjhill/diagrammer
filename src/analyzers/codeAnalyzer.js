const { TypeScriptAnalyzer } = require('./typescriptAnalyzer');
const { JavaScriptAnalyzer } = require('./javascriptAnalyzer');
const { PythonAnalyzer } = require('./pythonAnalyzer');
const { ArchitecturalAnalyzer } = require('./architecturalAnalyzer');

class CodeAnalyzer {
  constructor(config) {
    this.config = config;
    this.analyzers = {
      typescript: new TypeScriptAnalyzer(config),
      javascript: new JavaScriptAnalyzer(config),
      python: new PythonAnalyzer(config)
    };
    this.architecturalAnalyzer = new ArchitecturalAnalyzer();
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

    // Apply architectural analysis
    analysis.components = this.enhanceWithArchitecturalAnalysis(analysis.components);
    analysis.architecturalLayers = this.analyzeArchitecturalLayers(analysis.components);
    analysis.patterns = this.analyzeArchitecturalPatterns(analysis.components);

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

  enhanceWithArchitecturalAnalysis(components) {
    return components.map(component => {
      // For now, we'll enhance with basic architectural info
      // In a real implementation, we'd read the file content
      const enhanced = {
        ...component,
        architecturalLayer: this.architecturalAnalyzer.detectArchitecturalLayer(component.path, ''),
        frameworks: [],
        patterns: [],
        responsibilities: []
      };
      
      return enhanced;
    });
  }

  analyzeArchitecturalLayers(components) {
    const layers = {};
    
    components.forEach(component => {
      const layer = component.architecturalLayer || 'unknown';
      if (!layers[layer]) {
        layers[layer] = [];
      }
      layers[layer].push(component);
    });
    
    return layers;
  }

  analyzeArchitecturalPatterns(components) {
    const patterns = {
      mvc: { count: 0, components: [] },
      microservices: { count: 0, components: [] },
      eventDriven: { count: 0, components: [] },
      layered: { count: 0, components: [] }
    };
    
    components.forEach(component => {
      // Simple pattern detection based on path and name
      if (component.path.includes('controller') || component.path.includes('model') || component.path.includes('view')) {
        patterns.mvc.count++;
        patterns.mvc.components.push(component);
      }
      
      if (component.path.includes('service') || component.path.includes('api')) {
        patterns.microservices.count++;
        patterns.microservices.components.push(component);
      }
    });
    
    return patterns;
  }
}

module.exports = { CodeAnalyzer };
