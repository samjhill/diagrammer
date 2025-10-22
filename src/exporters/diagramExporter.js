const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');

class DiagramExporter {
  constructor(config) {
    this.config = config;
    this.exportFormats = config?.diagram?.exports?.formats || ['png', 'svg'];
    this.exportQuality = config?.diagram?.exports?.quality || 'high';
    this.exportSize = config?.diagram?.exports?.size || { width: 1200, height: 800 };
  }

  async exportDiagrams(diagrams, outputPath) {
    const exportedFiles = [];
    
    // Create organized exports directories
    const pngDir = path.join(outputPath, 'exports', 'png');
    const svgDir = path.join(outputPath, 'exports', 'svg');
    await fs.ensureDir(pngDir);
    await fs.ensureDir(svgDir);

    // Initialize browser
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      for (const [diagramName, content] of Object.entries(diagrams)) {
        // Skip interactive HTML files
        if (diagramName.endsWith('_interactive.html.md')) continue;
        
        // Extract Mermaid diagram from markdown
        const mermaidMatch = content.match(/```mermaid\n([\s\S]*?)\n```/);
        if (!mermaidMatch) continue;

        const mermaidDiagram = mermaidMatch[1];
        const cleanName = diagramName.replace('.md', '');

        // Export in each requested format
        for (const format of this.exportFormats) {
          const targetDir = format === 'png' ? pngDir : svgDir;
          const exportedFile = await this.exportDiagram(
            browser, 
            mermaidDiagram, 
            cleanName, 
            format, 
            targetDir
          );
          if (exportedFile) {
            exportedFiles.push(exportedFile);
          }
        }
      }
    } finally {
      await browser.close();
    }

    return exportedFiles;
  }

  async exportDiagram(browser, mermaidDiagram, diagramName, format, outputDir) {
    try {
      const page = await browser.newPage();
      
      // Set viewport size
      await page.setViewport({
        width: this.exportSize.width,
        height: this.exportSize.height,
        deviceScaleFactor: this.exportQuality === 'high' ? 2 : 1
      });

      // Create HTML content with Mermaid
      const htmlContent = this.createExportHTML(mermaidDiagram);
      await page.setContent(htmlContent);

      // Wait for Mermaid to render
      await page.waitForFunction(() => {
        return document.querySelector('.mermaid svg') !== null;
      }, { timeout: 10000 });

      // Generate filename
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `${diagramName}_${timestamp}.${format}`;
      const filePath = path.join(outputDir, filename);

      // Export based on format
      if (format === 'png') {
        await this.exportPNG(page, filePath);
      } else if (format === 'svg') {
        await this.exportSVG(page, filePath);
      }

      await page.close();
      
      console.log(`✅ Exported ${format.toUpperCase()}: ${filename}`);
      return filePath;

    } catch (error) {
      console.error(`❌ Failed to export ${diagramName} as ${format}:`, error.message);
      return null;
    }
  }

  createExportHTML(mermaidDiagram) {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Diagram Export</title>
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js"></script>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .mermaid {
            text-align: center;
        }
        .diagram-title {
            text-align: center;
            margin-bottom: 20px;
            font-size: 18px;
            font-weight: 600;
            color: #333;
        }
    </style>
</head>
<body>
    <div class="mermaid">
${mermaidDiagram}
    </div>
    <script>
        mermaid.initialize({
            startOnLoad: true,
            theme: 'default',
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true
            }
        });
    </script>
</body>
</html>`;
  }

  async exportPNG(page, filePath) {
    const svgElement = await page.$('.mermaid svg');
    if (!svgElement) throw new Error('SVG element not found');

    // Get SVG dimensions
    const bbox = await svgElement.boundingBox();
    if (!bbox) throw new Error('Could not get SVG dimensions');

    // Add padding
    const padding = 20;
    const clip = {
      x: Math.max(0, bbox.x - padding),
      y: Math.max(0, bbox.y - padding),
      width: bbox.width + (padding * 2),
      height: bbox.height + (padding * 2)
    };

    await page.screenshot({
      path: filePath,
      clip: clip,
      type: 'png',
      omitBackground: false
    });
  }

  async exportSVG(page, filePath) {
    const svgElement = await page.$('.mermaid svg');
    if (!svgElement) throw new Error('SVG element not found');

    // Get SVG content
    const svgContent = await page.evaluate((element) => {
      return element.outerHTML;
    }, svgElement);

    // Add XML declaration and styling
    const fullSvgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
${svgContent.replace(/<svg[^>]*>/, '').replace('</svg>', '')}
</svg>`;

    await fs.writeFile(filePath, fullSvgContent);
  }

  async exportAllFormats(diagrams, outputPath) {
    const results = {
      png: [],
      svg: [],
      errors: []
    };

    try {
      const exportedFiles = await this.exportDiagrams(diagrams, outputPath);
      
      exportedFiles.forEach(filePath => {
        if (filePath) {
          const ext = path.extname(filePath).slice(1);
          if (ext === 'png') {
            results.png.push(filePath);
          } else if (ext === 'svg') {
            results.svg.push(filePath);
          }
        }
      });

    } catch (error) {
      results.errors.push(error.message);
    }

    return results;
  }
}

module.exports = { DiagramExporter };
