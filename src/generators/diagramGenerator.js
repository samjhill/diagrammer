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
        const targetId = this.sanitizeName(rel.to);
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
}

module.exports = { DiagramGenerator };
