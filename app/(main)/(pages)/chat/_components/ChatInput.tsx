
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'
import React from 'react'

interface ChatInputProps {
    chatInput: string
    onInputChange: (value: string) => void
    onSendMessage: () => void
    isLoading: boolean
}

function ChatInput({
    chatInput,
    onInputChange,
    onSendMessage,
    isLoading
}: ChatInputProps) {


    return (
        <div className='p-6'>
          

            <div className='flex gap-3 max-w-4xl mx-auto'>
                <Input
                    type='text'
                    value={chatInput}
                    onChange={e => onInputChange(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
                    placeholder='Ask about any meeting - deadlines, decisions, action items, participants...' 
                    className='flex-1'
                    disabled={isLoading }
                />

                <Button
                    onClick={onSendMessage}
                    disabled={isLoading }
                    className='px-4 py-3'

                >
                    <Send className='h-4 w-4' />
                </Button>

            </div>
        </div>
    )
}

export default ChatInput