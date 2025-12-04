'use client';

import { useEffect } from 'react';

export default function ShippingPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <main>
            <section className="signup-hero">
                <div className="container">
                    <h1 className="title">Shipping Policy</h1>
                    <p className="lead">
                        Information regarding shipping of your orders
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="feature-card" style={{ maxWidth: '900px', margin: 'auto' }}>

                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            At YourKirana (Aurevia Technologies Pvt Ltd), we are committed to delivering your orders accurately, in good condition, and always on time. We partner with reputed courier agencies to ensure that your order reaches you safely.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>1. Shipping Locations</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            We currently ship to addresses within India. Please check if we deliver to your pincode on the product page. We do not ship internationally at this moment.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>2. Shipping Charges</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Shipping charges vary based on the order value and your location.
                            <br />- <strong>Standard Shipping:</strong> Nominal charges may apply for orders below a certain value.
                            <br />- <strong>Free Shipping:</strong> We may offer free shipping on orders above a specified amount.
                            <br />The final shipping cost will be calculated and displayed at the checkout before you complete your purchase.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>3. Processing Time</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Orders are typically processed within 1-2 business days of receipt. Orders placed on weekends or public holidays will be processed on the next business day.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>4. Delivery Timelines</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Estimated delivery times depend on your location:
                            <br />- <strong>Metro Cities:</strong> 2-4 business days
                            <br />- <strong>Rest of India:</strong> 4-7 business days
                            <br />Please note that these are estimated timelines and actual delivery may vary due to external factors such as weather conditions, strikes, or courier delays.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>5. Tracking Your Order</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Once your order is shipped, you will receive a confirmation email and SMS with the tracking details. You can track the status of your package using the link provided or through the 'My Orders' section on our website.
                        </p>

                        <h2 style={{ marginTop: '30px' }}>6. Damaged or Tampered Packaging</h2>
                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            If you believe that the packaging is tampered with or damaged, please <strong>do not accept delivery</strong> of the package. Contact our customer support immediately at support@yourkirana.in with your order number. We will ensure that a replacement delivery is made to you at the earliest.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
