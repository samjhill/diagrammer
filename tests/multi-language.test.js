const { CodeAnalyzer } = require('../src/analyzers/codeAnalyzer');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');

describe('Multi-Language Support', () => {
  let analyzer;
  let tempDir;

  beforeEach(() => {
    analyzer = new CodeAnalyzer({});
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'multi-lang-test-'));
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.removeSync(tempDir);
    }
  });

  describe('Python + JavaScript + TypeScript', () => {
    test('should analyze mixed language codebase', async () => {
      // Create test files in different languages
      const jsFile = path.join(tempDir, 'utils.js');
      const tsFile = path.join(tempDir, 'types.ts');
      const pyFile = path.join(tempDir, 'models.py');
      
      // JavaScript file
      await fs.writeFile(jsFile, `
const fs = require('fs');

function readFile(filename) {
  return fs.readFileSync(filename, 'utf8');
}

module.exports = { readFile };
      `);
      
      // TypeScript file
      await fs.writeFile(tsFile, `
interface User {
  id: number;
  name: string;
}

class UserService {
  private users: User[] = [];
  
  addUser(user: User): void {
    this.users.push(user);
  }
}

export { User, UserService };
      `);
      
      // Python file
      await fs.writeFile(pyFile, `
from typing import List, Optional
import json

class User:
    def __init__(self, user_id: int, name: str):
        self.id = user_id
        self.name = name
    
    def to_dict(self) -> dict:
        return {'id': self.id, 'name': self.name}

def process_users(users: List[User]) -> str:
    return json.dumps([user.to_dict() for user in users])
      `);
      
      // Change to temp directory for analysis
      const originalCwd = process.cwd();
      process.chdir(tempDir);
      
      try {
        const analysis = await analyzer.analyzeCodebase(['javascript', 'typescript', 'python']);
        
        // Should find components from all languages
        expect(analysis.components.length).toBeGreaterThan(0);
        
        // JavaScript components
        expect(analysis.components.some(c => c.name === 'readFile' && c.language === 'javascript')).toBe(true);
        
        // TypeScript components
        expect(analysis.components.some(c => c.name === 'UserService' && c.language === 'typescript')).toBe(true);
        
        // Python components
        expect(analysis.components.some(c => c.name === 'User' && c.language === 'python')).toBe(true);
        expect(analysis.components.some(c => c.name === 'process_users' && c.language === 'python')).toBe(true);
        
        // Should find dependencies from all languages
        expect(analysis.dependencies.length).toBeGreaterThan(0);
        expect(analysis.dependencies.some(d => d.name === 'fs')).toBe(true);
        expect(analysis.dependencies.some(d => d.name === 'json')).toBe(true);
        
        // Should find modules from all languages
        expect(analysis.modules.length).toBeGreaterThanOrEqual(3);
        expect(analysis.modules.some(m => m.language === 'javascript')).toBe(true);
        expect(analysis.modules.some(m => m.language === 'typescript')).toBe(true);
        expect(analysis.modules.some(m => m.language === 'python')).toBe(true);
        
      } finally {
        process.chdir(originalCwd);
      }
    });
  });

  describe('Language-specific analysis', () => {
    test('should only analyze specified languages', async () => {
      // Create files in multiple languages
      const jsFile = path.join(tempDir, 'app.js');
      const pyFile = path.join(tempDir, 'script.py');
      
      await fs.writeFile(jsFile, `
function hello() {
  console.log('Hello from JS');
}
      `);
      
      await fs.writeFile(pyFile, `
def hello():
    print('Hello from Python')
      `);
      
      const originalCwd = process.cwd();
      process.chdir(tempDir);
      
      try {
        // Only analyze JavaScript
        const jsAnalysis = await analyzer.analyzeCodebase(['javascript']);
        expect(jsAnalysis.components.some(c => c.language === 'javascript')).toBe(true);
        expect(jsAnalysis.components.some(c => c.language === 'python')).toBe(false);
        
        // Only analyze Python
        const pyAnalysis = await analyzer.analyzeCodebase(['python']);
        expect(pyAnalysis.components.some(c => c.language === 'python')).toBe(true);
        expect(pyAnalysis.components.some(c => c.language === 'javascript')).toBe(false);
        
      } finally {
        process.chdir(originalCwd);
      }
    });
  });

  describe('Error handling', () => {
    test('should handle invalid language gracefully', async () => {
      const analysis = await analyzer.analyzeCodebase(['invalid_language']);
      
      // Should return empty analysis for invalid language
      expect(analysis.components).toEqual([]);
      expect(analysis.dependencies).toEqual([]);
      expect(analysis.modules).toEqual([]);
    });

    test('should handle mixed valid and invalid languages', async () => {
      const jsFile = path.join(tempDir, 'test.js');
      await fs.writeFile(jsFile, `function test() {}`);
      
      const originalCwd = process.cwd();
      process.chdir(tempDir);
      
      try {
        const analysis = await analyzer.analyzeCodebase(['javascript', 'invalid_language']);
        
        // Should still analyze valid languages
        expect(analysis.components.some(c => c.language === 'javascript')).toBe(true);
        
      } finally {
        process.chdir(originalCwd);
      }
    });
  });

  describe('Deduplication', () => {
    test('should deduplicate components across languages', async () => {
      // Create files with similar component names
      const jsFile = path.join(tempDir, 'utils.js');
      const pyFile = path.join(tempDir, 'utils.py');
      
      await fs.writeFile(jsFile, `
function helper() {
  return 'js helper';
}
      `);
      
      await fs.writeFile(pyFile, `
def helper():
    return 'python helper'
      `);
      
      const originalCwd = process.cwd();
      process.chdir(tempDir);
      
      try {
        const analysis = await analyzer.analyzeCodebase(['javascript', 'python']);
        
        // Should have both helpers (different languages, different paths)
        const helpers = analysis.components.filter(c => c.name === 'helper');
        expect(helpers).toHaveLength(2);
        expect(helpers.some(h => h.language === 'javascript')).toBe(true);
        expect(helpers.some(h => h.language === 'python')).toBe(true);
        
      } finally {
        process.chdir(originalCwd);
      }
    });
  });
});
