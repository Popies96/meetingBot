'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Video, Plus, Loader2, X, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

function InstantMeeting() {
    const [selectedPlatform, setSelectedPlatform] = useState<'google-meet' | 'zoom' | 'microsoft' | null>(null)
    const [meetingUrl, setMeetingUrl] = useState('')
    const [meetingTitle, setMeetingTitle] = useState('')
    const [meetingDesc, setMeetingDesc] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const normalizeUrl = (url: string) => {
        const trimmed = url.trim()
        if (!trimmed) return ''
        return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`
    }

    const getUrlState = () => {
        if (!meetingUrl.trim() || !selectedPlatform) return 'empty'

        const normalized = normalizeUrl(meetingUrl)
        if (!normalized.startsWith('https://')) return 'invalid'

        if (selectedPlatform === 'google-meet') {
            const googleMeetPattern = /^https:\/\/meet\.google\.com\/[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{3}(?:[\/?].*)?$/i
            return googleMeetPattern.test(normalized) ? 'valid' : 'invalid'
        }

        if (selectedPlatform === 'zoom') {
            return normalized.includes('zoom.us') ? 'valid' : 'invalid'
        }

        if (selectedPlatform === 'microsoft') {
            return normalized.includes('teams.microsoft.com') ? 'valid' : 'invalid'
        }

        return 'invalid'
    }

    const isValidMeetingUrl = () => getUrlState() === 'valid'

    const getTitleState = () => {
        const trimmed = meetingTitle.trim()
        if (!trimmed) return 'empty'
        return trimmed.length >= 3 ? 'valid' : 'invalid'
    }

    const isValidTitle = () => getTitleState() === 'valid'

    const handleJoinMeeting = async () => {
        if (loading) return

        if (!selectedPlatform) {
            setError('Choose a platform first')
            return
        }

        if (!meetingUrl.trim()) {
            setError('Meeting URL is required')
            return
        }

        if (!isValidMeetingUrl()) {
            setError('Enter a valid meeting URL for the selected platform')
            return
        }

        if (!meetingTitle.trim()) {
            setError('Meeting title is required')
            return
        }

        if (!isValidTitle()) {
            setError('Meeting title must be at least 3 characters')
            return
        }

        setLoading(true)
        setError('')

        try {
            const response = await fetch('/api/meetings/join-instant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    meetingUrl: normalizeUrl(meetingUrl),
                    platform: selectedPlatform,
                    title: meetingTitle.trim(),
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
            toast.success('Bot is joining your meeting', {
                icon: <CheckCircle2 className='w-4 h-4 text-green-500' />,
                description: new Intl.DateTimeFormat('en-US', {
                    dateStyle: 'full',
                    timeStyle: 'short',
                }).format(new Date()),
            })
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
        <span className='flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-md bg-[#0F9D58] text-white text-xs font-bold'>
            G
        </span>
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
        <span className='flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-md bg-[#2D8CFF] text-white text-xs font-bold'>
            Z
        </span>
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
        <span className='flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-md bg-[#7B3FF2] text-white text-xs font-bold'>
            M
        </span>
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
                        className={`w-full h-9 text-sm ${
                            getUrlState() === 'valid'
                                ? 'border-green-500 focus-visible:ring-green-500'
                                : getUrlState() === 'invalid' && meetingUrl.trim()
                                    ? 'border-destructive focus-visible:ring-destructive'
                                    : ''
                        }`}
                    />
                    {getUrlState() === 'invalid' && meetingUrl.trim() && (
                        <p className='mt-1 text-xs text-destructive'>Enter a valid meeting URL for the selected platform</p>
                    )}
                    {getUrlState() === 'valid' && (
                        <p className='mt-1 text-xs text-green-600'>Looks good!</p>
                    )}
                </div>
            )}

            {/* Meeting Title Input */}
            {selectedPlatform && (
                <div className='mb-2'>
                    <Input
                        placeholder='Meeting name*...'
                        value={meetingTitle}
                        onChange={(e) => setMeetingTitle(e.target.value)}
                        className={`w-full h-9 text-sm ${
                            getTitleState() === 'valid'
                                ? 'border-green-500 focus-visible:ring-green-500'
                                : getTitleState() === 'invalid'
                                    ? 'border-destructive focus-visible:ring-destructive'
                                    : ''
                        }`}
                    />
                    {getTitleState() === 'invalid' && (
                        <p className='mt-1 text-xs text-destructive'>Title must be at least 3 characters</p>
                    )}
                    {getTitleState() === 'valid' && (
                        <p className='mt-1 text-xs text-green-600'>Looks good!</p>
                    )}
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
                    disabled={
                        loading ||
                        !meetingUrl.trim() ||
                        !isValidMeetingUrl() ||
                        !meetingTitle.trim() ||
                        !isValidTitle()
                    }
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
