const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '../public/images');

async function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else if (stat.isFile() && (fullPath.endsWith('.png') || fullPath.endsWith('.jpg') || fullPath.endsWith('.jpeg'))) {
            // Compress files larger than 500KB
            if (stat.size > 500 * 1024) {
                console.log(`Compressing: ${file} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
                const tempPath = fullPath + '.tmp';
                try {
                    // Resize large images slightly to ensure huge size drops, but keep high enough for web
                    const metadata = await sharp(fullPath).metadata();
                    let image = sharp(fullPath);
                    
                    if (metadata.width > 1200) {
                        image = image.resize({ width: 1200, withoutEnlargement: true });
                    }

                    if (fullPath.endsWith('.png')) {
                        await image.png({ quality: 60, compressionLevel: 9, effort: 7 }).toFile(tempPath);
                    } else {
                        await image.jpeg({ quality: 65, mozjpeg: true }).toFile(tempPath);
                    }
                    
                    fs.renameSync(tempPath, fullPath);
                    const newStat = fs.statSync(fullPath);
                    console.log(` -> Reduced to: ${(newStat.size / 1024 / 1024).toFixed(2)} MB`);
                } catch (e) {
                    console.error(`Error compressing ${file}:`, e.message);
                    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
                }
            }
        }
    }
}

console.log('Starting image compression...');
processDirectory(dir).then(() => {
    console.log('Compression complete!');
    // Calculate total new size
    let totalSize = 0;
    function calculateSize(directory) {
        const files = fs.readdirSync(directory);
        for (const file of files) {
            const fullPath = path.join(directory, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                calculateSize(fullPath);
            } else {
                totalSize += stat.size;
            }
        }
    }
    calculateSize(dir);
    console.log(`Total new size of images folder: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
}).catch(console.error);
