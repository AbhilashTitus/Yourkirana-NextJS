"use client";

import { useParams } from 'next/navigation';

import { useCart } from '@/context/CartContext';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';
import PriceFilter from '@/components/PriceFilter';
import ProductModal from '@/components/ProductModal';

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
    const [category, setCategory] = useState<any>(null);
    const [categoryLoading, setCategoryLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch category and products
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch categories to find the current one
                const catRes = await fetch('/api/categories');
                const catData = await catRes.json();
                const currentCategory = catData.categories.find((c: any) => c.id === slug);

                if (!currentCategory) {
                    setCategory(null);
                    setCategoryLoading(false);
                    return;
                }

                setCategory(currentCategory);
                setCategoryLoading(false);

                // Fetch products for this category
                const prodRes = await fetch(`/api/products?category=${slug}`);
                const prodData = await prodRes.json();
                setProducts(prodData.products || []);
                setFilteredProducts(prodData.products || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
                setCategoryLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    const minPrice = products.length > 0 ? Math.min(...products.map(p => p.price)) : 0;
    const maxPrice = products.length > 0 ? Math.max(...products.map(p => p.price)) : 1000;

    const handlePriceChange = (min: number, max: number) => {
        const filtered = products.filter(p => p.price >= min && p.price <= max);
        setFilteredProducts(filtered);
    };

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    if (categoryLoading || loading) {
        return (
            <main>
                <section className="section">
                    <div className="container">
                        <div className="text-center py-20">Loading...</div>
                    </div>
                </section>
            </main>
        );
    }

    if (!category) {
        return notFound();
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
                                <div className="pic" onClick={() => handleProductClick(product)} style={{ cursor: 'pointer' }}>
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <div className="body" onClick={() => handleProductClick(product)} style={{ cursor: 'pointer' }}>
                                    <h3>{product.name}</h3>
                                    <div className="price">₹ {product.price}</div>
                                </div>
                                <button
                                    className="btn"
                                    onClick={() => addToCart(product.name, product.price, product.image)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            No products found in this category.
                        </div>
                    )}
                </div>
            </section>

            {/* Product Modal */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </main>
    );
}
