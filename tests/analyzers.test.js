const { TypeScriptAnalyzer } = require('../src/analyzers/typescriptAnalyzer');
const { JavaScriptAnalyzer } = require('../src/analyzers/javascriptAnalyzer');

describe('Code Analyzers', () => {
  describe('TypeScriptAnalyzer', () => {
    test('should initialize with config', () => {
      const config = { analysis: { maxDepth: 5 } };
      const analyzer = new TypeScriptAnalyzer(config);
      expect(analyzer).toBeDefined();
      expect(analyzer.config).toEqual(config);
    });

    test('should analyze TypeScript files', async () => {
      const config = { analysis: { maxDepth: 5 } };
      const analyzer = new TypeScriptAnalyzer(config);
      
      // Mock the file system operations
      const mockFiles = [];
      jest.spyOn(analyzer, 'findTypeScriptFiles').mockResolvedValue(mockFiles);
      
      const analysis = await analyzer.analyze();
      expect(analysis).toBeDefined();
      expect(analysis.components).toBeDefined();
      expect(analysis.dependencies).toBeDefined();
      expect(analysis.modules).toBeDefined();
    });
  });

  describe('JavaScriptAnalyzer', () => {
    test('should initialize with config', () => {
      const config = { analysis: { maxDepth: 5 } };
      const analyzer = new JavaScriptAnalyzer(config);
      expect(analyzer).toBeDefined();
      expect(analyzer.config).toEqual(config);
    });

    test('should analyze JavaScript files', async () => {
      const config = { analysis: { maxDepth: 5 } };
      const analyzer = new JavaScriptAnalyzer(config);
      
      // Mock the file system operations
      const mockFiles = [];
      jest.spyOn(analyzer, 'findJavaScriptFiles').mockResolvedValue(mockFiles);
      
      const analysis = await analyzer.analyze();
      expect(analysis).toBeDefined();
      expect(analysis.components).toBeDefined();
      expect(analysis.dependencies).toBeDefined();
      expect(analysis.modules).toBeDefined();
    });
  });
});
