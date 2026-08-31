const { Jimp } = require('jimp');

async function processImage() {
  console.log('Reading image...');
  // Note: For older jimp versions it might just be require('jimp')
  const jimpInstance = Jimp || require('jimp');
  
  const image = await jimpInstance.read('public/assets/images/kalpataru-logo.jpg');
  
  console.log('Processing pixels for transparency...');
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    // Calculate luma
    const luma = (0.299 * r + 0.587 * g + 0.114 * b);
    
    let alpha = 255;
    if (luma < 15) {
      alpha = 0; // Pure black becomes fully transparent
    } else if (luma < 80) {
      alpha = Math.floor(((luma - 15) / 65) * 255);
    }
    
    if (alpha > 0 && alpha < 255) {
      const targetR = 212;
      const targetG = 175;
      const targetB = 55;
      
      const blend = (255 - alpha) / 255;
      this.bitmap.data[idx + 0] = Math.min(255, r + (targetR - r) * blend);
      this.bitmap.data[idx + 1] = Math.min(255, g + (targetG - g) * blend);
      this.bitmap.data[idx + 2] = Math.min(255, b + (targetB - b) * blend);
    }

    this.bitmap.data[idx + 3] = alpha;
  });
  
  console.log('Writing transparent PNG...');
  image.write('public/assets/images/kalpataru-logo-transparent.png', () => {
    console.log('Done!');
  });
}

processImage().catch(console.error);
