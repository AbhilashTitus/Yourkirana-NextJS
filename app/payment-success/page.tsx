"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface PaymentDetails {
    orderId: string;
    paymentId: string;
    amount: number;
    items: any[];
}

export default function PaymentSuccessPage() {
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);

    useEffect(() => {
        // Get payment details from localStorage
        const details = localStorage.getItem('payment_success');
        if (details) {
            setPaymentDetails(JSON.parse(details));
            // Clear after reading
            localStorage.removeItem('payment_success');
        }
    }, []);

    if (!paymentDetails) {
        return (
            <main className="cart-page">
                <div className="cart-content">
                    <div className="empty-cart">
                        <div className="empty-cart-icon">ℹ️</div>
                        <h2>No Payment Information Found</h2>
                        <p>Unable to retrieve payment details.</p>
                        <Link href="/" className="btn-shop">Go to Homepage</Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="cart-page">
            <div className="cart-content">
                <div className="payment-success-container" style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    textAlign: 'center',
                    padding: '40px 20px'
                }}>
                    <div style={{
                        fontSize: '80px',
                        marginBottom: '20px',
                        animation: 'bounce 1s ease-in-out'
                    }}>✔️</div>

                    <h1 style={{
                        fontSize: '2rem',
                        marginBottom: '10px',
                        color: 'var(--mint)'
                    }}>Payment Successful!</h1>

                    <p className="muted" style={{ marginBottom: '30px' }}>
                        Thank you for your order. Your payment has been processed successfully.
                    </p>

                    <div style={{
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        padding: '30px',
                        marginBottom: '30px',
                        textAlign: 'left'
                    }}>
                        <h3 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Order Details</h3>

                        <div style={{
                            display: 'grid',
                            gap: '12px',
                            fontSize: '0.95rem'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                paddingBottom: '12px',
                                borderBottom: '1px solid var(--border)'
                            }}>
                                <span style={{ color: 'var(--muted)' }}>Order ID:</span>
                                <span style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                                    {paymentDetails.orderId}
                                </span>
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                paddingBottom: '12px',
                                borderBottom: '1px solid var(--border)'
                            }}>
                                <span style={{ color: 'var(--muted)' }}>Payment ID:</span>
                                <span style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                                    {paymentDetails.paymentId}
                                </span>
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                paddingBottom: '12px',
                                borderBottom: '1px solid var(--border)'
                            }}>
                                <span style={{ color: 'var(--muted)' }}>Items:</span>
                                <span>{paymentDetails.items.length}</span>
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                paddingTop: '8px'
                            }}>
                                <span>Total Paid:</span>
                                <span style={{ color: 'var(--mint)' }}>
                                    ₹ {paymentDetails.amount.toFixed(0)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: '15px',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <Link
                            href="/categories"
                            className="btn-shop"
                            style={{ textDecoration: 'none' }}
                        >
                            Continue Shopping
                        </Link>
                        <Link
                            href="/"
                            className="checkout-btn"
                            style={{
                                textDecoration: 'none',
                                background: 'transparent',
                                border: '2px solid var(--mint)',
                                color: 'var(--mint)'
                            }}
                        >
                            Go to Homepage
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes bounce {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
            `}</style>
        </main>
    );
}
