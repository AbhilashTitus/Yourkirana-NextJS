import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PRODUCTS_FILE = path.join(process.cwd(), 'public', 'data', 'products.json');

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    images?: string[];
    description?: string;
    category: string;
}

// Helper function to read products
function readProducts(): Product[] {
    try {
        const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading products:', error);
        return [];
    }
}

// Helper function to write products
function writeProducts(products: Product[]): void {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
}

// GET - Fetch all products or filter by category
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        let products = readProducts();

        if (category) {
            products = products.filter(p => p.category === category);
        }

        return NextResponse.json({ products });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}

// POST - Add new product
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, name, price, image, images, description, category } = body;

        // Validation
        if (!id || !name || !price || !category) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const products = readProducts();

        // Check if product ID already exists
        if (products.some(p => p.id === id)) {
            return NextResponse.json(
                { error: 'Product ID already exists' },
                { status: 400 }
            );
        }

        const newProduct: Product = {
            id,
            name,
            price: Number(price),
            image: image || '/images/placeholder.jpg',
            ...(images && { images }),
            ...(description && { description }),
            category
        };

        products.push(newProduct);
        writeProducts(products);

        return NextResponse.json({ product: newProduct }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create product' },
            { status: 500 }
        );
    }
}

// PUT - Update existing product
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, name, price, image, images, description, category } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'Product ID is required' },
                { status: 400 }
            );
        }

        const products = readProducts();
        const index = products.findIndex(p => p.id === id);

        if (index === -1) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        // Update product
        products[index] = {
            ...products[index],
            ...(name && { name }),
            ...(price && { price: Number(price) }),
            ...(image && { image }),
            ...(images && { images }),
            ...(description && { description }),
            ...(category && { category })
        };

        writeProducts(products);

        return NextResponse.json({ product: products[index] });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update product' },
            { status: 500 }
        );
    }
}

// DELETE - Remove product
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Product ID is required' },
                { status: 400 }
            );
        }

        const products = readProducts();
        const filteredProducts = products.filter(p => p.id !== id);

        if (products.length === filteredProducts.length) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        writeProducts(filteredProducts);

        return NextResponse.json({ message: 'Product deleted successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete product' },
            { status: 500 }
        );
    }
}
