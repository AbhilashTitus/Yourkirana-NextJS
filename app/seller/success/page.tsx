"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SellerSuccessPage() {
    const [sellerDetails, setSellerDetails] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const details = localStorage.getItem('yk_new_seller');
        if (!details) {
            router.push('/seller');
            return;
        }
        setSellerDetails(JSON.parse(details));
    }, [router]);

    if (!sellerDetails) return null;

    return (
        <main style={{ background: 'var(--bg-soft)', minHeight: '100vh', padding: '40px 20px' }}>
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{
                    background: '#fff',
                    borderRadius: '24px',
                    padding: '48px',
                    textAlign: 'center',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #06C270, #059C5A)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '40px',
                        margin: '0 auto 24px',
                        boxShadow: '0 8px 16px rgba(6, 194, 112, 0.2)'
                    }}>
                        🎉
                    </div>

                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        marginBottom: '16px',
                        color: 'var(--text)'
                    }}>
                        Welcome Aboard!
                    </h1>

                    <p style={{
                        fontSize: '1.125rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '40px',
                        lineHeight: '1.6',
                        maxWidth: '600px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                        Your application has been submitted successfully. Please save your Seller ID for future reference.
                    </p>

                    <div style={{
                        background: 'var(--bg-soft)',
                        border: '2px dashed var(--mint)',
                        borderRadius: '16px',
                        padding: '32px',
                        marginBottom: '40px',
                        position: 'relative'
                    }}>
                        <div style={{
                            fontSize: '0.875rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: 'var(--text-secondary)',
                            marginBottom: '8px',
                            fontWeight: '600'
                        }}>
                            Your Unique Seller ID
                        </div>
                        <div style={{
                            fontSize: '3rem',
                            fontWeight: '800',
                            color: 'var(--mint)',
                            letterSpacing: '-0.02em',
                            fontFamily: 'monospace'
                        }}>
                            {sellerDetails.sellerId}
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: '16px',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <Link href="/seller/dashboard" className="btn btn-primary" style={{ minWidth: '200px' }}>
                            Go to Seller Dashboard
                        </Link>
                        <button
                            className="btn"
                            style={{
                                background: '#fff',
                                border: '1px solid var(--border)',
                                minWidth: '200px'
                            }}
                            onClick={() => {
                                navigator.clipboard.writeText(sellerDetails.sellerId);
                                alert('Seller ID copied to clipboard!');
                            }}
                        >
                            Copy ID
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
