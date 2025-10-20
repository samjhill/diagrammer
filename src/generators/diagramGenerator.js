const path = require('path');

class DiagramGenerator {
  constructor(config) {
    this.config = config;
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

    return diagrams;
  }

  generateArchitectureDiagram(analysis) {
    const { components, dependencies } = analysis;
    const uniqueComponents = this.uniqueByName(components);
    
    let mermaid = 'graph TD\n';
    
    // Add styling with distinct colors
    mermaid += '  classDef component fill:#e3f2fd,stroke:#1976d2,stroke-width:2px\n';
    mermaid += '  classDef external fill:#fff3e0,stroke:#f57c00,stroke-width:2px\n';
    mermaid += '  classDef internal fill:#e8f5e8,stroke:#388e3c,stroke-width:2px\n';
    mermaid += '  classDef dependency fill:#fce4ec,stroke:#c2185b,stroke-width:2px\n';
    mermaid += '  classDef group fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px\n\n';

    // Group components by directory
    const componentGroups = this.groupComponentsByDirectory(uniqueComponents);
    
    // Create subgraphs for different directories
    Object.entries(componentGroups).forEach(([dir, dirComponents]) => {
      if (dirComponents.length > 0) {
        const subgraphName = this.sanitizeName(dir);
        mermaid += `  subgraph ${subgraphName}["${dir}"]\n`;
        
        dirComponents.forEach(component => {
          const nodeId = this.sanitizeName(component.name);
          mermaid += `    ${nodeId}["${component.name}"]\n`;
        });
        
        mermaid += '  end\n\n';
      }
    });

    // Add dependencies (deduped and no self loops). Ensure endpoints exist as nodes.
    const edgeSet = new Set();
    const nodeNames = new Set(uniqueComponents.map(c => c.name));
    dependencies.forEach(dep => {
      if (!dep.from || !dep.name) return;
      if (dep.from === dep.name) return;
      // Create placeholder nodes if they don't exist (helps visualize relationships)
      if (!nodeNames.has(dep.from)) {
        const fromIdDecl = this.sanitizeName(dep.from);
        mermaid += `  ${fromIdDecl}["${dep.from}"]\n`;
        mermaid += `  ${fromIdDecl}:::external\n`;
        nodeNames.add(dep.from);
      }
      if (!nodeNames.has(dep.name)) {
        const toIdDecl = this.sanitizeName(dep.name);
        mermaid += `  ${toIdDecl}["${dep.name}"]\n`;
        mermaid += `  ${toIdDecl}:::dependency\n`;
        nodeNames.add(dep.name);
      }
      const edgeKey = `${dep.from}-->${dep.name}`;
      if (edgeSet.has(edgeKey)) return;
      edgeSet.add(edgeKey);
      const fromId = this.sanitizeName(dep.from);
      const toId = this.sanitizeName(dep.name);
      mermaid += `  ${fromId} -->|depends| ${toId}\n`;
    });

    // Apply styling to existing components
    uniqueComponents.forEach(component => {
      const nodeId = this.sanitizeName(component.name);
      mermaid += `  ${nodeId}:::component\n`;
    });

    return this.wrapInMarkdown('Architecture Overview', mermaid);
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

    return this.wrapInMarkdown('Dependency Graph', mermaid);
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

    return this.wrapInMarkdown('Module Structure', mermaid);
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

  wrapInMarkdown(title, mermaidContent) {
    return `# ${title}

This diagram was automatically generated from your codebase.

\`\`\`mermaid
${mermaidContent}
\`\`\`

---
*Generated by [Diagrammer GitHub Action](https://github.com/samjhill/diagrammer)*
`;
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
}

module.exports = { DiagramGenerator };
