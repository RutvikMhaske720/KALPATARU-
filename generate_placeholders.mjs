import fs from 'fs';
import path from 'path';
import https from 'https';

const outDir = path.join(process.cwd(), 'public', 'assets', 'images');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const generateImage = (index) => {
  return new Promise((resolve, reject) => {
    const filename = `screen-${index.toString().padStart(2, '0')}.png`;
    const filepath = path.join(outDir, filename);
    const url = `https://placehold.co/400x800/121A16/D4AF37.png?text=Kalpataru%5CnScreen+${index}`;
    
    console.log(`Downloading ${filename}...`);
    
    https.get(url, (res) => {
      const fileStream = fs.createWriteStream(filepath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Saved ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      console.error(`Error downloading ${filename}: ${err.message}`);
      reject(err);
    });
  });
};

const run = async () => {
  console.log('Generating 13 placeholder images...');
  for (let i = 1; i <= 13; i++) {
    await generateImage(i);
  }
  console.log('Done!');
};

run();
