import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RefreshCw } from 'lucide-react';
import React, { RefObject } from 'react';
import { cn } from "@/lib/utils";

interface ChatbotPreviewProps {
    messages: any[];
    primaryColor: string;
    sections: Section[];
    input: string;
    setInput: (value: string) => void;
    handleSend: () => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    handleSectionClick: (name: string) => void;
    activeSection: Section | null;
    isTyping: boolean;
    handleReset: () => void;
    scrollRef: RefObject<HTMLDivElement | null>;
}

function ChatbotPreview({ messages, primaryColor, sections, input, setInput, handleSend, handleKeyDown, handleSectionClick, activeSection, isTyping, handleReset, scrollRef }: ChatbotPreviewProps) {
    return (
        <Card className='flex-1 h-full w-full flex flex-col border-white/5 bg-[#0A0A0E] overflow-hidden relative shadow-2xl'>
            <div className='h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#0E0E12]'>
                <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 rounded-full bg-green-500' />
                    <span className='text-sm text-zinc-400'>Test Environment</span>
                </div>
                <Button variant='ghost' size='sm' onClick={handleReset} className='h-8 text-zinc-500 hover:text-white hover:bg-white/10'>
                    <RefreshCw className='w-3.5 h-3.5 mr-2'/>
                    Reset
                </Button>
            </div>
            {/* Chat messages */}
            <ScrollArea className='flex-1 p-6 relative bg-zinc-950/30'>
            <div className='space-y-6 pb-4'>
                {messages.map((msg, i) => (
                    <div key={i} className={cn('flex w-full flex-col', msg.react === 'user' ? 'items-center' : 'items-start')}>
                        <div></div>
                    </div>
                ))}
            </div>
            </ScrollArea>
        </Card>
    )
}

export default ChatbotPreview