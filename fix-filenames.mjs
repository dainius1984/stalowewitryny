import fs from 'fs';
import path from 'path';

const dir = 'public/img/projects';
const files = fs.readdirSync(dir);

let fixed = 0;

for (const file of files) {
  let newName = file;
  
  if (file.includes('-medium-medium.webp')) {
    newName = file.replace('-medium-medium.webp', '-medium.webp');
  } else if (file.includes('-small-small.webp')) {
    newName = file.replace('-small-small.webp', '-small.webp');
  }
  
  if (newName !== file) {
    const oldPath = path.join(dir, file);
    const newPath = path.join(dir, newName);
    fs.renameSync(oldPath, newPath);
    console.log(`✓ ${file} → ${newName}`);
    fixed++;
  }
}

console.log(`\n✅ Fixed ${fixed} filenames`);
