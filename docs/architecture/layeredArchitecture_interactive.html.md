# Layered Architecture

This interactive diagram contains clickable nodes that link to source code files.

```mermaid
graph TB
  classDef frontend fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
  classDef backend fill:#e8f5e8,stroke:#388e3c,stroke-width:3px
  classDef data fill:#fff3e0,stroke:#f57c00,stroke-width:3px
  classDef infrastructure fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px
  classDef component fill:#f5f5f5,stroke:#666,stroke-width:1px

  subgraph unknown["UNKNOWN LAYER"]
    classDef unknownClass fill:#f5f5f5,stroke:#666,stroke-width:1px
    main["<a href='https://github.com/samjhill/diagrammer/blob/main/src/index.js' target='_blank'>main</a>"]
    main:::component
    loadConfig["<a href='https://github.com/samjhill/diagrammer/blob/main/src/index.js' target='_blank'>loadConfig</a>"]
    loadConfig:::component
    languages["<a href='https://github.com/samjhill/diagrammer/blob/main/src/index.js' target='_blank'>languages</a>"]
    languages:::component
    DiagramGenerator["<a href='https://github.com/samjhill/diagrammer/blob/main/src/generators/diagramGenerator.js' target='_blank'>DiagramGenerator</a>"]
    DiagramGenerator:::component
    based["<a href='https://github.com/samjhill/diagrammer/blob/main/src/generators/diagramGenerator.js' target='_blank'>based</a>"]
    based:::component
    for["<a href='https://github.com/samjhill/diagrammer/blob/main/src/generators/diagramGenerator.js' target='_blank'>for</a>"]
    for:::component
    calls["<a href='https://github.com/samjhill/diagrammer/blob/main/src/generators/diagramGenerator.js' target='_blank'>calls</a>"]
    calls:::component
    rev["<a href='https://github.com/samjhill/diagrammer/blob/main/src/generators/diagramGenerator.js' target='_blank'>rev</a>"]
    rev:::component
    percentage["<a href='https://github.com/samjhill/diagrammer/blob/main/src/generators/diagramGenerator.js' target='_blank'>percentage</a>"]
    percentage:::component
    DiagramExporter["<a href='https://github.com/samjhill/diagrammer/blob/main/src/exporters/diagramExporter.js' target='_blank'>DiagramExporter</a>"]
    DiagramExporter:::component
    TypeScriptAnalyzer["<a href='https://github.com/samjhill/diagrammer/blob/main/src/analyzers/typescriptAnalyzer.js' target='_blank'>TypeScriptAnalyzer</a>"]
    TypeScriptAnalyzer:::component
    visit["<a href='https://github.com/samjhill/diagrammer/blob/main/src/analyzers/typescriptAnalyzer.js' target='_blank'>visit</a>"]
    visit:::component
    RelationshipAnalyzer["<a href='https://github.com/samjhill/diagrammer/blob/main/src/analyzers/relationshipAnalyzer.js' target='_blank'>RelationshipAnalyzer</a>"]
    RelationshipAnalyzer:::component
    PythonAnalyzer["<a href='https://github.com/samjhill/diagrammer/blob/main/src/analyzers/pythonAnalyzer.js' target='_blank'>PythonAnalyzer</a>"]
    PythonAnalyzer:::component
    JavaScriptAnalyzer["<a href='https://github.com/samjhill/diagrammer/blob/main/src/analyzers/javascriptAnalyzer.js' target='_blank'>JavaScriptAnalyzer</a>"]
    JavaScriptAnalyzer:::component
    declarations["<a href='https://github.com/samjhill/diagrammer/blob/main/src/analyzers/javascriptAnalyzer.js' target='_blank'>declarations</a>"]
    declarations:::component
    CodeAnalyzer["<a href='https://github.com/samjhill/diagrammer/blob/main/src/analyzers/codeAnalyzer.js' target='_blank'>CodeAnalyzer</a>"]
    CodeAnalyzer:::component
    ArchitecturalAnalyzer["<a href='https://github.com/samjhill/diagrammer/blob/main/src/analyzers/architecturalAnalyzer.js' target='_blank'>ArchitecturalAnalyzer</a>"]
    ArchitecturalAnalyzer:::component
  end

  subgraph infrastructure["INFRASTRUCTURE LAYER"]
    classDef infrastructureClass fill:#f5f5f5,stroke:#666,stroke-width:1px
    GitManager["<a href='https://github.com/samjhill/diagrammer/blob/main/src/utils/gitManager.js' target='_blank'>GitManager</a>"]
    GitManager:::component
  end

  %% Layer relationships
  frontend -->|API calls| backend
  backend -->|Data access| data
  infrastructure -->|Supports| frontend
  infrastructure -->|Supports| backend

```

## 📁 Source Code Links

| Component | Type | Language | File Path | Source Link |
|-----------|------|----------|-----------|-------------|
| ArchitecturalAnalyzer | Component | javascript | src/analyzers/architecturalAnalyzer.js | [View Source](https://github.com/samjhill/diagrammer/blob/main/src/analyzers/architecturalAnalyzer.js) |
| based | Component | javascript | src/generators/diagramGenerator.js | [View Source](https://github.com/samjhill/diagrammer/blob/main/src/generators/diagramGenerator.js) |
| calls | Component | javascript | src/generators/diagramGenerator.js | [View Source](https://github.com/samjhill/diagrammer/blob/main/src/generators/diagramGenerator.js) |
| CodeAnalyzer | Component | javascript | src/analyzers/codeAnalyzer.js | [View Source](https://github.com/samjhill/diagrammer/blob/main/src/analyzers/codeAnalyzer.js) |
| declarations | Component | javascript | src/analyzers/javascriptAnalyzer.js | [View Source](https://github.com/samjhill/diagrammer/blob/main/src/analyzers/javascriptAnalyzer.js) |
| DiagramExporter | Component | javascript | src/exporters/diagramExporter.js | [View Source](https://github.com/samjhill/diagrammer/blob/main/src/exporters/diagramExporter.js) |
| DiagramGenerator | Component | javascript | src/generators/diagramGenerator.js | [View Source](https://github.com/samjhill/diagrammer/blob/main/src/generators/diagramGenerator.js) |
| for | Component | javascript | src/generators/diagramGenerator.js | [View Source](https://github.com/samjhill/diagrammer/blob/main/src/generators/diagramGenerator.js) |
| GitManager | Component | javascript | src/utils/gitManager.js | [View Source](https://github.com/samjhill/diagrammer/blob/main/src/utils/gitManager.js) |
| JavaScriptAnalyzer | Component | javascript | src/analyzers/javascriptAnalyzer.js | [View Source](https://github.com/samjhill/diagrammer/blob/main/src/analyzers/javascriptAnalyzer.js) |
| languages | Component | javascript | src/index.js | [View Source](https://github.com/samjhill/diagrammer/blob/main/src/index.js) |
| loadConfig | Component | javascript | src/index.js | [View Source](https://github.com/samjhill/diagrammer/blob/main/src/index.js) |
| main | Component | javascript | src/index.js | [View Source](https://github.com/samjhill/diagrammer/blob/main/src/index.js) |
| percentage | Component | javascript | src/generators/diagramGenerator.js | [View Source](https://github.com/samjhill/diagrammer/blob/main/src/generators/diagramGenerator.js) |
| PythonAnalyzer | Component | javascript | src/analyzers/pythonAnalyzer.js | [View Source](https://github.com/samjhill/diagrammer/blob/main/src/analyzers/pythonAnalyzer.js) |
| RelationshipAnalyzer | Component | javascript | src/analyzers/relationshipAnalyzer.js | [View Source](https://github.com/samjhill/diagrammer/blob/main/src/analyzers/relationshipAnalyzer.js) |
| rev | Component | javascript | src/generators/diagramGenerator.js | [View Source](https://github.com/samjhill/diagrammer/blob/main/src/generators/diagramGenerator.js) |
| TypeScriptAnalyzer | Component | javascript | src/analyzers/typescriptAnalyzer.js | [View Source](https://github.com/samjhill/diagrammer/blob/main/src/analyzers/typescriptAnalyzer.js) |
| visit | Component | javascript | src/analyzers/typescriptAnalyzer.js | [View Source](https://github.com/samjhill/diagrammer/blob/main/src/analyzers/typescriptAnalyzer.js) |


---
*Generated by [Diagrammer GitHub Action](https://github.com/samjhill/diagrammer)*
*Click on diagram nodes to view source code*