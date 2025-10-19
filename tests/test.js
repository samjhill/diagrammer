#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const { CodeAnalyzer } = require('../src/analyzers/codeAnalyzer');
const { DiagramGenerator } = require('../src/generators/diagramGenerator');

async function test() {
  console.log('🧪 Testing Diagrammer implementation...\n');

  try {
    // Load default config
    const config = {
      diagram: {
        theme: 'default',
        direction: 'TB',
        nodeSpacing: 50,
        rankSpacing: 100
      },
      analysis: {
        includeTests: false,
        includeNodeModules: false,
        maxDepth: 5
      }
    };

    // Initialize components
    const codeAnalyzer = new CodeAnalyzer(config);
    const diagramGenerator = new DiagramGenerator(config);

    // Change to test directory
    process.chdir(path.join(__dirname, 'sample-project'));

    console.log('📊 Analyzing sample project...');
    const analysis = await codeAnalyzer.analyzeCodebase(['typescript']);

    console.log('📈 Analysis results:');
    console.log(`  - Components: ${analysis.components.length}`);
    console.log(`  - Dependencies: ${analysis.dependencies.length}`);
    console.log(`  - Modules: ${analysis.modules.length}\n`);

    if (analysis.components.length > 0) {
      console.log('🎨 Generating diagrams...');
      const diagrams = await diagramGenerator.generateDiagrams(analysis);

      // Write test output
      const outputDir = path.join(__dirname, 'output');
      await fs.ensureDir(outputDir);

      for (const [name, content] of Object.entries(diagrams)) {
        const filePath = path.join(outputDir, `${name}.md`);
        await fs.writeFile(filePath, content);
        console.log(`  ✅ Generated: ${name}.md`);
      }

      console.log(`\n📁 Test output saved to: ${outputDir}`);
      console.log('\n🎉 Test completed successfully!');
    } else {
      console.log('❌ No components found to generate diagrams');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

if (require.main === module) {
  test();
}
