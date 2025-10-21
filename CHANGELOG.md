# Changelog

All notable changes to this project will be documented in this file.

## [1.3.0] - 2025-01-21

### 🎨 Major Release: Enhanced Visualization & Semantic Intelligence

This major release introduces professional-grade diagram visualization with semantic component classification, enhanced relationship detection, and comprehensive architectural insights.

### ✨ New Features

#### 🎨 Semantic Component Classification
- **8 Component Types**: Analyzer (🟢), Generator (🟠), Manager (🟣), Service (🔵), NPM (🔵), Framework (🟢), External (🔴)
- **Automatic Classification**: Components are automatically classified by name patterns and purpose
- **Professional Color Scheme**: Consistent, accessible color palette for enterprise documentation
- **Visual Hierarchy**: Clear distinction between different component types and their roles

#### 🔗 Enhanced Relationship Detection
- **Smart Relationship Inference**: Automatic detection of component interactions and dependencies
- **Labeled Connections**: Clear relationship labels (imports, calls, generates, uses, API, data)
- **Architectural Relationships**: Logical connections between related components
- **Dependency Classification**: Smart categorization of external dependencies (npm, framework, external)

#### 📊 Rich Metadata & Documentation
- **Architecture Statistics**: Component counts, language analysis, and pattern detection
- **Comprehensive Legends**: Detailed explanations of colors, symbols, and relationship types
- **Generation Timestamps**: When diagrams were created for version tracking
- **Interactive Documentation**: Professional legends with emojis and clear descriptions

#### 🏗️ Architectural Intelligence
- **Pattern Recognition**: Automatic detection of architectural patterns and structures
- **Component Analysis**: Intelligent analysis of component responsibilities and relationships
- **Dependency Intelligence**: Smart categorization and visualization of external dependencies
- **Contextual Insights**: Architectural metadata and statistical analysis

### 🎯 Visual Improvements
- **Professional Appearance**: Enterprise-grade diagram quality with comprehensive documentation
- **Better Layout**: Enhanced grouping and semantic organization
- **Improved Readability**: Clear legends, better colors, and descriptive labels
- **Contextual Information**: Statistics, timestamps, and architectural insights

### 🔧 Technical Enhancements
- **Enhanced Filtering**: Improved component filtering with semantic classification
- **Better Performance**: Optimized diagram generation with intelligent relationship detection
- **Improved Accuracy**: More accurate component classification and relationship mapping
- **Enhanced Maintainability**: Better code organization and extensibility

### 📈 Impact
- **Better Understanding**: Clear visual distinction between component types and their roles
- **Professional Quality**: Enterprise-grade visualization that matches documentation standards
- **Improved Usability**: Comprehensive legends and contextual information
- **Enhanced Value**: Rich architectural insights and pattern recognition

## [1.2.0] - 2025-01-20

### 🚀 Major Release: Architectural Intelligence & Enhanced Relationships

This major release introduces sophisticated architectural analysis capabilities that match enterprise-grade documentation quality, inspired by the [Mindcraft project's architecture documentation](https://github.com/samjhill/mindcraft/blob/develop/ARCHITECTURE.md).

### ✨ New Features

#### 🧠 Architectural Intelligence
- **Framework Detection**: Automatically detects React, Vue, Angular, Express, Django, Flask, and more
- **Layer Classification**: Identifies frontend, backend, data, and infrastructure layers
- **Pattern Recognition**: Recognizes MVC, microservices, event-driven, and layered patterns
- **Responsibility Inference**: Analyzes component responsibilities (UI rendering, API communication, data access)

#### 🔗 Enhanced Relationship Detection
- **API Call Analysis**: Detects API endpoints, HTTP methods, and service communication
- **Event Flow Analysis**: Identifies event emissions, subscriptions, and event-driven patterns
- **Data Flow Analysis**: Tracks data flow through props, state, and database operations
- **Service Communication**: Maps service-to-service method calls and dependencies

#### 📊 New Diagram Types (10 Total)
1. **Architecture Overview** - Enhanced with architectural intelligence
2. **Layered Architecture** - Components organized by architectural layers
3. **API Flow** - API relationship analysis with endpoints and methods
4. **Data Flow** - Data flow between components with state and props
5. **Event Flow** - Event emission and subscription relationships
6. **Service Communication** - Service-to-service method calls
7. **Dependency Graph** - Enhanced with labeled arrows and classification
8. **Module Structure** - Enhanced with language tags and exports
9. **MVC Pattern** - Model-View-Controller pattern recognition
10. **Microservices Pattern** - Microservices architecture detection

#### 🌐 Multi-Language Support
- **Python Support**: Full Python code analysis with class, function, and import detection
- **Enhanced JavaScript/TypeScript**: Improved parsing and relationship detection
- **Language Tagging**: All components and modules tagged with their language

#### 🎨 Rich Visualizations
- **Color-Coded Components**: Different colors for different architectural roles
- **Labeled Relationships**: Arrows with descriptive labels (`-->|imports|`, `-->|emits|`, `-->|data|`)
- **Professional Styling**: Enterprise-grade visual design with proper class definitions
- **Sophisticated Grouping**: Components grouped by architectural layers and patterns

### 🔧 Improvements

#### Code Quality
- **Comprehensive Testing**: 100+ test cases covering all new features
- **ESLint Compliance**: All code passes strict linting rules
- **Type Safety**: Enhanced TypeScript support and type checking
- **Error Handling**: Robust error handling and graceful degradation

#### Performance
- **Optimized Analysis**: Efficient parsing and relationship detection
- **Caching**: Smart caching for improved performance
- **Memory Management**: Optimized memory usage for large codebases

#### Documentation
- **Enhanced README**: Beautiful Mermaid examples and comprehensive feature list
- **API Documentation**: Detailed documentation for all new analyzers
- **Examples**: Rich examples showing all diagram types
- **Configuration Guide**: Complete configuration options documentation

### 🐛 Bug Fixes

- Fixed Mermaid syntax errors in diagram generation
- Resolved dependency version mismatches
- Fixed ESLint warnings and unused variable issues
- Corrected Python analyzer import detection logic
- Fixed relationship detection edge cases

### 📈 Technical Details

#### New Analyzers
- `ArchitecturalAnalyzer`: Framework detection, layer classification, pattern recognition
- `RelationshipAnalyzer`: API calls, event flows, data flows, service communication
- `PythonAnalyzer`: Complete Python code analysis support

#### Enhanced Generators
- `DiagramGenerator`: 10 sophisticated diagram types with rich styling
- Enhanced Mermaid generation with proper class definitions
- Sophisticated relationship visualization with labeled arrows

#### Configuration
- New `.diagrammer.yml` configuration options
- Enhanced language support configuration
- Improved filtering and analysis options

### 🎯 Impact

This release transforms Diagrammer from a basic diagram generator into a sophisticated architectural analysis tool that:

- **Matches Enterprise Quality**: Diagrams now rival professional architecture documentation
- **Provides Deep Insights**: Rich relationship analysis reveals system architecture
- **Supports Modern Development**: Multi-language support for diverse tech stacks
- **Enables Better Understanding**: Visual representations that actually help developers

### 🔄 Migration

No breaking changes - existing configurations continue to work. New features are opt-in through configuration.

### 📚 Resources

- [Enhanced README](README.md) with beautiful examples
- [Configuration Guide](.diagrammer.yml.example)
- [Contributing Guide](CONTRIBUTING.md)
- [Sample Project](tests/sample-project/) with comprehensive examples

---

## [1.1.2] - 2025-01-20

### 🐛 Bug Fixes
- Fixed Mermaid reserved keyword issue (`subgraph` class name)
- Resolved security vulnerabilities in dependencies
- Fixed ESLint configuration and warnings

## [1.1.1] - 2025-01-20

### 🐛 Bug Fixes
- Fixed Mermaid syntax errors in diagram generation
- Corrected classDef placement in subgraph blocks

## [1.1.0] - 2025-01-20

### ✨ New Features
- Enhanced diagram generation with distinct colors
- Labeled arrows for better relationship visualization
- Improved component grouping and organization

## [1.0.4] - 2025-01-20

### 🐛 Bug Fixes
- Fixed workflow validation errors
- Resolved act compatibility issues
- Improved error handling

## [1.0.0] - 2025-01-20

### 🎉 Initial Release
- Basic architecture diagram generation
- GitHub Actions integration
- Mermaid diagram support
- JavaScript and TypeScript analysis
