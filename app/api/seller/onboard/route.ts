import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { storeName, address } = body;

        // Basic validation
        if (!storeName || !address) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Extract city from address to generate code
        // Simple logic: Look for common cities or just take first 3 chars of last part
        let cityCode = 'IND';
        const addressParts = address.split(',').map((p: string) => p.trim().toUpperCase());

        // Try to find a city match
        const commonCities = ['BANGALORE', 'BENGALURU', 'MUMBAI', 'DELHI', 'CHENNAI', 'HYDERABAD', 'KOLKATA', 'PUNE'];
        const foundCity = addressParts.find((part: string) =>
            commonCities.some(city => part.includes(city))
        );

        if (foundCity) {
            if (foundCity.includes('BANGALORE') || foundCity.includes('BENGALURU')) cityCode = 'BLR';
            else if (foundCity.includes('MUMBAI')) cityCode = 'MUM';
            else if (foundCity.includes('DELHI')) cityCode = 'DEL';
            else if (foundCity.includes('CHENNAI')) cityCode = 'MAA'; // Airport code style
            else if (foundCity.includes('HYDERABAD')) cityCode = 'HYD';
            else if (foundCity.includes('KOLKATA')) cityCode = 'CCU';
            else if (foundCity.includes('PUNE')) cityCode = 'PNQ';
            else cityCode = foundCity.substring(0, 3);
        }

        // Generate Random Sequence
        const sequence = Math.floor(Math.random() * 900) + 100; // 100-999

        // Format: YKIR-{CITY}-{SEQ}
        const sellerId = `YKIR-${cityCode}-${sequence}`;

        // Create details object with all info
        const details = {
            storeName: body.storeName,
            ownerName: body.ownerName,
            phone: body.phone,
            email: body.email,
            address: body.address,
            categories: body.categories,
            gstNumber: body.gstNumber,
            accountNumber: body.accountNumber, // Mask in real app
            ifscCode: body.ifscCode,
            onboardedAt: new Date().toISOString()
        };

        return NextResponse.json({
            success: true,
            message: 'Seller onboarding successful',
            sellerId,
            details
        });

    } catch (error) {
        console.error('Error processing seller onboarding:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
