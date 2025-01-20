'use client'

import React, { useState, useEffect } from 'react';

export function TypingIndicator() {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length < 3 ? prev + '.' : '');
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center space-x-2 text-blue-600">
            <span className="text-xl">🧞</span>
            <span className="text-sm italic text-muted-foreground">Genie is typing{dots}</span>
        </div>
    );
}

