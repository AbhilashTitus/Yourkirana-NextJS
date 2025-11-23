"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Category {
    id: string;
    name: string;
    image: string;
    href: string;
}

export default function CategoryGrid() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/categories');
            const data = await res.json();
            setCategories(data.categories || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="grid" id="catGrid">
                {[...Array(11)].map((_, i) => (
                    <div key={i} className="cat animate-pulse">
                        <div className="w-full h-32 bg-gray-200 rounded-lg"></div>
                        <span className="block h-4 bg-gray-200 rounded mt-2"></span>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid" id="catGrid">
            {categories.map((c) => (
                <Link key={c.id} href={c.href} className="cat">
                    <img src={c.image} alt={c.name} />
                    <span>{c.name}</span>
                </Link>
            ))}
        </div>
    );
}
