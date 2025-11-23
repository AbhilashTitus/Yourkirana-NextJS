"use client";

import { useParams } from 'next/navigation';
import { categories } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';
import PriceFilter from '@/components/PriceFilter';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
}

export default function CategoryPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { addToCart } = useCart();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const category = categories.find((c) => c.id === slug);

    if (!category) {
        notFound();
    }

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`/api/products?category=${slug}`);
                const data = await res.json();
                setProducts(data.products || []);
                setFilteredProducts(data.products || []);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [slug]);

    const minPrice = products.length > 0 ? Math.min(...products.map(p => p.price)) : 0;
    const maxPrice = products.length > 0 ? Math.max(...products.map(p => p.price)) : 1000;

    const handlePriceChange = (min: number, max: number) => {
        const filtered = products.filter(p => p.price >= min && p.price <= max);
        setFilteredProducts(filtered);
    };

    if (loading) {
        return (
            <main>
                <section className="section">
                    <div className="container">
                        <h2>{category.name}</h2>
                        <div className="text-center py-20">Loading products...</div>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main>
            <section className="section">
                <div className="container">
                    <h2>{category.name}</h2>

                    <button
                        className="filter-trigger-btn"
                        onClick={() => setIsFilterOpen(true)}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                        </svg>
                        <span>Filter by Price</span>
                    </button>

                    {/* Filter Drawer */}
                    <aside className={`filter-drawer ${isFilterOpen ? 'open' : ''}`} onClick={() => setIsFilterOpen(false)}>
                        <div className="filter-drawer-content" onClick={(e) => e.stopPropagation()}>
                            <div className="filter-drawer-header">
                                <h3>Filters</h3>
                                <button onClick={() => setIsFilterOpen(false)} className="close-btn">
                                    ✕
                                </button>
                            </div>
                            <PriceFilter
                                min={minPrice}
                                max={maxPrice}
                                onChange={handlePriceChange}
                            />
                            <div className="filter-drawer-footer">
                                <button
                                    className="btn btn-primary w-full"
                                    onClick={() => setIsFilterOpen(false)}
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="products">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="card">
                                <img className="pic" src={product.image} alt={product.name} />
                                <div className="body">
                                    <h3>{product.name}</h3>
                                    <div className="price">₹ {product.price}</div>
                                </div>
                                <button
                                    className="btn"
                                    onClick={() => addToCart(product.name, product.price)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            No products found in this price range.
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
