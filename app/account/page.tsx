"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/context/ToastContext";

export default function AccountPage() {
    const { user, logout, updateAddress, isAuthenticated } = useAuth();
    const router = useRouter();
    const { showToast } = useToast();

    // Address state
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [phone, setPhone] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        } else if (user?.address) {
            setStreet(user.address.street);
            setCity(user.address.city);
            setState(user.address.state);
            setPincode(user.address.pincode);
            setPhone(user.address.phone);
        }
    }, [isAuthenticated, user, router]);

    const handleAddressSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateAddress({ street, city, state, pincode, phone });
        setIsEditing(false);
        showToast("Address updated successfully", "success");
    };

    if (!user) return null;

    return (
        <main className="cart-page">
            <div className="cart-content">
                <div className="cart-page-header">
                    <h1>My Account</h1>
                    <p className="muted">Manage your profile and delivery details</p>
                </div>

                <div style={{ display: 'grid', gap: '30px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                    {/* Profile Section */}
                    <div className="glass-card" style={{ padding: '30px' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            👤 Profile Details
                        </h2>
                        <div style={{ display: 'grid', gap: '15px' }}>
                            <div>
                                <label className="label">Full Name</label>
                                <div className="input" style={{ background: 'var(--bg-secondary)', border: 'none' }}>{user.name}</div>
                            </div>
                            <div>
                                <label className="label">Email Address</label>
                                <div className="input" style={{ background: 'var(--bg-secondary)', border: 'none' }}>{user.email}</div>
                            </div>
                            <button
                                onClick={logout}
                                className="btn"
                                style={{
                                    marginTop: '10px',
                                    background: '#ef4444',
                                    color: 'white',
                                    border: 'none'
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="glass-card" style={{ padding: '30px' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between' }}>
                            <span>📍 Delivery Address</span>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="text-sm text-primary hover:underline"
                                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    {user.address ? 'Edit' : 'Add'}
                                </button>
                            )}
                        </h2>

                        {isEditing ? (
                            <form onSubmit={handleAddressSubmit} style={{ display: 'grid', gap: '15px' }}>
                                <div>
                                    <label className="label">Street Address</label>
                                    <input
                                        type="text"
                                        className="input"
                                        required
                                        value={street}
                                        onChange={(e) => setStreet(e.target.value)}
                                        placeholder="House No, Street Name"
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                    <div>
                                        <label className="label">City</label>
                                        <input
                                            type="text"
                                            className="input"
                                            required
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="label">State</label>
                                        <input
                                            type="text"
                                            className="input"
                                            required
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                    <div>
                                        <label className="label">Pincode</label>
                                        <input
                                            type="text"
                                            className="input"
                                            required
                                            value={pincode}
                                            onChange={(e) => setPincode(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="label">Phone</label>
                                        <input
                                            type="tel"
                                            className="input"
                                            required
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Address</button>
                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={() => setIsEditing(false)}
                                        style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div>
                                {user.address ? (
                                    <div style={{ lineHeight: '1.6', color: 'var(--muted)' }}>
                                        <p>{user.address.street}</p>
                                        <p>{user.address.city}, {user.address.state} - {user.address.pincode}</p>
                                        <p>Phone: {user.address.phone}</p>
                                    </div>
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '20px', color: 'var(--muted)' }}>
                                        <p>No address saved yet.</p>
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="btn btn-primary"
                                            style={{ marginTop: '15px' }}
                                        >
                                            Add Delivery Address
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
