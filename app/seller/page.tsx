'use client';

import { useEffect } from 'react';
import SellerForm from "@/components/SellerForm";

export default function SellerPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main>
            <section className="signup-hero">
                <div className="container">
                    <h1 className="title">Partner with YourKirana</h1>
                    <p className="lead">
                        Join our neighbourhood fulfilment network. Open to kirana stores and local suppliers.
                        Fast onboarding, fair margins, timely payouts.
                    </p>
                </div>
            </section>

            <section className="section" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
                <div className="container">
                    {/* Benefits Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '32px',
                        maxWidth: '1100px',
                        margin: '0 auto 64px'
                    }}>
                        <div className="feature-card" style={{ textAlign: 'center', padding: '40px 32px' }}>
                            <div style={{
                                width: '56px',
                                height: '56px',
                                background: 'linear-gradient(135deg, #06C270, #059C5A)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 20px',
                                fontSize: '24px'
                            }}>
                                ⚡
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', fontWeight: '600' }}>48h Review</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
                                Quick approval process to get you started fast
                            </p>
                        </div>

                        <div className="feature-card" style={{ textAlign: 'center', padding: '40px 32px' }}>
                            <div style={{
                                width: '56px',
                                height: '56px',
                                background: 'linear-gradient(135deg, #06C270, #059C5A)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 20px',
                                fontSize: '24px'
                            }}>
                                💰
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', fontWeight: '600' }}>Weekly Payouts</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
                                Regular and transparent payment schedule
                            </p>
                        </div>

                        <div className="feature-card" style={{ textAlign: 'center', padding: '40px 32px' }}>
                            <div style={{
                                width: '56px',
                                height: '56px',
                                background: 'linear-gradient(135deg, #06C270, #059C5A)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 20px',
                                fontSize: '24px'
                            }}>
                                🚀
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', fontWeight: '600' }}>Local Network</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
                                Reliable delivery infrastructure in your area
                            </p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '48px',
                        maxWidth: '900px',
                        margin: '0 auto 64px',
                        padding: '48px 0',
                        borderTop: '1px solid var(--border-light)',
                        borderBottom: '1px solid var(--border-light)'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--mint)', marginBottom: '8px', letterSpacing: '-0.03em' }}>100+</div>
                            <div style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)' }}>Active Sellers</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--mint)', marginBottom: '8px', letterSpacing: '-0.03em' }}>100k+</div>
                            <div style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)' }}>Monthly Orders</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--mint)', marginBottom: '8px', letterSpacing: '-0.03em' }}>48hrs</div>
                            <div style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)' }}>Onboarding SLA</div>
                        </div>
                    </div>

                    {/* Form */}
                    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '12px', letterSpacing: '-0.02em' }}>
                                Start Your Journey
                            </h2>
                            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                Fill out the form below and we'll get back to you within 48 hours
                            </p>
                        </div>
                        <SellerForm />
                    </div>
                </div>
            </section>
        </main>
    );
}
