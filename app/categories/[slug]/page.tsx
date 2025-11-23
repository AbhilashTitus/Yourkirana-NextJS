"use client";

import { useParams } from 'next/navigation';
import { products, categories } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { notFound } from 'next/navigation';

export default function CategoryPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { addToCart } = useCart();

    const category = categories.find((c) => c.id === slug);

    if (!category) {
        notFound();
    }

    const categoryProducts = products.filter((p) => p.category === slug);

    return (
        <main>
            <section className="section">
                <div className="container">
                    <h2>{category.name}</h2>

                    <div className="products">
                        {categoryProducts.map((product) => (
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
                </div>
            </section>
        </main>
    );
}
