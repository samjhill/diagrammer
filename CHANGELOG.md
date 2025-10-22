# Changelog

All notable changes to this project will be documented in this file.

## [1.4.1] - 2025-10-22

### Added
- **PNG/SVG Export Functionality**: Generate high-quality PNG images and scalable SVG graphics
- **Organized File Structure**: Clean directory organization with logical folder separation
- **DiagramExporter Class**: Puppeteer-based export system with configurable quality settings
- **Comprehensive README**: Auto-generated index with navigation links to all diagrams
- **Export Configuration**: New `.diagrammer.yml` options for export formats and quality
- **Professional Structure**: Enterprise-ready documentation layout

### Enhanced
- **File Organization**: 
  - `diagrams/overview/` - Main architecture diagrams
  - `diagrams/focus/` - Layer and module focus diagrams  
  - `exports/png/` - PNG images for presentations
  - `exports/svg/` - SVG graphics for documentation
- **Export Quality**: High/medium/low quality settings with device scale factor
- **Custom Dimensions**: Configurable export size (default 1200x800)
- **Batch Processing**: Automatic export of all diagram types

### Technical
- Added Puppeteer dependency for headless Chrome rendering
- Implemented smart clipping with automatic padding
- Added error handling with detailed logging
- Created organized directory structure generation
- Enhanced README with clickable navigation links

## [1.4.0] - 2025-01-21

### 🧹 Major Release: Code Cleanup & Documentation Overhaul

This release focuses on code quality improvements, comprehensive documentation updates, and bug fixes while maintaining all existing functionality.

### ✨ New Features

#### 📚 Documentation Overhaul
- **Complete README Restructure**: Professional, comprehensive documentation with clear organization
- **Enhanced Quick Start Guide**: Step-by-step setup with better examples and troubleshooting
- **Comprehensive Feature Documentation**: Detailed descriptions of all 10 diagram types and visual features
- **Professional Examples**: Clean Mermaid diagram examples with proper syntax
- **Troubleshooting Section**: Comprehensive guide for common issues and solutions

#### 🎨 Visual Improvements
- **Mermaid Parse Fix**: Resolved multiple CSS class syntax issues for proper GitHub rendering
- **Enhanced Component Styling**: Improved semantic component classification and visual hierarchy
- **Better Relationship Visualization**: Cleaner arrow styles and relationship labeling

### 🔧 Code Quality Improvements

#### 🧹 Code Cleanup
- **Optimized Methods**: Streamlined component tooltip generation and relationship handling
- **Consolidated Mappings**: Combined relationship style and color mappings for better maintainability
- **Removed Unused Code**: Eliminated unused variables and imports
- **Linting Clean**: Resolved all ESLint errors (0 errors, 0 warnings)

#### 🏗️ Architecture Improvements
- **Better Code Organization**: Improved method structure and readability
- **Enhanced Maintainability**: Cleaner, more maintainable codebase
- **Performance Optimization**: Streamlined diagram generation process

### 🐛 Bug Fixes

#### 🔧 Critical Fixes
- **Mermaid Parse Error**: Fixed multiple CSS class syntax that prevented diagrams from rendering on GitHub
- **Relationship Rendering**: Resolved issues with relationship display in generated diagrams
- **Git Operations**: Improved Git configuration and safe directory handling

#### 🧪 Testing & Validation
- **All Tests Passing**: 10/10 diagram types generated successfully
- **Functionality Preserved**: All existing features maintained and validated
- **Quality Assurance**: Comprehensive testing of all improvements

### 📊 Technical Details

#### 🎯 Performance
- **Zero Linting Errors**: Clean ESLint output across entire codebase
- **Maintained Performance**: No degradation in diagram generation speed or quality
- **Optimized Dependencies**: Clean dependency management and configuration

#### 📈 Quality Metrics
- **Code Coverage**: All existing functionality preserved and tested
- **Documentation Coverage**: Comprehensive documentation for all features
- **User Experience**: Improved setup process and troubleshooting guidance

### 🚀 Migration Guide

#### For Existing Users
- **No Breaking Changes**: All existing configurations and workflows continue to work
- **Enhanced Documentation**: Refer to updated README for improved setup guidance
- **Better Troubleshooting**: Use new troubleshooting section for any issues

#### For New Users
- **Improved Onboarding**: Follow the enhanced quick start guide for easier setup
- **Better Examples**: Use the comprehensive examples in the documentation
- **Professional Results**: Generate enterprise-grade architecture diagrams

### 🔄 What's Next

This release establishes a solid foundation for future enhancements:
- **Enhanced Visualizations**: Continued improvements to diagram aesthetics and functionality
- **Additional Languages**: Support for more programming languages
- **Advanced Patterns**: More sophisticated architectural pattern detection
- **Integration Improvements**: Better GitHub Actions integration and workflow optimization

---

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
