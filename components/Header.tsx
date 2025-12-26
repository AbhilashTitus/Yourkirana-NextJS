"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import Drawer from './Drawer';

export default function Header() {
    const { totalItems } = useCart();
    const { user, isAuthenticated } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header className={`header floating-nav ${isScrolled ? 'scrolled' : ''}`}>
                <div className="container bar">
                    <Link href="/" className="logo">Your<span>Kirana</span></Link>
                    <nav className="nav hidden md:flex">
                        <Link href="/">Home</Link>
                        <Link href="/categories">Categories</Link>
                        {isSeller ? (
                            <Link href="/seller/dashboard" style={{ color: 'var(--mint)', fontWeight: '600' }}>Seller Dashboard</Link>
                        ) : (
                            <Link href="/seller">Seller Onboarding</Link>
                        )}
                        <Link href="/about-advantage">About & Advantage</Link>
                        <Link href="/cart" className="cart-trigger">
                            Cart <span className="cart-badge" style={{ display: totalItems > 0 ? 'inline-flex' : 'none' }}>{totalItems}</span>
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <div className="flex items-center gap-3">
                                    {/* Coins */}
                                    <div className="flex items-center text-sm font-semibold text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200" title="Kirana Coins">
                                        <span className="mr-1">💰</span>
                                        {user?.coins || 0}
                                    </div>

                                    {/* Membership Badge or Upsell */}
                                    {(!user?.membershipTier || user?.membershipTier === 'Free') ? (
                                        <Link href="/membership" className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600 hover:scale-105 transition-transform">
                                            👑 Upgrade
                                        </Link>
                                    ) : (
                                        <Link href="/membership" className={`flex items-center text-xs font-bold px-2 py-1 rounded-full border ${user?.membershipTier === 'Gold' ? 'border-yellow-300 text-yellow-800 bg-yellow-50' : 'border-gray-300 text-gray-700 bg-gray-50'}`}>
                                            {user?.membershipTier === 'Gold' ? '🥇' : '🥈'} {user?.membershipTier}
                                        </Link>
                                    )}
                                </div>
                                <Link href="/account" className="nav-btn" style={{ background: 'var(--mint)', color: 'white', border: 'none' }}>
                                    👤 {user?.name?.split(' ')[0] || 'Account'}
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/membership" className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600 hover:scale-105 transition-transform" style={{ marginRight: '15px' }}>
                                    Membership 👑
                                </Link>
                                <Link href="/login" className="nav-btn">Login</Link>
                            </>
                        )}
                    </nav>
                    <button
                        className="hamb md:hidden"
                        aria-label="Menu"
                        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    >
                        ☰
                    </button>
                </div>
            </header>
            <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        </>
    );
}
