const { useState, useEffect, useRef } = React;

function TypingIndicator() {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length < 3 ? prev + '.' : '');
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return <div className="typing-indicator">Genie is typing{dots}</div>;
}

function Message({ text, isUser }) {
    return (
        <div className={`message ${isUser ? 'user-message' : 'genie-message'}`}>
            {text}
        </div>
    );
}

function ChatInterface() {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const genieResponses = [
        "Your wish is my command!",
        "Phenomenal cosmic powers, itty bitty living space!",
        "Al, you're not gonna find another friend like me!",
        "Ten thousand years will give you such a crick in the neck!",
        "No matter what anybody says, you'll always be a prince to me.",
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = (e) => {
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
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <Message key={index} text={message.text} isUser={message.isUser} />
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="input-area">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your wish..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

ReactDOM.render(<ChatInterface />, document.getElementById('root'));

