import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Video, Plus, Loader2, X } from 'lucide-react'

function InstantMeeting() {
    const [selectedPlatform, setSelectedPlatform] = useState<'google-meet' | 'zoom' | 'microsoft' | null>(null)
    const [meetingUrl, setMeetingUrl] = useState('')
    const [meetingTitle, setMeetingTitle] = useState('')
    const [meetingDesc, setMeetingDesc] = useState('')
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
                    title: meetingTitle.trim() || undefined,
                    description: meetingDesc.trim() || undefined,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || 'Failed to join meeting')
                return
            }

            // Success - clear form
            setMeetingUrl('')
            setMeetingTitle('')
            setMeetingDesc('')
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
        <div className='relative rounded-xl p-[2px] bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 mb-4'>
            <div className='bg-gradient-to-br from-card via-card/95 to-card/90 rounded-xl p-4 backdrop-blur-sm'>
                <h3 className='text-sm font-semibold text-foreground mb-3 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent'>Join Meeting with Bot</h3>

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

                <button
                    onClick={() => setSelectedPlatform('microsoft')}
                    className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-md border transition-all text-xs ${
                        selectedPlatform === 'microsoft'
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-muted/20 hover:bg-muted/40'
                    }`}
                >
                    <span className='inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#7B3FF2] text-white text-xs font-bold'>M</span>
                    <span className='font-medium text-foreground'>Microsoft Teams</span>
                </button>
            </div>

            {/* Meeting URL Input */}
            {selectedPlatform && (
                <div className='mb-2'>
                    <Input
                        placeholder='Paste meeting URL...'
                        value={meetingUrl}
                        onChange={(e) => setMeetingUrl(e.target.value)}
                        className='w-full h-9 text-sm'
                    />
                </div>
            )}

            {/* Meeting Title Input */}
            {selectedPlatform && (
                <div className='mb-2'>
                    <Input
                        placeholder='Meeting name (optional)...'
                        value={meetingTitle}
                        onChange={(e) => setMeetingTitle(e.target.value)}
                        className='w-full h-9 text-sm'
                    />
                </div>
            )}

            {/* Meeting Description Input */}
            {selectedPlatform && (
                <div className='mb-3'>
                    <textarea
                        placeholder='Meeting description (optional)...'
                        value={meetingDesc}
                        onChange={(e) => setMeetingDesc(e.target.value)}
                        className='w-full h-16 text-sm p-2 rounded-md border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none'
                    />
                </div>
            )}

            {error && (
                <div className='mb-2 text-xs text-destructive bg-destructive/10 p-2 rounded'>
                    {error}
                </div>
            )}

            {/* Join Button */}
            {selectedPlatform && (
                <Button
                    onClick={handleJoinMeeting}
                    disabled={loading || !meetingUrl.trim()}
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
                            Join Live Meet
                        </>
                    )}
                </Button>
            )}
            </div>
        </div>
    )
}

export default InstantMeeting
