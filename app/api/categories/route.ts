import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CATEGORIES_FILE = path.join(process.cwd(), 'data', 'categories.json');
const PRODUCTS_FILE = path.join(process.cwd(), 'data', 'products.json');

export interface Category {
    id: string;
    name: string;
    image: string;
    href: string;
}

// Helper function to read categories
function readCategories(): Category[] {
    try {
        const data = fs.readFileSync(CATEGORIES_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading categories:', error);
        return [];
    }
}

// Helper function to write categories
function writeCategories(categories: Category[]): void {
    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(categories, null, 2));
}

// Helper function to check if category has products
function categoryHasProducts(categoryId: string): boolean {
    try {
        const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
        const products = JSON.parse(data);
        return products.some((p: any) => p.category === categoryId);
    } catch (error) {
        console.error('Error checking products:', error);
        return false;
    }
}

// GET - Fetch all categories
export async function GET(request: Request) {
    try {
        const categories = readCategories();
        return NextResponse.json({ categories });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch categories' },
            { status: 500 }
        );
    }
}

// POST - Add new category
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, name, image, href } = body;

        // Validation
        if (!id || !name || !href) {
            return NextResponse.json(
                { error: 'Missing required fields (id, name, href)' },
                { status: 400 }
            );
        }

        // Validate ID format (lowercase, no spaces)
        if (!/^[a-z0-9-]+$/.test(id)) {
            return NextResponse.json(
                { error: 'Category ID must be lowercase letters, numbers, and hyphens only' },
                { status: 400 }
            );
        }

        const categories = readCategories();

        // Check if category ID already exists
        if (categories.some(c => c.id === id)) {
            return NextResponse.json(
                { error: 'Category ID already exists' },
                { status: 400 }
            );
        }

        const newCategory: Category = {
            id,
            name,
            image: image || '/images/placeholder.jpg',
            href
        };

        categories.push(newCategory);
        writeCategories(categories);

        return NextResponse.json({ category: newCategory }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create category' },
            { status: 500 }
        );
    }
}

// PUT - Update existing category
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, name, image, href } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'Category ID is required' },
                { status: 400 }
            );
        }

        const categories = readCategories();
        const index = categories.findIndex(c => c.id === id);

        if (index === -1) {
            return NextResponse.json(
                { error: 'Category not found' },
                { status: 404 }
            );
        }

        // Update category
        categories[index] = {
            ...categories[index],
            ...(name && { name }),
            ...(image && { image }),
            ...(href && { href })
        };

        writeCategories(categories);

        return NextResponse.json({ category: categories[index] });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update category' },
            { status: 500 }
        );
    }
}

// DELETE - Remove category
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Category ID is required' },
                { status: 400 }
            );
        }

        // Check if category has products
        if (categoryHasProducts(id)) {
            return NextResponse.json(
                { error: 'Cannot delete category with existing products. Please reassign or delete products first.' },
                { status: 400 }
            );
        }

        const categories = readCategories();
        const filteredCategories = categories.filter(c => c.id !== id);

        if (categories.length === filteredCategories.length) {
            return NextResponse.json(
                { error: 'Category not found' },
                { status: 404 }
            );
        }

        writeCategories(filteredCategories);

        return NextResponse.json({ message: 'Category deleted successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete category' },
            { status: 500 }
        );
    }
}
