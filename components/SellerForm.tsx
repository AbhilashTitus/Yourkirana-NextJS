"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface VerificationStatus {
    status: 'idle' | 'verifying' | 'verified' | 'failed' | 'error';
    message?: string;
}

export default function SellerForm() {
    const [fileName, setFileName] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Developer Bypass Check
    const [isDevMode, setIsDevMode] = useState(false);

    // Form data state
    const [formData, setFormData] = useState({
        storeName: '',
        ownerName: '',
        phone: '',
        email: '',
        address: '',
        categories: '',
        gstNumber: '',
        accountNumber: '',
        ifscCode: '',
        accountHolderName: '',
    });

    // Checkbox states
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [confirmAccuracy, setConfirmAccuracy] = useState(false);

    // Verification states
    const [gstVerification, setGstVerification] = useState<VerificationStatus>({ status: 'idle' });
    const [bankVerification, setBankVerification] = useState<VerificationStatus>({ status: 'idle' });
    const [gstData, setGstData] = useState<any>(null);
    const [bankData, setBankData] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName('✓ ' + file.name);
        } else {
            setFileName('');
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
            if (fileInputRef.current) {
                // Create a new DataTransfer object to set the files property
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                fileInputRef.current.files = dataTransfer.files;
                setFileName('✓ ' + file.name);
            }
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Check for dev bypass
        if (name === 'storeName') {
            setIsDevMode(value.trim().toUpperCase() === 'DEV_SKIP');
        }
    };

    // Verify GST Number
    const verifyGST = async () => {
        const gstInput = formData.gstNumber.trim();

        if (!gstInput || gstInput.length !== 15) {
            setGstVerification({ status: 'error', message: 'Please enter a valid 15-character GST number' });
            return;
        }

        setGstVerification({ status: 'verifying', message: 'Verifying GST number...' });

        try {
            const response = await fetch('/api/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ gstNumber: gstInput }),
            });

            let data;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                const text = await response.text();
                console.error('Non-JSON response:', text);
                throw new Error(`Server Error (${response.status}): ${text.substring(0, 100)}...`);
            }

            if (data.success && data.status === 'verified') {
                setGstVerification({ status: 'verified', message: 'GST verified successfully!' });
                setGstData(data.data);
                // Auto-fill business name if empty
                if (!formData.storeName && data.data.tradeName) {
                    setFormData(prev => ({ ...prev, storeName: data.data.tradeName }));
                }
            } else {
                setGstVerification({ status: 'failed', message: data.message || 'GST verification failed' });
                setGstData(null);
            }
        } catch (error) {
            console.error('GST verification error:', error);
            setGstVerification({
                status: 'error',
                message: error instanceof Error ? error.message : 'Verification service exception. Please try again.'
            });
            setGstData(null);
        }
    };

    // Verify Bank Account
    const verifyBankAccount = async () => {
        const accNum = formData.accountNumber.trim();
        const ifsc = formData.ifscCode.trim();
        const holder = formData.accountHolderName.trim();

        if (!accNum || !ifsc || !holder) {
            setBankVerification({ status: 'error', message: 'Please fill all bank details' });
            return;
        }

        setBankVerification({ status: 'verifying', message: 'Verifying bank account...' });

        try {
            const response = await fetch('/api/verify/bank', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    accountNumber: accNum,
                    ifsc: ifsc,
                    accountHolderName: holder,
                }),
            });

            const data = await response.json();

            if (data.success && data.status === 'verified') {
                setBankVerification({ status: 'verified', message: 'Bank account verified successfully!' });
                setBankData(data.data);
            } else {
                setBankVerification({ status: 'failed', message: data.message || 'Bank verification failed' });
                setBankData(null);
            }
        } catch (error) {
            setBankVerification({ status: 'error', message: 'Verification service error. Please try again.' });
            setBankData(null);
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if verifications are complete
        if (!isDevMode && gstVerification.status !== 'verified') {
            alert('Please verify your GST number before submitting');
            return;
        }

        if (!isDevMode && bankVerification.status !== 'verified') {
            alert('Please verify your bank account before submitting');
            return;
        }

        // Check if terms are agreed
        if (!agreeTerms) {
            alert('Please agree to the Seller Terms & Conditions');
            return;
        }

        if (!confirmAccuracy) {
            alert('Please confirm that all information provided is accurate');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/seller/onboard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                // Store details for the dashboard
                localStorage.setItem('yk_new_seller', JSON.stringify({
                    sellerId: data.sellerId,
                    ...data.details
                }));

                // Dispatch event to update navbar
                window.dispatchEvent(new Event('seller-status-changed'));

                router.push('/seller/success');
            } else {
                alert(data.error || 'Submission failed. Please try again.');
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('An unexpected error occurred. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="feature-card" style={{ maxWidth: '860px' }}>
            <div style={{
                padding: '16px 20px',
                background: 'linear-gradient(135deg, rgba(6, 194, 112, 0.1), rgba(5, 156, 90, 0.05))',
                borderRadius: '12px',
                marginBottom: '24px',
                border: '1px solid rgba(6, 194, 112, 0.2)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>🔒</span>
                    <div>
                        <div style={{ fontWeight: '600', color: 'var(--text)', marginBottom: '4px' }}>Secure KYC Verification</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                            Your GST and bank details will be verified instantly using government-authorized services. All data is encrypted and secure.
                        </div>
                    </div>
                </div>
            </div>

            <form className="form" onSubmit={handleSubmit}>
                {/* Basic Information */}
                <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '20px', color: 'var(--text)' }}>
                        📋 Basic Information
                    </h3>
                    <div className="form-grid">
                        <div>
                            <label className="label">Store/Business Name *</label>
                            <input
                                className="input"
                                type="text"
                                name="storeName"
                                value={formData.storeName}
                                onChange={handleInputChange}
                                placeholder="E.g., Rama General Stores"
                                required
                            />
                        </div>
                        <div>
                            <label className="label">Owner Name *</label>
                            <input
                                className="input"
                                type="text"
                                name="ownerName"
                                value={formData.ownerName}
                                onChange={handleInputChange}
                                placeholder="E.g., Ramesh Kumar"
                                required
                            />
                        </div>
                        <div>
                            <label className="label">Phone Number *</label>
                            <input
                                className="input"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="+91 9xxxxxxxxx"
                                required
                            />
                        </div>
                        <div>
                            <label className="label">Email Address</label>
                            <input
                                className="input"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="store@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="label">Store Address *</label>
                        <input
                            className="input"
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Street, Area, City, State, PIN Code"
                            required
                        />
                    </div>

                    <div>
                        <label className="label">Product Categories</label>
                        <input
                            className="input"
                            type="text"
                            name="categories"
                            value={formData.categories}
                            onChange={handleInputChange}
                            placeholder="E.g., Groceries, Dairy, Vegetables, Fruits, Snacks"
                        />
                    </div>
                </div>

                {/* GST Verification */}
                <div style={{ marginBottom: '32px', padding: '24px', background: 'var(--bg-soft)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        🏢 GST Verification
                        {gstVerification.status === 'verified' && <span style={{ fontSize: '1.5rem' }}>✅</span>}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.6' }}>
                        Enter your 15-digit GST number for instant verification. We'll fetch your business details from government records.
                    </p>

                    <div>
                        <label className="label">GST Number (GSTIN) *</label>
                        <input
                            className="input"
                            type="text"
                            name="gstNumber"
                            value={formData.gstNumber}
                            onChange={handleInputChange}
                            placeholder="29ABCDE1234F1Z5"
                            maxLength={15}
                            style={{ textTransform: 'uppercase' }}
                            required
                        />
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={verifyGST}
                            disabled={gstVerification.status === 'verifying' || gstVerification.status === 'verified'}
                            style={{
                                width: '100%',
                                marginTop: '12px',
                                opacity: gstVerification.status === 'verifying' ? 0.7 : 1,
                                cursor: gstVerification.status === 'verified' ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {gstVerification.status === 'verifying' ? '⏳ Verifying...' :
                                gstVerification.status === 'verified' ? '✓ Verified' : 'Verify GST'}
                        </button>
                    </div>

                    {/* GST Verification Status */}
                    {gstVerification.message && (
                        <div style={{
                            marginTop: '16px',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            background: gstVerification.status === 'verified' ? 'rgba(16, 185, 129, 0.1)' :
                                gstVerification.status === 'failed' || gstVerification.status === 'error' ? 'rgba(239, 68, 68, 0.1)' :
                                    'rgba(59, 130, 246, 0.1)',
                            border: `1px solid ${gstVerification.status === 'verified' ? 'rgba(16, 185, 129, 0.3)' :
                                gstVerification.status === 'failed' || gstVerification.status === 'error' ? 'rgba(239, 68, 68, 0.3)' :
                                    'rgba(59, 130, 246, 0.3)'}`,
                            color: gstVerification.status === 'verified' ? '#059669' :
                                gstVerification.status === 'failed' || gstVerification.status === 'error' ? '#dc2626' :
                                    '#2563eb',
                            fontSize: '0.9rem',
                            fontWeight: '500'
                        }}>
                            {gstVerification.message}
                        </div>
                    )}

                    {/* GST Data Display */}
                    {gstData && gstVerification.status === 'verified' && (
                        <div style={{ marginTop: '16px', padding: '16px', background: '#fff', borderRadius: '8px', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px', fontWeight: '600' }}>
                                Verified Business Details:
                            </div>
                            <div style={{ display: 'grid', gap: '8px', fontSize: '0.9rem' }}>
                                <div><strong>Legal Name:</strong> {gstData.legalName}</div>
                                <div><strong>Trade Name:</strong> {gstData.tradeName}</div>
                                <div><strong>Business Type:</strong> {gstData.businessType}</div>
                                <div><strong>State:</strong> {gstData.state}</div>
                                <div><strong>Status:</strong> <span style={{ color: 'var(--mint)', fontWeight: '600' }}>{gstData.gstStatus}</span></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bank Account Verification */}
                <div style={{ marginBottom: '32px', padding: '24px', background: 'var(--bg-soft)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        🏦 Bank Account Verification
                        {bankVerification.status === 'verified' && <span style={{ fontSize: '1.5rem' }}>✅</span>}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.6' }}>
                        Provide your bank account details for payment settlements. We'll verify the account instantly.
                    </p>

                    <div className="form-grid">
                        <div>
                            <label className="label">Account Number *</label>
                            <input
                                className="input"
                                type="text"
                                name="accountNumber"
                                value={formData.accountNumber}
                                onChange={handleInputChange}
                                placeholder="Enter account number"
                                required
                            />
                        </div>
                        <div>
                            <label className="label">IFSC Code *</label>
                            <input
                                className="input"
                                type="text"
                                name="ifscCode"
                                value={formData.ifscCode}
                                onChange={handleInputChange}
                                placeholder="E.g., SBIN0001234"
                                maxLength={11}
                                style={{ textTransform: 'uppercase' }}
                                required
                            />
                        </div>
                    </div>
                    <br />
                    <div>
                        <label className="label">Account Holder Name *</label>
                        <input
                            className="input"
                            type="text"
                            name="accountHolderName"
                            value={formData.accountHolderName}
                            onChange={handleInputChange}
                            placeholder="As per bank records"
                            required
                        />
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={verifyBankAccount}
                            disabled={bankVerification.status === 'verifying' || bankVerification.status === 'verified'}
                            style={{
                                width: '100%',
                                marginTop: '12px',
                                opacity: bankVerification.status === 'verifying' ? 0.7 : 1,
                                cursor: bankVerification.status === 'verified' ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {bankVerification.status === 'verifying' ? '⏳ Verifying...' :
                                bankVerification.status === 'verified' ? '✓ Verified' : 'Verify Account'}
                        </button>
                    </div>

                    {/* Bank Verification Status */}
                    {bankVerification.message && (
                        <div style={{
                            marginTop: '16px',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            background: bankVerification.status === 'verified' ? 'rgba(16, 185, 129, 0.1)' :
                                bankVerification.status === 'failed' || bankVerification.status === 'error' ? 'rgba(239, 68, 68, 0.1)' :
                                    'rgba(59, 130, 246, 0.1)',
                            border: `1px solid ${bankVerification.status === 'verified' ? 'rgba(16, 185, 129, 0.3)' :
                                bankVerification.status === 'failed' || bankVerification.status === 'error' ? 'rgba(239, 68, 68, 0.3)' :
                                    'rgba(59, 130, 246, 0.3)'}`,
                            color: bankVerification.status === 'verified' ? '#059669' :
                                bankVerification.status === 'failed' || bankVerification.status === 'error' ? '#dc2626' :
                                    '#2563eb',
                            fontSize: '0.9rem',
                            fontWeight: '500'
                        }}>
                            {bankVerification.message}
                        </div>
                    )}

                    {/* Bank Data Display */}
                    {bankData && bankVerification.status === 'verified' && (
                        <div style={{ marginTop: '16px', padding: '16px', background: '#fff', borderRadius: '8px', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px', fontWeight: '600' }}>
                                Verified Bank Details:
                            </div>
                            <div style={{ display: 'grid', gap: '8px', fontSize: '0.9rem' }}>
                                <div><strong>Bank Name:</strong> {bankData.bankName}</div>
                                <div><strong>Branch:</strong> {bankData.branchName}</div>
                                <div><strong>Account Holder:</strong> {bankData.accountHolderName}</div>
                                <div><strong>Account Number:</strong> {bankData.accountNumber}</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Document Upload */}
                <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px', color: 'var(--text)' }}>
                        📄 Supporting Documents
                    </h3>
                    <label className="label">Business Proof (GST Certificate / Shop License)</label>
                    <div className="file-upload">
                        <div
                            className={`file-upload-area ${isDragOver ? 'drag-over' : ''} ${fileName ? 'has-file' : ''}`}
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="file-upload-icon">📄</div>
                            <div className="file-upload-text">Click to upload or drag and drop</div>
                            <div className="file-upload-hint">PDF, JPG, or PNG (max 5MB)</div>
                            <div className="file-upload-name">{fileName}</div>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>

                {/* Terms and Conditions Checkboxes */}
                <div style={{ marginBottom: '24px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        marginBottom: '16px',
                        padding: '16px',
                        background: 'var(--bg-soft)',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                        onClick={() => setAgreeTerms(!agreeTerms)}
                    >
                        <input
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                width: '20px',
                                height: '20px',
                                marginTop: '2px',
                                cursor: 'pointer',
                                accentColor: 'var(--mint)'
                            }}
                        />
                        <label style={{
                            fontSize: '0.95rem',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer',
                            lineHeight: '1.5',
                            flex: 1
                        }}>
                            I agree to YourKirana's{' '}
                            <a
                                href="/terms"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    color: 'var(--mint)',
                                    textDecoration: 'none',
                                    fontWeight: '500'
                                }}
                            >
                                Seller Terms & Conditions
                            </a>
                        </label>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '16px',
                        background: 'var(--bg-soft)',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                        onClick={() => setConfirmAccuracy(!confirmAccuracy)}
                    >
                        <input
                            type="checkbox"
                            checked={confirmAccuracy}
                            onChange={(e) => setConfirmAccuracy(e.target.checked)}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                width: '20px',
                                height: '20px',
                                marginTop: '2px',
                                cursor: 'pointer',
                                accentColor: 'var(--mint)'
                            }}
                        />
                        <label style={{
                            fontSize: '0.95rem',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer',
                            lineHeight: '1.5',
                            flex: 1
                        }}>
                            I confirm all information provided is accurate
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <div style={{
                    padding: '20px',
                    background: 'linear-gradient(135deg, rgba(6, 194, 112, 0.05), rgba(5, 156, 90, 0.02))',
                    borderRadius: '12px',
                    border: '1px solid rgba(6, 194, 112, 0.1)'
                }}>
                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={isSubmitting || (!isDevMode && (gstVerification.status !== 'verified' || bankVerification.status !== 'verified')) || !agreeTerms || !confirmAccuracy}
                        style={{
                            width: '100%',
                            fontSize: '1.0625rem',
                            padding: '16px',
                            opacity: (isSubmitting || (!isDevMode && (gstVerification.status !== 'verified' || bankVerification.status !== 'verified')) || !agreeTerms || !confirmAccuracy) ? 0.6 : 1,
                            cursor: (isSubmitting || (!isDevMode && (gstVerification.status !== 'verified' || bankVerification.status !== 'verified')) || !agreeTerms || !confirmAccuracy) ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isSubmitting ? '⏳ Submitting Application...' : 'Submit Seller Application'}
                    </button>
                    {(gstVerification.status !== 'verified' || bankVerification.status !== 'verified') && !isDevMode && (
                        <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            Please complete GST and Bank Account verification to submit
                        </div>
                    )}
                    {(!agreeTerms || !confirmAccuracy) && (
                        <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            Please agree to the terms and confirm data accuracy
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}
