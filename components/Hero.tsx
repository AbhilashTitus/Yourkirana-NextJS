"use client";

import { useState, useEffect } from 'react';

const banners = [
    '/images/banners/Banner 1.png',
    '/images/banners/Banner 2.png',
    '/images/banners/Banner 3.png',
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="hero">
            <div className="carousel">
                {banners.map((banner, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                        style={{ backgroundImage: `url('${banner}')` }}
                    />
                ))}
            </div>
        </section>
    );
}
