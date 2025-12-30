import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Video, Plus, Loader2 } from 'lucide-react'

function InstantMeeting() {
    const [selectedPlatform, setSelectedPlatform] = useState<'google-meet' | 'zoom' | null>(null)
    const [meetingUrl, setMeetingUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleJoinMeeting = async () => {
        if (!selectedPlatform || !meetingUrl.trim()) return

        setLoading(true)
        setError('')

        try {
            const response = await fetch('/api/meetings/join-instant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    meetingUrl: meetingUrl.trim(),
                    platform: selectedPlatform,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || 'Failed to join meeting')
                return
            }

            // Success - clear form
            setMeetingUrl('')
            setSelectedPlatform(null)
            alert('Bot is joining the meeting!')
        } catch (err) {
            setError('Failed to join meeting. Please try again.')
            console.error('Error joining meeting:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='bg-card rounded-md p-3 border border-border mb-4'>
            <h3 className='text-xs font-semibold text-foreground mb-2'>Join Meeting with Bot</h3>

            {/* Platform Selection */}
            <div className='flex gap-2 mb-2'>
                <button
                    onClick={() => setSelectedPlatform('google-meet')}
                    className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-md border transition-all text-xs ${
                        selectedPlatform === 'google-meet'
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-muted/20 hover:bg-muted/40'
                    }`}
                >
                    <span className='inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#0F9D58] text-white text-xs font-bold'>G</span>
                    <span className='font-medium text-foreground'>Google Meet</span>
                </button>

                <button
                    onClick={() => setSelectedPlatform('zoom')}
                    className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-md border transition-all text-xs ${
                        selectedPlatform === 'zoom'
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-muted/20 hover:bg-muted/40'
                    }`}
                >
                    <span className='inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#2D8CFF] text-white text-xs font-bold'>Z</span>
                    <span className='font-medium text-foreground'>Zoom</span>
                </button>
            </div>

            {/* Meeting URL Input */}
            <div className='mb-2'>
                <Input
                    placeholder='Paste meeting URL...'
                    value={meetingUrl}
                    onChange={(e) => setMeetingUrl(e.target.value)}
                    className='w-full h-9 text-sm'
                />
            </div>

            {error && (
                <div className='mb-2 text-xs text-destructive bg-destructive/10 p-2 rounded'>
                    {error}
                </div>
            )}

            {/* Join Button */}
            <Button
                onClick={handleJoinMeeting}
                disabled={!selectedPlatform || !meetingUrl.trim() || loading}
                className='w-full h-9 text-sm cursor-pointer'
            >
                {loading ? (
                    <>
                        <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                        Joining...
                    </>
                ) : (
                    <>
                        <Plus className='w-4 h-4 mr-2' />
                        Join with Bot
                    </>
                )}
            </Button>
        </div>
    )
}

export default InstantMeeting
