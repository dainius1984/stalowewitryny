import sharp from 'sharp';

const files = ['Analysis', 'Coding', 'Design Project', 'Security', 'logo'];

for (const f of files) {
  await sharp(`public/img/${f}.webp`).resize(400, null, {withoutEnlargement: true}).webp({quality: 80}).toFile(`public/img/${f}-small.webp`);
  await sharp(`public/img/${f}.webp`).resize(800, null, {withoutEnlargement: true}).webp({quality: 82}).toFile(`public/img/${f}-medium.webp`);
  console.log(`✅ ${f}`);
}
