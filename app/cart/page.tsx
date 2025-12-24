"use client";

import { useCart, CartItem } from "@/context/CartContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

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

// Declare Razorpay type
declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart, cartTotal, totalItems } = useCart();
    const { user, isAuthenticated, deductCoins } = useAuth();
    const { showToast } = useToast();
    const [isProcessing, setIsProcessing] = useState(false);
    const [useCoins, setUseCoins] = useState(false);
    const router = useRouter();

    // Calculate Coin Logic
    const membershipTier = user?.membershipTier || 'Free';
    const limitPercentage = membershipTier === 'Gold' ? 0.5 : 0.3;
    const maxRedeemableByTier = cartTotal * limitPercentage;
    const userCoins = user?.coins || 0;

    // The actual amount to redeem is the minimum of user's coins and the tier limit
    // But we also can't redeem more than the cart total (though tier limit naturally handles that < 100%)
    const redeemableAmount = Math.min(userCoins, maxRedeemableByTier);

    const finalAmount = useCoins ? cartTotal - redeemableAmount : cartTotal;

    // Load Razorpay script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleCheckout = async () => {
        // 1. Check Authentication
        if (!isAuthenticated) {
            router.push('/login?redirect=/cart');
            return;
        }

        // 2. Check Address
        if (!user?.address) {
            if (confirm("Please add a delivery address to proceed.")) {
                router.push('/account');
            }
            return;
        }

        if (isProcessing) return;

        setIsProcessing(true);

        try {
            // Collect unique Seller IDs
            const sellerIds = Array.from(new Set(cart.map(item => (item as any).sellerId).filter(Boolean)));

            // Create order on backend
            // NOTE: We are sending the FINAL discounted amount
            const response = await fetch('/api/razorpay/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: finalAmount,
                    sellerIds
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create order');
            }

            // Configure Razorpay options
            const options = {
                key: data.keyId,
                amount: data.amount, // Amount from backend (should match finalAmount * 100)
                currency: data.currency,
                name: 'YourKirana',
                description: 'Order Payment',
                order_id: data.orderId,
                handler: async function (response: any) {
                    // Verify payment on backend
                    try {
                        const verifyResponse = await fetch('/api/razorpay/verify-payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        });

                        const verifyData = await verifyResponse.json();

                        if (verifyResponse.ok && verifyData.success) {
                            // Payment successful

                            // Deduct coins if used
                            if (useCoins && redeemableAmount > 0) {
                                deductCoins(redeemableAmount); // Note: redeemableAmount is what we calculated locally. 
                                // Ideally backend should handle this to be secure, but for this impl we do it here.
                            }

                            localStorage.setItem('payment_success', JSON.stringify({
                                orderId: verifyData.orderId,
                                paymentId: verifyData.paymentId,
                                amount: finalAmount,
                                items: cart,
                                coinsRedeemed: useCoins ? redeemableAmount : 0
                            }));

                            // Clear cart
                            cart.forEach(item => removeFromCart(item.name));

                            // Redirect to success page
                            router.push('/payment-success');
                        } else {
                            throw new Error('Payment verification failed');
                        }
                    } catch (error) {
                        console.error('Verification error:', error);
                        showToast('Payment verification failed. Please contact support.', 'error');
                        setIsProcessing(false);
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.address.phone,
                },
                theme: {
                    color: '#10b981',
                },
                modal: {
                    ondismiss: function () {
                        setIsProcessing(false);
                    }
                }
            };

            // Open Razorpay checkout
            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error('Checkout error:', error);
            showToast(error instanceof Error ? error.message : 'Failed to initiate checkout', 'error');
            setIsProcessing(false);
        }
    };

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
                                    <div className="cart-item-image">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'contain',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                        ) : (
                                            getIcon(item.name)
                                        )}
                                    </div>
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

                            {/* Coin Redemption Section */}
                            {isAuthenticated && userCoins > 0 && (
                                <div style={{
                                    marginBottom: '20px',
                                    padding: '16px',
                                    background: 'var(--bg-soft)',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border)'
                                }}>
                                    <div className="flex justify-between items-center mb-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontWeight: 600, color: 'var(--text)' }}>Use Kirana Coins</span>
                                        <span className="pill" style={{ fontSize: '0.8rem', padding: '4px 10px', background: 'var(--mint-50)', color: 'var(--mint-700)' }}>
                                            Bal: {userCoins}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                                        You can pay up to {(limitPercentage * 100).toFixed(0)}% with coins ({membershipTier} Plan).
                                    </p>
                                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
                                        <input
                                            type="checkbox"
                                            checked={useCoins}
                                            onChange={(e) => setUseCoins(e.target.checked)}
                                            style={{ width: '16px', height: '16px', accentColor: 'var(--mint)' }}
                                        />
                                        <span style={{ fontSize: '0.95rem', color: 'var(--text)' }}>
                                            Redeem {Math.floor(redeemableAmount)} coins
                                        </span>
                                    </label>
                                </div>
                            )}

                            <div className="summary-row">
                                <span>Subtotal ({totalItems} items)</span>
                                <span>₹ {cartTotal.toFixed(0)}</span>
                            </div>

                            {useCoins && (
                                <div className="summary-row text-green-600">
                                    <span>Coin Discount</span>
                                    <span>- ₹ {Math.floor(redeemableAmount)}</span>
                                </div>
                            )}

                            <div className="summary-row">
                                <span>Delivery Charges</span>
                                <span style={{ color: 'var(--mint)' }}>FREE</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>₹ {Math.ceil(finalAmount)}</span>
                            </div>
                            <button
                                className="checkout-btn"
                                onClick={handleCheckout}
                                disabled={isProcessing}
                                style={{ opacity: isProcessing ? 0.7 : 1, cursor: isProcessing ? 'not-allowed' : 'pointer' }}
                            >
                                {isProcessing ? 'Processing...' : `Pay ₹${Math.ceil(finalAmount)}`}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
