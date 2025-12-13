import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: NextRequest) {
    try {
        const { amount, sellerIds } = await request.json();

        // Validate amount
        if (!amount || amount <= 0) {
            return NextResponse.json(
                { error: 'Invalid amount' },
                { status: 400 }
            );
        }

        // Check for environment variables
        if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            return NextResponse.json(
                { error: 'Razorpay credentials not configured' },
                { status: 500 }
            );
        }

        // Initialize Razorpay instance
        const razorpay = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        // Create order
        const order = await razorpay.orders.create({
            amount: Math.round(amount * 100), // Convert to paise (smallest currency unit)
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: {
                sellerIds: sellerIds ? JSON.stringify(sellerIds) : '',
            }
        });

        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        return NextResponse.json(
            { error: 'Failed to create order' },
            { status: 500 }
        );
    }
}
