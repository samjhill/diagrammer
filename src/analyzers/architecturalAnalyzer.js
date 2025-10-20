
class ArchitecturalAnalyzer {
  constructor() {
    this.frameworks = {
      // Frontend frameworks
      react: {
        patterns: [
          /import\s+React/i,
          /from\s+['"]react['"]/i,
          /useState|useEffect|useContext/i,
          /React\.Component/i,
          /\.jsx?$/i
        ],
        indicators: ['jsx', 'tsx', 'react', 'hooks'],
        layer: 'frontend'
      },
      vue: {
        patterns: [
          /import\s+.*\s+from\s+['"]vue['"]/i,
          /Vue\.component/i,
          /<template>/i,
          /\.vue$/i
        ],
        indicators: ['vue', 'template', 'script'],
        layer: 'frontend'
      },
      angular: {
        patterns: [
          /@Component/i,
          /@Injectable/i,
          /import.*@angular/i,
          /ngOnInit|ngOnDestroy/i
        ],
        indicators: ['angular', 'component', 'service'],
        layer: 'frontend'
      },
      // Backend frameworks
      express: {
        patterns: [
          /express/i,
          /app\.get|app\.post|app\.put|app\.delete/i,
          /router\.|Router\(\)/i,
          /middleware/i
        ],
        indicators: ['express', 'router', 'middleware', 'api'],
        layer: 'backend'
      },
      django: {
        patterns: [
          /from\s+django/i,
          /@csrf_exempt/i,
          /class\s+\w+View/i,
          /urls\.py/i
        ],
        indicators: ['django', 'view', 'model', 'url'],
        layer: 'backend'
      },
      flask: {
        patterns: [
          /from\s+flask/i,
          /@app\.route/i,
          /Flask\(/i,
          /render_template/i
        ],
        indicators: ['flask', 'route', 'template'],
        layer: 'backend'
      },
      // Database technologies
      mongodb: {
        patterns: [
          /mongoose/i,
          /mongodb/i,
          /\.find\(|\.save\(|\.update\(/i,
          /Schema\(/i
        ],
        indicators: ['mongo', 'schema', 'collection'],
        layer: 'data'
      },
      postgresql: {
        patterns: [
          /pg|postgres/i,
          /sequelize/i,
          /prisma/i,
          /\.query\(/i
        ],
        indicators: ['postgres', 'sql', 'query'],
        layer: 'data'
      }
    };

    this.architecturalPatterns = {
      mvc: {
        indicators: ['controller', 'model', 'view', 'service'],
        description: 'Model-View-Controller pattern'
      },
      microservices: {
        indicators: ['service', 'api', 'gateway', 'registry'],
        description: 'Microservices architecture'
      },
      eventDriven: {
        indicators: ['event', 'emit', 'listener', 'pubsub', 'message'],
        description: 'Event-driven architecture'
      },
      layered: {
        indicators: ['presentation', 'business', 'data', 'infrastructure'],
        description: 'Layered architecture'
      }
    };
  }

  analyzeComponent(component, content, filePath) {
    const analysis = {
      ...component,
      frameworks: this.detectFrameworks(content, filePath),
      architecturalLayer: this.detectArchitecturalLayer(filePath, content),
      patterns: this.detectPatterns(content, filePath),
      responsibilities: this.inferResponsibilities(component, content, filePath),
      relationships: this.analyzeRelationships(content, filePath)
    };

    return analysis;
  }

  detectFrameworks(content, filePath) {
    const detectedFrameworks = [];
    
    for (const [frameworkName, config] of Object.entries(this.frameworks)) {
      const matches = config.patterns.some(pattern => pattern.test(content));
      const pathMatches = config.indicators.some(indicator => 
        filePath.toLowerCase().includes(indicator)
      );
      
      if (matches || pathMatches) {
        detectedFrameworks.push({
          name: frameworkName,
          layer: config.layer,
          confidence: this.calculateConfidence(content, config)
        });
      }
    }

    return detectedFrameworks;
  }

  detectArchitecturalLayer(filePath, content) {
    const pathSegments = filePath.toLowerCase().split('/');
    
    // Frontend indicators
    if (pathSegments.some(segment => 
      ['components', 'pages', 'views', 'ui', 'frontend', 'client'].includes(segment)
    )) {
      return 'frontend';
    }
    
    // Backend indicators
    if (pathSegments.some(segment => 
      ['api', 'routes', 'controllers', 'services', 'backend', 'server'].includes(segment)
    )) {
      return 'backend';
    }
    
    // Data layer indicators
    if (pathSegments.some(segment => 
      ['models', 'schemas', 'database', 'db', 'data', 'entities'].includes(segment)
    )) {
      return 'data';
    }
    
    // Infrastructure indicators
    if (pathSegments.some(segment => 
      ['config', 'utils', 'helpers', 'middleware', 'infrastructure'].includes(segment)
    )) {
      return 'infrastructure';
    }
    
    // Try to infer from content
    if (content.includes('React') || content.includes('useState')) {
      return 'frontend';
    }
    
    if (content.includes('app.get') || content.includes('router.')) {
      return 'backend';
    }
    
    if (content.includes('Schema') || content.includes('Model')) {
      return 'data';
    }
    
    return 'unknown';
  }

  detectPatterns(content, filePath) {
    const detectedPatterns = [];
    
    for (const [patternName, config] of Object.entries(this.architecturalPatterns)) {
      const matches = config.indicators.some(indicator => 
        content.toLowerCase().includes(indicator) || 
        filePath.toLowerCase().includes(indicator)
      );
      
      if (matches) {
        detectedPatterns.push({
          name: patternName,
          description: config.description,
          confidence: this.calculatePatternConfidence(content, config)
        });
      }
    }
    
    return detectedPatterns;
  }

  inferResponsibilities(component, content) {
    const responsibilities = [];
    
    // UI responsibilities
    if (content.includes('render') || content.includes('return') && content.includes('<')) {
      responsibilities.push('ui-rendering');
    }
    
    // Data management
    if (content.includes('state') || content.includes('useState') || content.includes('setState')) {
      responsibilities.push('state-management');
    }
    
    // API communication
    if (content.includes('fetch') || content.includes('axios') || content.includes('api')) {
      responsibilities.push('api-communication');
    }
    
    // Business logic
    if (content.includes('calculate') || content.includes('process') || content.includes('validate')) {
      responsibilities.push('business-logic');
    }
    
    // Data persistence
    if (content.includes('save') || content.includes('create') || content.includes('update')) {
      responsibilities.push('data-persistence');
    }
    
    // Routing
    if (content.includes('route') || content.includes('navigate') || content.includes('router')) {
      responsibilities.push('routing');
    }
    
    return responsibilities;
  }

  analyzeRelationships(content) {
    const relationships = [];
    
    // API calls
    const apiCalls = this.extractApiCalls(content);
    relationships.push(...apiCalls);
    
    // Event emissions
    const events = this.extractEvents(content);
    relationships.push(...events);
    
    // Database operations
    const dbOps = this.extractDatabaseOperations(content);
    relationships.push(...dbOps);
    
    return relationships;
  }

  extractApiCalls(content) {
    const apiCalls = [];
    const patterns = [
      /fetch\(['"`]([^'"`]+)['"`]/g,
      /axios\.(get|post|put|delete)\(['"`]([^'"`]+)['"`]/g,
      /\.get\(['"`]([^'"`]+)['"`]/g,
      /\.post\(['"`]([^'"`]+)['"`]/g
    ];
    
    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        apiCalls.push({
          type: 'api-call',
          endpoint: match[1] || match[2],
          method: match[1] || 'GET',
          relationship: 'calls'
        });
      }
    });
    
    return apiCalls;
  }

  extractEvents(content) {
    const events = [];
    const patterns = [
      /emit\(['"`]([^'"`]+)['"`]/g,
      /dispatch\(['"`]([^'"`]+)['"`]/g,
      /publish\(['"`]([^'"`]+)['"`]/g
    ];
    
    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        events.push({
          type: 'event',
          eventName: match[1],
          relationship: 'emits'
        });
      }
    });
    
    return events;
  }

  extractDatabaseOperations(content) {
    const dbOps = [];
    const patterns = [
      /\.find\(/g,
      /\.save\(/g,
      /\.update\(/g,
      /\.delete\(/g,
      /\.create\(/g
    ];
    
    patterns.forEach(pattern => {
      if (pattern.test(content)) {
        dbOps.push({
          type: 'database-operation',
          operation: pattern.source.replace(/[\\().]/g, ''),
          relationship: 'persists'
        });
      }
    });
    
    return dbOps;
  }

  calculateConfidence(content, config) {
    let score = 0;
    const totalPatterns = config.patterns.length;
    
    config.patterns.forEach(pattern => {
      if (pattern.test(content)) {
        score += 1;
      }
    });
    
    return Math.round((score / totalPatterns) * 100);
  }

  calculatePatternConfidence(content, config) {
    let score = 0;
    const totalIndicators = config.indicators.length;
    
    config.indicators.forEach(indicator => {
      if (content.toLowerCase().includes(indicator)) {
        score += 1;
      }
    });
    
    return Math.round((score / totalIndicators) * 100);
  }
}

module.exports = { ArchitecturalAnalyzer };
