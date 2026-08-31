import Jimp from 'jimp';

async function processImage() {
  console.log('Reading image...');
  const image = await Jimp.read('public/assets/images/kalpataru-logo.jpg');
  
  console.log('Processing pixels for transparency...');
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    // Calculate luma
    const luma = (0.299 * r + 0.587 * g + 0.114 * b);
    
    let alpha = 255;
    // The background is black (luma near 0). 
    // We want to make dark areas transparent, but keep the gold opaque.
    // Gold is quite bright. We'll use a threshold to smoothly transition alpha.
    if (luma < 15) {
      alpha = 0; // Pure black becomes fully transparent
    } else if (luma < 80) {
      // Smooth fade for anti-aliased edge pixels (greyish black)
      alpha = Math.floor(((luma - 15) / 65) * 255);
    }
    
    // For the edge pixels, they are a mix of gold and black. 
    // If we just make them semi-transparent, they will look dark grey on a light background.
    // We can "un-premultiply" them by boosting their RGB values closer to pure gold,
    // so they are semi-transparent gold instead of semi-transparent black.
    if (alpha > 0 && alpha < 255) {
      // Approximate pure gold color
      const targetR = 212;
      const targetG = 175;
      const targetB = 55;
      
      // Blend towards gold based on how transparent it is (more transparent = closer to black originally = needs more boost)
      const blend = (255 - alpha) / 255;
      this.bitmap.data[idx + 0] = Math.min(255, r + (targetR - r) * blend);
      this.bitmap.data[idx + 1] = Math.min(255, g + (targetG - g) * blend);
      this.bitmap.data[idx + 2] = Math.min(255, b + (targetB - b) * blend);
    }

    // Set the new alpha channel
    this.bitmap.data[idx + 3] = alpha;
  });
  
  console.log('Writing transparent PNG...');
  await image.writeAsync('public/assets/images/kalpataru-logo-transparent.png');
  console.log('Done!');
}

processImage().catch(console.error);
