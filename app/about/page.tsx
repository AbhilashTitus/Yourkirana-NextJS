'use client';

import { useEffect } from 'react';

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
                        Connecting local stores with customers across India
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="feature-card" style={{ maxWidth: '900px', margin: 'auto' }}>
                        <h2>Who We Are</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            YourKirana is a leading e-commerce platform operated by <strong>Aurevia Technologies Pvt Ltd</strong>,
                            headquartered in Bangalore, India. We bridge the gap between traditional kirana stores and modern consumers,
                            enabling local businesses to thrive in the digital economy while providing customers with convenient access
                            to daily essentials.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>Our Mission</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            To empower local retailers by providing them with technology and infrastructure to compete in the digital
                            marketplace, while ensuring customers receive fresh, quality products delivered quickly to their doorstep.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>Our Vision</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            To become India's most trusted hyperlocal e-commerce platform, supporting millions of local stores and
                            serving communities across the country with reliability and care.
                        </p>

                        <h2 style={{ marginTop: '30px', marginBottom: '20px' }}>Company Information</h2>
                        <div style={{
                            padding: '24px 30px',
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}>
                            <div>
                                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Legal Name</div>
                                <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#0f172a' }}>Aurevia Technologies Pvt Ltd</div>
                            </div>
                            
                            <div style={{ height: '1px', background: '#e2e8f0', width: '100%' }}></div>

                            <div>
                                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>Registered Office</div>
                                <div style={{ 
                                    fontSize: '1.0625rem', 
                                    color: '#334155', 
                                    lineHeight: '1.7'
                                }}>
                                    <p style={{ fontWeight: '600', color: '#0f172a', margin: '0 0 6px 0' }}>Aurevia Technologies Pvt Ltd</p>
                                    <p style={{ margin: '0' }}>18/1 4th Cross, 2nd Floor,</p>
                                    <p style={{ margin: '0' }}>Rahmath Nagar, R.T. Nagar, Bangalore, Karnataka</p>
                                    <p style={{ margin: '6px 0 0 0', fontWeight: '600', color: '#0f172a' }}>India - 560032</p>
                                </div>
                            </div>
                        </div>

                        <h2 style={{ marginTop: '30px' }}>Why Choose Us</h2>
                        <div className="features" style={{ marginTop: '20px' }}>
                            <div className="feature">
                                <h4>🚀 Fast Delivery</h4>
                                <p>Quick delivery from local stores in your area</p>
                            </div>
                            <div className="feature">
                                <h4>🛡️ Quality Assured</h4>
                                <p>Fresh products from verified local retailers</p>
                            </div>
                            <div className="feature">
                                <h4>💰 Best Prices</h4>
                                <p>Competitive pricing with regular offers</p>
                            </div>
                            <div className="feature">
                                <h4>🤝 Support Local</h4>
                                <p>Every purchase supports your neighborhood stores</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
