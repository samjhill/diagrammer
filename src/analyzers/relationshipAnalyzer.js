const fs = require('fs-extra');

class RelationshipAnalyzer {
  constructor() {
    this.relationshipTypes = {
      apiCall: {
        patterns: [
          // Fetch API
          /fetch\(['"`]([^'"`]+)['"`]/g,
          /fetch\(['"`]([^'"`]+)['"`]\s*,\s*{\s*method:\s*['"`]([^'"`]+)['"`]/g,
          
          // Axios
          /axios\.(get|post|put|delete|patch)\(['"`]([^'"`]+)['"`]/g,
          /axios\({\s*method:\s*['"`]([^'"`]+)['"`]\s*,\s*url:\s*['"`]([^'"`]+)['"`]/g,
          
          // Express routes
          /\.(get|post|put|delete|patch)\(['"`]([^'"`]+)['"`]/g,
          /router\.(get|post|put|delete|patch)\(['"`]([^'"`]+)['"`]/g,
          
          // HTTP libraries
          /request\(['"`]([^'"`]+)['"`]/g,
          /http\.(get|post|put|delete)\(['"`]([^'"`]+)['"`]/g,
          
          // Django URLs
          /path\(['"`]([^'"`]+)['"`]/g,
          /url\(['"`]([^'"`]+)['"`]/g,
          
          // Flask routes
          /@app\.route\(['"`]([^'"`]+)['"`]/g,
          /@bp\.route\(['"`]([^'"`]+)['"`]/g
        ],
        type: 'api-call'
      },
      
      eventEmission: {
        patterns: [
          // JavaScript events
          /emit\(['"`]([^'"`]+)['"`]/g,
          /dispatch\(['"`]([^'"`]+)['"`]/g,
          /publish\(['"`]([^'"`]+)['"`]/g,
          /trigger\(['"`]([^'"`]+)['"`]/g,
          
          // React events
          /onClick|onChange|onSubmit|onLoad/g,
          
          // Node.js events
          /\.emit\(['"`]([^'"`]+)['"`]/g,
          /EventEmitter\.prototype\.emit/g,
          
          // Custom events
          /CustomEvent\(['"`]([^'"`]+)['"`]/g,
          /new Event\(['"`]([^'"`]+)['"`]/g
        ],
        type: 'event-emission'
      },
      
      eventSubscription: {
        patterns: [
          // Event listeners
          /addEventListener\(['"`]([^'"`]+)['"`]/g,
          /on\(['"`]([^'"`]+)['"`]/g,
          /listen\(['"`]([^'"`]+)['"`]/g,
          /subscribe\(['"`]([^'"`]+)['"`]/g,
          
          // React hooks
          /useEffect.*\[.*\]/g,
          /useCallback/g,
          /useMemo/g,
          
          // Node.js events
          /\.on\(['"`]([^'"`]+)['"`]/g,
          /EventEmitter\.prototype\.on/g
        ],
        type: 'event-subscription'
      },
      
      dataFlow: {
        patterns: [
          // Props passing
          /props\.(\w+)/g,
          /\.(\w+)\s*=\s*props/g,
          
          // State updates
          /setState\(/g,
          /useState\(/g,
          /set\w+\(/g,
          
          // Data transformation
          /\.map\(/g,
          /\.filter\(/g,
          /\.reduce\(/g,
          /\.transform\(/g,
          
          // Database operations
          /\.find\(/g,
          /\.save\(/g,
          /\.update\(/g,
          /\.create\(/g,
          /\.delete\(/g,
          /\.query\(/g
        ],
        type: 'data-flow'
      },
      
      serviceCommunication: {
        patterns: [
          // Service calls
          /\.service\.(\w+)/g,
          /Service\.(\w+)/g,
          /(\w+)Service\.(\w+)/g,
          
          // Dependency injection
          /@Inject/g,
          /@Injectable/g,
          /inject\(/g,
          
          // Method calls
          /\.(\w+)\(/g,
          /this\.(\w+)\(/g,
          
          // Import/require patterns
          /import.*from\s+['"`]\.\/(\w+)['"`]/g,
          /require\(['"`]\.\/(\w+)['"`]/g
        ],
        type: 'service-communication'
      },
      
      databaseOperation: {
        patterns: [
          // SQL queries
          /SELECT.*FROM\s+(\w+)/gi,
          /INSERT\s+INTO\s+(\w+)/gi,
          /UPDATE\s+(\w+)/gi,
          /DELETE\s+FROM\s+(\w+)/gi,
          
          // ORM operations
          /\.find\(/g,
          /\.findOne\(/g,
          /\.findAll\(/g,
          /\.create\(/g,
          /\.update\(/g,
          /\.destroy\(/g,
          /\.save\(/g,
          
          // Database models
          /Model\.(\w+)/g,
          /\.model\(['"`]([^'"`]+)['"`]/g,
          /sequelize\.define\(/g,
          /mongoose\.model\(/g
        ],
        type: 'database-operation'
      }
    };
  }

  async analyzeRelationships(components, fileContents) {
    const relationships = [];
    
    for (const component of components) {
      const content = fileContents[component.path] || '';
      if (!content) continue;
      
      // Analyze each relationship type
      for (const [typeName, config] of Object.entries(this.relationshipTypes)) {
        const detectedRelationships = this.detectRelationshipsOfType(
          component, 
          content, 
          typeName, 
          config
        );
        relationships.push(...detectedRelationships);
      }
    }
    
    return this.deduplicateRelationships(relationships);
  }

  detectRelationshipsOfType(component, content, typeName, config) {
    const relationships = [];
    
    config.patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const relationship = this.createRelationship(
          component, 
          match, 
          typeName, 
          config.type
        );
        if (relationship) {
          relationships.push(relationship);
        }
      }
    });
    
    return relationships;
  }

  createRelationship(component, match, typeName, relationshipType) {
    const baseRelationship = {
      from: component.name,
      fromPath: component.path,
      type: relationshipType,
      confidence: this.calculateConfidence(match, typeName)
    };

    switch (typeName) {
      case 'apiCall':
        return {
          ...baseRelationship,
          to: this.extractApiTarget(match),
          endpoint: match[1] || match[2] || match[3],
          method: this.extractHttpMethod(match),
          description: `API call to ${match[1] || match[2] || match[3]}`
        };

      case 'eventEmission':
        return {
          ...baseRelationship,
          to: 'event-system',
          eventName: match[1] || 'user-interaction',
          description: `Emits ${match[1] || 'event'}`
        };

      case 'eventSubscription':
        return {
          ...baseRelationship,
          to: 'event-system',
          eventName: match[1] || 'user-interaction',
          description: `Listens for ${match[1] || 'event'}`
        };

      case 'dataFlow':
        return {
          ...baseRelationship,
          to: this.extractDataTarget(match),
          dataType: this.extractDataType(match),
          description: `Data flow: ${this.extractDataDescription(match)}`
        };

      case 'serviceCommunication':
        return {
          ...baseRelationship,
          to: this.extractServiceTarget(match),
          serviceMethod: match[1] || match[2],
          description: `Calls ${match[1] || match[2]} service`
        };

      case 'databaseOperation':
        return {
          ...baseRelationship,
          to: this.extractDatabaseTarget(match),
          operation: this.extractDatabaseOperation(match),
          table: match[1],
          description: `Database operation on ${match[1] || 'table'}`
        };

      default:
        return null;
    }
  }

  extractApiTarget(match) {
    const endpoint = match[1] || match[2] || match[3];
    if (!endpoint) return 'external-api';
    
    // Extract service name from endpoint
    const pathParts = endpoint.split('/');
    return pathParts[1] || 'api';
  }

  extractHttpMethod(match) {
    // Look for HTTP method in the match
    const methodMatch = match[0].match(/(get|post|put|delete|patch)/i);
    return methodMatch ? methodMatch[1].toUpperCase() : 'GET';
  }

  extractDataTarget(match) {
    // Extract target from data flow patterns
    if (match[1]) return match[1];
    if (match[0].includes('props')) return 'parent-component';
    if (match[0].includes('state')) return 'state-manager';
    return 'data-store';
  }

  extractDataType(match) {
    if (match[0].includes('props')) return 'props';
    if (match[0].includes('state')) return 'state';
    if (match[0].includes('map')) return 'array';
    if (match[0].includes('filter')) return 'array';
    return 'data';
  }

  extractDataDescription(match) {
    if (match[0].includes('props')) return 'props passing';
    if (match[0].includes('state')) return 'state update';
    if (match[0].includes('map')) return 'array transformation';
    if (match[0].includes('filter')) return 'array filtering';
    return 'data processing';
  }

  extractServiceTarget(match) {
    if (match[1]) return `${match[1]}-service`;
    if (match[2]) return `${match[2]}-service`;
    return 'service';
  }

  extractDatabaseTarget(match) {
    if (match[1]) return `${match[1]}-table`;
    return 'database';
  }

  extractDatabaseOperation(match) {
    const operation = match[0].toLowerCase();
    if (operation.includes('select')) return 'SELECT';
    if (operation.includes('insert')) return 'INSERT';
    if (operation.includes('update')) return 'UPDATE';
    if (operation.includes('delete')) return 'DELETE';
    if (operation.includes('find')) return 'FIND';
    if (operation.includes('create')) return 'CREATE';
    if (operation.includes('save')) return 'SAVE';
    return 'QUERY';
  }

  calculateConfidence(match, typeName) {
    // Base confidence on match quality and pattern specificity
    let confidence = 50;
    
    // Higher confidence for more specific patterns
    if (match[1] && match[1].length > 0) confidence += 20;
    if (match[2] && match[2].length > 0) confidence += 10;
    
    // Higher confidence for certain relationship types
    if (typeName === 'apiCall') confidence += 15;
    if (typeName === 'databaseOperation') confidence += 10;
    
    return Math.min(confidence, 100);
  }

  deduplicateRelationships(relationships) {
    const seen = new Set();
    return relationships.filter(rel => {
      const key = `${rel.from}-${rel.to}-${rel.type}-${rel.endpoint || rel.eventName || rel.serviceMethod}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  async loadFileContents(filePaths) {
    const contents = {};
    
    for (const filePath of filePaths) {
      try {
        const content = await fs.readFile(filePath, 'utf8');
        contents[filePath] = content;
      } catch (error) {
        console.warn(`Could not read file ${filePath}:`, error.message);
      }
    }
    
    return contents;
  }

  categorizeRelationships(relationships) {
    const categories = {
      api: relationships.filter(r => r.type === 'api-call'),
      events: relationships.filter(r => r.type === 'event-emission' || r.type === 'event-subscription'),
      data: relationships.filter(r => r.type === 'data-flow'),
      services: relationships.filter(r => r.type === 'service-communication'),
      database: relationships.filter(r => r.type === 'database-operation')
    };
    
    return categories;
  }
}

module.exports = { RelationshipAnalyzer };
