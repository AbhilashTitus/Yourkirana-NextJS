const fs = require('fs');
const path = require('path');

// Read the TypeScript file content
const tsContent = fs.readFileSync(path.join(__dirname, '../data/products.ts'), 'utf-8');

// Extract the products array using regex
const productsMatch = tsContent.match(/export const products: Product\[\] = \[([\s\S]*?)\];/);

if (!productsMatch) {
    console.error('Could not find products array');
    process.exit(1);
}

// Extract individual product objects
const productsString = productsMatch[1];
const productMatches = productsString.matchAll(/\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*price:\s*(\d+),\s*image:\s*'([^']+)',\s*category:\s*'([^']+)'\s*\}/g);

const products = [];
for (const match of productMatches) {
    products.push({
        id: match[1],
        name: match[2],
        price: parseInt(match[3]),
        image: match[4],
        category: match[5]
    });
}

// Write to JSON file
fs.writeFileSync(
    path.join(__dirname, '../data/products.json'),
    JSON.stringify(products, null, 2)
);

console.log(`Successfully converted ${products.length} products to JSON`);
