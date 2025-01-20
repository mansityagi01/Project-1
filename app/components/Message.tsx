import React from 'react';

interface MessageProps {
    text: string;
    isUser: boolean;
}

export function Message({ text, isUser }: MessageProps) {
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            <div
                className={`${
                    isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
                } rounded-lg py-2 px-4 max-w-[70%]`}
            >
                {!isUser && <span className="text-xl mr-2">🧞</span>}
                {text}
            </div>
        </div>
    );
}

