"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import Drawer from './Drawer';

export default function Header() {
    const { totalItems } = useCart();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
                        <Link href="/seller">Seller Onboarding</Link>
                        <Link href="/about-advantage">About & Advantage</Link>
                        <Link href="/cart" className="cart-trigger">
                            Cart <span className="cart-badge" style={{ display: totalItems > 0 ? 'inline-flex' : 'none' }}>{totalItems}</span>
                        </Link>
                        <Link href="/admin" className="nav-btn" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff' }}>Admin</Link>
                        <Link href="/login" className="nav-btn">Login</Link>
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
