const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const iconSource = path.join(rootDir, 'assets', 'icon.png');
const iconTarget = path.join(distDir, 'icon.png');
const htmlPath = path.join(distDir, 'index.html');
const manifestPath = path.join(distDir, 'manifest.webmanifest');

if (!fs.existsSync(distDir)) {
  throw new Error('dist nao encontrado. Rode o export web antes do postbuild.');
}

if (!fs.existsSync(iconSource)) {
  throw new Error('assets/icon.png nao encontrado.');
}

fs.copyFileSync(iconSource, iconTarget);

const manifest = {
  name: 'Agenda',
  short_name: 'Agenda',
  start_url: './',
  display: 'standalone',
  background_color: '#1A1A1A',
  theme_color: '#D4AF37',
  icons: [
    {
      src: './icon.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable'
    }
  ]
};

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');

let html = fs.readFileSync(htmlPath, 'utf8');
if (!html.includes('rel="manifest"')) {
  html = html.replace('</head>', '  <link rel="manifest" href="./manifest.webmanifest" />\n</head>');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('PWA manifest e icone aplicados em dist.');
