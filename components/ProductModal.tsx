"use client";

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    images?: string[];
    description?: string;
    category: string;
}

interface ProductModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

// Generate appealing food descriptions based on product name
export const generateDescription = (productName: string): string => {
    const name = productName.toLowerCase();

    // Groceries & Staples
    if (name.includes('rice')) return 'Premium quality rice with perfect grain length and aroma. Ideal for daily meals and special occasions.';
    if (name.includes('atta') || name.includes('wheat')) return 'Freshly milled whole wheat flour, rich in fiber and nutrients. Perfect for making soft rotis and parathas.';
    if (name.includes('dal')) return 'High-quality pulses, carefully selected and cleaned. Rich in protein and essential nutrients.';
    if (name.includes('oil')) return 'Pure and natural cooking oil, perfect for all your culinary needs. Heart-healthy and flavorful.';
    if (name.includes('ghee')) return 'Traditional pure ghee with rich aroma and authentic taste. Made from the finest quality milk.';
    if (name.includes('salt')) return 'Fine quality iodized salt for everyday cooking. Essential for maintaining proper health.';
    if (name.includes('jaggery')) return 'Natural sweetener packed with minerals and antioxidants. A healthier alternative to refined sugar.';

    // Vegetables & Fruits
    if (name.includes('onion') || name.includes('tomato') || name.includes('potato')) return 'Fresh farm produce, handpicked for quality. Essential ingredient for everyday cooking.';
    if (name.includes('carrot') || name.includes('beans') || name.includes('capsicum')) return 'Crisp and fresh vegetables, rich in vitamins and minerals. Perfect for healthy meals.';
    if (name.includes('spinach') || name.includes('coriander')) return 'Fresh green leafy vegetables, packed with nutrients. Adds flavor and nutrition to your dishes.';
    if (name.includes('banana') || name.includes('apple') || name.includes('orange')) return 'Fresh, juicy fruits bursting with natural sweetness. Rich in vitamins and perfect for a healthy snack.';
    if (name.includes('grapes') || name.includes('mango') || name.includes('pomegranate')) return 'Premium quality seasonal fruits, naturally sweet and delicious. Packed with antioxidants and vitamins.';
    if (name.includes('coconut')) return 'Fresh coconut with rich flavor and aroma. Perfect for cooking, garnishing, and traditional recipes.';

    // Dairy & Bakery
    if (name.includes('milk')) return 'Fresh, pure milk rich in calcium and protein. Essential for strong bones and overall health.';
    if (name.includes('curd') || name.includes('yogurt')) return 'Creamy and fresh curd with natural probiotics. Great for digestion and a cooling treat.';
    if (name.includes('paneer')) return 'Soft and fresh cottage cheese, rich in protein. Perfect for curries, snacks, and grilling.';
    if (name.includes('cheese')) return 'Premium quality cheese with rich, creamy texture. Perfect for sandwiches, pizzas, and snacks.';
    if (name.includes('butter')) return 'Smooth and creamy butter made from pure milk. Adds richness to your breakfast and cooking.';
    if (name.includes('bread')) return 'Soft and fresh bread, perfect for breakfast and sandwiches. Made with quality ingredients.';
    if (name.includes('buns')) return 'Soft and fluffy buns, perfect for burgers and sandwiches. Freshly baked for you.';
    if (name.includes('cookies') || name.includes('biscuits')) return 'Crispy and delicious treats, perfect with tea or coffee. Made with quality ingredients.';

    // Snacks & Foods
    if (name.includes('chips')) return 'Crispy and crunchy chips with irresistible flavor. Perfect snack for any time of the day.';
    if (name.includes('peanuts') || name.includes('mixture')) return 'Savory and crunchy snack mix with perfect blend of spices. Great for tea-time munching.';
    if (name.includes('noodles') || name.includes('pasta')) return 'Quick and easy to prepare, perfect for a delicious meal in minutes. Versatile and tasty.';
    if (name.includes('ketchup') || name.includes('sauce')) return 'Rich and tangy condiment that enhances the flavor of your favorite dishes. A must-have in every kitchen.';
    if (name.includes('chocolate')) return 'Smooth and indulgent chocolate that melts in your mouth. Perfect treat for chocolate lovers.';
    if (name.includes('nutella')) return 'Creamy hazelnut spread with cocoa, perfect for breakfast and desserts. Irresistibly delicious.';

    // Beverages
    if (name.includes('cola') || name.includes('soda')) return 'Refreshing carbonated beverage, perfect for quenching your thirst. Great with meals or on its own.';
    if (name.includes('juice')) return 'Fresh and natural fruit juice packed with vitamins. Refreshing and healthy beverage choice.';
    if (name.includes('tea')) return 'Premium quality tea leaves for the perfect cup. Rich aroma and authentic taste in every sip.';
    if (name.includes('coffee')) return 'Aromatic coffee with rich flavor and perfect strength. Your perfect morning companion.';
    if (name.includes('water')) return 'Pure and safe drinking water, essential for staying hydrated. Quality you can trust.';
    if (name.includes('milkshake')) return 'Creamy and delicious milkshake with rich flavor. Perfect indulgent treat for any time.';

    // Personal Care
    if (name.includes('soap')) return 'Gentle and nourishing soap that cleanses and moisturizes. Leaves skin feeling fresh and soft.';
    if (name.includes('shampoo')) return 'Nourishing shampoo that cleanses and strengthens hair. For healthy, shiny, and manageable hair.';
    if (name.includes('toothpaste')) return 'Advanced dental care for strong teeth and fresh breath. Protects against cavities and gum problems.';
    if (name.includes('cream') || name.includes('moisturizer')) return 'Nourishing skincare product that hydrates and protects. For soft, smooth, and healthy skin.';

    // Cleaning & Household
    if (name.includes('detergent')) return 'Powerful cleaning formula that removes tough stains. Keeps your clothes fresh and bright.';
    if (name.includes('cleaner')) return 'Effective cleaning solution for a spotless home. Removes dirt and germs with ease.';

    // Baby Essentials
    if (name.includes('diaper')) return 'Soft and absorbent diapers that keep baby dry and comfortable. Gentle on delicate skin.';
    if (name.includes('baby')) return 'Specially formulated for babies with gentle, safe ingredients. Trusted care for your little one.';

    // Default
    return 'High-quality product carefully selected for you. Fresh, authentic, and perfect for your daily needs.';
};

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const { addToCart } = useCart();

    // Use gallery images if available, with main image as fallback
    const images = (() => {
        if (product.images && product.images.length > 0) {
            // Filter out empty strings from gallery images
            const validGalleryImages = product.images
                .filter(img => img && img.trim() !== '');

            if (validGalleryImages.length >= 3) {
                // All 3 gallery images available
                return validGalleryImages.slice(0, 3);
            } else if (validGalleryImages.length > 0) {
                // Some gallery images available, fill rest with main image
                const imageArray = [...validGalleryImages];
                while (imageArray.length < 3) {
                    imageArray.push(product.image);
                }
                return imageArray;
            }
        }

        // Fallback: use main image for all 3 slots
        return [product.image, product.image, product.image];
    })();

    if (!isOpen) return null;

    const handleAddToCart = () => {
        addToCart(product.name, product.price);
        onClose();
    };

    return (
        <div className="product-modal-overlay" onClick={onClose}>
            <div className="product-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="product-modal-close" onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="product-modal-grid">
                    {/* Image Gallery */}
                    <div className="product-modal-gallery">
                        <div className="product-modal-main-image">
                            <img src={images[selectedImage]} alt={product.name} />
                        </div>
                        <div className="product-modal-thumbnails">
                            {images.map((img, index) => (
                                <button
                                    key={index}
                                    className={`product-modal-thumbnail ${selectedImage === index ? 'active' : ''}`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <img src={img} alt={`${product.name} view ${index + 1}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="product-modal-info">
                        <h2 className="product-modal-title">{product.name}</h2>
                        <p className="product-modal-description">
                            {product.description || generateDescription(product.name)}
                        </p>
                        <div className="product-modal-price">₹{product.price}</div>
                        <button className="product-modal-add-to-cart" onClick={handleAddToCart}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
