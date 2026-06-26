/**
 * Копирует фото из локальной папки в src/assets/images/.
 * Используйте, если Unsplash недоступен (VPN, блокировки, ручная загрузка).
 *
 * pnpm copy:images -- ~/Downloads/gym-photos
 * pnpm copy:images -- ./my-photos hero-1.jpg=slide1.jpg hero-2.jpg=slide2.jpg
 */
import { copyFile, mkdir, readdir } from 'node:fs/promises';
import { join, basename } from 'node:path';

const OUT_DIR = join(process.cwd(), 'src/assets/images');

const EXPECTED = [
  'hero-1.jpg',
  'hero-2.jpg',
  'service-gym.jpg',
  'service-cardio.jpg',
  'service-personal.jpg',
  'service-group.jpg',
  'service-bar.jpg',
  'gallery-1.jpg',
  'gallery-2.jpg',
  'gallery-3.jpg',
  'gallery-4.jpg',
  'gallery-5.jpg',
  'review-1.jpg',
  'review-2.jpg',
  'review-3.jpg',
  'review-4.jpg',
];

const args = process.argv.slice(2).filter((a) => a !== '--');
const sourceDir = args[0];

if (!sourceDir) {
  console.error('Укажите папку с фото: pnpm copy:images -- ~/Downloads/gym-photos');
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });

const mappings = new Map();

for (let i = 1; i < args.length; i++) {
  const [target, source] = args[i].split('=');
  if (target && source) mappings.set(target, source);
}

if (mappings.size === 0) {
  const files = (await readdir(sourceDir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  const sorted = files.sort();
  EXPECTED.forEach((name, index) => {
    if (sorted[index]) mappings.set(name, sorted[index]);
  });
}

let copied = 0;
for (const [target, sourceName] of mappings) {
  const src = join(sourceDir, sourceName);
  const dest = join(OUT_DIR, target);
  try {
    await copyFile(src, dest);
    console.log(`✓ ${target} ← ${basename(sourceName)}`);
    copied++;
  } catch {
    console.error(`✗ не найден: ${src}`);
  }
}

console.log(copied > 0 ? `\nСкопировано: ${copied}` : '\nНичего не скопировано.');
console.log('Проверка: pnpm build');
process.exit(copied === 0 ? 1 : 0);
