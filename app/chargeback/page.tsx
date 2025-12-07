'use client';

import { useEffect } from 'react';

export default function ChargebackPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <main>
            <section className="signup-hero">
                <div className="container">
                    <h1 className="title">Chargeback Policy</h1>
                    <p className="lead">
                        Understanding chargebacks and dispute resolution
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="feature-card" style={{ maxWidth: '900px', margin: 'auto' }}>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            This Chargeback Policy outlines the procedures and responsibilities related to payment disputes, chargebacks, and fraud complaints on the YourKirana marketplace platform operated by Aurevia Technologies Pvt Ltd. This policy is in compliance with the Reserve Bank of India (RBI) guidelines, National Payments Corporation of India (NPCI) regulations, and the Payment and Settlement Systems Act, 2007.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>1. Understanding Chargebacks</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            A chargeback is a reversal of a credit card or debit card transaction initiated by the cardholder through their issuing bank. Chargebacks are typically filed when:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>The cardholder does not recognize the transaction</li>
                            <li>The product was not delivered or was significantly different from description</li>
                            <li>The transaction was unauthorized or fraudulent</li>
                            <li>The merchant failed to process a refund as promised</li>
                            <li>Duplicate charges were made</li>
                            <li>Technical errors occurred during payment processing</li>
                        </ul>

                        <h2 style={{ marginTop: '30px' }}>2. Marketplace Model and Responsibility</h2>
                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>2.1 YourKirana's Role</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            YourKirana operates as a <strong>marketplace platform</strong> that facilitates transactions between buyers and registered sellers/merchants. We act as an intermediary and do not directly sell products. Our responsibilities include:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>Providing a secure platform for transactions</li>
                            <li>Processing payments through authorized payment gateways</li>
                            <li>Facilitating communication between buyers and sellers</li>
                            <li>Maintaining transaction records and documentation</li>
                            <li>Coordinating chargeback investigations and resolution</li>
                        </ul>

                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>2.2 Seller/Merchant Responsibility</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Sellers registered on YourKirana platform are primarily responsible for:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>Accurate product descriptions and pricing</li>
                            <li>Timely order fulfillment and delivery</li>
                            <li>Product quality and authenticity</li>
                            <li>Processing returns and refunds as per policy</li>
                            <li>Responding to customer complaints and disputes</li>
                            <li>Bearing financial liability for valid chargebacks arising from their transactions</li>
                        </ul>

                        <h2 style={{ marginTop: '30px' }}>3. Chargeback Process</h2>
                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>3.1 Customer-Initiated Chargeback</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            When a customer files a chargeback with their bank:
                        </p>
                        <ol style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>The issuing bank notifies the payment gateway/acquiring bank</li>
                            <li>YourKirana receives a chargeback notification with details</li>
                            <li>The disputed amount is temporarily debited from the settlement account</li>
                            <li>YourKirana investigates the transaction and gathers evidence</li>
                            <li>The concerned seller is notified and asked to provide supporting documents</li>
                            <li>Evidence is submitted to the payment gateway within the stipulated timeframe (typically 7-10 days)</li>
                            <li>The bank reviews the evidence and makes a final decision</li>
                            <li>If chargeback is upheld, the amount is refunded to the customer; if reversed, the amount is returned to the seller</li>
                        </ol>

                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>3.2 Required Documentation</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            To contest a chargeback, the following documents may be required:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>Order confirmation and invoice</li>
                            <li>Proof of delivery (signed delivery receipt, tracking information)</li>
                            <li>Communication records with the customer</li>
                            <li>Product descriptions and images</li>
                            <li>Refund/return policy acknowledgment</li>
                            <li>Any other relevant transaction evidence</li>
                        </ul>

                        <h2 style={{ marginTop: '30px' }}>4. Fraud Prevention and Detection</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            YourKirana implements multiple fraud prevention measures:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li><strong>3D Secure Authentication:</strong> All card transactions require OTP/PIN verification</li>
                            <li><strong>Address Verification System (AVS):</strong> Matching billing and delivery addresses</li>
                            <li><strong>Velocity Checks:</strong> Monitoring unusual transaction patterns</li>
                            <li><strong>Device Fingerprinting:</strong> Identifying suspicious devices</li>
                            <li><strong>Risk Scoring:</strong> Automated fraud detection algorithms</li>
                            <li><strong>Manual Review:</strong> High-value or suspicious transactions are manually verified</li>
                        </ul>

                        <h2 style={{ marginTop: '30px' }}>5. Chargeback Fees and Financial Liability</h2>
                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>5.1 Chargeback Fees</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            When a chargeback is filed, the following fees may apply:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li><strong>Payment Gateway Fee:</strong> ₹500 - ₹1,000 per chargeback (varies by gateway)</li>
                            <li><strong>Processing Fee:</strong> Administrative costs for investigation and documentation</li>
                            <li><strong>Penalty for Excessive Chargebacks:</strong> Additional fees if chargeback ratio exceeds acceptable limits</li>
                        </ul>

                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>5.2 Liability Distribution</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            <strong>Valid Chargebacks (Seller Fault):</strong>
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>The seller bears the full transaction amount</li>
                            <li>The seller is responsible for chargeback fees</li>
                            <li>Amount is deducted from the seller's future settlements</li>
                        </ul>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            <strong>Invalid/Fraudulent Chargebacks (Customer Fault):</strong>
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>If successfully contested, the amount is returned to the seller</li>
                            <li>The customer's account may be flagged or suspended</li>
                            <li>Legal action may be initiated for fraudulent claims</li>
                        </ul>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            <strong>Platform/Technical Issues:</strong>
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>YourKirana bears liability for chargebacks arising from platform errors</li>
                            <li>This includes payment gateway failures, duplicate charges, or system glitches</li>
                        </ul>

                        <h2 style={{ marginTop: '30px' }}>6. Seller Chargeback Thresholds</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            To maintain platform integrity and comply with payment network regulations:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li><strong>Acceptable Chargeback Ratio:</strong> Less than 1% of total transactions</li>
                            <li><strong>Warning Threshold:</strong> 1% - 1.5% chargeback ratio triggers a warning</li>
                            <li><strong>Suspension Threshold:</strong> Above 1.5% may result in temporary account suspension</li>
                            <li><strong>Termination:</strong> Persistent high chargeback ratios may lead to permanent removal from the platform</li>
                        </ul>

                        <h2 style={{ marginTop: '30px' }}>7. Customer Rights and Responsibilities</h2>
                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>7.1 Before Filing a Chargeback</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Customers are encouraged to:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>Contact YourKirana customer support first</li>
                            <li>Attempt to resolve the issue directly with the seller</li>
                            <li>Review our Refund and Return policies</li>
                            <li>Allow reasonable time for issue resolution (7-10 business days)</li>
                        </ul>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            <strong>Note:</strong> Filing a chargeback should be a last resort. Most issues can be resolved faster through our customer support channels.
                        </p>

                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>7.2 Valid Reasons for Chargeback</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Legitimate reasons to file a chargeback include:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>Unauthorized transaction (card theft or fraud)</li>
                            <li>Product not received despite confirmed delivery</li>
                            <li>Product significantly different from description</li>
                            <li>Defective or damaged product with no resolution</li>
                            <li>Duplicate or incorrect charge amount</li>
                            <li>Refund promised but not processed within stated timeframe</li>
                        </ul>

                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>7.3 Chargeback Abuse</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Filing false or fraudulent chargebacks ("friendly fraud") is a serious offense. Consequences include:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>Immediate account suspension or termination</li>
                            <li>Blacklisting from the platform</li>
                            <li>Legal action and recovery of losses</li>
                            <li>Reporting to credit bureaus and law enforcement</li>
                        </ul>

                        <h2 style={{ marginTop: '30px' }}>8. Alternative Dispute Resolution</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Before initiating a chargeback, customers can use our dispute resolution process:
                        </p>
                        <ol style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li><strong>Contact Customer Support:</strong> Email support@yourkirana.in or call +91 7619559128</li>
                            <li><strong>File a Complaint:</strong> Submit a detailed complaint through your account</li>
                            <li><strong>Investigation:</strong> Our team investigates within 48-72 hours</li>
                            <li><strong>Resolution:</strong> We work with the seller to resolve the issue (refund, replacement, or compensation)</li>
                            <li><strong>Escalation:</strong> If unresolved, escalate to our Grievance Officer</li>
                        </ol>

                        <h2 style={{ marginTop: '30px' }}>9. Exceptions to Chargeback Policy</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Chargebacks are <strong>not applicable</strong> in the following cases:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>Buyer's remorse or change of mind (use return policy instead)</li>
                            <li>Product delivered as described but customer expectations differed</li>
                            <li>Delay in delivery within acceptable timeframes</li>
                            <li>Issues already resolved through refund or replacement</li>
                            <li>Chargebacks filed after 120 days from transaction date</li>
                            <li>Products explicitly marked as non-returnable (perishables, personal care items)</li>
                        </ul>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            For these situations, please refer to our <a href="/refund" style={{ color: 'var(--mint)', fontWeight: '600' }}>Refund Policy</a>.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>10. Regulatory Compliance</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            This Chargeback Policy complies with:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li><strong>Reserve Bank of India (RBI):</strong> Guidelines on digital payments and customer protection</li>
                            <li><strong>Payment and Settlement Systems Act, 2007:</strong> Regulations governing payment systems</li>
                            <li><strong>NPCI Guidelines:</strong> UPI and RuPay chargeback procedures</li>
                            <li><strong>Consumer Protection Act, 2019:</strong> Consumer rights and e-commerce regulations</li>
                            <li><strong>Payment Card Industry Data Security Standard (PCI DSS):</strong> Security standards for card data</li>
                        </ul>

                        <h2 style={{ marginTop: '30px' }}>11. Contact Information</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            For chargeback-related queries or disputes:
                        </p>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            <strong>Customer Support:</strong><br />
                            Email: support@yourkirana.in<br />
                            Phone: +91 7619559128<br />
                            Hours: Monday to Sunday, 9:00 AM - 9:00 PM IST
                        </p>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            <strong>Chargeback Department:</strong><br />
                            Email: chargeback@yourkirana.in<br />
                            Response Time: Within 48 hours
                        </p>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            <strong>Grievance Officer:</strong><br />
                            Email: grievance@yourkirana.in<br />
                            Address: Aurevia Technologies Pvt Ltd, 18/1 4th Cross, 2nd Floor, Rahmath Nagar, R.T. Nagar, Bangalore, Karnataka, India - 560032
                        </p>

                        <p style={{ marginTop: '30px', padding: '15px', background: '#f8fafc', borderRadius: '8px', lineHeight: '1.8' }}>
                            <strong>Important Notice:</strong> This policy is subject to change. We recommend reviewing it periodically. Last updated: December 2025.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
