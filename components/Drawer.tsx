"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useRef } from 'react';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Drawer({ isOpen, onClose }: DrawerProps) {
    const { totalItems } = useCart();
    const { user, isAuthenticated } = useAuth();
    const drawerRef = useRef<HTMLDivElement>(null);

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
                <Link href="/" onClick={onClose}>Home</Link>
                <Link href="/categories" onClick={onClose}>Categories</Link>
                <Link href="/seller" onClick={onClose}>Seller Onboarding</Link>
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
            </div>
        </>
    );
}
