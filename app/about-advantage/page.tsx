'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function AboutPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main>
            <section className="signup-hero">
                <div className="container">
                    <h1 className="title">About YourKirana</h1>
                    <p className="lead">
                        Built around neighbourhood partners — kirana stores and local producers.
                        We focus on predictable operations, transparent payouts, and
                        bank-friendly processes.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="section" style={{ paddingTop: '64px', paddingBottom: '0' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '48px',
                        maxWidth: '900px',
                        margin: '0 auto',
                        padding: '48px 0',
                        borderTop: '1px solid var(--border-light)',
                        borderBottom: '1px solid var(--border-light)'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--mint)', marginBottom: '8px', letterSpacing: '-0.03em' }}>100+</div>
                            <div style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)' }}>Neighbourhoods Served</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--mint)', marginBottom: '8px', letterSpacing: '-0.03em' }}>10k+</div>
                            <div style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)' }}>Monthly Deliveries</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--mint)', marginBottom: '8px', letterSpacing: '-0.03em' }}>99.9%</div>
                            <div style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)' }}>On-Time Success</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '16px', letterSpacing: '-0.03em' }}>
                            Why Choose Us
                        </h2>
                        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            We combine local expertise with modern technology to deliver exceptional service
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '24px',
                        maxWidth: '1200px',
                        margin: '0 auto'
                    }}>
                        <div className="feature-card" style={{ padding: '40px 28px' }}>
                            <div style={{
                                width: '56px',
                                height: '56px',
                                background: 'linear-gradient(135deg, #06C270, #059C5A)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '20px',
                                fontSize: '24px'
                            }}>
                                🏪
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', fontWeight: '600' }}>Neighbourhood-First Network</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7' }}>
                                Partner kiranas and individual producers make sourcing local and familiar.
                            </p>
                        </div>

                        <div className="feature-card" style={{ padding: '40px 28px' }}>
                            <div style={{
                                width: '56px',
                                height: '56px',
                                background: 'linear-gradient(135deg, #06C270, #059C5A)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '20px',
                                fontSize: '24px'
                            }}>
                                📋
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', fontWeight: '600' }}>Predictable Operations</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7' }}>
                                Planned delivery windows and clear order lifecycle.
                            </p>
                        </div>

                        <div className="feature-card" style={{ padding: '40px 28px' }}>
                            <div style={{
                                width: '56px',
                                height: '56px',
                                background: 'linear-gradient(135deg, #06C270, #059C5A)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '20px',
                                fontSize: '24px'
                            }}>
                                🔐
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', fontWeight: '600' }}>Digital Traceability</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7' }}>
                                Cashless payments with straightforward invoicing and status tracking.
                            </p>
                        </div>

                        <div className="feature-card" style={{ padding: '40px 28px' }}>
                            <div style={{
                                width: '56px',
                                height: '56px',
                                background: 'linear-gradient(135deg, #06C270, #059C5A)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '20px',
                                fontSize: '24px'
                            }}>
                                💳
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', fontWeight: '600' }}>Bank-Friendly Process</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7' }}>
                                Documentation and flows that align with integrations and audits.
                            </p>
                        </div>
                    </div>

                    {/* Mobile responsive - 2 columns */}
                    <style jsx>{`
                        @media (max-width: 1024px) {
                            div[style*="repeat(4, 1fr)"] {
                                grid-template-columns: repeat(2, 1fr) !important;
                            }
                        }
                        @media (max-width: 600px) {
                            div[style*="repeat(4, 1fr)"] {
                                grid-template-columns: 1fr !important;
                            }
                        }
                    `}</style>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section" style={{ paddingTop: '0', paddingBottom: '80px' }}>
                <div className="container">
                    <div className="feature-card" style={{
                        maxWidth: '800px',
                        margin: 'auto',
                        textAlign: 'center',
                        padding: '56px 48px',
                        background: 'linear-gradient(135deg, #F0FDF7 0%, #ffffff 100%)',
                        border: '1px solid var(--mint)'
                    }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                            Partner with Us
                        </h2>
                        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 32px' }}>
                            Join our network of neighbourhood partners. Fast onboarding, transparent payouts, and a reliable local delivery network.
                        </p>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Link className="btn btn-primary" href="/seller" style={{ padding: '16px 32px', fontSize: '1.0625rem' }}>
                                Start Onboarding
                            </Link>
                            <a href="mailto:support@yourkirana.in" style={{
                                color: 'var(--text-secondary)',
                                fontSize: '1rem',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                Questions? <span style={{ color: 'var(--mint)', fontWeight: '600' }}>support@yourkirana.in</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
