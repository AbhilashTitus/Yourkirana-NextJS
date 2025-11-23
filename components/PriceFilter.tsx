"use client";

import { useState, useEffect, useRef } from 'react';

interface PriceFilterProps {
    min: number;
    max: number;
    onChange: (min: number, max: number) => void;
}

export default function PriceFilter({ min, max, onChange }: PriceFilterProps) {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef<HTMLDivElement>(null);

    // Convert to percentage
    const getPercent = (value: number) => Math.round(((value - min) / (max - min)) * 100);

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    useEffect(() => {
        setMinVal(min);
        setMaxVal(max);
        minValRef.current = min;
        maxValRef.current = max;
    }, [min, max]);

    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(event.target.value), maxVal - 1);
        setMinVal(value);
        minValRef.current = value;
        onChange(value, maxVal);
    };

    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(event.target.value), minVal + 1);
        setMaxVal(value);
        maxValRef.current = value;
        onChange(minVal, value);
    };

    return (
        <div className="price-filter-container">
            <h3 className="filter-title">Price Range</h3>
            <div className="slider-container">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={minVal}
                    onChange={handleMinChange}
                    className="thumb thumb--left"
                    style={{ zIndex: minVal > max - 100 ? 5 : 3 }}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={maxVal}
                    onChange={handleMaxChange}
                    className="thumb thumb--right"
                />

                <div className="slider">
                    <div className="slider__track" />
                    <div ref={range} className="slider__range" />
                </div>
            </div>

            <div className="price-inputs">
                <div className="price-field">
                    <span>₹</span>
                    <input
                        type="number"
                        value={minVal}
                        onChange={handleMinChange}
                        min={min}
                        max={maxVal - 1}
                    />
                </div>
                <div className="separator">-</div>
                <div className="price-field">
                    <span>₹</span>
                    <input
                        type="number"
                        value={maxVal}
                        onChange={handleMaxChange}
                        min={minVal + 1}
                        max={max}
                    />
                </div>
            </div>
        </div>
    );
}
