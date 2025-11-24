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
                            YourKirana is a leading e-commerce platform operated by <strong>Equispark Trading Private Limited</strong>,
                            headquartered in New Delhi, India. We bridge the gap between traditional kirana stores and modern consumers,
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

                        <h2 style={{ marginTop: '30px' }}>Company Information</h2>
                        <ul style={{ lineHeight: '2', marginLeft: '20px' }}>
                            <li><strong>Legal Name:</strong> Equispark Trading Private Limited</li>
                            <li><strong>Registered Office:</strong> New Delhi, Karnataka, India</li>
                            <li><strong>Year of Establishment:</strong> 2024</li>
                            <li><strong>GSTIN:</strong> [To be updated]</li>
                            <li><strong>CIN:</strong> [To be updated]</li>
                        </ul>

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
