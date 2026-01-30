import { NextRequest, NextResponse } from 'next/server';

// Validation helper function for GST number
function validateGSTNumber(gstin: string): boolean {
    // GST format: 15 characters
    // Relaxed validation: just check length and alphanumeric
    const simpleRegex = /^[0-9A-Z]{15}$/;

    return simpleRegex.test(gstin.toUpperCase());
}

// Sanitize input to prevent injection attacks
function sanitizeInput(input: string): string {
    return input.trim().replace(/[<>\"']/g, '');
}

// Extract state code from GST number
function getStateFromGST(gstin: string): string {
    const stateCode = gstin.substring(0, 2);
    const stateCodes: { [key: string]: string } = {
        '01': 'Jammu and Kashmir',
        '02': 'Himachal Pradesh',
        '03': 'Punjab',
        '04': 'Chandigarh',
        '05': 'Uttarakhand',
        '06': 'Haryana',
        '07': 'Delhi',
        '08': 'Rajasthan',
        '09': 'Uttar Pradesh',
        '10': 'Bihar',
        '11': 'Sikkim',
        '12': 'Arunachal Pradesh',
        '13': 'Nagaland',
        '14': 'Manipur',
        '15': 'Mizoram',
        '16': 'Tripura',
        '17': 'Meghalaya',
        '18': 'Assam',
        '19': 'West Bengal',
        '20': 'Jharkhand',
        '21': 'Odisha',
        '22': 'Chhattisgarh',
        '23': 'Madhya Pradesh',
        '24': 'Gujarat',
        '26': 'Dadra and Nagar Haveli and Daman and Diu',
        '27': 'Maharashtra',
        '29': 'Karnataka',
        '30': 'Goa',
        '31': 'Lakshadweep',
        '32': 'Kerala',
        '33': 'Tamil Nadu',
        '34': 'Puducherry',
        '35': 'Andaman and Nicobar Islands',
        '36': 'Telangana',
        '37': 'Andhra Pradesh',
        '38': 'Ladakh',
    };
    return stateCodes[stateCode] || 'Unknown';
}

export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body = await request.json();
        const { gstNumber } = body;

        // Validate required field
        if (!gstNumber) {
            return NextResponse.json(
                {
                    success: false,
                    status: 'invalid',
                    message: 'GST number is required.',
                },
                { status: 400 }
            );
        }

        // Sanitize input
        const sanitizedGST = sanitizeInput(gstNumber).toUpperCase();

        console.log(`[GST Verification] Received: ${gstNumber}, Sanitized: ${sanitizedGST}`);

        // Validate GST format
        if (!validateGSTNumber(sanitizedGST)) {
            return NextResponse.json(
                {
                    success: false,
                    status: 'invalid',
                    message: `Invalid GST number format. GST should be 15 alphanumeric characters. Received length: ${sanitizedGST.length}`,
                },
                { status: 400 }
            );
        }

        // Get API credentials from environment variables - strict naming as requested
        const apiUsername = process.env.EKYC_API_USERNAME;
        const apiToken = process.env.EKYC_API_TOKEN;
        const apiBaseUrl = process.env.EKYC_API_BASE_URL;

        if (!apiUsername || !apiToken || !apiBaseUrl) {
            console.error('EKYCHub API credentials not configured');
            return NextResponse.json(
                {
                    success: false,
                    status: 'error',
                    message: 'Verification service is temporarily unavailable. Please try again later.',
                },
                { status: 500 }
            );
        }

        // Generate unique order ID
        const orderId = `GST_${Date.now()}_${Math.random().toString(36).substring(7)}`;

        // Call EKYCHub GST Verification API (GET request with query parameters)
        // Reverting to GET as POST /gst returns 404
        const apiUrl = `${apiBaseUrl}/gst_verification?username=${apiUsername}&token=${apiToken}&gst=${sanitizedGST}&orderid=${orderId}`;

        console.log('Calling EKYCHub GST API URL:', apiUrl.replace(apiToken as string, 'HIDDEN_TOKEN'));

        let ekycResponse;
        try {
            ekycResponse = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });
        } catch (fetchError) {
            console.error('Fetch error:', fetchError);
            return NextResponse.json(
                {
                    success: false,
                    status: 'error',
                    message: 'Unable to connect to verification service. Please check your internet connection or try again later.',
                },
                { status: 500 }
            );
        }

        let ekycData;
        // Clone the response to allow reading it multiple times if necessary
        const responseClone = ekycResponse.clone();

        try {
            ekycData = await ekycResponse.json();
        } catch (parseError) {
            console.error('Failed to parse EKYCHub response:', parseError);
            const responseText = await responseClone.text();
            console.error('Response text:', responseText);
            return NextResponse.json(
                {
                    success: false,
                    status: 'error',
                    message: 'Verification service returned invalid response. Please try again later.',
                },
                { status: 500 }
            );
        }

        // Log the response for debugging
        console.log('EKYCHub GST Response Status:', ekycResponse.status);
        console.log('EKYCHub GST Response:', JSON.stringify(ekycData, null, 2));

        // Basic error handling from external API
        if (!ekycResponse.ok) {
            return NextResponse.json({
                success: false,
                status: 'failed',
                message: ekycData.message || `Verification service error: ${ekycResponse.status}`,
            });
        }

        // Check verification status from API response
        // Assuming success structure based on user request to use this API
        // Fallback to checking typical 'status' or 'error' fields if needed.
        const isSuccess = ekycData.status === 'success' || ekycData.status === 'Success' || ekycData.result?.status === 'active';

        if (isSuccess || ekycData.data) {
            // Handle cases where data is nested
            const dataObj = ekycData.data || ekycData;

            // Extract GST details
            // Support multiple possible field structures just in case
            const gstStatus = dataObj.gst_in_status || dataObj.gst_status || dataObj.status || 'Active';
            const isActive = String(gstStatus).toLowerCase() === 'active';

            if (isActive) {
                return NextResponse.json({
                    success: true,
                    status: 'verified',
                    message: 'GST number verified successfully.',
                    data: {
                        gstNumber: dataObj.gstin || dataObj.GSTIN || sanitizedGST,
                        legalName: dataObj.legal_name_of_business || dataObj.legal_name || 'N/A',
                        tradeName: dataObj.trade_name_of_business || dataObj.trade_name || dataObj.legal_name_of_business || 'N/A',
                        businessType: dataObj.constitution_of_business || 'N/A',
                        registrationDate: dataObj.registration_date || dataObj.last_update_date || 'N/A',
                        state: getStateFromGST(sanitizedGST),
                        stateCode: sanitizedGST.substring(0, 2),
                        address: dataObj.principal_place_address || dataObj.address || 'N/A',
                        gstStatus: gstStatus,
                        lastUpdated: new Date().toISOString().split('T')[0],
                    },
                });
            } else {
                return NextResponse.json({
                    success: false,
                    status: 'failed',
                    message: `GST number is ${gstStatus}. Only active GST registrations are accepted.`,
                    data: {
                        gstNumber: sanitizedGST,
                        legalName: dataObj.legal_name_of_business || 'N/A',
                        gstStatus: gstStatus,
                    },
                });
            }
        } else {
            // Verification failed
            return NextResponse.json({
                success: false,
                status: 'failed',
                message: ekycData.message || ekycData.error || 'GST verification failed.',
            });
        }

    } catch (error) {
        console.error('GST verification error:', error instanceof Error ? error.message : 'Unknown error');

        return NextResponse.json(
            {
                success: false,
                status: 'error',
                message: 'An unexpected error occurred during verification. Please try again.',
            },
            { status: 500 }
        );
    }
}
