import { v2 as cloudinary } from 'cloudinary';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

cloudinary.config({
  cloud_name: 'dqflk4iuc',
  api_key: '196321237742292',
  api_secret: 'fYatQqlr60uR25geIs95qBiBE14',
});

const FOTOS_DIR = './public/images/FOTOS';

async function uploadFolder(casaFolder) {
  const casaPath = join(FOTOS_DIR, casaFolder);
  const files = readdirSync(casaPath).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

  const results = [];
  for (const file of files) {
    const filePath = join(casaPath, file);
    const publicId = `capachica/casas/${casaFolder}/${file.replace(/\.[^.]+$/, '')}`;
    try {
      const res = await cloudinary.uploader.upload(filePath, {
        public_id: publicId,
        overwrite: false,
        folder: '',
      });
      results.push({ file, url: res.secure_url });
      process.stdout.write('.');
    } catch (e) {
      if (e.http_code === 400 && e.message?.includes('already exists')) {
        const url = cloudinary.url(publicId, { secure: true });
        results.push({ file, url });
        process.stdout.write('s');
      } else {
        console.error(`\nERR ${file}: ${e.message}`);
      }
    }
  }
  return results;
}

const casas = readdirSync(FOTOS_DIR).filter(f => statSync(join(FOTOS_DIR, f)).isDirectory());
const output = {};

for (const casa of casas) {
  console.log(`\nUploading ${casa}...`);
  output[casa] = await uploadFolder(casa);
}

console.log('\n\nDone. URLs:');
console.log(JSON.stringify(output, null, 2));

import { writeFileSync } from 'fs';
writeFileSync('./cloudinary-urls.json', JSON.stringify(output, null, 2));
console.log('Saved to cloudinary-urls.json');
