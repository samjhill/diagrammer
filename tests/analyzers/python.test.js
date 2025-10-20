const { PythonAnalyzer } = require('../../src/analyzers/pythonAnalyzer');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');

describe('PythonAnalyzer', () => {
  let analyzer;
  let tempDir;

  beforeEach(() => {
    analyzer = new PythonAnalyzer({});
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'python-test-'));
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.removeSync(tempDir);
    }
  });

  describe('extractImports', () => {
    test('should extract standard imports', () => {
      const content = `
import os
import sys
import json
from typing import List, Dict
      `;
      
      const imports = analyzer.extractImports(content);
      
      expect(imports).toHaveLength(5);
      expect(imports[0]).toEqual({
        name: 'os',
        source: 'import',
        isLocal: false
      });
      expect(imports[1]).toEqual({
        name: 'sys',
        source: 'import',
        isLocal: false
      });
    });

    test('should extract from imports', () => {
      const content = `
from typing import List, Dict, Optional
from django.db import models
from .utils import helper_function
      `;
      
      const imports = analyzer.extractImports(content);
      
      expect(imports).toHaveLength(5);
      expect(imports.find(i => i.name === 'List')).toEqual({
        name: 'List',
        source: 'typing',
        isLocal: false
      });
      expect(imports.find(i => i.name === 'helper_function')).toEqual({
        name: 'helper_function',
        source: '.utils',
        isLocal: true
      });
    });

    test('should handle import aliases', () => {
      const content = `
import pandas as pd
from datetime import datetime as dt
      `;
      
      const imports = analyzer.extractImports(content);
      
      expect(imports).toHaveLength(2);
      expect(imports[0]).toEqual({
        name: 'pandas',
        source: 'import',
        isLocal: false
      });
      expect(imports[1]).toEqual({
        name: 'datetime',
        source: 'datetime',
        isLocal: false
      });
    });
  });

  describe('extractClasses', () => {
    test('should extract class definitions', () => {
      const content = `
class User:
    pass

class AdminUser(User):
    pass

def some_function():
    pass

class DatabaseManager:
    pass
      `;
      
      const classes = analyzer.extractClasses(content);
      
      expect(classes).toEqual(['User', 'AdminUser', 'DatabaseManager']);
    });

    test('should handle classes with inheritance', () => {
      const content = `
class BaseModel:
    pass

class UserModel(BaseModel):
    pass
      `;
      
      const classes = analyzer.extractClasses(content);
      
      expect(classes).toEqual(['BaseModel', 'UserModel']);
    });
  });

  describe('extractFunctions', () => {
    test('should extract function definitions', () => {
      const content = `
def calculate_total(items):
    return sum(items)

class Calculator:
    def add(self, a, b):
        return a + b

def process_data(data):
    return data.upper()
      `;
      
      const functions = analyzer.extractFunctions(content);
      
      expect(functions).toEqual(['calculate_total', 'add', 'process_data']);
    });

    test('should handle async functions', () => {
      const content = `
async def fetch_data():
    pass

def sync_function():
    pass
      `;
      
      const functions = analyzer.extractFunctions(content);
      
      expect(functions).toEqual(['fetch_data', 'sync_function']);
    });
  });

  describe('analyzeFile', () => {
    test('should analyze a complete Python file', () => {
      const content = `
import os
from typing import List

class UserService:
    def __init__(self):
        self.users = []
    
    def add_user(self, user):
        self.users.append(user)

def get_user_count():
    return len(UserService().users)
      `;
      
      const analysis = analyzer.analyzeFile('test.py', content);
      
      // Check components
      expect(analysis.components).toHaveLength(4);
      expect(analysis.components.some(c => c.name === 'UserService' && c.type === 'class')).toBe(true);
      expect(analysis.components.some(c => c.name === 'get_user_count' && c.type === 'function')).toBe(true);
      expect(analysis.components.some(c => c.name === '__init__' && c.type === 'function')).toBe(true);
      expect(analysis.components.some(c => c.name === 'add_user' && c.type === 'function')).toBe(true);
      
      // Check dependencies
      expect(analysis.dependencies).toHaveLength(2);
      expect(analysis.dependencies[0]).toEqual({
        type: 'import',
        name: 'os',
        source: 'import',
        path: 'test.py',
        isExternal: true
      });
      expect(analysis.dependencies[1]).toEqual({
        type: 'import',
        name: 'List',
        source: 'typing',
        path: 'test.py',
        isExternal: true
      });
      
      // Check modules
      expect(analysis.modules).toHaveLength(1);
      expect(analysis.modules[0]).toEqual({
        type: 'module',
        name: 'test',
        path: 'test.py',
        language: 'python',
        exports: ['UserService', '__init__', 'add_user', 'get_user_count']
      });
    });
  });

  describe('isLocalImport', () => {
    test('should identify local imports', () => {
      expect(analyzer.isLocalImport('.utils')).toBe(true);
      expect(analyzer.isLocalImport('..models')).toBe(true);
      expect(analyzer.isLocalImport('local_module')).toBe(true);
    });

    test('should identify external imports', () => {
      expect(analyzer.isLocalImport('django.db')).toBe(false);
      expect(analyzer.isLocalImport('pandas')).toBe(false);
      expect(analyzer.isLocalImport('numpy.random')).toBe(false);
    });
  });

  describe('integration test', () => {
    test('should analyze multiple Python files', async () => {
      // Create test files
      const file1 = path.join(tempDir, 'models.py');
      const file2 = path.join(tempDir, 'services.py');
      
      await fs.writeFile(file1, `
from typing import Optional
from datetime import datetime

class User:
    def __init__(self, name: str):
        self.name = name
        self.created_at = datetime.now()

class Product:
    pass
      `);
      
      await fs.writeFile(file2, `
from .models import User, Product
import json

class UserService:
    def create_user(self, name: str) -> User:
        return User(name)
    
    def serialize_user(self, user: User) -> str:
        return json.dumps({'name': user.name})
      `);
      
      // Change to temp directory for analysis
      const originalCwd = process.cwd();
      process.chdir(tempDir);
      
      try {
        const analysis = await analyzer.analyze();
        
        // Should find components from both files
        expect(analysis.components.length).toBeGreaterThan(0);
        expect(analysis.components.some(c => c.name === 'User')).toBe(true);
        expect(analysis.components.some(c => c.name === 'UserService')).toBe(true);
        
        // Should find dependencies
        expect(analysis.dependencies.length).toBeGreaterThan(0);
        expect(analysis.dependencies.some(d => d.name === 'json')).toBe(true);
        
        // Should find modules
        expect(analysis.modules.length).toBe(2);
        
      } finally {
        process.chdir(originalCwd);
      }
    });
  });
});
