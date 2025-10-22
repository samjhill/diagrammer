# Diagrammer - Architecture Diagram Generator

A GitHub Actions integration that automatically generates, maintains, and updates software architecture diagrams from your code repositories. Inspired by the [Mindcraft project's architecture documentation](https://github.com/samjhill/mindcraft/blob/develop/ARCHITECTURE.md).

## 🎨 Example Diagrams

### Architecture Overview
```mermaid
graph TB
  classDef analyzer fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
  classDef generator fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  classDef manager fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
  classDef service fill:#e0f2f1,stroke:#00695c,stroke-width:2px
  classDef npm fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  classDef external fill:#ffebee,stroke:#c62828,stroke-width:2px
  classDef group fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px

  subgraph src["📁 src"]
    subgraph analyzers["📁 analyzers"]
      CodeAnalyzer["📦 CodeAnalyzer 🔥"]
      JavaScriptAnalyzer["📄 JavaScriptAnalyzer ⚡"]
      TypeScriptAnalyzer["📄 TypeScriptAnalyzer ⚡"]
      PythonAnalyzer["📄 PythonAnalyzer ⚡"]
    end
    
    subgraph generators["📁 generators"]
      DiagramGenerator["📦 DiagramGenerator 🔥"]
    end
    
    subgraph exporters["📁 exporters"]
      DiagramExporter["📄 DiagramExporter ⚡"]
    end
    
    subgraph utils["📁 utils"]
      GitManager["📄 GitManager ⚡"]
    end
  end

  subgraph external_deps["🌐 External Dependencies"]
    Puppeteer["📦 puppeteer"]
    Mermaid["📦 mermaid"]
    FsExtra["📦 fs-extra"]
  end

  CodeAnalyzer:::analyzer
  JavaScriptAnalyzer:::analyzer
  TypeScriptAnalyzer:::analyzer
  PythonAnalyzer:::analyzer
  DiagramGenerator:::generator
  DiagramExporter:::generator
  GitManager:::manager
  Puppeteer:::npm
  Mermaid:::npm
  FsExtra:::npm

  CodeAnalyzer -->|generates| DiagramGenerator
  DiagramGenerator -->|exports| DiagramExporter
  DiagramExporter -->|uses| Puppeteer
  DiagramGenerator -->|uses| Mermaid
  GitManager -->|manages| CodeAnalyzer
```

### Layered Architecture with Focus
```mermaid
graph TB
  classDef frontend fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  classDef backend fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
  classDef data fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  classDef infrastructure fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
  classDef group fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px

  subgraph frontend_layer["🎨 Frontend Layer"]
    ReactApp["📦 ReactApp 🔥"]
    Components["📄 Components ⚡"]
    Hooks["📄 Hooks ⚡"]
  end
  
  subgraph backend_layer["⚙️ Backend Layer"]
    ApiService["📦 ApiService 🔥"]
    Controllers["📄 Controllers ⚡"]
    Middleware["📄 Middleware ⚡"]
  end
  
  subgraph data_layer["💾 Data Layer"]
    Database["📦 Database 🔥"]
    Models["📄 Models ⚡"]
    Migrations["📄 Migrations ⚡"]
  end
  
  subgraph infrastructure_layer["🏗️ Infrastructure Layer"]
    Docker["📦 Docker 🔥"]
    CI["📄 CI/CD ⚡"]
    Monitoring["📄 Monitoring ⚡"]
  end

  ReactApp:::frontend
  Components:::frontend
  Hooks:::frontend
  ApiService:::backend
  Controllers:::backend
  Middleware:::backend
  Database:::data
  Models:::data
  Migrations:::data
  Docker:::infrastructure
  CI:::infrastructure
  Monitoring:::infrastructure

  ReactApp -->|API calls| ApiService
  ApiService -->|queries| Database
  Docker -->|deploys| ApiService
  CI -->|builds| ReactApp
```

### Module Focus: Analyzers
```mermaid
graph TB
  classDef analyzer fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
  classDef group fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px

  subgraph analyzers_module["🔍 Analyzers Module"]
    CodeAnalyzer["📦 CodeAnalyzer 🔥"]
    JavaScriptAnalyzer["📄 JavaScriptAnalyzer ⚡"]
    TypeScriptAnalyzer["📄 TypeScriptAnalyzer ⚡"]
    PythonAnalyzer["📄 PythonAnalyzer ⚡"]
    ArchitecturalAnalyzer["📄 ArchitecturalAnalyzer ⚡"]
    RelationshipAnalyzer["📄 RelationshipAnalyzer ⚡"]
  end

  CodeAnalyzer:::analyzer
  JavaScriptAnalyzer:::analyzer
  TypeScriptAnalyzer:::analyzer
  PythonAnalyzer:::analyzer
  ArchitecturalAnalyzer:::analyzer
  RelationshipAnalyzer:::analyzer

  CodeAnalyzer -->|orchestrates| JavaScriptAnalyzer
  CodeAnalyzer -->|orchestrates| TypeScriptAnalyzer
  CodeAnalyzer -->|orchestrates| PythonAnalyzer
  CodeAnalyzer -->|enhances| ArchitecturalAnalyzer
  CodeAnalyzer -->|enhances| RelationshipAnalyzer
```

## ✨ Features

### 🎨 **Rich Visualizations**
- **10+ Diagram Types**: Architecture, layered, API flow, data flow, event flow, focus diagrams, and more
- **Semantic Component Classification**: 8 distinct component types with purpose-specific colors
- **Smart Relationship Detection**: Automatic inference of component interactions and dependencies
- **Visual Indicators**: Emoji-based indicators for size, complexity, and dependencies (📦📄📝⚡🔥🔗)
- **PNG/SVG Export**: High-quality image generation for presentations and documentation

### 🧠 **Architectural Intelligence**
- **Framework Detection**: Automatic detection of React, Vue, Angular, Express, Django, Flask, etc.
- **Layer Classification**: Frontend, backend, data, infrastructure layer identification
- **Pattern Recognition**: MVC, microservices, event-driven, layered architecture patterns
- **Enhanced Relationships**: API calls, event flows, data flows, service communication
- **Focus Diagrams**: Per-layer and per-module detailed views

### 🎯 **Smart Analysis**
- **Multi-language Support**: JavaScript, TypeScript, and Python
- **Smart Filtering**: Automatically filters out test files, dependency layers, and internal details
- **Size Limits**: Configurable limits to prevent overly complex diagrams (max 30 nodes, 50 dependencies)
- **Rich Metadata**: Comprehensive statistics, legends, and architectural insights
- **Organized Output**: Clean directory structure with logical file organization

### ⚙️ **Configuration & Automation**
- **Zero Configuration**: Works out of the box with sensible defaults
- **Automatic Updates**: Diagrams update automatically on code changes
- **Configurable**: Customize analysis and output via `.diagrammer.yml`
- **Auto-commit**: Automatically commits generated diagrams to your repository
- **Export Settings**: Configurable PNG/SVG quality and dimensions

## 🆕 What's New in v1.4.1

**PNG/SVG Export & Organized File Structure:**
- 🎨 **PNG/SVG Export**: Generate high-quality images and scalable graphics for presentations
- 📁 **Organized Structure**: Clean directory organization with logical folder separation
- 🖼️ **Export Quality**: Configurable quality settings (high/medium/low) with custom dimensions
- 📊 **Professional Layout**: Enterprise-ready documentation structure with navigation
- 🔧 **DiagramExporter**: Puppeteer-based export system with smart clipping and padding

**Enhanced Organization:**
- **File Structure**: `diagrams/overview/`, `diagrams/focus/`, `exports/png/`, `exports/svg/`
- **Auto-Generated README**: Comprehensive index with clickable navigation links
- **Batch Processing**: Automatic export of all diagram types (26 PNG + 26 SVG files)
- **Export Configuration**: Quality, dimensions, and format settings in `.diagrammer.yml`
- **Professional Documentation**: Clean, navigable structure for enterprise use

## 🚀 Quick Start

### 1. Required Permissions Setup

**⚠️ Important**: Before using the diagrammer action, you must configure permissions in your workflow to allow it to commit generated diagrams back to your repository.

Add these permissions to your workflow file:

```yaml
permissions:
  contents: write      # Required to push generated diagrams
  pull-requests: write # Required for PR-based workflows
```

**Without these permissions, you'll get 403 errors when the action tries to commit diagrams.**

### 2. Add the Action to Your Repository

Create `.github/workflows/diagrammer.yml`:

```yaml
name: Generate Architecture Diagrams

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

permissions:
  contents: write
  pull-requests: write

jobs:
  generate-diagrams:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      with:
        token: ${{ secrets.GITHUB_TOKEN }}
        fetch-depth: 0
        
    - name: Generate Architecture Diagrams
      uses: samjhill/diagrammer@v1.4.1
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        output_path: 'docs/architecture'
        languages: 'javascript,typescript,python'
        auto_commit: 'true'
```

### 3. Auto-Commit Configuration

The `auto_commit` input controls whether generated diagrams are automatically committed to your repository:

- `auto_commit: 'true'` (default): Automatically commits generated diagrams
- `auto_commit: 'false'`: Only generates diagrams without committing

**Required Permissions for Auto-Commit:**
- `contents: write` - Allows the action to push commits
- `pull-requests: write` - Required for PR-based workflows

## 📊 Generated Diagrams

The action generates 10 different types of architecture diagrams:

1. **Architecture Overview** - Main system architecture with component relationships
2. **Dependency Graph** - External and internal dependencies
3. **Module Structure** - Code organization and module hierarchy
4. **Layered Architecture** - Architectural layers and their interactions
5. **MVC Pattern** - Model-View-Controller pattern visualization
6. **Microservices Pattern** - Microservice architecture and communication
7. **API Flow** - API endpoints and data flow
8. **Data Flow** - Data movement and transformations
9. **Event Flow** - Event-driven architecture patterns
10. **Service Communication** - Inter-service communication patterns

## ⚙️ Configuration

Create a `.diagrammer.yml` file in your repository root to customize the analysis:

```yaml
analysis:
  includeTests: false        # Exclude test files from analysis
  maxDepth: 3               # Maximum directory depth to analyze
  languages:                # Supported languages
    - javascript
    - typescript
    - python

diagram:
  maxNodesPerDiagram: 30    # Maximum components per diagram
  maxDependenciesPerDiagram: 50  # Maximum dependencies per diagram
  excludeInternalMethods: true   # Exclude internal implementation details
  
  # Export settings
  exports:
    enabled: true               # Enable PNG/SVG export generation
    formats:                   # Export formats to generate
      - "png"                  # PNG images for presentations
      - "svg"                  # SVG for scalable graphics
    quality: "high"            # Export quality: low, medium, high
    size:                      # Export dimensions
      width: 1200              # Image width in pixels
      height: 800              # Image height in pixels
```

## 🎨 Visual Features

### Component Types & Colors
- **🔍 Analyzer** (Green) - Code analysis components
- **🎨 Generator** (Orange) - Diagram generation components  
- **⚙️ Manager** (Purple) - Resource management components
- **🔧 Service** (Teal) - Business logic and services
- **📦 NPM** (Blue) - Node.js packages
- **🌐 Framework** (Green) - Framework dependencies
- **🔗 External** (Red) - External services and APIs

### Visual Indicators
- **📦** Large components (>100 lines)
- **📄** Medium components (50-100 lines)
- **📝** Small components (<50 lines)
- **⚡** High complexity components
- **🔥** Medium complexity components
- **🔗** High dependency components

### Relationship Types
- **imports** - Module imports and dependencies
- **calls** - Function/method calls
- **generates** - Component generates output
- **uses** - Component utilizes another component
- **API** - API calls and communication
- **data** - Data flow between components

## 🔧 Troubleshooting

### Auto-Commit Issues

**Problem**: Diagrams are generated but not committed to the repository.

**Solutions**:
1. **Use Latest Version**: Ensure you're using `samjhill/diagrammer@v1.3.0` or later
2. **Check Permissions**: Verify `contents: write` permission is set
3. **Verify Checkout**: Ensure `fetch-depth: 0` is set in checkout step
4. **Disable Auto-Commit**: Set `auto_commit: 'false'` and commit manually

### Manual Commit Alternative

If auto-commit isn't working, you can commit the generated diagrams manually:

```yaml
- name: Generate Architecture Diagrams
  uses: samjhill/diagrammer@v1.3.0
  with:
    auto_commit: 'false'
    
- name: Commit Generated Diagrams
  run: |
    git config user.name "github-actions[bot]"
    git config user.email "github-actions[bot]@users.noreply.github.com"
    git add docs/architecture/
    git commit -m "docs: update architecture diagrams [skip ci]" || exit 0
    git push
```

### Common Permission Errors

**Error**: `Resource not accessible by integration`
- **Solution**: Add `contents: write` permission to your workflow

**Error**: `Permission denied`
- **Solution**: Ensure `GITHUB_TOKEN` is properly configured

**Error**: `Not in a git repository`
- **Solution**: Add `fetch-depth: 0` to the checkout step

## 📊 Generated Output Structure

The action generates a comprehensive set of files organized in a clean directory structure:

```
docs/architecture/
├── README.md                    # 📋 Auto-generated index with navigation
├── diagrams/                    # 📊 All Mermaid diagrams
│   ├── overview/               # 🏗️ Main architecture diagrams
│   │   ├── architecture.md
│   │   ├── dependencies.md
│   │   ├── modules.md
│   │   └── ...
│   ├── focus/                  # 🔍 Focus diagrams
│   │   ├── layerFocus_*.md
│   │   └── moduleFocus_*.md
│   └── interactive/            # 🖱️ Interactive versions
└── exports/                    # 📤 Export files
    ├── png/                   # 🖼️ PNG images (26 files)
    └── svg/                   # 🎨 SVG graphics (26 files)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the [Mindcraft project's architecture documentation](https://github.com/samjhill/mindcraft/blob/develop/ARCHITECTURE.md)
- Built with [Mermaid](https://mermaid-js.github.io/) for diagram generation
- Powered by GitHub Actions for seamless integration

---

*Generated by [Diagrammer GitHub Action](https://github.com/samjhill/diagrammer)*