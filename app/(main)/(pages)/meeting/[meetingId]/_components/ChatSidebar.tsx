'use client';

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, X } from 'lucide-react'
import React, { useEffect, useRef } from 'react'

interface Message {
    id: number
    content: string
    isBot: boolean
    timestamp: Date
}

interface ChatSidebarProps {
    messages: Message[]
    chatInput: string
    showSuggestions: boolean
    onInputChange: (value: string) => void
    onSendMessage: () => void
    onSuggestionClick: (suggestion: string) => void
    onClose?: () => void
    isMobile?: boolean
}

function ChatSidebar({
    messages,
    chatInput,
    showSuggestions,
    onInputChange,
    onSendMessage,
    onSuggestionClick,
    onClose,
    isMobile = false
}: ChatSidebarProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const chatSuggestions = [
        "What deadlines were discussed in this meeting?",
        "Write a follow-up email for the team",
        "What suggestions was I given during the discussion?",
        "Summarize the key action items from this meeting"
    ]

    // Handle keyboard appearing on mobile
    useEffect(() => {
        if (!isMobile) return;

        const handleResize = () => {
            // Scroll input into view when keyboard appears
            if (document.activeElement === inputRef.current) {
                setTimeout(() => {
                    inputRef.current?.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 100);
            }
        };

        // Listen for visual viewport resize (keyboard appearance)
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', handleResize);
            return () => {
                window.visualViewport?.removeEventListener('resize', handleResize);
            };
        } else {
            // Fallback for browsers without visualViewport
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [isMobile]);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div 
            ref={containerRef}
            className='w-full h-full flex flex-col bg-card'
            style={isMobile ? { 
                height: '100dvh',
                maxHeight: '100dvh',
                display: 'flex',
                flexDirection: 'column'
            } : undefined}
        >
            <div className='p-4 border-b border-border flex-shrink-0 flex items-center justify-between'>
                <div>
                    <h3 className='font-semibold text-foreground'>
                        Meeting Assistant
                    </h3>
                    <p className='text-sm text-muted-foreground'>
                        Ask me anything about this meeting
                    </p>
                </div>
                {onClose && (
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={onClose}
                        className='hover:bg-muted rounded-lg transition-colors flex-shrink-0'
                        title='Close chat'
                    >
                        <X className='h-5 w-5' />
                    </Button>
                )}
            </div>

            <div 
                className='flex-1 p-3 overflow-y-auto space-y-3 min-h-0'
                style={isMobile ? {
                    WebkitOverflowScrolling: 'touch',
                    overscrollBehavior: 'contain'
                } : undefined}
            >
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-lg p-3 ${message.isBot
                                ? 'bg-muted text-foreground'
                                : 'bg-primary text-primary-foreground'
                                }`}
                        >
                            <p className='text-sm'>{message.content}</p>
                        </div>
                    </div>
                ))}

                {messages.length > 0 && !messages[messages.length - 1].isBot && (
                    <div className='flex justify-start'>
                        <div className='bg-muted text-foreground rounded-lg p-3'>
                            <p className='text-sm'>
                                Thinking...
                            </p>
                        </div>
                    </div>
                )}
                
                {showSuggestions && messages.length === 0 && (
                    <div className='flex flex-col items-center space-y-2 mt-8'>
                        {chatSuggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                onClick={() => onSuggestionClick(suggestion)}
                                className='w-4/5 rounded-lg p-3 border transition-colors text-center 
                                     bg-primary/10 text-foreground border-primary/20 hover:bg-primary/20'
                            >
                                <p className='text-sm'>⚡️ {suggestion}</p>
                            </button>
                        ))}
                    </div>
                )}

                {/* Invisible div to scroll to */}
                <div ref={messagesEndRef} />
            </div>

            <div 
                className='p-3 pt-2 border-t border-border flex-shrink-0 lg:pb-4 bg-card'
                style={isMobile ? {
                    position: 'sticky',
                    bottom: 0,
                    zIndex: 10
                } : undefined}
            >
                <div className='flex gap-2'>
                    <Input
                        ref={inputRef}
                        type='text'
                        value={chatInput}
                        onChange={(e) => onInputChange(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                onSendMessage()
                            }
                        }}
                        onFocus={() => {
                            // Scroll to input when focused (keyboard appears)
                            if (isMobile) {
                                setTimeout(() => {
                                    inputRef.current?.scrollIntoView({ 
                                        behavior: 'smooth', 
                                        block: 'end' 
                                    });
                                }, 300);
                            }
                        }}
                        placeholder="Ask about this meeting..."
                        className='flex-1'
                    />

                    <Button
                        type='button'
                        onClick={onSendMessage}
                        disabled={!chatInput.trim()}
                    >
                        <Send className='h-4 w-4' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ChatSidebar