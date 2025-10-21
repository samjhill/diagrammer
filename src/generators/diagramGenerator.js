const path = require('path');

class DiagramGenerator {
  constructor(config) {
    this.config = config;
    this.maxNodesPerDiagram = config?.maxNodesPerDiagram || 50;
    this.maxDependenciesPerDiagram = config?.maxDependenciesPerDiagram || 100;
  }

  async generateDiagrams(analysis) {
    const diagrams = {};

    // Generate main architecture diagram
    diagrams.architecture = this.generateArchitectureDiagram(analysis);

    // Generate component dependency diagram
    diagrams.dependencies = this.generateDependencyDiagram(analysis);

    // Generate module structure diagram
    diagrams.modules = this.generateModuleDiagram(analysis);

    // Generate layered architecture diagram if we have architectural layers
    if (analysis.architecturalLayers && Object.keys(analysis.architecturalLayers).length > 1) {
      diagrams.layeredArchitecture = this.generateLayeredArchitectureDiagram(analysis);
    }

    // Generate pattern-specific diagrams
    if (analysis.patterns) {
      if (analysis.patterns.mvc.count > 0) {
        diagrams.mvcPattern = this.generateMVCDiagram(analysis);
      }
      if (analysis.patterns.microservices.count > 0) {
        diagrams.microservicesPattern = this.generateMicroservicesDiagram(analysis);
      }
    }

    // Generate relationship-focused diagrams
    if (analysis.relationships && analysis.relationships.length > 0) {
      diagrams.apiFlow = this.generateApiFlowDiagram(analysis);
      diagrams.dataFlow = this.generateDataFlowDiagram(analysis);
      diagrams.eventFlow = this.generateEventFlowDiagram(analysis);
      diagrams.serviceCommunication = this.generateServiceCommunicationDiagram(analysis);
    }

    return diagrams;
  }

  generateArchitectureDiagram(analysis) {
    const { components, dependencies } = analysis;
    const uniqueComponents = this.uniqueByName(components);
    
    // Filter components to reduce complexity
    const filteredComponents = this.filterComponentsForDiagram(uniqueComponents);
    const filteredDependencies = this.filterDependenciesForDiagram(dependencies, filteredComponents);
    
    let mermaid = 'graph TD\n';
    
    // Add enhanced styling with semantic colors and shapes
    mermaid += '  classDef component fill:#e3f2fd,stroke:#1976d2,stroke-width:2px\n';
    mermaid += '  classDef analyzer fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px\n';
    mermaid += '  classDef generator fill:#fff3e0,stroke:#f57c00,stroke-width:2px\n';
    mermaid += '  classDef manager fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px\n';
    mermaid += '  classDef service fill:#e0f2f1,stroke:#00695c,stroke-width:2px\n';
    mermaid += '  classDef external fill:#ffebee,stroke:#c62828,stroke-width:2px\n';
    mermaid += '  classDef large fill:#e3f2fd,stroke:#1976d2,stroke-width:3px,font-size:14px\n';
    mermaid += '  classDef medium fill:#e3f2fd,stroke:#1976d2,stroke-width:2px,font-size:12px\n';
    mermaid += '  classDef small fill:#e3f2fd,stroke:#1976d2,stroke-width:1px,font-size:10px\n';
    mermaid += '  classDef framework fill:#f1f8e9,stroke:#558b2f,stroke-width:2px\n';
    mermaid += '  classDef npm fill:#e8eaf6,stroke:#3f51b5,stroke-width:2px\n';
    mermaid += '  classDef group fill:#fafafa,stroke:#424242,stroke-width:3px\n';
    mermaid += '  classDef relationship fill:#ffeb3b,stroke:#f57f17,stroke-width:2px\n';
    mermaid += '  classDef dependency fill:#ff9800,stroke:#e65100,stroke-width:2px\n';
    mermaid += '  classDef data fill:#4caf50,stroke:#1b5e20,stroke-width:2px\n';
    mermaid += '  classDef api fill:#2196f3,stroke:#0d47a1,stroke-width:2px\n\n';

    // Group components by directory, but only show top-level directories
    const componentGroups = this.groupComponentsByDirectory(filteredComponents);
    
    // Create subgraphs for different directories (limit to most important ones)
    const sortedGroups = Object.entries(componentGroups)
      .sort(([,a], [,b]) => b.length - a.length) // Sort by component count
      .slice(0, 8); // Limit to top 8 directories
    
    sortedGroups.forEach(([dir, dirComponents]) => {
      if (dirComponents.length > 0) {
        const subgraphName = this.sanitizeName(dir);
        const displayName = this.getDisplayName(dir);
        mermaid += `  subgraph ${subgraphName}["${displayName}"]\n`;
        
        // Limit components per directory to keep diagrams clean
        const limitedComponents = dirComponents.slice(0, 10);
        limitedComponents.forEach(component => {
          const nodeId = this.sanitizeName(component.name);
          const displayComponentName = this.getDisplayComponentName(component.name);
          const componentMetrics = this.getComponentMetrics(component, analysis);
          const enhancedName = this.enhanceComponentName(displayComponentName, componentMetrics);
          const tooltip = this.generateComponentTooltip(component, componentMetrics);
          mermaid += `    ${nodeId}["${enhancedName}"]\n`;
        });
        
        mermaid += '  end\n\n';
      }
    });

    // Add enhanced relationships with better visualization
    const edgeSet = new Set();
    const nodeNames = new Set(filteredComponents.map(c => c.name));
    
    // Add internal component relationships first
    // Apply semantic styling to components based on their type
    filteredComponents.forEach(component => {
      const nodeId = this.sanitizeName(component.name);
      const componentClass = this.getComponentClass(component);
      mermaid += `  ${nodeId}:::${componentClass}\n`;
    });

    mermaid = this.addInternalRelationships(mermaid, filteredComponents, analysis, edgeSet);
    
    // Add external dependencies with better categorization
    mermaid = this.addExternalDependencies(mermaid, filteredDependencies, edgeSet, nodeNames);

    return this.wrapInMarkdown('Architecture Overview', mermaid, analysis);
  }

  generateDependencyDiagram(analysis) {
    const { dependencies } = analysis;
    
    let mermaid = 'graph LR\n';
    
    // Add styling with distinct colors
    mermaid += '  classDef internal fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px\n';
    mermaid += '  classDef external fill:#ffebee,stroke:#c62828,stroke-width:2px\n';
    mermaid += '  classDef npm fill:#fff3e0,stroke:#f57c00,stroke-width:2px\n';
    mermaid += '  classDef local fill:#e3f2fd,stroke:#1976d2,stroke-width:2px\n\n';

    // Group dependencies by type (internal vs external)
    const internalDeps = dependencies.filter(dep => !this.isExternalDependency(dep.from));
    const externalDeps = dependencies.filter(dep => this.isExternalDependency(dep.from));

    // Add external dependencies with color coding
    const externalModules = [...new Set(externalDeps.map(dep => dep.from))];
    externalModules.forEach(module => {
      const nodeId = this.sanitizeName(module);
      mermaid += `  ${nodeId}["${module}"]\n`;
      mermaid += `  ${nodeId}:::external\n`;
    });

    // Add internal components with color coding
    const internalComponents = [...new Set(internalDeps.map(dep => dep.name))];
    internalComponents.forEach(component => {
      const nodeId = this.sanitizeName(component);
      mermaid += `  ${nodeId}["${component}"]\n`;
      mermaid += `  ${nodeId}:::internal\n`;
    });

    // Add dependency relationships (deduped and no self loops)
    const seen = new Set();
    dependencies.forEach(dep => {
      if (!dep.from || !dep.name) return;
      if (dep.from === dep.name) return;
      const key = `${dep.from}-->${dep.name}`;
      if (seen.has(key)) return;
      seen.add(key);
      const fromId = this.sanitizeName(dep.from);
      const toId = this.sanitizeName(dep.name);
      mermaid += `  ${fromId} -->|imports| ${toId}\n`;
    });

    return this.wrapInMarkdown('Dependency Graph', mermaid, analysis);
  }

  generateModuleDiagram(analysis) {
    const { modules } = analysis;
    
    let mermaid = 'graph TB\n';
    
    // Add styling with distinct colors
    mermaid += '  classDef module fill:#e3f2fd,stroke:#1976d2,stroke-width:2px\n';
    mermaid += '  classDef export fill:#e8f5e8,stroke:#388e3c,stroke-width:2px\n';
    mermaid += '  classDef group fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px\n\n';

    // Group modules by directory
    const moduleGroups = this.groupComponentsByDirectory(modules);
    
    Object.entries(moduleGroups).forEach(([dir, dirModules]) => {
      if (dirModules.length > 0) {
        const subgraphName = this.sanitizeName(dir);
        mermaid += `  subgraph ${subgraphName}["${dir}"]\n`;
        
        dirModules.forEach(module => {
          const nodeId = this.sanitizeName(module.name);
          mermaid += `    ${nodeId}["${module.name}"]\n`;
        });
        
        mermaid += '  end\n\n';
      }
    });

    return this.wrapInMarkdown('Module Structure', mermaid, analysis);
  }

  groupComponentsByDirectory(components) {
    const groups = {};
    
    components.forEach(component => {
      const dir = path.dirname(component.path);
      if (!groups[dir]) {
        groups[dir] = [];
      }
      groups[dir].push(component);
    });

    return groups;
  }

  sanitizeName(name) {
    return String(name).replace(/[^a-zA-Z0-9]/g, '_');
  }

  uniqueByName(items) {
    const seen = new Set();
    const result = [];
    for (const item of items) {
      const key = item.name;
      if (seen.has(key)) continue;
      seen.add(key);
      result.push(item);
    }
    return result;
  }

  nodeExists(components, name) {
    return components.some(comp => comp.name === name);
  }

  isExternalDependency(modulePath) {
    // Check if it's an external dependency (not a relative import)
    return modulePath && !modulePath.startsWith('.') && !modulePath.startsWith('/');
  }

  wrapInMarkdown(title, mermaidContent, analysis = null) {
    const metadata = this.generateDiagramMetadata(analysis);
    const legend = this.generateLegend();
    
    return `# ${title}

This diagram was automatically generated from your codebase.

${metadata}

\`\`\`mermaid
${mermaidContent}
\`\`\`

${legend}

---
*Generated by [Diagrammer GitHub Action](https://github.com/samjhill/diagrammer)*
`;
  }

  generateDiagramMetadata(analysis) {
    if (!analysis) return '';
    
    const stats = this.calculateDiagramStats(analysis);
    const insights = this.generateArchitecturalInsights(analysis);
    
    return `## 📊 Architecture Overview

- **Components**: ${stats.componentCount} analyzed
- **Languages**: ${stats.languages.join(', ')}
- **Architectural Patterns**: ${stats.patterns.join(', ') || 'None detected'}
- **External Dependencies**: ${stats.externalDeps} packages
- **Generated**: ${new Date().toLocaleDateString()}

${insights}

`;
  }

  generateArchitecturalInsights(analysis) {
    const insights = [];
    
    // Analyze component distribution
    const componentTypes = this.analyzeComponentTypes(analysis.components);
    if (componentTypes.analyzers > 3) {
      insights.push('🔍 **High Analysis Complexity**: Multiple analyzers detected - consider consolidating analysis logic');
    }
    
    if (componentTypes.generators > 1) {
      insights.push('🎨 **Multiple Generators**: Consider using a single generator with multiple strategies');
    }
    
    // Analyze dependencies
    const depAnalysis = this.analyzeDependencies(analysis.dependencies);
    if (depAnalysis.externalRatio > 0.7) {
      insights.push('🌐 **High External Dependencies**: Consider reducing external dependencies for better maintainability');
    }
    
    if (depAnalysis.circularDeps > 0) {
      insights.push('🔄 **Circular Dependencies**: Found circular dependencies - consider refactoring');
    }
    
    // Analyze architecture patterns
    if (analysis.patterns && Object.keys(analysis.patterns).length === 0) {
      insights.push('🏗️ **No Clear Patterns**: Consider implementing architectural patterns (MVC, layered, etc.)');
    }
    
    // Analyze component complexity
    const complexityAnalysis = this.analyzeComplexity(analysis.components);
    if (complexityAnalysis.highComplexity > 0) {
      insights.push(`⚡ **Complex Components**: ${complexityAnalysis.highComplexity} components with high complexity - consider refactoring`);
    }
    
    if (insights.length === 0) {
      insights.push('✅ **Well-Structured Architecture**: Good component organization and clear separation of concerns');
    }
    
    return `## 🧠 Architectural Insights

${insights.map(insight => `- ${insight}`).join('\n')}

`;
  }

  generateComponentTooltip(component, metrics) {
    const tooltip = [];
    tooltip.push(`Size: ${metrics.size} lines`);
    tooltip.push(`Complexity: ${metrics.complexity}/10`);
    tooltip.push(`Dependencies: ${metrics.dependencies}`);
    tooltip.push(`Importance: ${metrics.importance}/10`);
    
    if (component.path) {
      tooltip.push(`Path: ${component.path}`);
    }
    
    if (component.language) {
      tooltip.push(`Language: ${component.language}`);
    }
    
    return tooltip.join(' | ');
  }

  analyzeComponentTypes(components) {
    const types = {
      analyzers: 0,
      generators: 0,
      managers: 0,
      services: 0,
      others: 0
    };
    
    components.forEach(comp => {
      const name = comp.name.toLowerCase();
      if (name.includes('analyzer')) types.analyzers++;
      else if (name.includes('generator')) types.generators++;
      else if (name.includes('manager')) types.managers++;
      else if (name.includes('service')) types.services++;
      else types.others++;
    });
    
    return types;
  }

  analyzeDependencies(dependencies) {
    if (!dependencies) return { externalRatio: 0, circularDeps: 0 };
    
    const external = dependencies.filter(dep => this.isExternalDependency(dep.from)).length;
    const total = dependencies.length;
    const externalRatio = total > 0 ? external / total : 0;
    
    // Simple circular dependency detection
    const circularDeps = this.detectCircularDependencies(dependencies);
    
    return { externalRatio, circularDeps };
  }

  detectCircularDependencies(dependencies) {
    // Simple circular dependency detection
    const graph = new Map();
    dependencies.forEach(dep => {
      if (!graph.has(dep.from)) graph.set(dep.from, []);
      graph.get(dep.from).push(dep.name);
    });
    
    let circularCount = 0;
    for (const [node, neighbors] of graph) {
      if (neighbors.includes(node)) {
        circularCount++;
      }
    }
    
    return circularCount;
  }

  analyzeComplexity(components) {
    let highComplexity = 0;
    let totalComplexity = 0;
    
    components.forEach(comp => {
      const complexity = this.calculateComplexity(comp);
      totalComplexity += complexity;
      if (complexity >= 4) {
        highComplexity++;
      }
    });
    
    return { highComplexity, totalComplexity };
  }

  generateLegend() {
    return `## 🎨 Legend

| Component Type | Color | Description |
|---|---|---|
| 🔍 **Analyzer** | Green | Code analysis components |
| 🎨 **Generator** | Orange | Diagram generation components |
| ⚙️ **Manager** | Purple | Resource management components |
| 🔧 **Service** | Teal | Business logic and services |
| 📦 **NPM** | Blue | Node.js packages |
| 🏗️ **Framework** | Light Green | Framework dependencies |
| 🌐 **External** | Red | External libraries |

## 📊 Visual Indicators

| Symbol | Meaning | Description |
|---|---|---|
| 📦 | Large Component | Component with >100 lines of code |
| 📄 | Medium Component | Component with 50-100 lines of code |
| 📝 | Small Component | Component with <50 lines of code |
| ⚡ | High Complexity | Complex component (complexity ≥4) |
| 🔥 | Medium Complexity | Moderate complexity (complexity ≥3) |
| 🔗 | High Dependencies | Component with >5 dependencies |

## 🔗 Relationship Types

- **imports**: Module imports and dependencies
- **calls**: Method/function calls
- **generates**: Component generates output
- **uses**: Component utilizes another component
- **API**: API calls and communication
- **data**: Data flow between components
`;
  }

  calculateDiagramStats(analysis) {
    const stats = {
      componentCount: analysis.components ? analysis.components.length : 0,
      languages: [],
      patterns: [],
      externalDeps: 0
    };
    
    // Count languages
    if (analysis.components) {
      const languages = new Set();
      analysis.components.forEach(comp => {
        if (comp.language) languages.add(comp.language);
      });
      stats.languages = Array.from(languages);
    }
    
    // Count patterns
    if (analysis.patterns) {
      Object.entries(analysis.patterns).forEach(([pattern, data]) => {
        if (data.count > 0) {
          stats.patterns.push(pattern.toUpperCase());
        }
      });
    }
    
    // Count external dependencies
    if (analysis.dependencies) {
      stats.externalDeps = analysis.dependencies.filter(dep => 
        this.isExternalDependency(dep.from)
      ).length;
    }
    
    return stats;
  }

  generateLayeredArchitectureDiagram(analysis) {
    const { architecturalLayers } = analysis;
    
    let mermaid = 'graph TB\n';
    
    // Add styling for different layers
    mermaid += '  classDef frontend fill:#e3f2fd,stroke:#1976d2,stroke-width:3px\n';
    mermaid += '  classDef backend fill:#e8f5e8,stroke:#388e3c,stroke-width:3px\n';
    mermaid += '  classDef data fill:#fff3e0,stroke:#f57c00,stroke-width:3px\n';
    mermaid += '  classDef infrastructure fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px\n';
    mermaid += '  classDef component fill:#f5f5f5,stroke:#666,stroke-width:1px\n\n';
    
    // Create subgraphs for each architectural layer
    Object.entries(architecturalLayers).forEach(([layer, components]) => {
      if (components.length > 0) {
        const layerName = this.sanitizeName(layer);
        mermaid += `  subgraph ${layerName}["${layer.toUpperCase()} LAYER"]\n`;
        mermaid += `    classDef ${layerName}Class fill:#f5f5f5,stroke:#666,stroke-width:1px\n`;
        
        components.forEach(component => {
          const nodeId = this.sanitizeName(component.name);
          mermaid += `    ${nodeId}["${component.name}"]\n`;
          mermaid += `    ${nodeId}:::component\n`;
        });
        
        mermaid += '  end\n\n';
      }
    });
    
    // Add relationships between layers
    mermaid += '  %% Layer relationships\n';
    mermaid += '  frontend -->|API calls| backend\n';
    mermaid += '  backend -->|Data access| data\n';
    mermaid += '  infrastructure -->|Supports| frontend\n';
    mermaid += '  infrastructure -->|Supports| backend\n';
    
    return this.wrapInMarkdown('Layered Architecture', mermaid);
  }

  generateMVCDiagram(analysis) {
    const { patterns } = analysis;
    const mvcComponents = patterns.mvc.components;
    
    let mermaid = 'graph LR\n';
    
    // Add MVC styling
    mermaid += '  classDef model fill:#e8f5e8,stroke:#388e3c,stroke-width:2px\n';
    mermaid += '  classDef view fill:#e3f2fd,stroke:#1976d2,stroke-width:2px\n';
    mermaid += '  classDef controller fill:#fff3e0,stroke:#f57c00,stroke-width:2px\n';
    mermaid += '  classDef component fill:#f5f5f5,stroke:#666,stroke-width:1px\n\n';
    
    // Group components by MVC role
    const models = mvcComponents.filter(c => c.path.includes('model'));
    const views = mvcComponents.filter(c => c.path.includes('view') || c.path.includes('component'));
    const controllers = mvcComponents.filter(c => c.path.includes('controller'));
    
    // Add models
    models.forEach(model => {
      const nodeId = this.sanitizeName(model.name);
      mermaid += `  ${nodeId}["${model.name}"]:::model\n`;
    });
    
    // Add views
    views.forEach(view => {
      const nodeId = this.sanitizeName(view.name);
      mermaid += `  ${nodeId}["${view.name}"]:::view\n`;
    });
    
    // Add controllers
    controllers.forEach(controller => {
      const nodeId = this.sanitizeName(controller.name);
      mermaid += `  ${nodeId}["${controller.name}"]:::controller\n`;
    });
    
    // Add MVC relationships
    mermaid += '\n  %% MVC relationships\n';
    mermaid += '  controller -->|Updates| model\n';
    mermaid += '  controller -->|Renders| view\n';
    mermaid += '  view -->|User input| controller\n';
    mermaid += '  model -->|Data| view\n';
    
    return this.wrapInMarkdown('MVC Pattern', mermaid);
  }

  generateMicroservicesDiagram(analysis) {
    const { patterns } = analysis;
    const microserviceComponents = patterns.microservices.components;
    
    let mermaid = 'graph TB\n';
    
    // Add microservices styling
    mermaid += '  classDef service fill:#e8f5e8,stroke:#388e3c,stroke-width:2px\n';
    mermaid += '  classDef api fill:#e3f2fd,stroke:#1976d2,stroke-width:2px\n';
    mermaid += '  classDef gateway fill:#fff3e0,stroke:#f57c00,stroke-width:2px\n';
    mermaid += '  classDef component fill:#f5f5f5,stroke:#666,stroke-width:1px\n\n';
    
    // Group components by microservice role
    const services = microserviceComponents.filter(c => c.path.includes('service'));
    const apis = microserviceComponents.filter(c => c.path.includes('api'));
    const gateways = microserviceComponents.filter(c => c.path.includes('gateway'));
    
    // Add services
    services.forEach(service => {
      const nodeId = this.sanitizeName(service.name);
      mermaid += `  ${nodeId}["${service.name}"]:::service\n`;
    });
    
    // Add APIs
    apis.forEach(api => {
      const nodeId = this.sanitizeName(api.name);
      mermaid += `  ${nodeId}["${api.name}"]:::api\n`;
    });
    
    // Add gateways
    gateways.forEach(gateway => {
      const nodeId = this.sanitizeName(gateway.name);
      mermaid += `  ${nodeId}["${gateway.name}"]:::gateway\n`;
    });
    
    // Add microservice relationships
    mermaid += '\n  %% Microservice relationships\n';
    mermaid += '  gateway -->|Routes to| service\n';
    mermaid += '  api -->|Calls| service\n';
    mermaid += '  service -->|Communicates with| service\n';
    
    return this.wrapInMarkdown('Microservices Pattern', mermaid);
  }

  generateApiFlowDiagram(analysis) {
    const { relationshipCategories } = analysis;
    const apiRelationships = relationshipCategories.api || [];
    
    if (apiRelationships.length === 0) {
      return this.wrapInMarkdown('API Flow', 'No API relationships detected.');
    }
    
    let mermaid = 'graph LR\n';
    
    // Add API styling
    mermaid += '  classDef client fill:#e3f2fd,stroke:#1976d2,stroke-width:2px\n';
    mermaid += '  classDef api fill:#e8f5e8,stroke:#388e3c,stroke-width:2px\n';
    mermaid += '  classDef endpoint fill:#fff3e0,stroke:#f57c00,stroke-width:2px\n';
    mermaid += '  classDef external fill:#fce4ec,stroke:#c2185b,stroke-width:2px\n\n';
    
    // Group relationships by source and target
    const groupedRelationships = this.groupRelationshipsBySource(apiRelationships);
    
    Object.entries(groupedRelationships).forEach(([source, relationships]) => {
      const sourceId = this.sanitizeName(source);
      mermaid += `  ${sourceId}["${source}"]:::client\n`;
      
      relationships.forEach(rel => {
        const endpointId = this.sanitizeName(rel.endpoint || 'endpoint');
        
        mermaid += `  ${endpointId}["${rel.endpoint || rel.to}"]:::endpoint\n`;
        mermaid += `  ${sourceId} -->|${rel.method || 'GET'}| ${endpointId}\n`;
      });
    });
    
    return this.wrapInMarkdown('API Flow', mermaid);
  }

  generateDataFlowDiagram(analysis) {
    const { relationshipCategories } = analysis;
    const dataRelationships = relationshipCategories.data || [];
    
    if (dataRelationships.length === 0) {
      return this.wrapInMarkdown('Data Flow', 'No data flow relationships detected.');
    }
    
    let mermaid = 'graph TD\n';
    
    // Add data flow styling
    mermaid += '  classDef component fill:#e3f2fd,stroke:#1976d2,stroke-width:2px\n';
    mermaid += '  classDef data fill:#e8f5e8,stroke:#388e3c,stroke-width:2px\n';
    mermaid += '  classDef state fill:#fff3e0,stroke:#f57c00,stroke-width:2px\n';
    mermaid += '  classDef props fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px\n\n';
    
    // Group relationships by data type
    const groupedByType = this.groupRelationshipsByType(dataRelationships);
    
    Object.entries(groupedByType).forEach(([dataType, relationships]) => {
      relationships.forEach(rel => {
        const fromId = this.sanitizeName(rel.from);
        const toId = this.sanitizeName(rel.to);
        
        mermaid += `  ${fromId}["${rel.from}"]:::component\n`;
        mermaid += `  ${toId}["${rel.to}"]:::${this.getDataFlowClass(dataType)}\n`;
        mermaid += `  ${fromId} -->|${rel.dataType}| ${toId}\n`;
      });
    });
    
    return this.wrapInMarkdown('Data Flow', mermaid);
  }

  generateEventFlowDiagram(analysis) {
    const { relationshipCategories } = analysis;
    const eventRelationships = relationshipCategories.events || [];
    
    if (eventRelationships.length === 0) {
      return this.wrapInMarkdown('Event Flow', 'No event relationships detected.');
    }
    
    let mermaid = 'graph LR\n';
    
    // Add event styling
    mermaid += '  classDef emitter fill:#e3f2fd,stroke:#1976d2,stroke-width:2px\n';
    mermaid += '  classDef listener fill:#e8f5e8,stroke:#388e3c,stroke-width:2px\n';
    mermaid += '  classDef event fill:#fff3e0,stroke:#f57c00,stroke-width:2px\n';
    mermaid += '  classDef system fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px\n\n';
    
    // Group by event type
    const groupedByEvent = this.groupRelationshipsByEvent(eventRelationships);
    
    Object.entries(groupedByEvent).forEach(([eventName, relationships]) => {
      const emitters = relationships.filter(r => r.type === 'event-emission');
      const listeners = relationships.filter(r => r.type === 'event-subscription');
      
      emitters.forEach(emitter => {
        const emitterId = this.sanitizeName(emitter.from);
        const eventId = this.sanitizeName(eventName);
        
        mermaid += `  ${emitterId}["${emitter.from}"]:::emitter\n`;
        mermaid += `  ${eventId}["${eventName}"]:::event\n`;
        mermaid += `  ${emitterId} -->|emits| ${eventId}\n`;
      });
      
      listeners.forEach(listener => {
        const listenerId = this.sanitizeName(listener.from);
        const eventId = this.sanitizeName(eventName);
        
        mermaid += `  ${listenerId}["${listener.from}"]:::listener\n`;
        mermaid += `  ${eventId} -->|triggers| ${listenerId}\n`;
      });
    });
    
    return this.wrapInMarkdown('Event Flow', mermaid);
  }

  generateServiceCommunicationDiagram(analysis) {
    const { relationshipCategories } = analysis;
    const serviceRelationships = relationshipCategories.services || [];
    
    if (serviceRelationships.length === 0) {
      return this.wrapInMarkdown('Service Communication', 'No service communication relationships detected.');
    }
    
    let mermaid = 'graph TB\n';
    
    // Add service styling
    mermaid += '  classDef service fill:#e8f5e8,stroke:#388e3c,stroke-width:2px\n';
    mermaid += '  classDef method fill:#e3f2fd,stroke:#1976d2,stroke-width:2px\n';
    mermaid += '  classDef interface fill:#fff3e0,stroke:#f57c00,stroke-width:2px\n\n';
    
    // Group by service
    const groupedByService = this.groupRelationshipsByService(serviceRelationships);
    
    Object.entries(groupedByService).forEach(([serviceName, relationships]) => {
      const serviceId = this.sanitizeName(serviceName);
      mermaid += `  subgraph ${serviceId}["${serviceName} Service"]\n`;
      
      relationships.forEach(rel => {
        const methodId = this.sanitizeName(`${rel.from}-${rel.serviceMethod}`);
        mermaid += `    ${methodId}["${rel.serviceMethod}"]:::method\n`;
      });
      
      mermaid += '  end\n\n';
    });
    
    // Add service-to-service relationships
    serviceRelationships.forEach(rel => {
      const fromId = this.sanitizeName(rel.from);
      const toId = this.sanitizeName(rel.to);
      mermaid += `  ${fromId} -->|${rel.serviceMethod}| ${toId}\n`;
    });
    
    return this.wrapInMarkdown('Service Communication', mermaid);
  }

  groupRelationshipsBySource(relationships) {
    const grouped = {};
    relationships.forEach(rel => {
      if (!grouped[rel.from]) {
        grouped[rel.from] = [];
      }
      grouped[rel.from].push(rel);
    });
    return grouped;
  }

  groupRelationshipsByType(relationships) {
    const grouped = {};
    relationships.forEach(rel => {
      const type = rel.dataType || 'data';
      if (!grouped[type]) {
        grouped[type] = [];
      }
      grouped[type].push(rel);
    });
    return grouped;
  }

  groupRelationshipsByEvent(relationships) {
    const grouped = {};
    relationships.forEach(rel => {
      const eventName = rel.eventName || 'event';
      if (!grouped[eventName]) {
        grouped[eventName] = [];
      }
      grouped[eventName].push(rel);
    });
    return grouped;
  }

  groupRelationshipsByService(relationships) {
    const grouped = {};
    relationships.forEach(rel => {
      const serviceName = rel.to || 'service';
      if (!grouped[serviceName]) {
        grouped[serviceName] = [];
      }
      grouped[serviceName].push(rel);
    });
    return grouped;
  }

  getDataFlowClass(dataType) {
    switch (dataType) {
      case 'props': return 'props';
      case 'state': return 'state';
      case 'array': return 'data';
      default: return 'data';
    }
  }

  filterComponentsForDiagram(components) {
    // Filter out components that make diagrams too complex
    return components
      .filter(component => {
        // Exclude test files unless specifically included
        if (this.isTestFile(component.path) && !this.config?.includeTests) {
          return false;
        }
        
        // Exclude dependency layer files (like layer/python)
        if (this.isDependencyLayer(component.path)) {
          return false;
        }
        
        // Exclude very specific internal functions that clutter diagrams
        if (this.isInternalImplementation(component.name)) {
          return false;
        }
        
        // Prioritize main application files over utility files
        if (this.isUtilityFile(component.path)) {
          return false;
        }
        
        return true;
      })
      .sort((a, b) => {
        // Sort by importance: main files first, then by path depth
        const aImportance = this.getComponentImportance(a);
        const bImportance = this.getComponentImportance(b);
        if (aImportance !== bImportance) {
          return bImportance - aImportance;
        }
        return a.path.split('/').length - b.path.split('/').length;
      })
      .slice(0, this.maxNodesPerDiagram); // Limit total nodes
  }

  filterDependenciesForDiagram(dependencies, filteredComponents) {
    const componentNames = new Set(filteredComponents.map(c => c.name));
    
    return dependencies
      .filter(dep => {
        // Only include dependencies that involve our filtered components
        return componentNames.has(dep.from) || componentNames.has(dep.name);
      })
      .slice(0, this.maxDependenciesPerDiagram); // Limit total dependencies
  }

  isTestFile(filePath) {
    return filePath.includes('/test') || 
           filePath.includes('/tests') || 
           filePath.includes('.test.') || 
           filePath.includes('.spec.') ||
           filePath.includes('__tests__');
  }

  isDependencyLayer(filePath) {
    return filePath.includes('layer/python') || 
           filePath.includes('node_modules') ||
           filePath.includes('venv') ||
           filePath.includes('.venv');
  }

  isInternalImplementation(name) {
    // Filter out very specific internal implementation details
    const internalPatterns = [
      /^__.*__$/,  // Python dunder methods
      /^_.*$/,     // Private methods/functions
      /^[a-z]+$/,  // Single word lowercase (often internal)
      /^[A-Z][a-z]*$/, // Single word PascalCase (often internal classes)
    ];
    
    return internalPatterns.some(pattern => pattern.test(name));
  }

  isUtilityFile(filePath) {
    // Filter out utility files that are less important for architecture diagrams
    const utilityPatterns = [
      /\/utils\//,
      /\/helpers\//,
      /\/constants\//,
      /\/config\//,
      /\/types\//,
      /\/interfaces\//,
      /\/enums\//,
      /\/validators\//,
      /\/formatters\//,
    ];
    
    return utilityPatterns.some(pattern => pattern.test(filePath));
  }

  getComponentImportance(component) {
    // Higher number = more important
    let importance = 0;
    
    // Main entry points are most important
    if (component.name === 'index' || component.name === 'main' || component.name === 'app') {
      importance += 100;
    }
    
    // Service/API files are important
    if (component.path.includes('/service') || component.path.includes('/api')) {
      importance += 50;
    }
    
    // Controller/handler files are important
    if (component.path.includes('/controller') || component.path.includes('/handler')) {
      importance += 40;
    }
    
    // Model/entity files are important
    if (component.path.includes('/model') || component.path.includes('/entity')) {
      importance += 30;
    }
    
    // Core business logic files
    if (component.path.includes('/core') || component.path.includes('/business')) {
      importance += 20;
    }
    
    // Reduce importance for deeply nested files
    const depth = component.path.split('/').length;
    importance -= depth * 2;
    
    return importance;
  }

  getDisplayName(dir) {
    // Create cleaner display names for directories
    const parts = dir.split('/');
    if (parts.length === 1) {
      return parts[0] || 'Root';
    }
    
    // Show last 2 parts of the path for context
    const lastTwo = parts.slice(-2);
    return lastTwo.join('/');
  }

  getDisplayComponentName(name) {
    // Truncate very long component names
    if (name.length > 20) {
      return name.substring(0, 17) + '...';
    }
    return name;
  }

  addInternalRelationships(mermaid, components, analysis, edgeSet) {
    // Add relationships between internal components based on analysis
    if (analysis.relationships && analysis.relationships.length > 0) {
      const componentNames = new Set(components.map(c => c.name));
      
      analysis.relationships.forEach(rel => {
        // Try to match relationships by component name or path
        const fromComponent = components.find(c => c.name === rel.from || c.path === rel.fromPath);
        const toComponent = components.find(c => c.name === rel.to || c.path === rel.toPath);
        
        if (fromComponent && toComponent) {
          const edgeKey = `${fromComponent.name}-->${toComponent.name}`;
          if (edgeSet.has(edgeKey)) return;
          edgeSet.add(edgeKey);
          
          const fromId = this.sanitizeName(fromComponent.name);
          const toId = this.sanitizeName(toComponent.name);
          const relationshipType = this.getRelationshipLabel(rel);
          const relationshipStyle = this.getRelationshipStyle(rel.type);
          
          mermaid += `  ${fromId} ${relationshipStyle}|${relationshipType}| ${toId}\n`;
        }
      });
    }
    
    // Add logical architectural relationships
    mermaid = this.addArchitecturalRelationships(mermaid, components, edgeSet);
    return mermaid;
  }

  addExternalDependencies(mermaid, dependencies, edgeSet, nodeNames) {
    // Group external dependencies by type
    const externalDeps = dependencies.filter(dep => this.isExternalDependency(dep.from));
    const groupedDeps = this.groupDependenciesByType(externalDeps);
    
    Object.entries(groupedDeps).forEach(([type, deps]) => {
      deps.slice(0, 5).forEach(dep => { // Limit external deps per type
        if (!dep.from || !dep.name) return;
        if (dep.from === dep.name) return;
        
        const edgeKey = `${dep.from}-->${dep.name}`;
        if (edgeSet.has(edgeKey)) return;
        edgeSet.add(edgeKey);
        
        // Create external dependency nodes with semantic styling
        if (!nodeNames.has(dep.from)) {
          const fromIdDecl = this.sanitizeName(dep.from);
          mermaid += `  ${fromIdDecl}["${this.getDisplayComponentName(dep.from)}"]\n`;
          const depClass = this.getDependencyClass(dep.from);
          mermaid += `  ${fromIdDecl}:::${depClass}\n`;
          nodeNames.add(dep.from);
        }
        
        const fromId = this.sanitizeName(dep.from);
        const toId = this.sanitizeName(dep.name);
        const depType = this.getDependencyTypeLabel(type);
        
        mermaid += `  ${fromId} -->|${depType}| ${toId}\n`;
      });
    });
    return mermaid;
  }

  addArchitecturalRelationships(mermaid, components, edgeSet) {
    // Add logical relationships based on component types and names
    components.forEach(component => {
      const componentId = this.sanitizeName(component.name);
      
      // Add relationships based on component type and naming patterns
      if (component.name.includes('Analyzer')) {
        // Analyzers typically use DiagramGenerator
        const diagramGen = components.find(c => c.name === 'DiagramGenerator');
        if (diagramGen) {
          const edgeKey = `${component.name}-->${diagramGen.name}`;
          if (!edgeSet.has(edgeKey)) {
            edgeSet.add(edgeKey);
            const genId = this.sanitizeName(diagramGen.name);
            mermaid += `  ${componentId} -->|generates| ${genId}\n`;
          }
        }
      }
      
      if (component.name.includes('Manager') || component.name.includes('Service')) {
        // Managers/Services are often used by main components
        const mainComp = components.find(c => c.name === 'main' || c.name === 'index');
        if (mainComp) {
          const edgeKey = `${mainComp.name}-->${component.name}`;
          if (!edgeSet.has(edgeKey)) {
            edgeSet.add(edgeKey);
            const mainId = this.sanitizeName(mainComp.name);
            mermaid += `  ${mainId} -->|uses| ${componentId}\n`;
          }
        }
      }
    });
    return mermaid;
  }

  getRelationshipLabel(relationship) {
    // Map relationship types to readable labels
    const typeMap = {
      'import': 'imports',
      'call': 'calls',
      'extends': 'extends',
      'implements': 'implements',
      'api-call': 'API',
      'data-flow': 'data',
      'event': 'event',
      'service': 'service'
    };
    
    return typeMap[relationship.type] || relationship.type || 'uses';
  }

  getRelationshipStyle(relationshipType) {
    const styles = {
      'import': '-->',
      'call': '==>',
      'extends': '-->',
      'implements': '-->',
      'api-call': '==>',
      'data-flow': '-->',
      'event': '-->',
      'service': '==>'
    };
    return styles[relationshipType] || '-->';
  }

  getRelationshipColor(relationshipType) {
    const colors = {
      'import': '#666',
      'call': '#ff9800',
      'extends': '#2196f3',
      'implements': '#4caf50',
      'api-call': '#ff5722',
      'data-flow': '#4caf50',
      'event': '#9c27b0',
      'service': '#ff9800'
    };
    return colors[relationshipType] || '#666';
  }

  getDependencyTypeLabel(type) {
    const typeMap = {
      'npm': 'npm',
      'external': 'external',
      'internal': 'internal',
      'framework': 'framework'
    };
    
    return typeMap[type] || 'depends';
  }

  groupDependenciesByType(dependencies) {
    const groups = {
      'npm': [],
      'external': [],
      'framework': [],
      'internal': []
    };
    
    dependencies.forEach(dep => {
      if (dep.from.startsWith('@')) {
        groups.npm.push(dep);
      } else if (this.isFrameworkDependency(dep.from)) {
        groups.framework.push(dep);
      } else if (this.isExternalDependency(dep.from)) {
        groups.external.push(dep);
      } else {
        groups.internal.push(dep);
      }
    });
    
    return groups;
  }

  isFrameworkDependency(dep) {
    const frameworks = ['react', 'vue', 'angular', 'express', 'django', 'flask', 'spring'];
    return frameworks.some(fw => dep.toLowerCase().includes(fw));
  }

  getComponentClass(component) {
    // Determine semantic class based on component name and type
    const name = component.name.toLowerCase();
    
    // Get size-based class
    const metrics = this.getComponentMetrics(component, { components: [] });
    let sizeClass = '';
    if (metrics.size > 100) {
      sizeClass = 'large';
    } else if (metrics.size > 50) {
      sizeClass = 'medium';
    } else {
      sizeClass = 'small';
    }
    
    // Get semantic class
    let semanticClass = 'component';
    if (name.includes('analyzer')) {
      semanticClass = 'analyzer';
    } else if (name.includes('generator')) {
      semanticClass = 'generator';
    } else if (name.includes('manager')) {
      semanticClass = 'manager';
    } else if (name.includes('service')) {
      semanticClass = 'service';
    } else if (name.includes('controller') || name.includes('handler')) {
      semanticClass = 'service';
    } else if (name.includes('model') || name.includes('entity')) {
      semanticClass = 'service';
    }
    
    // Combine semantic and size classes
    return `${semanticClass} ${sizeClass}`;
  }

  getDependencyClass(dependency) {
    // Determine semantic class for external dependencies
    const dep = dependency.toLowerCase();
    
    if (dep.startsWith('@')) {
      return 'npm';
    } else if (this.isFrameworkDependency(dependency)) {
      return 'framework';
    } else if (dep.includes('actions') || dep.includes('github')) {
      return 'framework';
    } else {
      return 'external';
    }
  }

  getComponentMetrics(component, analysis) {
    // Calculate component metrics for enhanced visualization
    const metrics = {
      size: this.calculateComponentSize(component),
      complexity: this.calculateComplexity(component),
      dependencies: this.countDependencies(component, analysis),
      importance: this.getComponentImportance(component)
    };
    
    return metrics;
  }

  calculateComponentSize(component) {
    // Estimate component size based on available data
    if (component.linesOfCode) {
      return component.linesOfCode;
    }
    
    // Fallback: estimate based on name length and type
    const baseSize = component.name.length * 10;
    if (component.name.includes('Analyzer') || component.name.includes('Generator')) {
      return baseSize + 50; // Larger components
    }
    return baseSize;
  }

  calculateComplexity(component) {
    // Calculate complexity score based on component characteristics
    let complexity = 1;
    
    if (component.name.includes('Analyzer') || component.name.includes('Generator')) {
      complexity += 2;
    }
    if (component.name.includes('Manager') || component.name.includes('Service')) {
      complexity += 1;
    }
    if (component.name.length > 20) {
      complexity += 1;
    }
    
    return Math.min(complexity, 5); // Cap at 5
  }

  countDependencies(component, analysis) {
    // Count how many components depend on this one
    if (!analysis.dependencies) return 0;
    
    return analysis.dependencies.filter(dep => 
      dep.name === component.name || dep.from === component.name
    ).length;
  }

  enhanceComponentName(name, metrics) {
    // Enhance component name with visual indicators
    let enhanced = name;
    
    // Add size indicator
    if (metrics.size > 100) {
      enhanced = `📦 ${enhanced}`;
    } else if (metrics.size > 50) {
      enhanced = `📄 ${enhanced}`;
    } else {
      enhanced = `📝 ${enhanced}`;
    }
    
    // Add complexity indicator
    if (metrics.complexity >= 4) {
      enhanced = `${enhanced} ⚡`;
    } else if (metrics.complexity >= 3) {
      enhanced = `${enhanced} 🔥`;
    }
    
    // Add dependency indicator
    if (metrics.dependencies > 5) {
      enhanced = `${enhanced} 🔗`;
    }
    
    return enhanced;
  }
}

module.exports = { DiagramGenerator };
