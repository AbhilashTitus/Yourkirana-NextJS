import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Get API credentials from environment variables
        const apiUsername = process.env.EKYC_API_USERNAME;
        const apiToken = process.env.EKYC_API_TOKEN;
        const apiBaseUrl = process.env.EKYC_API_BASE_URL;

        console.log('Environment Check:');
        console.log('API Username:', apiUsername ? 'Set' : 'NOT SET');
        console.log('API Token:', apiToken ? 'Set (length: ' + apiToken.length + ')' : 'NOT SET');
        console.log('API Base URL:', apiBaseUrl || 'NOT SET');

        if (!apiUsername || !apiToken || !apiBaseUrl) {
            return NextResponse.json({
                success: false,
                message: 'API credentials not configured',
                details: {
                    username: !!apiUsername,
                    token: !!apiToken,
                    baseUrl: !!apiBaseUrl
                }
            });
        }

        // Test different possible API endpoints
        const testEndpoints = [
            `${apiBaseUrl}/gst_verification`,
            `${apiBaseUrl}/gst-verification`,
            `${apiBaseUrl}/gstin`,
            `https://api.ekychub.com/api/gst_verification`,
            `https://ekychub.com/api/v1/gst_verification`,
        ];

        const results = [];

        for (const endpoint of testEndpoints) {
            try {
                console.log(`Testing endpoint: ${endpoint}`);
                
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': apiToken,
                        'username': apiUsername,
                    },
                    body: JSON.stringify({
                        gstin: '29AAIC11730N1Z8',
                        consent: 'Y',
                        consent_text: 'I hereby declare my consent agreement'
                    }),
                });

                const data = await response.json().catch(() => ({ error: 'Failed to parse JSON' }));

                results.push({
                    endpoint,
                    status: response.status,
                    statusText: response.statusText,
                    ok: response.ok,
                    data: data
                });

                console.log(`Result for ${endpoint}:`, {
                    status: response.status,
                    ok: response.ok,
                    data
                });

            } catch (error) {
                results.push({
                    endpoint,
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
                console.error(`Error testing ${endpoint}:`, error);
            }
        }

        return NextResponse.json({
            success: true,
            message: 'API endpoint test completed',
            credentials: {
                username: apiUsername,
                tokenLength: apiToken.length,
                baseUrl: apiBaseUrl
            },
            results
        });

    } catch (error) {
        console.error('Test endpoint error:', error);
        return NextResponse.json({
            success: false,
            message: 'Test failed',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
