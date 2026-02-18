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

                        <h2 style={{ marginTop: '30px' }}>1. Acceptance of Terms & Legal Compliance</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            By accessing and using YourKirana platform operated by Aurevia Technologies Pvt Ltd, you accept and agree to be bound by the terms and provisions of this agreement. This agreement is in accordance with the Information Technology Act, 2000 and rules thereunder as applicable and the amended provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000.
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
                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>5.1 Accepted Payment Methods</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            We accept payments exclusively through UPI (Unified Payments Interface). All transactions are processed via NPCI-authorized UPI applications and compliant payment service providers that adhere to RBI regulations and applicable PCI DSS security standards. By initiating a payment, you agree to use a valid UPI ID or UPI-linked bank account that belongs to you and to provide accurate and complete payment information during checkout.
                        </p>

                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>5.2 Payment Flow and Processing</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            <strong>YourKirana operates as a marketplace intermediary.</strong> The payment flow works as follows:
                        </p>
                        <ol style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>Customer places an order and makes payment through our authorized payment gateway</li>
                            <li>Payment is received and held in our <strong>third-party corporate settlement account</strong> (escrow/nodal account)</li>
                            <li>Order is confirmed and forwarded to the respective seller/merchant</li>
                            <li>Seller fulfills the order and delivers the product to the customer</li>
                            <li>After successful delivery confirmation and expiry of return period, payment is settled to the seller's registered bank account</li>
                            <li>Settlement typically occurs within 7-10 business days post-delivery</li>
                        </ol>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            <strong>Important:</strong> YourKirana acts as a facilitator and does not directly sell products. We channel payments between buyers and sellers through secure, RBI-compliant mechanisms.
                        </p>

                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>5.3 Settlement Process and Escrow Account</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            In compliance with RBI guidelines for payment aggregators and marketplace operators:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>All customer payments are held in a <strong>dedicated third-party corporate settlement account</strong> maintained with a scheduled commercial bank</li>
                            <li>This account is separate from YourKirana's operational accounts</li>
                            <li>Funds are held in escrow until order fulfillment is confirmed</li>
                            <li>Settlement to sellers occurs after deducting applicable platform fees, taxes, and charges</li>
                            <li>In case of disputes, refunds, or chargebacks, funds are held until resolution</li>
                            <li>Complete transaction records are maintained for audit and regulatory compliance</li>
                        </ul>

                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>5.4 Payment Security and Data Handling</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            We implement industry-standard security measures:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>256-bit SSL/TLS encryption for all transactions</li>
                            <li>PCI DSS Level 1 compliant payment gateways</li>
                            <li>3D Secure authentication (OTP/PIN verification) for card transactions</li>
                            <li>Tokenization of card details (we do not store complete card information)</li>
                            <li>Two-factor authentication for account access</li>
                            <li>Regular security audits and vulnerability assessments</li>
                        </ul>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Payment gateway partners handle sensitive financial data. For details on how payment information is processed, please refer to our <a href="/privacy" style={{ color: 'var(--mint)', fontWeight: '600' }}>Privacy Policy</a>.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>6. Seller Onboarding and Marketplace Operations</h2>
                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>6.1 Seller Registration and KYC Verification</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            YourKirana operates as a <strong>marketplace platform</strong> connecting buyers with registered local sellers/merchants. All sellers must complete a mandatory onboarding process:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li><strong>Business Registration:</strong> Valid business registration documents (GST certificate, Shop & Establishment license, FSSAI license for food items, etc.)</li>
                            <li><strong>KYC Verification:</strong> Aadhaar, PAN card, and bank account details of the business owner</li>
                            <li><strong>Address Proof:</strong> Proof of business address and operational location</li>
                            <li><strong>Product Compliance:</strong> Necessary licenses and certifications for specific product categories</li>
                            <li><strong>Bank Account Verification:</strong> Penny drop verification of the registered bank account</li>
                            <li><strong>Agreement Acceptance:</strong> Digital acceptance of Seller Terms & Conditions</li>
                        </ul>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            All seller information is verified before account activation. This process typically takes 2-5 business days.
                        </p>

                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>6.2 Seller Responsibilities</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Sellers registered on YourKirana platform are responsible for:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>Maintaining accurate product listings, descriptions, and pricing</li>
                            <li>Ensuring product quality, authenticity, and compliance with applicable laws</li>
                            <li>Timely order processing and fulfillment</li>
                            <li>Proper packaging and delivery of products to customers</li>
                            <li>Handling customer queries, complaints, and returns</li>
                            <li>Complying with tax regulations and remitting applicable taxes</li>
                            <li>Maintaining adequate inventory and updating stock availability</li>
                            <li>Adhering to platform policies and guidelines</li>
                        </ul>

                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>6.3 Seller Tie-Up Agreement</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            All sellers must enter into a <strong>Seller Partnership Agreement</strong> with YourKirana, which includes:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>Terms of service and platform usage guidelines</li>
                            <li>Commission structure and payment terms</li>
                            <li>Quality standards and performance metrics</li>
                            <li>Liability and indemnification clauses</li>
                            <li>Dispute resolution mechanisms</li>
                            <li>Termination conditions and notice periods</li>
                        </ul>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            A sample Seller Agreement is available for review during the onboarding process. For seller registration, visit our <a href="/seller" style={{ color: 'var(--mint)', fontWeight: '600' }}>Seller Onboarding</a> page.
                        </p>

                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>6.4 Platform Fees and Commissions</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            YourKirana charges sellers a commission on each successful transaction. The commission structure varies by product category and is clearly communicated during onboarding. Additional charges may include:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>Transaction processing fees</li>
                            <li>Payment gateway charges</li>
                            <li>Promotional and advertising fees (optional)</li>
                            <li>Penalty charges for policy violations or excessive returns/cancellations</li>
                        </ul>

                        <h2 style={{ marginTop: '30px' }}>7. Delivery Terms</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Delivery timelines are estimates and may vary based on location, product availability, and other factors. We will make reasonable efforts to deliver within the estimated timeframe. Risk of loss and title for products pass to you upon delivery to the specified address.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>8. Returns, Refunds, and Chargebacks</h2>
                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>8.1 Returns and Refunds</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Returns and refunds are subject to our <a href="/refund" style={{ color: 'var(--mint)', fontWeight: '600' }}>Refund Policy</a>. Perishable items, personal care items, and certain other products may not be eligible for return. Please refer to our detailed Refund Policy for complete information on eligibility, timelines, and procedures.
                        </p>

                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>8.2 Chargebacks and Payment Disputes</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            In case of payment disputes or unauthorized transactions, customers may file a chargeback through their bank. However, we strongly encourage resolving issues through our customer support first, as this is typically faster and more efficient.
                        </p>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            <strong>Important:</strong> Chargebacks should only be filed for legitimate reasons such as unauthorized transactions, non-delivery, or significant product discrepancies. Filing false or fraudulent chargebacks may result in account suspension and legal action.
                        </p>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            For detailed information on chargeback procedures, seller liability, and dispute resolution, please refer to our <a href="/chargeback" style={{ color: 'var(--mint)', fontWeight: '600' }}>Chargeback Policy</a>.
                        </p>

                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>8.3 Fraud Complaints and Responsibility</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            As a marketplace platform, responsibility for fraud complaints and chargebacks is distributed as follows:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li><strong>Seller-Related Issues:</strong> Sellers are primarily responsible for chargebacks arising from product quality, delivery failures, or misrepresentation</li>
                            <li><strong>Platform Issues:</strong> YourKirana is responsible for chargebacks due to payment processing errors, technical glitches, or platform failures</li>
                            <li><strong>Customer Fraud:</strong> Customers filing fraudulent chargebacks will face account termination and potential legal action</li>
                        </ul>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            We maintain comprehensive transaction records and work closely with payment gateways, banks, and law enforcement to prevent and investigate fraudulent activities.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>9. User Conduct</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            You agree not to use the platform for any unlawful purpose or in any way that could damage, disable, or impair the platform. You shall not attempt to gain unauthorized access to any portion of the platform or any systems or networks connected to the platform.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>10. Intellectual Property</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            All content on this platform, including but not limited to text, graphics, logos, images, and software, is the property of Aurevia Technologies Pvt Ltd or its content suppliers and is protected by Indian and international copyright laws. Unauthorized use of any content may violate copyright, trademark, and other laws.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>11. Limitation of Liability</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            To the maximum extent permitted by law, Aurevia Technologies Pvt Ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the platform. Our total liability shall not exceed the amount paid by you for the specific product or service giving rise to the claim.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>12. Governing Law and Jurisdiction</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka, India.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>13. Modifications to Terms</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the platform. Your continued use of the platform after any such changes constitutes your acceptance of the new terms.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>14. Contact Information</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            For any questions regarding these terms, please contact us at:<br />
                            Email: legal@yourkirana.in<br />
                            Address: Aurevia Technologies Pvt Ltd
                            18/1 4th Cross, 2nd Floor,
                            Rahmath Nagar, R.T. Nagar, Bangalore, Karnataka
                            India - 560032
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
