# Modules

This interactive diagram contains clickable nodes that link to source code files.

```mermaid
graph TB
  classDef module fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  classDef export fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
  classDef group fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px

  subgraph _["."]
    testEnvironment["testEnvironment"]
    testMatch["testMatch"]
    collectCoverageFrom["collectCoverageFrom"]
    __src_index_js_____Exclude_main_entry_point____["'!src/index.js' // Exclude main entry point
  ]"]
    coverageDirectory["coverageDirectory"]
    coverageReporters["coverageReporters"]
    _lcov_["'lcov'"]
    _html__["'html']"]
    verbose["verbose"]
  end

  subgraph src["src"]
    main["<a href='https://github.com/samjhill/diagrammer/blob/main/src/index.js' target='_blank'>main</a>"]
  end

  subgraph src_utils["src/utils"]
    GitManager["<a href='https://github.com/samjhill/diagrammer/blob/main/src/utils/gitManager.js' target='_blank'>GitManager</a>"]
  end

  subgraph src_generators["src/generators"]
    DiagramGenerator["<a href='https://github.com/samjhill/diagrammer/blob/main/src/generators/diagramGenerator.js' target='_blank'>DiagramGenerator</a>"]
  end

  subgraph src_analyzers["src/analyzers"]
    TypeScriptAnalyzer["<a href='https://github.com/samjhill/diagrammer/blob/main/src/analyzers/typescriptAnalyzer.js' target='_blank'>TypeScriptAnalyzer</a>"]
    RelationshipAnalyzer["<a href='https://github.com/samjhill/diagrammer/blob/main/src/analyzers/relationshipAnalyzer.js' target='_blank'>RelationshipAnalyzer</a>"]
    PythonAnalyzer["<a href='https://github.com/samjhill/diagrammer/blob/main/src/analyzers/pythonAnalyzer.js' target='_blank'>PythonAnalyzer</a>"]
    JavaScriptAnalyzer["<a href='https://github.com/samjhill/diagrammer/blob/main/src/analyzers/javascriptAnalyzer.js' target='_blank'>JavaScriptAnalyzer</a>"]
    CodeAnalyzer["<a href='https://github.com/samjhill/diagrammer/blob/main/src/analyzers/codeAnalyzer.js' target='_blank'>CodeAnalyzer</a>"]
    ArchitecturalAnalyzer["<a href='https://github.com/samjhill/diagrammer/blob/main/src/analyzers/architecturalAnalyzer.js' target='_blank'>ArchitecturalAnalyzer</a>"]
  end


```

## 📁 Source Code Links

| Component | Type | Language | File Path | Source Link |
|-----------|------|----------|-----------|-------------|
| ArchitecturalAnalyzer | Component | javascript | src/analyzers/architecturalAnalyzer.js | [View Source](https://github.com/samjhill/diagrammer/blob/main/src/analyzers/architecturalAnalyzer.js) |
| based | Component | javascript | src/generators/diagramGenerator.js | [View Source](https://github.com/samjhill/diagrammer/blob/main/src/generators/diagramGenerator.js) |
| calls | Component | javascript | src/generators/diagramGenerator.js | [View Source](https://github.com/samjhill/diagrammer/blob/main/src/generators/diagramGenerator.js) |
| CodeAnalyzer | Component | javascript | src/analyzers/codeAnalyzer.js | [View Source](https://github.com/samjhill/diagrammer/blob/main/src/analyzers/codeAnalyzer.js) |
| declarations | Component | javascript | src/analyzers/javascriptAnalyzer.js | [View Source](https://github.com/samjhill/diagrammer/blob/main/src/analyzers/javascriptAnalyzer.js) |
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