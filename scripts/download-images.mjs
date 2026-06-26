/**
 * Скачивает stock-фото с Unsplash (прямые URL, без API-ключа).
 * Запуск: pnpm download:images
 *
 * Лицензия Unsplash: https://unsplash.com/license
 * При публикации желательно указать авторов в README.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const OUT_DIR = join(process.cwd(), 'src/assets/images');

/** filename → Unsplash photo id + ширина */
const ASSETS = [
  ['hero-1.jpg', 'photo-1534438327276-14e5300c3a48', 1600],
  ['hero-2.jpg', 'photo-1571902943202-507ec2618e8f', 1600],
  ['service-gym.jpg', 'photo-1540497077202-7bf8a7906663', 800],
  ['service-cardio.jpg', 'photo-1517836357463-d25dfeac3438', 800],
  ['service-personal.jpg', 'photo-1571019614242-c5c5dee9f50b', 800],
  ['service-group.jpg', 'photo-1518611012118-696072aa579a', 800],
  ['service-bar.jpg', 'photo-1490645935967-10de6ba17061', 800],
  ['gallery-1.jpg', 'photo-1583454110551-21f2fa2afe61', 800],
  ['gallery-2.jpg', 'photo-1461896836934-ffe607ba8211', 800],
  ['gallery-3.jpg', 'photo-1517838277536-f5f99be501cd', 800],
  ['gallery-4.jpg', 'photo-1558611848-73f7eb4001a1', 800],
  ['gallery-5.jpg', 'photo-1593079831268-3381b0f4c77c', 800],
  ['review-1.jpg', 'photo-1507003211169-0a1dd7228f2d', 200],
  ['review-2.jpg', 'photo-1494790108377-be9c29b29330', 200],
  ['review-3.jpg', 'photo-1500648767791-00dcc994a43e', 200],
  ['review-4.jpg', 'photo-1438761681033-6461ffad8d80', 200],
];

const MAX_RETRIES = 3;
const TIMEOUT_MS = 60_000;

async function downloadOne(filename, photoId, width) {
  const url = `https://images.unsplash.com/${photoId}?w=${width}&q=80&auto=format&fit=crop`;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const res = await fetch(url, {
        signal: controller.signal,
        headers: { 'User-Agent': 'ser-gym-landing/1.0 (local dev asset script)' },
        redirect: 'follow',
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const buffer = Buffer.from(await res.arrayBuffer());
      if (buffer.length < 1000) {
        throw new Error(`слишком маленький файл (${buffer.length} bytes)`);
      }

      await writeFile(join(OUT_DIR, filename), buffer);
      console.log(`✓ ${filename} (${Math.round(buffer.length / 1024)} KB)`);
      return;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`  попытка ${attempt}/${MAX_RETRIES} ${filename}: ${msg}`);
      if (attempt === MAX_RETRIES) throw new Error(`${filename}: ${msg}`);
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    } finally {
      clearTimeout(timer);
    }
  }
}

await mkdir(OUT_DIR, { recursive: true });

console.log('Скачивание с images.unsplash.com …\n');

let failed = 0;
for (const [filename, photoId, width] of ASSETS) {
  try {
    await downloadOne(filename, photoId, width);
  } catch (err) {
    failed++;
    console.error(`✗ ${err instanceof Error ? err.message : err}`);
  }
}

console.log(failed === 0 ? '\nГотово.' : `\nОшибок: ${failed}. Fallback: pnpm generate:images`);
process.exit(failed > 0 ? 1 : 0);
