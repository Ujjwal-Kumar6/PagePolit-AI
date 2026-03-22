'use client';
import ChatbotPreview from '@/components/dashboard/chatbot/ChatbotPreview'
import React, { useEffect, useRef, useState } from 'react';

interface ChatBotMatadata {
    id: string;
    user_email: string;
    color: string;
    welcome_message: string;
    created_at: string;
    source_ids: string[];
}

function page() {
    const [metadata, setMatadata] = useState<ChatBotMatadata | null>(null);
    const [sections, setSections] = useState<Section[]>([]);
    const [loding, setLoding] = useState(true);

    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [activeSection, setActiveSection] = useState<Section | null>(null);
    const scrollViewportRef = useRef<HTMLDivElement>(null);

    const [primaryColor, setPrimaryColor] = useState('#4f46e5');
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (scrollViewportRef.current) {
            scrollViewportRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    const handleSend = async () => {}
    const handleKeyDown = () => {}
    const handleSectionClick = (name: string) => {}
    const handleReset = () => {}
    const handleSave = async () => {}
    const handleColorChange = (color: string) => {}
    const handleWelcomeMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {}
    const handleSectionChange = (section: Section) => {}
    const handleDeleteSection = (section: Section) => {}
    const handleAddSection = () => {}

    return (
        <div className='px-6 md:px-10 pt-8 min-h-screen bg-black text-white'>

            {/* Header */}
            <div className='mb-6'>
                <h1 className='text-3xl font-bold tracking-tight'>
                    Chatbot Playground 🚀
                </h1>
                <p className='text-sm text-zinc-400 mt-1'>
                    Test your assistant
                </p>
            </div>

            {/* Centered Chat Box */}
            <div className='flex justify-start'>

                <div className='w-full max-w-2xl h-200 rounded-2xl border border-zinc-800 bg-zinc-950 shadow-lg flex flex-col overflow-hidden'>

                    {/* Chat */}
                    <div className='flex-1 h-200 overflow-hidden'>
                        <ChatbotPreview
                            messages={messages}
                            primaryColor={primaryColor}
                            sections={sections}
                            input={input}
                            setInput={setInput}
                            handleSend={handleSend}
                            handleKeyDown={handleKeyDown}
                            handleSectionClick={handleSectionClick}
                            activeSection={activeSection}
                            isTyping={isTyping}
                            handleReset={handleReset}
                            scrollRef={scrollViewportRef}
                        />
                    </div>

                </div>

            </div>
        </div>
    )
}

export default page;