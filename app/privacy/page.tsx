'use client';

import { useEffect } from 'react';

export default function PrivacyPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <main>
            <section className="signup-hero">
                <div className="container">
                    <h1 className="title">Privacy Policy</h1>
                    <p className="lead">
                        Your privacy is important to us
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="feature-card" style={{ maxWidth: '900px', margin: 'auto' }}>

                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Aurevia Technologies Pvt Ltd ("we", "our", or "YourKirana") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. This policy is in compliance with the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and the Digital Personal Data Protection Act, 2023.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>2. Information We Collect</h2>
                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>2.1 Personal Information</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            We collect personal information that you voluntarily provide to us, including:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>Name, email address, phone number</li>
                            <li>Delivery address and billing information</li>
                            <li>Payment information (processed securely through RBI-authorized payment gateways)</li>
                            <li>Account credentials</li>
                            <li>KYC documents (for sellers: Aadhaar, PAN, GST, business licenses)</li>
                        </ul>

                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>2.1.1 Payment Information and Gateway Data Handling</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            <strong>Important:</strong> YourKirana does not directly collect, store, or process sensitive payment information such as complete credit/debit card numbers, CVV, or card PINs.
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li><strong>Payment Gateway Processing:</strong> All payment transactions are processed through PCI DSS compliant, RBI-authorized payment gateways</li>
                            <li><strong>Tokenization:</strong> Card details are tokenized by the payment gateway; we only receive and store encrypted tokens</li>
                            <li><strong>Transaction Data:</strong> We receive transaction status, payment method type, and transaction reference numbers</li>
                            <li><strong>UPI/Net Banking:</strong> For UPI and net banking transactions, we receive only transaction IDs and status confirmations</li>
                            <li><strong>Settlement Information:</strong> Bank account details of sellers are collected for payment settlement purposes and stored securely</li>
                            <li><strong>Compliance:</strong> All payment data handling complies with RBI guidelines, NPCI regulations, and PCI DSS standards</li>
                        </ul>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            For more information on payment processing and settlement, please refer to our <a href="/terms" style={{ color: 'var(--mint)', fontWeight: '600' }}>Terms & Conditions</a>.
                        </p>

                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>2.2 Automatically Collected Information</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            When you use our platform, we automatically collect certain information, including:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>Device information (IP address, browser type, operating system)</li>
                            <li>Usage data (pages visited, time spent, click patterns)</li>
                            <li>Location data (with your consent)</li>
                            <li>Cookies and similar tracking technologies</li>
                        </ul>

                        <h2 style={{ marginTop: '30px' }}>3. How We Use Your Information</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            We use the collected information for the following purposes:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>Processing and fulfilling your orders</li>
                            <li>Communicating with you about your orders and account</li>
                            <li>Providing customer support</li>
                            <li>Improving our platform and services</li>
                            <li>Personalizing your shopping experience</li>
                            <li>Sending promotional communications (with your consent)</li>
                            <li>Detecting and preventing fraud</li>
                            <li>Complying with legal obligations</li>
                        </ul>

                        <h2 style={{ marginTop: '30px' }}>4. Information Sharing and Disclosure</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            We may share your information with:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li><strong>Service Providers:</strong> Third-party vendors who assist in operations (payment processors, delivery partners, etc.)</li>
                            <li><strong>Business Partners:</strong> Local stores and sellers on our platform (limited to information necessary for order fulfillment)</li>
                            <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
                            <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition</li>
                        </ul>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            We do not sell your personal information to third parties for their marketing purposes.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>5. Data Security</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            We implement appropriate technical and organizational security measures to protect your personal information, including:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>SSL/TLS encryption for data transmission</li>
                            <li>Secure payment processing through PCI DSS compliant gateways</li>
                            <li>Regular security audits and updates</li>
                            <li>Access controls and authentication mechanisms</li>
                            <li>Data backup and recovery procedures</li>
                        </ul>

                        <h2 style={{ marginTop: '30px' }}>6. Your Rights</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Under Indian data protection laws, you have the following rights:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li><strong>Right to Access:</strong> Request access to your personal information</li>
                            <li><strong>Right to Correction:</strong> Request correction of inaccurate information</li>
                            <li><strong>Right to Erasure:</strong> Request deletion of your personal information (subject to legal obligations)</li>
                            <li><strong>Right to Data Portability:</strong> Request transfer of your data to another service</li>
                            <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for processing at any time</li>
                            <li><strong>Right to Grievance Redressal:</strong> Lodge complaints with our Grievance Officer</li>
                        </ul>

                        <h2 style={{ marginTop: '30px' }}>7. Data Retention</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Typically, we retain data for 7 years as per Indian accounting and tax regulations.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>8. Cookies and Tracking Technologies</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            We use cookies and similar technologies to enhance your experience. You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our platform.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>9. Children's Privacy</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>10. Changes to Privacy Policy</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page. Your continued use of the platform after such changes constitutes acceptance of the updated policy.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>11. Grievance Officer</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            In accordance with the Information Technology Act, 2000 and rules made thereunder, we have appointed a Grievance Officer to address your concerns:
                        </p>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            <strong>Name:</strong> Abhishek Babu<br />
                            <strong>Email:</strong> aureviat@gmail.com<br />
                            <strong>Address:</strong> Aurevia Technologies Pvt Ltd, Bangalore, Karnataka, India<br />
                            <strong>Response Time:</strong> Within 30 days of receiving the complaint
                        </p>

                        <h2 style={{ marginTop: '30px' }}>12. Contact Us</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            For any questions about this Privacy Policy, please contact us at:<br />
                            Email: privacy@yourkirana.in<br />
                            {/* Phone: +91 99999 99999<br /> */}
                            Address: Aurevia Technologies Pvt Ltd, Bangalore, Karnataka, India
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
