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
                        <li><Link href="/shipping">Shipping Policy</Link></li>
                        <li><Link href="/delivery">Delivery Policy</Link></li>
                        <li><Link href="/cancellation">Cancellation Policy</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Contact</h4>
                    <ul>
                        <li><Link href="/contact">Contact Us</Link></li>
                        <li><a href="mailto:support@yourkirana.in">support@yourkirana.in</a></li>
                        <li><a href="tel:+917619559128">Tel: +91 7619559128</a></li>
                        <li> Aurevia Technologies Pvt Ltd<br />
                            18/1 4th Cross, 2nd Floor, <br /> Rahmath Nagar, R.T. Nagar, Bangalore, Karnataka <br />
                            India - 560032</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                © 2025 YourKirana • Aurevia Technologies Pvt Ltd • Bangalore
            </div>
        </footer >
    );
}
