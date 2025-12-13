'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SellerDashboard() {
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
        <main className="cart-page">
            <div className="cart-content">
                <div className="cart-page-header">
                    <h1>Seller Dashboard</h1>
                    <p className="muted">Manage your store and business details</p>
                </div>

                <div style={{ display: 'grid', gap: '30px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>

                    {/* Seller ID Card */}
                    <div className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <h2 style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--text-secondary)' }}>Seller ID</h2>
                            <div style={{
                                background: 'var(--bg-soft)',
                                border: '2px dashed var(--mint)',
                                borderRadius: '12px',
                                padding: '16px',
                                textAlign: 'center',
                                marginTop: '8px'
                            }}>
                                <div style={{
                                    fontSize: '2rem',
                                    fontWeight: '800',
                                    color: 'var(--mint)',
                                    fontFamily: 'monospace',
                                    wordBreak: 'break-all'
                                }}>
                                    {sellerDetails.sellerId}
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <button
                                className="btn"
                                style={{ flex: 1, minWidth: '140px' }}
                                onClick={() => {
                                    navigator.clipboard.writeText(sellerDetails.sellerId);
                                    alert('Seller ID copied to clipboard!');
                                }}
                            >
                                Copy ID
                            </button>
                            <Link href="/" className="btn btn-primary" style={{ flex: 1, minWidth: '140px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                                Go to Home
                            </Link>
                        </div>
                    </div>

                    {/* Business Details */}
                    <div className="glass-card" style={{ padding: '30px' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            🏪 Business Details
                        </h2>
                        <div style={{ display: 'grid', gap: '15px' }}>
                            <div>
                                <label className="label">Store Name</label>
                                <div className="input" style={{ background: 'var(--bg-secondary)', border: 'none' }}>{sellerDetails.storeName}</div>
                            </div>
                            <div>
                                <label className="label">Owner Name</label>
                                <div className="input" style={{ background: 'var(--bg-secondary)', border: 'none' }}>{sellerDetails.ownerName}</div>
                            </div>
                            <div>
                                <label className="label">GST Number</label>
                                <div className="input" style={{ background: 'var(--bg-secondary)', border: 'none' }}>{sellerDetails.gstNumber || 'N/A'}</div>
                            </div>
                            <div>
                                <label className="label">Address</label>
                                <div className="input" style={{ background: 'var(--bg-secondary)', border: 'none' }}>{sellerDetails.address}</div>
                            </div>
                            <div>
                                <label className="label">Categories</label>
                                <div className="input" style={{ background: 'var(--bg-secondary)', border: 'none' }}>{sellerDetails.categories || 'N/A'}</div>
                            </div>
                        </div>
                    </div>

                    {/* Contact & Banking */}
                    <div className="glass-card" style={{ padding: '30px' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            📞 Contact & Banking
                        </h2>
                        <div style={{ display: 'grid', gap: '15px' }}>
                            <div>
                                <label className="label">Phone Number</label>
                                <div className="input" style={{ background: 'var(--bg-secondary)', border: 'none' }}>{sellerDetails.phone}</div>
                            </div>
                            <div>
                                <label className="label">Email Address</label>
                                <div className="input" style={{ background: 'var(--bg-secondary)', border: 'none' }}>{sellerDetails.email || 'N/A'}</div>
                            </div>
                            <div>
                                <label className="label">Bank Account</label>
                                <div className="input" style={{ background: 'var(--bg-secondary)', border: 'none' }}>{sellerDetails.accountNumber || 'N/A'}</div>
                            </div>
                            <div>
                                <label className="label">IFSC Code</label>
                                <div className="input" style={{ background: 'var(--bg-secondary)', border: 'none' }}>{sellerDetails.ifscCode || 'N/A'}</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
