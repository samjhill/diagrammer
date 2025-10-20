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
    mermaid += '  classDef subgraph fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px\n\n';

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
    mermaid += '  classDef subgraph fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px\n\n';

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
}

module.exports = { DiagramGenerator };
