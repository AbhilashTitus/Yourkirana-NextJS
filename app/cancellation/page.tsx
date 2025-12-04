'use client';

import { useEffect } from 'react';

export default function CancellationPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <main>
            <section className="signup-hero">
                <div className="container">
                    <h1 className="title">Cancellation Policy</h1>
                    <p className="lead">
                        Everything you need to know about cancelling your order
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="feature-card" style={{ maxWidth: '900px', margin: 'auto' }}>

                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            We understand that plans can change. This policy outlines the terms under which you can cancel your order with YourKirana (Aurevia Technologies Pvt Ltd).
                        </p>

                        <h2 style={{ marginTop: '30px' }}>1. Cancellation by Customer</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            You can cancel your order for a full refund at any time <strong>before it has been dispatched</strong>.
                            <br /><br />
                            <strong>How to cancel:</strong>
                            <br />1. Go to 'My Orders' section.
                            <br />2. Select the order you wish to cancel.
                            <br />3. Click on 'Cancel Order' button.
                            <br /><br />
                            If the order has already been dispatched, we may not be able to cancel it. In such cases, you may refuse the delivery or return the items as per our Refund Policy.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>2. Cancellation by YourKirana</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            We reserve the right to cancel your order for reasons including but not limited to:
                            <br />- Unavailability of the product.
                            <br />- Errors in pricing or product information.
                            <br />- Non-confirmation of payment.
                            <br />- Suspicious or fraudulent activity.
                            <br /><br />
                            If we cancel your order, you will be notified via email/SMS, and a full refund will be processed immediately.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>3. Refund for Cancellations</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            <strong>Pre-paid Orders:</strong> If you cancel a pre-paid order before dispatch, the refund will be initiated within 24 hours and credited to your original payment method within 5-7 business days.
                            <br /><br />
                            <strong>Cash on Delivery:</strong> There is no refund required for cancelled COD orders as no payment has been made.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>4. Partial Cancellation</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            You may be able to cancel specific items within an order before they are dispatched. The refund for the cancelled items will be processed as per the terms mentioned above.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
