const fs = require('fs-extra');
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
    
    let mermaid = 'graph TD\n';
    
    // Add styling
    mermaid += '  classDef component fill:#e1f5fe,stroke:#01579b,stroke-width:2px\n';
    mermaid += '  classDef external fill:#fff3e0,stroke:#e65100,stroke-width:2px\n';
    mermaid += '  classDef internal fill:#f3e5f5,stroke:#4a148c,stroke-width:2px\n\n';

    // Group components by directory
    const componentGroups = this.groupComponentsByDirectory(components);
    
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

    // Add dependencies
    dependencies.forEach(dep => {
      if (dep.from && dep.name) {
        const fromId = this.sanitizeName(dep.from);
        const toId = this.sanitizeName(dep.name);
        
        // Only add if both nodes exist
        if (this.nodeExists(components, dep.from) && this.nodeExists(components, dep.name)) {
          mermaid += `  ${fromId} --> ${toId}\n`;
        }
      }
    });

    // Apply styling
    components.forEach(component => {
      const nodeId = this.sanitizeName(component.name);
      mermaid += `  ${nodeId}\n`;
    });

    return this.wrapInMarkdown('Architecture Overview', mermaid);
  }

  generateDependencyDiagram(analysis) {
    const { dependencies } = analysis;
    
    let mermaid = 'graph LR\n';
    
    // Add styling
    mermaid += '  classDef internal fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px\n';
    mermaid += '  classDef external fill:#ffebee,stroke:#c62828,stroke-width:2px\n\n';

    // Group dependencies by type (internal vs external)
    const internalDeps = dependencies.filter(dep => !this.isExternalDependency(dep.from));
    const externalDeps = dependencies.filter(dep => this.isExternalDependency(dep.from));

    // Add external dependencies
    const externalModules = [...new Set(externalDeps.map(dep => dep.from))];
    externalModules.forEach(module => {
      const nodeId = this.sanitizeName(module);
      mermaid += `  ${nodeId}["${module}"]\n`;
    });

    // Add internal components
    const internalComponents = [...new Set(internalDeps.map(dep => dep.name))];
    internalComponents.forEach(component => {
      const nodeId = this.sanitizeName(component);
      mermaid += `  ${nodeId}["${component}"]\n`;
    });

    // Add dependency relationships
    dependencies.forEach(dep => {
      if (dep.from && dep.name) {
        const fromId = this.sanitizeName(dep.from);
        const toId = this.sanitizeName(dep.name);
        mermaid += `  ${fromId} --> ${toId}\n`;
      }
    });

    return this.wrapInMarkdown('Dependency Graph', mermaid);
  }

  generateModuleDiagram(analysis) {
    const { modules } = analysis;
    
    let mermaid = 'graph TB\n';
    
    // Add styling
    mermaid += '  classDef module fill:#e3f2fd,stroke:#1976d2,stroke-width:2px\n';
    mermaid += '  classDef export fill:#e8f5e8,stroke:#388e3c,stroke-width:2px\n\n';

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
    return name.replace(/[^a-zA-Z0-9]/g, '_');
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
