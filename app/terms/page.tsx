'use client';

import { useEffect } from 'react';

export default function TermsPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <main>
            <section className="signup-hero">
                <div className="container">
                    <h1 className="title">Terms & Conditions</h1>
                    <p className="lead">
                        Please read these terms carefully before using our services
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="feature-card" style={{ maxWidth: '900px', margin: 'auto' }}>

                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            By accessing and using YourKirana platform operated by Nexora Solutions Private Limited, you accept and agree to be bound by the terms and provisions of this agreement. This agreement is in accordance with the Information Technology Act, 2000 and rules thereunder as applicable and the amended provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>2. User Eligibility</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            You must be at least 18 years of age to use our services. By using this platform, you represent and warrant that you have the right, authority, and capacity to enter into this agreement and to abide by all of the terms and conditions set forth herein.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>3. Product Information and Pricing</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions, pricing, or other content is accurate, complete, reliable, current, or error-free. All prices are in Indian Rupees (INR) and inclusive of applicable taxes unless otherwise stated. We reserve the right to modify prices at any time without prior notice.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>4. Order Acceptance and Cancellation</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Your order constitutes an offer to purchase products. We reserve the right to accept or reject your order for any reason, including but not limited to product availability, errors in pricing or product information, or issues identified by our fraud detection systems. You may cancel your order before it is dispatched as per our cancellation policy.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>5. Payment Terms</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            We accept various payment methods including credit/debit cards, UPI, net banking, and cash on delivery (where available). All payments are processed through secure payment gateways compliant with RBI guidelines and PCI DSS standards. You agree to provide current, complete, and accurate purchase and account information.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>6. Delivery Terms</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Delivery timelines are estimates and may vary based on location, product availability, and other factors. We will make reasonable efforts to deliver within the estimated timeframe. Risk of loss and title for products pass to you upon delivery to the specified address.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>7. Returns and Refunds</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Returns and refunds are subject to our Refund Policy. Perishable items, personal care items, and certain other products may not be eligible for return. Please refer to our detailed Refund Policy for complete information.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>8. User Conduct</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            You agree not to use the platform for any unlawful purpose or in any way that could damage, disable, or impair the platform. You shall not attempt to gain unauthorized access to any portion of the platform or any systems or networks connected to the platform.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>9. Intellectual Property</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            All content on this platform, including but not limited to text, graphics, logos, images, and software, is the property of Nexora Solutions Private Limited or its content suppliers and is protected by Indian and international copyright laws. Unauthorized use of any content may violate copyright, trademark, and other laws.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>10. Limitation of Liability</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            To the maximum extent permitted by law, Nexora Solutions Private Limited shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the platform. Our total liability shall not exceed the amount paid by you for the specific product or service giving rise to the claim.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>11. Governing Law and Jurisdiction</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka, India.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>12. Modifications to Terms</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the platform. Your continued use of the platform after any such changes constitutes your acceptance of the new terms.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>13. Contact Information</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            For any questions regarding these terms, please contact us at:<br />
                            Email: legal@yourkirana.in<br />
                            Address: Nexora Solutions Private Limited, Bangalore, Karnataka, India
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
