import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const outDir = join(process.cwd(), 'src/assets/images');
await mkdir(outDir, { recursive: true });

const specs = [
  ['hero-1.jpg', 1600, 900, '#141820', '#e85d04'],
  ['hero-2.jpg', 1600, 900, '#101418', '#dc2f02'],
  ['service-gym.jpg', 800, 600, '#1a1f28', '#f48c06'],
  ['service-cardio.jpg', 800, 600, '#181c24', '#e85d04'],
  ['service-personal.jpg', 800, 600, '#161a22', '#ff6b35'],
  ['service-group.jpg', 800, 600, '#141820', '#e85d04'],
  ['service-bar.jpg', 800, 600, '#1c2028', '#dc2f02'],
  ['gallery-1.jpg', 800, 600, '#12161c', '#e85d04'],
  ['gallery-2.jpg', 800, 600, '#161a20', '#f48c06'],
  ['gallery-3.jpg', 800, 600, '#101418', '#e85d04'],
  ['gallery-4.jpg', 800, 600, '#181c22', '#dc2f02'],
  ['gallery-5.jpg', 800, 600, '#141820', '#ff6b35'],
  ['review-1.jpg', 200, 200, '#2a3040', '#e85d04'],
  ['review-2.jpg', 200, 200, '#283038', '#f48c06'],
  ['review-3.jpg', 200, 200, '#2c3240', '#e85d04'],
  ['review-4.jpg', 200, 200, '#263038', '#dc2f02'],
];

for (const [name, width, height, bg, accent] of specs) {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${bg}"/>
          <stop offset="100%" style="stop-color:${accent};stop-opacity:0.35"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <rect x="${width * 0.1}" y="${height * 0.2}" width="${width * 0.8}" height="${height * 0.15}" rx="8" fill="${accent}" opacity="0.15"/>
      <rect x="${width * 0.15}" y="${height * 0.45}" width="${width * 0.5}" height="${height * 0.08}" rx="4" fill="#ffffff" opacity="0.08"/>
      <rect x="${width * 0.15}" y="${height * 0.58}" width="${width * 0.35}" height="${height * 0.06}" rx="4" fill="#ffffff" opacity="0.05"/>
    </svg>`;

  await sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toFile(join(outDir, name));
  console.log(`created ${name}`);
}
