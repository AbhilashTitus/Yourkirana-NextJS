import Link from 'next/link';

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
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Contact</h4>
                    <ul>
                        <li><Link href="/contact">Contact Us</Link></li>
                        <li><a href="mailto:support@yourkirana.in">support@yourkirana.in</a></li>
                        <li><a href="tel:+919999999999">+91 99999 99999</a></li>
                        <li>Bangalore, India</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                © 2025 YourKirana | Nexora Solutions Private Limited • Bangalore
            </div>
        </footer>
    );
}
