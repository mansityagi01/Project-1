'use client'
import { TypingIndicator } from './components/TypingIndicator';
import { Message } from './components/Message';
import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const genieResponses = [
    "Your wish is my command!",
    "Phenomenal cosmic powers, itty bitty living space!",
    "Al, you're not gonna find another friend like me!",
    "Ten thousand years will give you such a crick in the neck!",
    "No matter what anybody says, you'll always be a prince to me.",
];

function TypingIndicator() {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length < 3 ? prev + '.' : '');
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return <div className="text-sm italic text-muted-foreground">Genie is typing{dots}</div>;
}

function Message({ text, isUser }: { text: string; isUser: boolean }) {
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`${isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg py-2 px-4 max-w-[70%]`}>
                {text}
            </div>
        </div>
    );
}

export default function Home() {
    const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputText.trim() === '') return;

        setMessages(prev => [...prev, { text: inputText, isUser: true }]);
        setInputText('');
        setIsTyping(true);

        setTimeout(() => {
            const genieResponse = genieResponses[Math.floor(Math.random() * genieResponses.length)];
            setMessages(prev => [...prev, { text: genieResponse, isUser: false }]);
            setIsTyping(false);
        }, 1500 + Math.random() * 1000);
    };

    return (
        <main className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
                <CardContent className="p-6">
                    <div className="h-[60vh] overflow-y-auto space-y-4">
                        {messages.map((message, index) => (
                            <Message key={index} text={message.text} isUser={message.isUser} />
                        ))}
                        {isTyping && <TypingIndicator />}
                        <div ref={messagesEndRef} />
                    </div>
                </CardContent>
                <CardFooter>
                    <form onSubmit={handleSubmit} className="flex w-full space-x-2">
                        <Input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type your wish..."
                            className="flex-grow"
                        />
                        <Button type="submit">Send</Button>
                    </form>
                </CardFooter>
            </Card>
            <video 
                autoPlay 
                loop 
                muted 
                className="fixed right-0 bottom-0 min-w-full min-h-full w-auto h-auto z-[-1] object-cover"
            >
                <source src="/aladdin-background.mp4" type="video/mp4" />
            </video>
        </main>
    )
}

