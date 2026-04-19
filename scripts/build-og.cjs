/* Convierte los SVGs de /assets a PNG 1200x630 para OG images */
const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const root = path.resolve(__dirname, '..');
const files = ['og-hub', 'og-membresia', 'og-crm'];

for (const name of files) {
  const svgPath = path.join(root, 'assets', name + '.svg');
  const pngPath = path.join(root, 'assets', name + '.png');
  const svg = fs.readFileSync(svgPath);
  const resvg = new Resvg(svg, {
    background: '#0D1B2A',
    fitTo: { mode: 'width', value: 1200 },
    font: { loadSystemFonts: true }
  });
  const png = resvg.render().asPng();
  fs.writeFileSync(pngPath, png);
  const stats = fs.statSync(pngPath);
  console.log(name + '.png — ' + Math.round(stats.size / 1024) + ' KB');
}
