"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useRef, useState } from 'react';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Drawer({ isOpen, onClose }: DrawerProps) {
    const { totalItems } = useCart();
    const { user, isAuthenticated } = useAuth();
    const drawerRef = useRef<HTMLDivElement>(null);
    const [isSeller, setIsSeller] = useState(false);

    useEffect(() => {
        const checkSellerStatus = () => {
            const sellerStatus = localStorage.getItem('yk_new_seller');
            setIsSeller(!!sellerStatus);
        };

        checkSellerStatus();
        window.addEventListener('seller-status-changed', checkSellerStatus);

        return () => {
            window.removeEventListener('seller-status-changed', checkSellerStatus);
        };
    }, [isOpen]); // Check on mount, events, and when drawer opens

    // Close drawer if user clicks outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node) && isOpen) {
                // We need to check if the click was on the hamburger button, but that's handled by the parent usually.
                // However, if the drawer is open, clicking outside (on the overlay or body) should close it.
                // For now, we'll rely on the parent or a simple overlay.
                // But the original JS had this logic.
                // Let's implement a simple overlay approach in the CSS or here.
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                ref={drawerRef}
                className={`drawer ${isOpen ? 'show' : ''}`}
                id="drawer"
            >
                <div className="flex flex-col gap-3 mb-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    {isAuthenticated && (
                        <>
                            {/* Coins */}
                            <div className="flex items-center justify-between text-sm font-semibold text-yellow-600">
                                <span>Kirana Coins</span>
                                <div className="flex items-center bg-white px-3 py-1 rounded-full border border-yellow-200">
                                    <span className="mr-1">💰</span>
                                    {user?.coins || 0}
                                </div>
                            </div>

                            {/* Membership Badge */}
                            <div className="flex items-center justify-between text-sm font-semibold">
                                <span>Membership</span>
                                {(!user?.membershipTier || user?.membershipTier === 'Free') ? (
                                    <Link href="/membership" onClick={onClose} className="text-xs font-bold text-white bg-gradient-to-r from-yellow-500 to-amber-600 px-3 py-1 rounded-full hover:scale-105 transition-transform">
                                        👑 Upgrade
                                    </Link>
                                ) : (
                                    <Link href="/membership" onClick={onClose} className={`flex items-center text-xs font-bold px-3 py-1 rounded-full border ${user?.membershipTier === 'Gold' ? 'border-yellow-300 text-yellow-800 bg-yellow-50' : 'border-gray-300 text-gray-700 bg-white'}`}>
                                        {user?.membershipTier === 'Gold' ? '🥇' : '🥈'} <span className="ml-1">{user?.membershipTier}</span>
                                    </Link>
                                )}
                            </div>
                        </>
                    )}
                </div>

                <Link href="/" onClick={onClose}>Home</Link>
                <Link href="/categories" onClick={onClose}>Categories</Link>
                {isSeller ? (
                    <Link href="/seller/dashboard" onClick={onClose} style={{ color: 'var(--mint)', fontWeight: '600' }}>Seller Dashboard</Link>
                ) : (
                    <Link href="/seller" onClick={onClose}>Seller Onboarding</Link>
                )}
                <Link href="/about-advantage" onClick={onClose}>About & Advantage</Link>
                <Link href="/cart" className="cart-trigger" onClick={onClose}>
                    Cart <span className="cart-badge" style={{ display: totalItems > 0 ? 'inline-flex' : 'none' }}>{totalItems}</span>
                </Link>
                {isAuthenticated ? (
                    <Link href="/account" className="nav-btn" onClick={onClose} style={{ background: 'var(--mint)', color: 'white', border: 'none', textAlign: 'center' }}>
                        👤 {user?.name?.split(' ')[0] || 'My Account'}
                    </Link>
                ) : (
                    <Link href="/login" className="nav-btn" onClick={onClose}>Login</Link>
                )}
            </div >
        </>
    );
}
