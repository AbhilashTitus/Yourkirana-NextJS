"use client";

import { useState, useRef } from 'react';

export default function SellerForm() {
    const [fileName, setFileName] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    return (
        <div className="feature-card" style={{ maxWidth: '860px' }}>
            <div className="notice">Provide your store details. Our team will review and reach out within 48 hours.</div>
            <div style={{ height: '12px' }}></div>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-grid">
                    <div>
                        <label className="label">Store Name</label>
                        <input className="input" type="text" placeholder="E.g., Rama General Stores" required />
                    </div>
                    <div>
                        <label className="label">Owner Name</label>
                        <input className="input" type="text" placeholder="E.g., Ramesh Kumar" required />
                    </div>
                    <div>
                        <label className="label">Phone</label>
                        <input className="input" type="tel" placeholder="+91 9xxxxxxxxx" required />
                    </div>
                    <div>
                        <label className="label">Email</label>
                        <input className="input" type="email" placeholder="store@example.com" />
                    </div>
                </div>

                <label className="label">Store Address</label>
                <input className="input" type="text" placeholder="Street, Area, City, PIN" required />

                <label className="label">Categories you can fulfil</label>
                <input className="input" type="text" placeholder="Groceries, Dairy, Vegetables, etc." />

                <label className="label">Business Proof (GST / Shop License)</label>
                <div className="file-upload">
                    <div
                        className={`file-upload-area ${isDragOver ? 'drag-over' : ''} ${fileName ? 'has-file' : ''}`}
                        id="uploadArea"
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
                        className="input"
                        type="file"
                        id="fileInput"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                    />
                </div>

                <div>
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => alert('Thanks! Our team will reach out soon.')}
                    >
                        Submit Application
                    </button>
                </div>
            </form>
        </div>
    );
}
