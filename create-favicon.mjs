import sharp from 'sharp';

// Create 32x32 favicon.ico from logo.webp
await sharp('public/img/logo.webp')
  .resize(32, 32, {fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 }})
  .toFile('public/favicon.ico');

console.log('✅ favicon.ico created (32x32)');
