# Contributing to Diagrammer

We welcome contributions to Diagrammer! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Git
- Docker (for testing the action)

### Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/diagrammer.git
   cd diagrammer
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run tests:
   ```bash
   npm test
   ```

5. Test the action locally:
   ```bash
   node test.js
   ```

## Making Changes

### Code Style

- Use ES6+ features
- Follow existing code patterns
- Add comments for complex logic
- Ensure all functions have proper error handling

### Testing

Before submitting a pull request:

1. Run the test suite: `npm test`
2. Test with sample projects: `node test.js`
3. Verify the Docker build works: `docker build -t diagrammer .`

### Pull Request Process

1. Create a feature branch from `main`
2. Make your changes with clear commit messages
3. Add tests for new functionality
4. Update documentation if needed
5. Submit a pull request with a clear description

## Areas for Contribution

### High Priority

- **Language Support**: Add analyzers for Python, Java, Go, C#, etc.
- **Framework Detection**: Improve recognition of React, Vue, Angular, etc.
- **Diagram Types**: Add new diagram types (sequence, class, etc.)
- **Performance**: Optimize analysis for large codebases

### Medium Priority

- **Configuration**: Add more customization options
- **Export Formats**: Support for PNG, SVG, PDF exports
- **Integration**: IDE plugins, VS Code extensions
- **Documentation**: Improve examples and guides

### Low Priority

- **UI Improvements**: Better diagram layouts and styling
- **Advanced Features**: AI-powered insights, pattern recognition
- **Enterprise Features**: Multi-repo support, advanced security

## Reporting Issues

When reporting issues, please include:

1. **Description**: Clear description of the problem
2. **Steps to Reproduce**: Detailed steps to reproduce the issue
3. **Expected Behavior**: What you expected to happen
4. **Actual Behavior**: What actually happened
5. **Environment**: Node.js version, operating system, etc.
6. **Sample Code**: Minimal code example that reproduces the issue

## Feature Requests

For feature requests, please:

1. Check existing issues first
2. Provide a clear use case
3. Explain the expected benefits
4. Consider implementation complexity

## Code of Conduct

Please follow our Code of Conduct:

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Maintain a positive environment

## Questions?

Feel free to:
- Open an issue for questions
- Join our discussions
- Reach out to maintainers

Thank you for contributing to Diagrammer! 🎉
