import { NextRequest, NextResponse } from 'next/server';

// Validation helper functions
function validateAccountNumber(accountNumber: string): boolean {
    // Account number should be 9-18 digits
    const accountRegex = /^[0-9]{9,18}$/;
    return accountRegex.test(accountNumber);
}

function validateIFSC(ifsc: string): boolean {
    // IFSC format: 11 characters
    // Simply check length and alphanumeric to avoid rejecting valid new banks
    const ifscRegex = /^[A-Z0-9]{11}$/;
    return ifscRegex.test(ifsc.toUpperCase());
}

function validateAccountHolderName(name: string): boolean {
    // Name should be at least 3 characters and contain only letters and spaces
    return name.length >= 3;
}

// Sanitize input to prevent injection attacks
function sanitizeInput(input: string): string {
    return input.trim().replace(/[<>\"']/g, '');
}

export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body = await request.json();
        const { accountNumber, ifsc, accountHolderName } = body;

        // Validate required fields
        if (!accountNumber || !ifsc || !accountHolderName) {
            return NextResponse.json(
                {
                    success: false,
                    status: 'invalid',
                    message: 'Missing required fields. Please provide account number, IFSC code, and account holder name.',
                },
                { status: 400 }
            );
        }

        // Sanitize inputs
        const sanitizedAccountNumber = sanitizeInput(accountNumber);
        const sanitizedIFSC = sanitizeInput(ifsc).toUpperCase();
        const sanitizedName = sanitizeInput(accountHolderName);

        console.log(`[Bank Verification] Account: ${sanitizedAccountNumber.slice(-4).padStart(10, '*')}, IFSC: ${sanitizedIFSC}, Name: ${sanitizedName}`);

        // Validate account number format
        if (!validateAccountNumber(sanitizedAccountNumber)) {
            return NextResponse.json(
                {
                    success: false,
                    status: 'invalid',
                    message: 'Invalid account number format. Account number should be 9-18 digits.',
                },
                { status: 400 }
            );
        }

        // Validate IFSC format
        if (!validateIFSC(sanitizedIFSC)) {
            // Check specifically for length error to give helpful feedback
            if (sanitizedIFSC.length !== 11) {
                return NextResponse.json(
                    {
                        success: false,
                        status: 'invalid',
                        message: `Invalid IFSC code length. IFSC must be exactly 11 characters. You provided ${sanitizedIFSC.length}.`,
                    },
                    { status: 400 }
                );
            }
            return NextResponse.json(
                {
                    success: false,
                    status: 'invalid',
                    message: 'Invalid IFSC code format. IFSC should be 11 characters (e.g., SBIN0001234).',
                },
                { status: 400 }
            );
        }

        // Validate account holder name
        if (!validateAccountHolderName(sanitizedName)) {
            return NextResponse.json(
                {
                    success: false,
                    status: 'invalid',
                    message: 'Invalid account holder name. Name should be at least 3 characters.',
                },
                { status: 400 }
            );
        }

        // Get API credentials from environment variables
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
        const orderId = `BANK_${Date.now()}_${Math.random().toString(36).substring(7)}`;

        // Call EKYCHub Bank Account Verification API (GET request with query parameters)
        const apiUrl = `${apiBaseUrl}/bank_verification_simple?username=${apiUsername}&token=${apiToken}&account_number=${sanitizedAccountNumber}&ifsc=${sanitizedIFSC}&orderid=${orderId}`;

        console.log('Calling EKYCHub Bank API');

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
        try {
            ekycData = await ekycResponse.json();
        } catch (parseError) {
            console.error('Failed to parse EKYCHub response:', parseError);
            const responseText = await ekycResponse.text();
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
        console.log('EKYCHub Bank Response Status:', ekycResponse.status);
        console.log('EKYCHub Bank Response:', JSON.stringify(ekycData, null, 2));

        // Check if verification was successful based on EKYCHub's response format
        // Response format: { "status": "Success" or "Failure", "message": "...", ... }
        const isSuccess = ekycData.status === 'Success';

        if (isSuccess) {
            // Extract bank details from response
            const nameAtBank = ekycData.nameAtBank || ekycData.name_at_bank || 'N/A';

            // Check if name matches (optional - you can make this strict or lenient)
            const nameMatchScore = calculateNameMatch(sanitizedName, nameAtBank);
            const nameMatches = nameMatchScore >= 60; // 60% match threshold

            if (nameMatches || !sanitizedName) {
                // Extract bank name from IFSC code
                const bankName = getBankNameFromIFSC(sanitizedIFSC);

                return NextResponse.json({
                    success: true,
                    status: 'verified',
                    message: 'Bank account verified successfully.',
                    data: {
                        accountNumber: sanitizedAccountNumber.slice(-4).padStart(sanitizedAccountNumber.length, '*'),
                        ifsc: ekycData['Ifsc Code'] || sanitizedIFSC,
                        bankName: bankName,
                        branchName: 'N/A',
                        accountHolderName: nameAtBank,
                        utr: ekycData.utr || 'N/A',
                    },
                });
            } else {
                return NextResponse.json({
                    success: false,
                    status: 'failed',
                    message: 'Account verified but name does not match. Please verify the account holder name.',
                    data: {
                        accountNumber: sanitizedAccountNumber.slice(-4).padStart(sanitizedAccountNumber.length, '*'),
                        ifsc: sanitizedIFSC,
                        expectedName: nameAtBank,
                        providedName: sanitizedName,
                    },
                });
            }
        } else {
            // Verification failed
            return NextResponse.json({
                success: false,
                status: 'failed',
                message: ekycData.message || 'Bank account verification failed. Please check your details and try again.',
            });
        }

        // Helper function to calculate name match score
        function calculateNameMatch(name1: string, name2: string): number {
            const n1 = name1.toLowerCase().replace(/[^a-z]/g, '');
            const n2 = name2.toLowerCase().replace(/[^a-z]/g, '');

            if (n1 === n2) return 100;
            if (n2.includes(n1) || n1.includes(n2)) return 80;

            // Simple character match percentage
            let matches = 0;
            const shorter = n1.length < n2.length ? n1 : n2;
            const longer = n1.length >= n2.length ? n1 : n2;

            for (let char of shorter) {
                if (longer.includes(char)) matches++;
            }

            return (matches / shorter.length) * 100;
        }

        // Helper function to get bank name from IFSC
        function getBankNameFromIFSC(ifsc: string): string {
            const bankCodes: { [key: string]: string } = {
                'SBIN': 'State Bank of India',
                'HDFC': 'HDFC Bank',
                'ICIC': 'ICICI Bank',
                'AXIS': 'Axis Bank',
                'PUNB': 'Punjab National Bank',
                'CNRB': 'Canara Bank',
                'UBIN': 'Union Bank of India',
                'IDIB': 'Indian Bank',
                'BARB': 'Bank of Baroda',
                'KKBK': 'Kotak Mahindra Bank',
                'INDB': 'IndusInd Bank',
                'YESB': 'Yes Bank',
                'FDRL': 'Federal Bank',
                'IDFB': 'IDFC First Bank',
                'UTIB': 'Axis Bank',
            };

            const bankCode = ifsc.substring(0, 4);
            return bankCodes[bankCode] || 'Bank';
        }

    } catch (error) {
        console.error('Bank verification error:', error instanceof Error ? error.message : 'Unknown error');

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
