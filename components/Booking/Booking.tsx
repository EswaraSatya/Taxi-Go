"use client"
import React, { useEffect, useState } from 'react';
import AutoCompleteAddress from './AutoCompleteAddress';
import Cars from './Cars';
import Cards from './Cards';

const Booking = () => {
    const [screenHeight, setScreenHeight] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const calculateScreenHeight = () => {
                const height = window.innerHeight * 0.72;
                setScreenHeight(height);
            };

            calculateScreenHeight();
            window.addEventListener('resize', calculateScreenHeight);

            return () => {
                window.removeEventListener('resize', calculateScreenHeight);
            };
        }
    }, []);

    return (
        <div className='p-3'>
            <h2 className='text-[20px] font-semibold'>Booking</h2>
            <div className='border-[1px] p-3 rounded-md' style={{ height: screenHeight }}>
                <AutoCompleteAddress />
                <Cars />
                <Cards />
                <button className='w-full bg-yellow-500 p-1 rounded-md mt-4'>
                    Book
                </button>
            </div>
        </div>
    );
};

export default Booking;
