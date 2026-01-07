"use client";

import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Script from "next/script";

// Pricing Plans Data
const PLANS = [
    {
        id: "free",
        name: "Free",
        price: 0,
        color: "gray",
        features: [
            "Access to marketplace",
            "Standard pricing",
            "No bonus coins",
            "Basic support"
        ],
        coinLimit: "30%"
    },
    {
        id: "silver",
        name: "Silver",
        price: 100,
        color: "blue", // Will map to CSS vars or classes
        features: [
            "Extra Kirana Coins on top-ups",
            "Priority customer support",
            "Early access to offers",
            "Standard delivery speed"
        ],
        coinLimit: "30%"
    },
    {
        id: "gold",
        name: "Gold",
        price: 200,
        color: "gold",
        features: [
            "Higher Kirana Coin rewards",
            "Exclusive discounts",
            "Faster refunds",
            "Premium support badge",
        ],
        coinLimit: "50%"
    }
];

export default function MembershipPage() {
    const { user, login, upgradeMembership, isAuthenticated } = useAuth();
    const { showToast } = useToast();
    const router = useRouter();
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

    const handleSubscribe = async (plan: typeof PLANS[0]) => {
        if (!isAuthenticated) {
            showToast("Please login to subscribe", "error");
            router.push("/login?redirect=/membership");
            return;
        }

        if (user?.membershipTier === plan.name) {
            showToast("You are already on this plan", "info");
            return;
        }

        if (plan.price === 0) {
            // Downgrade to free (logic can be complex, simplifying for now)
            showToast("Cannot manually downgrade to Free plan yet. Contact support.", "info");
            return;
        }

        setLoadingPlan(plan.name);

        try {
            // 1. Create Order
            const res = await fetch("/api/razorpay/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: plan.price,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to create order");
            }

            // 2. Open Razorpay
            const options = {
                key: data.keyId,
                amount: data.amount,
                currency: data.currency,
                name: "YourKirana Membership",
                description: `${plan.name} Plan Subscription`,
                order_id: data.orderId,
                handler: async function (response: any) {
                    // 3. Verify Payment
                    const verifyRes = await fetch("/api/razorpay/verify-payment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        }),
                    });

                    const verifyData = await verifyRes.json();

                    if (verifyRes.ok) {
                        // 4. Upgrade User
                        upgradeMembership(plan.name as 'Silver' | 'Gold');
                        showToast(`Welcome to ${plan.name} Membership!`, "success");
                    } else {
                        showToast("Payment verification failed", "error");
                    }
                    setLoadingPlan(null);
                },
                prefill: {
                    name: user?.name,
                    email: user?.email,
                    contact: user?.address?.phone,
                },
                theme: {
                    color: "#06C270", // Mint color
                },
            };

            const rzp1 = new (window as any).Razorpay(options);
            rzp1.on("payment.failed", function (response: any) {
                showToast("Payment Failed: " + response.error.description, "error");
                setLoadingPlan(null);
            });
            rzp1.open();

        } catch (error: any) {
            console.error("Subscription error:", error);
            showToast(error.message || "Something went wrong", "error");
            setLoadingPlan(null);
        }
    };

    return (
        <main className="min-h-screen pb-20">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            {/* Hero Section */}
            <section className="page-hero">
                <div className="container">
                    <span className="pill" style={{ marginBottom: '16px', background: 'var(--mint-50)', color: 'var(--mint-700)' }}>
                        Premium Plans
                    </span>
                    <h1 className="title">
                        Upgrade Your<span style={{ color: 'var(--mint)' }}>Kirana Experience</span>
                    </h1>
                    <p className="lead">
                        Get exclusive benefits, bonus coins, and priority support with our membership plans.
                        Save more on every order.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="section" style={{ paddingTop: '40px' }}>
                <div className="container">
                    {/* Use 'flex flex-col' for mobile (stacking) and 'md:grid' for desktop. 
                        Avoid using the class 'grid' directly as it is globally styled to be 2 columns on mobile in globals.css */}
                    <div className="flex flex-col md:grid md:grid-cols-3 gap-8">
                        {PLANS.map((plan) => {
                            const isCurrent = user?.membershipTier === plan.name;
                            const isLoading = loadingPlan === plan.name;
                            const isGold = plan.name === "Gold";

                            return (
                                <div
                                    key={plan.id}
                                    className={`feature-card ${isGold ? 'border-yellow-400 shadow-xl' : ''}`}
                                    style={{
                                        position: 'relative',
                                        transform: isGold ? 'scale(1.05)' : 'none',
                                        borderColor: isGold ? '#FBBF24' : 'var(--border-light)',
                                        zIndex: isGold ? 10 : 1,
                                        padding: '32px'
                                    }}
                                >
                                    {isGold && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '-12px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            background: '#FBBF24',
                                            color: '#000',
                                            fontWeight: '700',
                                            padding: '4px 16px',
                                            borderRadius: '99px',
                                            fontSize: '0.85rem',
                                            boxShadow: '0 4px 12px rgba(251, 191, 36, 0.4)'
                                        }}>
                                            Best Value
                                        </div>
                                    )}

                                    <div className="text-center mb-6">
                                        <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', color: 'var(--text)' }}>{plan.name}</h3>
                                        <div className="flex justify-center items-baseline mb-2">
                                            <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text)' }}>₹{plan.price}</span>
                                            <span style={{ color: 'var(--text-secondary)', marginLeft: '4px' }}>/month</span>
                                        </div>
                                        {/* {plan.name === 'Free' && <p style={{ fontSize: '0.9rem', color: 'var(--mint)' }}>Forever Free</p>} */}
                                    </div>

                                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px' }}>
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start" style={{ marginBottom: '12px' }}>
                                                <span style={{
                                                    color: 'var(--mint)',
                                                    marginRight: '12px',
                                                    fontSize: '1.2rem',
                                                    lineHeight: '1'
                                                }}>✓</span>
                                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => handleSubscribe(plan)}
                                        disabled={isAuthenticated && (isCurrent || isLoading || (plan.name === 'Free' && user?.membershipTier !== 'Free'))}
                                        className={`btn ${isGold ? 'btn-primary' : ''}`}
                                        style={{
                                            width: '100%',
                                            justifyContent: 'center',
                                            background: isGold ? 'linear-gradient(135deg, #F59E0B, #D97706)' : (isCurrent ? 'var(--bg-soft)' : '#1F2937'),
                                            color: isCurrent ? 'var(--text-secondary)' : '#fff',
                                            border: isCurrent ? '1px solid var(--border)' : 'none',
                                            cursor: (isCurrent || isLoading) ? 'default' : 'pointer',
                                            opacity: isLoading ? 0.8 : 1
                                        }}
                                    >
                                        {isLoading ? "Processing..." :
                                            !isAuthenticated ? (plan.name === 'Free' ? "Sign Up Free" : "Subscribe Now") :
                                                isCurrent ? "Current Plan" :
                                                    plan.name === 'Free' ? "Downgrade" : "Subscribe Now"
                                        }
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
}
