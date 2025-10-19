const { DiagramGenerator } = require('../src/generators/diagramGenerator');

describe('Diagram Generator', () => {
  test('should initialize with config', () => {
    const config = {
      diagram: {
        theme: 'default',
        direction: 'TB'
      }
    };
    const generator = new DiagramGenerator(config);
    expect(generator).toBeDefined();
    expect(generator.config).toEqual(config);
  });

  test('should generate architecture diagram', async () => {
    const config = {
      diagram: {
        theme: 'default',
        direction: 'TB'
      }
    };
    const generator = new DiagramGenerator(config);
    
    const mockAnalysis = {
      components: [
        { name: 'App', path: 'src/App.ts', kind: 'ClassDeclaration' },
        { name: 'UserService', path: 'src/services/UserService.ts', kind: 'ClassDeclaration' }
      ],
      dependencies: [
        { name: 'App', from: 'react', path: 'src/App.ts' }
      ],
      modules: [
        { name: 'App', path: 'src/App.ts' },
        { name: 'UserService', path: 'src/services/UserService.ts' }
      ]
    };
    
    const diagrams = await generator.generateDiagrams(mockAnalysis);
    
    expect(diagrams).toBeDefined();
    expect(diagrams.architecture).toBeDefined();
    expect(diagrams.dependencies).toBeDefined();
    expect(diagrams.modules).toBeDefined();
    
    // Check that diagrams contain Mermaid syntax
    expect(diagrams.architecture).toContain('graph TD');
    expect(diagrams.dependencies).toContain('graph LR');
    expect(diagrams.modules).toContain('graph TB');
  });

  test('should handle empty analysis', async () => {
    const config = {
      diagram: {
        theme: 'default',
        direction: 'TB'
      }
    };
    const generator = new DiagramGenerator(config);
    
    const emptyAnalysis = {
      components: [],
      dependencies: [],
      modules: []
    };
    
    const diagrams = await generator.generateDiagrams(emptyAnalysis);
    
    expect(diagrams).toBeDefined();
    expect(diagrams.architecture).toBeDefined();
    expect(diagrams.dependencies).toBeDefined();
    expect(diagrams.modules).toBeDefined();
  });
});
