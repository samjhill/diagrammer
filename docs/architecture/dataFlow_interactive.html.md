# Data Flow

This interactive diagram contains clickable nodes that link to source code files.

```mermaid
graph TD
  classDef component fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  classDef data fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
  classDef state fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  classDef props fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px

  main["<a href='https://github.com/samjhill/diagrammer/blob/main/src/index.js' target='_blank'>main</a>"]:::component
  data_store["data-store"]:::data
  main -->|data| data_store
  loadConfig["<a href='https://github.com/samjhill/diagrammer/blob/main/src/index.js' target='_blank'>loadConfig</a>"]:::component
  data_store["data-store"]:::data
  loadConfig -->|data| data_store
  languages["<a href='https://github.com/samjhill/diagrammer/blob/main/src/index.js' target='_blank'>languages</a>"]:::component
  data_store["data-store"]:::data
  languages -->|data| data_store
  DiagramExporter["<a href='https://github.com/samjhill/diagrammer/blob/main/src/exporters/diagramExporter.js' target='_blank'>DiagramExporter</a>"]:::component
  data_store["data-store"]:::data
  DiagramExporter -->|data| data_store
  DiagramGenerator["<a href='https://github.com/samjhill/diagrammer/blob/main/src/generators/diagramGenerator.js' target='_blank'>DiagramGenerator</a>"]:::component
  data_store["data-store"]:::data
  DiagramGenerator -->|array| data_store
  based["<a href='https://github.com/samjhill/diagrammer/blob/main/src/generators/diagramGenerator.js' target='_blank'>based</a>"]:::component
  data_store["data-store"]:::data
  based -->|array| data_store
  for["<a href='https://github.com/samjhill/diagrammer/blob/main/src/generators/diagramGenerator.js' target='_blank'>for</a>"]:::component
  data_store["data-store"]:::data
  for -->|array| data_store
  calls["<a href='https://github.com/samjhill/diagrammer/blob/main/src/generators/diagramGenerator.js' target='_blank'>calls</a>"]:::component
  data_store["data-store"]:::data
  calls -->|array| data_store
  rev["<a href='https://github.com/samjhill/diagrammer/blob/main/src/generators/diagramGenerator.js' target='_blank'>rev</a>"]:::component
  data_store["data-store"]:::data
  rev -->|array| data_store
  percentage["<a href='https://github.com/samjhill/diagrammer/blob/main/src/generators/diagramGenerator.js' target='_blank'>percentage</a>"]:::component
  data_store["data-store"]:::data
  percentage -->|array| data_store
  RelationshipAnalyzer["<a href='https://github.com/samjhill/diagrammer/blob/main/src/analyzers/relationshipAnalyzer.js' target='_blank'>RelationshipAnalyzer</a>"]:::component
  data_store["data-store"]:::data
  RelationshipAnalyzer -->|array| data_store
  PythonAnalyzer["<a href='https://github.com/samjhill/diagrammer/blob/main/src/analyzers/pythonAnalyzer.js' target='_blank'>PythonAnalyzer</a>"]:::component
  data_store["data-store"]:::data
  PythonAnalyzer -->|array| data_store
  JavaScriptAnalyzer["<a href='https://github.com/samjhill/diagrammer/blob/main/src/analyzers/javascriptAnalyzer.js' target='_blank'>JavaScriptAnalyzer</a>"]:::component
  data_store["data-store"]:::data
  JavaScriptAnalyzer -->|array| data_store
  declarations["<a href='https://github.com/samjhill/diagrammer/blob/main/src/analyzers/javascriptAnalyzer.js' target='_blank'>declarations</a>"]:::component
  data_store["data-store"]:::data
  declarations -->|array| data_store
  CodeAnalyzer["<a href='https://github.com/samjhill/diagrammer/blob/main/src/analyzers/codeAnalyzer.js' target='_blank'>CodeAnalyzer</a>"]:::component
  data_store["data-store"]:::data
  CodeAnalyzer -->|array| data_store

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