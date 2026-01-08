import { Button } from '@/components/ui/button';
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import React, { useRef, useState } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

interface CustomAudioPlayerProps {
    recordingUrl?: string
    isOwner?: boolean
    isChatOpen?: boolean
    isSidebarCollapsed?: boolean
}

function CustomAudioPlayer({
    recordingUrl,
    isOwner = true,
    isChatOpen = true,
    isSidebarCollapsed = false
}: CustomAudioPlayerProps) {
    const playerRef = useRef<any>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(0.75)
    const [showVolumeSlider, setShowVolumeSlider] = useState(false)

    if (!recordingUrl) {
        return null
    }

    const handlePlayPause = () => {
        const audio = playerRef.current?.audio?.current
        if (!audio) {
            return
        }

        if (isPlaying) {
            audio.pause()
        } else {
            audio.play()
        }
    }

    const handleSkipBack = () => {
        const audio = playerRef.current?.audio?.current
        if (!audio) {
            return
        }
        audio.currentTime = Math.max(0, audio.currentTime - 10)

    }

    const handleSkipForward = () => {
        const audio = playerRef.current?.audio?.current
        if (!audio) {
            return
        }
        audio.currentTime = Math.min(duration, audio.currentTime + 10)

    }

    const handleProgressClick = (e: any) => {
        const audio = playerRef.current?.audio?.current
        if (!audio || !duration) {
            return
        }

        const rect = e.currentTarget.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const width = rect.width
        const newTime = (clickX / width) * duration

        audio.currentTime = newTime
    }

    const handleVolumeChange = (e: any) => {
        const audio = playerRef.current?.audio?.current
        if (!audio) {
            return
        }

        const rect = e.currentTarget.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const width = rect.width
        const newVolume = Math.max(0, Math.min(1, clickX / width))

        audio.volume = newVolume
        setVolume(newVolume)
    }

    const handleVerticalVolumeChange = (e: any) => {
        const audio = playerRef.current?.audio?.current
        if (!audio) {
            return
        }

        const rect = e.currentTarget.getBoundingClientRect()
        const clickY = e.clientY - rect.top
        const height = rect.height
        // Invert the calculation so top = 100%, bottom = 0%
        const newVolume = Math.max(0, Math.min(1, 1 - (clickY / height)))

        audio.volume = newVolume
        setVolume(newVolume)
    }

    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return '0:00'

        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)

        return `${mins}:${secs.toString().padStart(2, '0')}`

    }


    const sidebarWidth = isSidebarCollapsed ? '3rem' : '16rem' // 48px collapsed, 256px expanded
    const chatWidth = isChatOpen ? '24rem' : '0'
    
    return (
        <div
            className='fixed bottom-0 left-0 right-0 bg-card border-t border-border p-3 md:p-4 z-50 transition-all duration-300'
            style={{
                left: '0',
                right: '0',
            }}
        >
            <style dangerouslySetInnerHTML={{
                __html: `
                    @media (min-width: 1024px) {
                        .fixed.bottom-0 {
                            left: ${isOwner ? sidebarWidth : '0'} !important;
                            right: ${isOwner && isChatOpen ? chatWidth : '0'} !important;
                        }
                    }
                `
            }} />
            <div style={{ display: 'none' }}>
                <AudioPlayer
                    ref={playerRef}
                    src={recordingUrl}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                    onListen={(e) => {
                        const audio = e.target as HTMLAudioElement
                        if (audio && audio.currentTime) {
                            setCurrentTime(audio.currentTime)
                        }
                    }}
                    onLoadedMetaData={(e) => {
                        const audio = e.target as HTMLAudioElement
                        if (audio && audio.duration) {
                            setDuration(audio.duration)
                        }
                    }}
                    volume={volume}
                    hasDefaultKeyBindings={true}
                    autoPlayAfterSrcChange={false}
                    showSkipControls={false}
                    showJumpControls={false}
                    showDownloadProgress={false}
                    showFilledProgress={false}

                />
            </div>

            <div className={!isOwner ? 'max-w-4xl mx-auto' : ''}>
                {/* Desktop Layout */}
                <div className='hidden md:flex items-center gap-4'>
                    <div className='flex items-center gap-3'>
                        <Button
                            variant='ghost'
                            size='icon'
                            onClick={handleSkipBack}
                            className='hover:bg-muted rounded-lg transition-colors cursor-pointer'
                        >
                            <SkipBack className='h-4 w-4 text-foreground' />
                        </Button>

                        <Button
                            variant='default'
                            size='icon'
                            onClick={handlePlayPause}
                            className='bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors cursor-pointer'
                        >
                            {isPlaying ? <Pause className='h-5 w-5' /> : <Play className='h-5 w-5' />}

                        </Button>

                        <Button
                            variant='ghost'
                            size='icon'
                            onClick={handleSkipForward}
                            className='hover:bg-muted rounded-lg transition-colors cursor-pointer'
                        >
                            <SkipForward className='h-4 w-4' />
                        </Button>

                    </div>

                    <div className='flex-1 flex items-center gap-3'>
                        <span className='text-sm text-muted-foreground min-w-[40px]'>
                            {formatTime(currentTime)}
                        </span>

                        <div
                            className='flex-1 bg-muted rounded-full h-2 cursor-pointer'
                            onClick={handleProgressClick}
                        >
                            <div
                                className='bg-primary h-2 rounded-full transition-all duration-300'
                                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                            />
                        </div>

                        <span className='text-sm text-muted-foreground min-w-[40px]'>
                            {formatTime(duration)}
                        </span>


                    </div>

                    <div className='flex items-center gap-2'>
                        <Volume2 className='h-4 w-4 text-muted-foreground' />
                        <div
                            className='w-20 bg-muted rounded-full h-2 cursor-pointer'
                            onClick={handleVolumeChange}
                        >
                            <div
                                className='bg-primary h-2 rounded-full'
                                style={{ width: `${volume * 100}%` }}
                            />

                        </div>

                    </div>

                    <div className='text-sm text-muted-foreground'>
                        Meeting Recording
                    </div>

                </div>

                {/* Mobile Layout */}
                <div className='md:hidden space-y-3'>
                    {/* Controls Row - Centered */}
                    <div className='flex items-center justify-center gap-3'>
                        <Button
                            variant='ghost'
                            size='icon'
                            onClick={handleSkipBack}
                            className='hover:bg-muted rounded-lg transition-colors cursor-pointer h-10 w-10'
                        >
                            <SkipBack className='h-5 w-5 text-foreground' />
                        </Button>

                        <Button
                            variant='default'
                            size='icon'
                            onClick={handlePlayPause}
                            className='bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors cursor-pointer h-12 w-12'
                        >
                            {isPlaying ? <Pause className='h-6 w-6' /> : <Play className='h-6 w-6' />}
                        </Button>

                        <Button
                            variant='ghost'
                            size='icon'
                            onClick={handleSkipForward}
                            className='hover:bg-muted rounded-lg transition-colors cursor-pointer h-10 w-10'
                        >
                            <SkipForward className='h-5 w-5' />
                        </Button>
                    </div>

                    {/* Progress Bar Row */}
                    <div className='flex items-center gap-2 z-50'>
                        <span className='text-xs text-muted-foreground min-w-[35px]'>
                            {formatTime(currentTime)}
                        </span>

                        <div
                            className='flex-1 bg-muted rounded-full h-2 cursor-pointer'
                            onClick={handleProgressClick}
                        >
                            <div
                                className='bg-primary h-2 rounded-full transition-all duration-300'
                                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                            />
                        </div>

                        <span className='text-xs text-muted-foreground min-w-[35px]'>
                            {formatTime(duration)}
                        </span>

                        {/* Volume Icon with Vertical Slider */}
                        <div className='relative z-50'>
                            <Button
                                variant='ghost'
                                size='icon'
                                onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                                className='hover:bg-muted rounded-lg transition-colors cursor-pointer h-8 w-8'
                            >
                                {volume === 0 ? (
                                    <VolumeX className='h-4 w-4 text-muted-foreground' />
                                ) : (
                                    <Volume2 className='h-4 w-4 text-muted-foreground' />
                                )}
                            </Button>

                            {/* Vertical Volume Slider Popup */}
                            {showVolumeSlider && (
                                <>
                                    {/* Backdrop */}
                                    <div
                                        className='fixed inset-0 z-[100]'
                                        onClick={() => setShowVolumeSlider(false)}
                                    />

                                    {/* Vertical Slider */}
                                    <div className='absolute bottom-full right-0 mb-2 bg-card border border-border rounded-lg p-3 shadow-lg z-[110]'>
                                        <div className='flex flex-col items-center gap-2'>
                                            <span className='text-xs text-muted-foreground font-medium'>
                                                {Math.round(volume * 100)}%
                                            </span>
                                            <div
                                                className='w-2 h-24 bg-muted rounded-full cursor-pointer relative'
                                                onClick={handleVerticalVolumeChange}
                                            >
                                                <div
                                                    className='absolute bottom-0 left-0 right-0 bg-primary rounded-full transition-all duration-150'
                                                    style={{ height: `${volume * 100}%` }}
                                                />
                                                <div
                                                    className='absolute w-4 h-4 bg-primary rounded-full left-1/2 transform -translate-x-1/2 shadow-md'
                                                    style={{ bottom: `calc(${volume * 100}% - 8px)` }}
                                                />
                                            </div>
                                            {volume === 0 ? (
                                                <VolumeX className='h-4 w-4 text-muted-foreground' />
                                            ) : (
                                                <Volume2 className='h-4 w-4 text-muted-foreground' />
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Label */}
                    <div className='text-xs text-center text-muted-foreground'>
                        Meeting Recording
                    </div>
                </div>
            </div>




        </div>
    )
}

export default CustomAudioPlayer