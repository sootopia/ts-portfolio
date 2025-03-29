import { minify } from 'html-minifier-terser';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function minifyHtml() {
  const htmlPath = resolve(__dirname, '../dist/index.html');
  const html = readFileSync(htmlPath, 'utf8');

  const minified = await minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: true,
    minifyJS: true,
  });

  writeFileSync(htmlPath, minified);
  console.log('HTML minification completed!');
}

minifyHtml().catch(console.error);
