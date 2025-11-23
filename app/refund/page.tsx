'use client';

import { useEffect } from 'react';

export default function RefundPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <main>
            <section className="signup-hero">
                <div className="container">
                    <h1 className="title">Refund & Cancellation Policy</h1>
                    <p className="lead">
                        Fair and transparent refund process
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="feature-card" style={{ maxWidth: '900px', margin: 'auto' }}>

                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>1.1 Customer-Initiated Cancellation</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            You may cancel your order before it is dispatched from the seller's location. To cancel an order:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>Log in to your account and navigate to "My Orders"</li>
                            <li>Select the order you wish to cancel</li>
                            <li>Click on "Cancel Order" and select a reason</li>
                            <li>Confirm the cancellation</li>
                        </ul>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Once an order is dispatched, it cannot be cancelled. However, you may refuse delivery or initiate a return as per our return policy.
                        </p>

                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>1.2 YourKirana-Initiated Cancellation</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            We reserve the right to cancel orders in the following circumstances:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>Product unavailability or stock issues</li>
                            <li>Pricing or product information errors</li>
                            <li>Payment verification failures</li>
                            <li>Suspected fraudulent transactions</li>
                            <li>Delivery address is outside serviceable area</li>
                            <li>Force majeure events</li>
                        </ul>

                        <h2 style={{ marginTop: '30px' }}>2. Return Policy</h2>
                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>2.1 Eligible Products</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            The following products are eligible for return within 24-48 hours of delivery (varies by category):
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>Non-perishable packaged food items (unopened)</li>
                            <li>Personal care products (unopened and unused)</li>
                            <li>Household items (unused and in original packaging)</li>
                            <li>Kitchen appliances and utensils (unused with original packaging)</li>
                        </ul>

                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>2.2 Non-Returnable Products</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            The following products cannot be returned:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>Fresh fruits, vegetables, and perishable items</li>
                            <li>Dairy products, eggs, and bakery items</li>
                            <li>Opened or used personal care products</li>
                            <li>Medicines and health supplements</li>
                            <li>Products without original packaging or tags</li>
                            <li>Customized or personalized products</li>
                        </ul>

                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>2.3 Return Conditions</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            To be eligible for a return, products must meet the following conditions:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>Product must be unused and in the same condition as received</li>
                            <li>Original packaging, tags, and labels must be intact</li>
                            <li>Invoice or proof of purchase must be provided</li>
                            <li>Return request must be initiated within the specified timeframe</li>
                        </ul>

                        <h2 style={{ marginTop: '30px' }}>3. Refund Policy</h2>
                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>3.1 Refund Processing Time</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Refunds will be processed according to the following timeline:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li><strong>Prepaid Orders:</strong> 5-7 business days after return pickup</li>
                            <li><strong>Cash on Delivery:</strong> 7-10 business days (credited to original payment method or bank account)</li>
                            <li><strong>Wallet/UPI:</strong> 3-5 business days</li>
                            <li><strong>Credit/Debit Card:</strong> 5-7 business days (may take additional 2-3 days to reflect in statement)</li>
                        </ul>

                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>3.2 Refund Amount</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            The refund amount will include:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>Product price</li>
                            <li>Applicable taxes</li>
                            <li>Delivery charges (if order is cancelled before dispatch or if wrong/damaged product is delivered)</li>
                        </ul>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Delivery charges will not be refunded for customer-initiated returns after delivery.
                        </p>

                        <h3 style={{ marginTop: '20px', fontSize: '1.1rem' }}>3.3 Refund Method</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Refunds will be processed to the original payment method. In cases where this is not possible, we will credit the amount to your YourKirana wallet or process a bank transfer as per your preference.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>4. Damaged or Defective Products</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            If you receive a damaged, defective, or incorrect product:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>Contact our customer support within 24 hours of delivery</li>
                            <li>Provide photographs of the damaged/defective product</li>
                            <li>We will arrange for a replacement or full refund (including delivery charges)</li>
                            <li>No return shipping charges will be applicable</li>
                        </ul>

                        <h2 style={{ marginTop: '30px' }}>5. Missing Items</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            If any items are missing from your order:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>Report the issue within 24 hours of delivery</li>
                            <li>We will investigate and either deliver the missing items or refund the amount</li>
                            <li>Refund will be processed within 3-5 business days</li>
                        </ul>

                        <h2 style={{ marginTop: '30px' }}>6. How to Initiate a Return</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            To initiate a return:
                        </p>
                        <ol style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>Log in to your YourKirana account</li>
                            <li>Go to "My Orders" and select the order</li>
                            <li>Click on "Return" and select the item(s) and reason</li>
                            <li>Submit the return request</li>
                            <li>Our team will review and approve if eligible</li>
                            <li>Schedule a pickup or drop-off as per instructions</li>
                            <li>Refund will be processed after quality check</li>
                        </ol>

                        <h2 style={{ marginTop: '30px' }}>7. Exceptions and Special Cases</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            In case of promotional offers, combo deals, or special sales:
                        </p>
                        <ul style={{ lineHeight: '2', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>Specific terms and conditions may apply</li>
                            <li>Partial returns may not be allowed for combo/bundle offers</li>
                            <li>Promotional discounts may be adjusted in refund calculations</li>
                        </ul>

                        <h2 style={{ marginTop: '30px' }}>8. Contact Us</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            For any questions or assistance with cancellations, returns, or refunds:
                        </p>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            <strong>Customer Support:</strong><br />
                            Email: support@yourkirana.in<br />
                            Phone: +91 99999 99999<br />
                            Hours: Monday to Sunday, 9:00 AM - 9:00 PM IST
                        </p>

                        <p style={{ marginTop: '30px', padding: '15px', background: '#f8fafc', borderRadius: '8px', lineHeight: '1.8' }}>
                            <strong>Note:</strong> This policy is in compliance with the Consumer Protection Act, 2019 and Consumer Protection (E-Commerce) Rules, 2020. We are committed to ensuring fair and transparent practices in all our transactions.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
