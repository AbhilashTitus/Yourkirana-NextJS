import Link from 'next/link';
import React from 'react';

export default function Footer() {
    return (
        <footer>
            <div className="footer-wrapper">
                <div className="footer-col">
                    <div className="logo">Your<span>Kirana</span></div>
                    <p className="muted">
                        Delivering essentials from local stores to your doorstep. Simple, fast, and reliable shopping experience.
                    </p>
                </div>

                <div className="footer-col">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/categories">Categories</Link></li>
                        <li><Link href="/seller">Seller Onboarding</Link></li>
                        <li><Link href="/about-advantage">About & Advantage</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Legal</h4>
                    <ul>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/terms">Terms & Conditions</Link></li>
                        <li><Link href="/privacy">Privacy Policy</Link></li>
                        <li><Link href="/refund">Refund Policy</Link></li>
                        <li><Link href="/chargeback">Chargeback Policy</Link></li>
                        <li><Link href="/shipping">Shipping Policy</Link></li>
                        <li><Link href="/delivery">Delivery Policy</Link></li>
                        <li><Link href="/cancellation">Cancellation Policy</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Contact</h4>
                    <ul>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: 'var(--mint)' }}>
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            <Link href="/contact">Send us a Message</Link>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: 'var(--mint)' }}>
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            <a href="mailto:support@yourkirana.in">support@yourkirana.in</a>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: 'var(--mint)' }}>
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            <a href="tel:+917619559128">+91 7619559128</a>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '3px', color: 'var(--mint)' }}>
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>
                                Aurevia Technologies Pvt Ltd<br />
                                18/1 4th Cross, 2nd Floor, <br /> Rahmath Nagar, R.T. Nagar, Bangalore, Karnataka <br />
                                India - 560032
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                © 2025 YourKirana • Aurevia Technologies Pvt Ltd • Bangalore
            </div>
        </footer >
    );
}
