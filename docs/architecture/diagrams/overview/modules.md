# Module Structure

This diagram was automatically generated from your codebase.

## 📊 Architecture Overview

- **Components**: 20 analyzed
- **Languages**: javascript
- **Architectural Patterns**: None detected
- **External Dependencies**: 15 packages
- **Generated**: 10/22/2025

## 🧠 Architectural Insights

- 🔍 **High Analysis Complexity**: Multiple analyzers detected - consider consolidating analysis logic
- 🌐 **High External Dependencies**: Consider reducing external dependencies for better maintainability
- 🔄 **Circular Dependencies**: Found circular dependencies - consider refactoring
- ⚡ **Complex Components**: 1 components with high complexity - consider refactoring





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
    main["main"]
  end

  subgraph src_utils["src/utils"]
    GitManager["GitManager"]
  end

  subgraph src_generators["src/generators"]
    DiagramGenerator["DiagramGenerator"]
  end

  subgraph src_exporters["src/exporters"]
    DiagramExporter["DiagramExporter"]
  end

  subgraph src_analyzers["src/analyzers"]
    TypeScriptAnalyzer["TypeScriptAnalyzer"]
    RelationshipAnalyzer["RelationshipAnalyzer"]
    PythonAnalyzer["PythonAnalyzer"]
    JavaScriptAnalyzer["JavaScriptAnalyzer"]
    CodeAnalyzer["CodeAnalyzer"]
    ArchitecturalAnalyzer["ArchitecturalAnalyzer"]
  end


```

## 🎨 Legend

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


## Summary Tables

### Component Summary

| Component | Type | Language | Path | Dependencies |
|-----------|------|----------|------|-------------|
| main | Component | javascript | N/A | 0 |
| generateArchitectureReadme | Component | javascript | N/A | 0 |
| languages | Component | javascript | N/A | 0 |
| loadConfig | Component | javascript | N/A | 0 |
| ArchitecturalAnalyzer | Component | javascript | N/A | 0 |
| based | Component | javascript | N/A | 0 |
| calls | Component | javascript | N/A | 0 |
| CodeAnalyzer | Component | javascript | N/A | 0 |
| declarations | Component | javascript | N/A | 0 |
| DiagramExporter | Component | javascript | N/A | 0 |
| DiagramGenerator | Component | javascript | N/A | 0 |
| for | Component | javascript | N/A | 0 |
| GitManager | Component | javascript | N/A | 0 |
| JavaScriptAnalyzer | Component | javascript | N/A | 0 |
| percentage | Component | javascript | N/A | 0 |
| PythonAnalyzer | Component | javascript | N/A | 0 |
| RelationshipAnalyzer | Component | javascript | N/A | 0 |
| rev | Component | javascript | N/A | 0 |
| TypeScriptAnalyzer | Component | javascript | N/A | 0 |
| visit | Component | javascript | N/A | 0 |

### Dependency Summary

| From | To | Type | Relationship |
|------|---|------|-------------|
| @actions/core | core | depends | dependency |
| @actions/github | github | depends | dependency |
| fs | fs | depends | dependency |
| fs-extra | fs | depends | dependency |
| fs-extra | fs | depends | dependency |
| fs-extra | fs | depends | dependency |
| fs-extra | fs | depends | dependency |
| fs-extra | fs | depends | dependency |
| fs-extra | fs | depends | dependency |
| path | path | depends | dependency |
| path | path | depends | dependency |
| path | path | depends | dependency |
| path | path | depends | dependency |
| puppeteer | puppeteer | depends | dependency |
| typescript | ts | depends | dependency |

### Architectural Patterns

| Pattern | Count | Components |
|---------|-------|------------|

### Language Distribution

| Language | Components | Percentage |
|----------|------------|------------|
| javascript | 20 | 100.0% |



---
*Generated by [Diagrammer GitHub Action](https://github.com/samjhill/diagrammer)*
