# Dependency Graph

This diagram was automatically generated from your codebase.

## 📊 Architecture Overview

- **Components**: 27 analyzed
- **Languages**: javascript, python
- **Architectural Patterns**: MICROSERVICES
- **External Dependencies**: 15 packages
- **Generated**: 10/22/2025

## 🧠 Architectural Insights

- 🔍 **High Analysis Complexity**: Multiple analyzers detected - consider consolidating analysis logic
- 🌐 **High External Dependencies**: Consider reducing external dependencies for better maintainability
- 🔄 **Circular Dependencies**: Found circular dependencies - consider refactoring
- ⚡ **Complex Components**: 1 components with high complexity - consider refactoring





```mermaid
graph LR
  classDef internal fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
  classDef external fill:#ffebee,stroke:#c62828,stroke-width:2px
  classDef npm fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  classDef local fill:#e3f2fd,stroke:#1976d2,stroke-width:2px

  _actions_core["@actions/core"]
  _actions_core:::external
  _actions_github["@actions/github"]
  _actions_github:::external
  fs_extra["fs-extra"]
  fs_extra:::external
  path["path"]
  path:::external
  fs["fs"]
  fs:::external
  puppeteer["puppeteer"]
  puppeteer:::external
  typescript["typescript"]
  typescript:::external
  List["List"]
  List:::internal
  Optional["Optional"]
  Optional:::internal
  json["json"]
  json:::internal
  datetime["datetime"]
  datetime:::internal
  _actions_core -->|imports| core
  _actions_github -->|imports| github
  fs_extra -->|imports| fs
  typescript -->|imports| ts

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
| __init__ | Function | python | N/A | 0 |
| create_user | Function | python | N/A | 0 |
| export_users | Function | python | N/A | 0 |
| get_user | Function | python | N/A | 0 |
| list_users | Function | python | N/A | 0 |
| UserService | Class | python | N/A | 0 |
| validate_email | Function | python | N/A | 0 |
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
| microservices | 7 | [object Object], [object Object], [object Object]... |

### Language Distribution

| Language | Components | Percentage |
|----------|------------|------------|
| javascript | 20 | 74.1% |
| python | 7 | 25.9% |



---
*Generated by [Diagrammer GitHub Action](https://github.com/samjhill/diagrammer)*
