"use client";

import { useCart, CartItem } from "@/context/CartContext";
import Link from "next/link";

const productIcons: Record<string, string> = {
    "Diapers Small 20pc": "🧷", "Diapers Medium 20pc": "🧷", "Diapers Large 20pc": "🧷",
    "Baby Wipes 72pc": "🧻", "Baby Soap 75g": "🧼", "Baby Shampoo 200ml": "🧴",
    "Baby Lotion 200ml": "🧴", "Baby Oil 100ml": "🧴", "Baby Powder 200g": "🫧",
    "Feeding Bottle 250ml": "🍼", "Teether": "🎠", "Rattle": "🎵", "Sipper Cup": "🥤",
    "Rice Cereal 300g": "🍚", "Fruit Puree 100g": "🍎", "Baby Blanket": "🧣",
    "Baby Detergent 500ml": "🫧", "Diaper Rash Cream": "🧴", "Nail Scissors": "✂️",
    "Vitamin C 60 tablets": "🍊", "Multivitamin 30 tablets": "💊", "Protein Powder 1kg": "🏋️‍♂️",
    "ORS 200ml": "💧", "Electrolyte Sachets 5pc": "⚡", "Bandages 10pc": "🩹",
    "First Aid Kit": "⛑️", "Thermometer": "🌡️", "Pulse Oximeter": "💓",
    "Hand Sanitizer 500ml": "🧴", "N95 Mask 5pc": "😷", "Pain Relief Spray": "🧴",
    "Cold & Flu Syrup": "🤧", "Cough Drops 50g": "🍬", "Herbal Tea 100g": "🍵",
    "Green Tea 100g": "🍃", "Apple Cider Vinegar 500ml": "🍎", "Chyawanprash 1kg": "🌿",
    "Ayurvedic Oil 100ml": "🪔", "Steam Inhaler": "🌬️",
    "Onion 1kg": "🧅", "Tomato 1kg": "🍅", "Potato 1kg": "🥔", "Carrot 500g": "🥕",
    "Beans 500g": "🫛", "Spinach 1 bunch": "🌿", "Coriander 1 bunch": "🌱",
    "Banana 1 dozen": "🍌", "Apple 1kg": "🍎", "Orange 1kg": "🍊", "Grapes 500g": "🍇",
    "Pomegranate 500g": "🍎", "Mango 1kg": "🥭", "Papaya 1pc": "🍈", "Lemon 6pc": "🍋",
    "Cucumber 500g": "🥒", "Capsicum 500g": "🫑", "Garlic 250g": "🧄",
    "Ginger 250g": "🫚", "Coconut 1pc": "🥥"
};

function getIcon(name: string) {
    return productIcons[name] || "📦";
}

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart, cartTotal, totalItems } = useCart();

    return (
        <main className="cart-page">
            <div className="cart-content">
                <div className="cart-page-header">
                    <h1>Your Cart</h1>
                    <p className="muted">Review your items and proceed to checkout</p>
                </div>

                {cart.length === 0 ? (
                    <div className="empty-cart">
                        <div className="empty-cart-icon">🛒</div>
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't added any items to your cart yet.</p>
                        <Link href="/categories" className="btn-shop">Start Shopping</Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }} className="md:grid-cols-[1fr_400px]">
                        <div className="cart-items-list">
                            {cart.map((item: CartItem) => (
                                <div key={item.name} className="cart-item">
                                    <div className="cart-item-image">{getIcon(item.name)}</div>
                                    <div className="cart-item-details">
                                        <div className="cart-item-name">{item.name}</div>
                                        <div className="cart-item-price">₹ {item.price.toFixed(0)}</div>
                                        <div className="cart-item-controls">
                                            <div className="quantity-control">
                                                <button className="quantity-btn" onClick={() => updateQuantity(item.name, -1)}>−</button>
                                                <span className="quantity-value">{item.quantity}</span>
                                                <button className="quantity-btn" onClick={() => updateQuantity(item.name, 1)}>+</button>
                                            </div>
                                            <button className="remove-item" onClick={() => removeFromCart(item.name)}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary sticky top-[100px] h-fit">
                            <h3 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Order Summary</h3>
                            <div className="summary-row">
                                <span>Subtotal ({totalItems} items)</span>
                                <span>₹ {cartTotal.toFixed(0)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Delivery Charges</span>
                                <span style={{ color: 'var(--mint)' }}>FREE</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>₹ {cartTotal.toFixed(0)}</span>
                            </div>
                            <button className="checkout-btn" onClick={() => alert('Checkout functionality will be implemented soon!')}>
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
