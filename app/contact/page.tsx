"use client";

import { useState, useEffect } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        alert('Thank you for contacting us! We will get back to you within 24 hours.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main>
            <section className="signup-hero">
                <div className="container">
                    <h1 className="title">Contact Us</h1>
                    <p className="lead">
                        We're here to help! Reach out to us anytime
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gap: '40px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', maxWidth: '1000px', margin: 'auto' }}>
                        {/* Contact Information */}
                        <div>
                            <div className="feature-card">
                                <h3 style={{ marginBottom: '20px' }}>Get In Touch</h3>
                                <p style={{ marginBottom: '30px', lineHeight: '1.8', color: '#667085' }}>
                                    Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                                </p>

                                <div style={{ marginBottom: '25px' }}>
                                    <h4 style={{ fontSize: '1rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #06C270, #059C5A)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>✉</span>
                                        Email
                                    </h4>
                                    <p style={{ color: '#667085', marginLeft: '30px' }}>
                                        <a href="mailto:support@yourkirana.in" style={{ color: 'var(--mint)' }}>support@yourkirana.in</a>
                                    </p>
                                </div>

                                {/* <div style={{ marginBottom: '25px' }}>
                                    <h4 style={{ fontSize: '1rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #06C270, #059C5A)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>☎</span>
                                        Phone
                                    </h4>
                                    <p style={{ color: '#667085', marginLeft: '30px' }}>
                                        <a href="tel:+919999999999" style={{ color: 'var(--mint)' }}>+91 99999 99999</a><br />
                                        <span style={{ fontSize: '0.9rem' }}>Mon-Sun: 9:00 AM - 9:00 PM IST</span>
                                    </p>
                                </div> */}

                                <div style={{ marginBottom: '25px' }}>
                                    <h4 style={{ fontSize: '1rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #06C270, #059C5A)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>📍</span>
                                        Address
                                    </h4>
                                    <p style={{ color: '#667085', marginLeft: '30px', lineHeight: '1.8' }}>
                                        Aurevia Technologies Pvt Ltd<br />
                                        18/1 4th Cross, 2nd Floor, <br />Rahmath Nagar, R.T. Nagar, Bangalore, Karnataka <br />
                                        India - 560032
                                    </p>
                                </div>

                                <div style={{ marginBottom: '25px' }}>
                                    <h4 style={{ fontSize: '1rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #06C270, #059C5A)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🕐</span>
                                        Business Hours
                                    </h4>
                                    <p style={{ color: '#667085', marginLeft: '30px', lineHeight: '1.8' }}>
                                        Monday - Sunday<br />
                                        9:00 AM - 9:00 PM IST
                                    </p>
                                </div>
                            </div>

                            <div className="feature-card" style={{ marginTop: '20px' }}>
                                <h3 style={{ marginBottom: '15px' }}>Quick Support</h3>
                                <ul style={{ lineHeight: '2', marginLeft: '20px', color: '#667085' }}>
                                    <li>Order tracking and status</li>
                                    <li>Returns and refunds</li>
                                    <li>Payment issues</li>
                                    <li>Product inquiries</li>
                                    <li>Seller onboarding</li>
                                    <li>Technical support</li>
                                </ul>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <div className="feature-card">
                                <h3 style={{ marginBottom: '20px' }}>Send Us a Message</h3>
                                <form onSubmit={handleSubmit} className="form">
                                    <div>
                                        <label className="label">Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="input"
                                            required
                                            placeholder="Your full name"
                                        />
                                    </div>

                                    <div>
                                        <label className="label">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="input"
                                            required
                                            placeholder="your.email@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="label">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="input"
                                            placeholder="+91 XXXXX XXXXX"
                                        />
                                    </div>

                                    <div>
                                        <label className="label">Subject *</label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="input"
                                            required
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="order">Order Related</option>
                                            <option value="return">Returns & Refunds</option>
                                            <option value="payment">Payment Issues</option>
                                            <option value="product">Product Inquiry</option>
                                            <option value="seller">Seller Onboarding</option>
                                            <option value="technical">Technical Support</option>
                                            <option value="feedback">Feedback</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="label">Message *</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="input"
                                            required
                                            rows={6}
                                            placeholder="Please describe your inquiry in detail..."
                                            style={{ resize: 'vertical' }}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="feature-card" style={{ maxWidth: '1000px', margin: '40px auto 0', textAlign: 'center' }}>
                        <h3 style={{ marginBottom: '15px' }}>Need Immediate Assistance?</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8', color: '#667085' }}>
                            For urgent matters
                            email us at <a href="mailto:support@yourkirana.in" style={{ color: 'var(--mint)', fontWeight: '600' }}>support@yourkirana.in</a>
                        </p>
                        <p style={{ fontSize: '0.9rem', color: '#667085' }}>
                            We typically respond to all inquiries within 24 hours during business days.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
