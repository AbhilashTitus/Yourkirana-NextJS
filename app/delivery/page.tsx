'use client';

import { useEffect } from 'react';

export default function DeliveryPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <main>
            <section className="signup-hero">
                <div className="container">
                    <h1 className="title">Delivery Policy</h1>
                    <p className="lead">
                        Terms related to the delivery of your essentials
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="feature-card" style={{ maxWidth: '900px', margin: 'auto' }}>

                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            This Delivery Policy outlines the terms and conditions regarding the delivery of products ordered from YourKirana (Equispark Trading Private Limited).
                        </p>

                        <h2 style={{ marginTop: '30px' }}>1. Delivery Partners</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            We use third-party delivery partners and our own fleet (where available) to deliver your orders. The choice of delivery partner is at our sole discretion to ensure the fastest and most reliable service.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>2. Delivery Attempts</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Our delivery partners will attempt to deliver your package up to 3 times. If you are unavailable to receive the package, please contact the courier partner or our support team to reschedule. After 3 failed attempts, the order may be cancelled and returned to us.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>3. Identification</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            For high-value orders or specific categories, our delivery partner may request a valid government-issued photo ID for verification at the time of delivery.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>4. Open Box Delivery</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Currently, we do not offer open box delivery. Please accept the package only if it is sealed and undamaged. If you have any issues with the product after opening, please refer to our Refund Policy.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>5. Change of Address</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            You can request a change of delivery address only before the order has been dispatched. Once the order is out for delivery or in transit, we may not be able to redirect it to a new address.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>6. Contactless Delivery</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            To ensure safety, you may opt for contactless delivery where available. The delivery partner will leave the package at your doorstep and notify you. Please note that Cash on Delivery (COD) orders may not be eligible for contactless delivery unless paid for digitally at the time of delivery.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
