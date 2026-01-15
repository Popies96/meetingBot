'use client'

import React, { useState } from 'react'
import { useMeetingDetail } from './hooks/useMeetingDetail'
import MeetingHeader from './_components/MeetingHeader'
import MeetingInfo from './_components/MeetingInfo'
import LanguageSelector from './_components/LanguageSelector'
import { Button } from '@/components/ui/button'
import ActionItems from './_components/action-items/ActionItems'
import TranscriptDisplay from './_components/TranscriptDisplay'
import ChatSidebar from './_components/ChatSidebar'
import CustomAudioPlayer from './_components/AudioPlayer'
import { MessageCircle, X } from 'lucide-react'
import { useSidebar } from '@/components/ui/sidebar'

function MeetingDetail() {
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [isDesktopChatOpen, setIsDesktopChatOpen] = useState(true)
    
    // Try to get sidebar state, fallback if not in provider
    let isSidebarCollapsed = false
    try {
        const sidebar = useSidebar()
        isSidebarCollapsed = sidebar.state === 'collapsed'
    } catch (error) {
        // Not within SidebarProvider, use default
        isSidebarCollapsed = false
    }

    const {
        meetingId,
        isOwner,
        userChecked,
        chatInput,
        setChatInput,
        messages,
        showSuggestions,
        activeTab,
        setActiveTab,
        meetingData,
        loading,
        handleSendMessage,
        handleSuggestionClick,
        handleInputChange,
        deleteActionItem,
        addActionItem,
        displayActionItems,
        meetingInfoData,
        translatedContent,
        isTranslating,
        selectedLanguage,
        handleTranslate
    } = useMeetingDetail()

    return (
        <div className='min-h-screen bg-background'>

            <MeetingHeader
                title={meetingData?.title || 'Meeting'}
                meetingId={meetingId}
                summary={meetingData?.summary}
                actionItems={meetingData?.actionItems?.map(item => `• ${item.text}`).join('\n') || ''}
                isOwner={isOwner}
                isLoading={!userChecked}
            />
            <div className='flex h-[calc(100vh-73px)] relative overflow-hidden'>
                <div 
                    className={`flex-1 p-4 md:p-6 overflow-y-auto pb-24 ${!userChecked
                        ? ''
                        : !isOwner
                            ? 'max-w-4xl mx-auto'
                            : ''
                    }`}
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    <style dangerouslySetInnerHTML={{
                        __html: `
                            .flex-1::-webkit-scrollbar {
                                display: none;
                            }
                        `
                    }} />
                    <MeetingInfo meetingData={meetingInfoData} />

                    <div className='mb-8'>
                        <div className='flex border-b border-border items-center justify-between'>
                            <div className='flex'>
                                <Button
                                    variant='ghost'
                                    onClick={() => setActiveTab('summary')}
                                    className={`px-4 py-2 text-sm font-medium border-b-2 rounded-none shadow-none transition-colors
                                    ${activeTab === 'summary'
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50'
                                        }`}
                                    style={{ boxShadow: 'none' }}
                                    type='button'
                                >
                                    Summary
                                </Button>
                                <Button
                                    variant='ghost'
                                    onClick={() => setActiveTab('transcript')}
                                    className={`px-4 py-2 text-sm font-medium border-b-2 rounded-none shadow-none transition-colors
                                    ${activeTab === 'transcript'
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50'
                                        }`}
                                    style={{ boxShadow: 'none' }}
                                    type='button'
                                >
                                    Transcript
                                </Button>
                            </div>
                            <div className='pb-2'>
                                <LanguageSelector 
                                    onLanguageSelect={handleTranslate}
                                    isTranslating={isTranslating}
                                />
                            </div>
                        </div>

                        {isTranslating && (
                            <div className='mt-2 mb-2 flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 border border-border rounded-lg px-3 py-2'>
                                <div className='h-3 w-3 rounded-full border-2 border-primary border-t-transparent animate-spin'></div>
                                <span>Translating summary and transcript...</span>
                            </div>
                        )}

                        <div className='mt-6'>
                            {activeTab === 'summary' && (
                                <div>
                                    {loading ? (
                                        <div className='bg-card border border-border rounded-lg p-6 text-center'>
                                            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
                                            <p className='text-muted-foreground'>Loading meeting data..</p>
                                        </div>
                                    ) : meetingData?.processed ? (
                                        <div className='space-y-6'>
                                            {meetingData.summary && (
                                                <div className='bg-card border border-border rounded-lg p-4 md:p-6'>
                                                    <h3 className='text-lg font-semibold text-foreground mb-3'>Meeting Summary</h3>
                                                    <p className='text-muted-foreground leading-relaxed'>
                                                        {translatedContent.summary || meetingData.summary}
                                                    </p>
                                                </div>
                                            )}

                                            {!userChecked ? (
                                                <div className='bg-card border border-border rounded-lg p-4 md:p-6'>
                                                    <div className='animate-pulse'>
                                                        <div className='h-4 bg-muted rounded w-1/4 mb-4'></div>
                                                        <div className='space-y-2'>
                                                            <div className='h-3 bg-muted rounded w-3/4'></div>
                                                            <div className='h-3 bg-muted rounded w-1/2'></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    {isOwner && displayActionItems.length > 0 && (
                                                        <ActionItems
                                                            actionItems={displayActionItems}
                                                            onDeleteItem={deleteActionItem}
                                                            onAddItem={addActionItem}
                                                            meetingId={meetingId}
                                                        />
                                                    )}

                                                    {!isOwner && displayActionItems.length > 0 && (
                                                        <div className='bg-card rounded-lg p-4 md:p-6 border border-border'>
                                                            <h3 className='text-lg font-semibold text-foreground mb-4'>
                                                                Action Items
                                                            </h3>
                                                            <div className='space-y-3'>
                                                                {displayActionItems.map((item) => (
                                                                    <div key={item.id} className='flex items-start gap-3'>
                                                                        <div className='w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0'></div>
                                                                        <p className='text-sm text-foreground'>{item.text}</p>

                                                                    </div>
                                                                ))}

                                                            </div>

                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    ) : (
                                        <div className='bg-card border border-border rounded-lg p-4 md:p-6 text-center'>
                                            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
                                            <p className='text-muted-foreground'>Processing meeting with AI..</p>
                                            <p className='text-sm text-muted-foreground mt-2'>You'll receive an email when ready</p>

                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'transcript' && (
                                <div>
                                    {loading ? (
                                        <div className='bg-card border border-border rounded-lg p-4 md:p-6 text-center'>
                                            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
                                            <p className='text-muted-foreground'>Loading meeting data..</p>
                                        </div>
                                    ) : meetingData?.transcript ? (
                                        <div>
                                           
                                            {typeof (translatedContent.transcript ?? meetingData.transcript) === 'string' ? (
                                                <div className='bg-card rounded-lg p-6 border border-border'>
                                                    <h3 className='text-lg font-semibold text-foreground mb-3'>Meeting Transcript</h3>
                                                    <p className='text-muted-foreground whitespace-pre-wrap'>
                                                        {translatedContent.transcript ?? (meetingData.transcript as string)}
                                                    </p>
                                                </div>
                                            ) : (
                                                <TranscriptDisplay transcript={(translatedContent.transcript ?? meetingData.transcript) as any} />
                                            )}
                                        </div>
                                    ) : (
                                        <div className='bg-card rounded-lg p-4 md:p-6 border-border text-center'>
                                            <p className='text-muted-foreground'>No transcript avaialable</p>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>

                    </div>

                </div>

                {/* Desktop ChatSidebar - Sticky positioned */}
                {userChecked && isOwner && (
                    <div className={`hidden lg:flex flex-col transition-all duration-300 sticky top-0 self-start bg-card ${isDesktopChatOpen ? 'w-96' : 'w-0 overflow-hidden'}`}>
                        {isDesktopChatOpen && (
                            <div className='h-[calc(106vh-165px)] overflow-hidden'>
                                <ChatSidebar
                                    messages={messages}
                                    chatInput={chatInput}
                                    showSuggestions={showSuggestions}
                                    onInputChange={handleInputChange}
                                    onSendMessage={handleSendMessage}
                                    onSuggestionClick={handleSuggestionClick}
                                    onClose={() => setIsDesktopChatOpen(false)}
                                />
                            </div>
                        )}
                    </div>
                )}

            </div>

            {/* Floating Chat Toggle Button - Right Edge (Desktop only) */}
            {userChecked && isOwner && !isDesktopChatOpen && (
                <button
                    onClick={() => setIsDesktopChatOpen(true)}
                    className='hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 bg-primary/90 hover:bg-primary text-primary-foreground rounded-l-lg p-3 shadow-lg z-30 transition-all duration-300'
                    aria-label='Open chat'
                    title='Open chat'
                >
                    <MessageCircle className='w-5 h-5' />
                </button>
            )}

            {/* Mobile Chat Toggle Button */}
            {userChecked && isOwner && (
                <button
                    onClick={() => setIsChatOpen(true)}
                    className='lg:hidden fixed bottom-40 right-6 z-10 bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:bg-primary/90 transition-colors'
                    aria-label='Open chat'
                >
                    <MessageCircle className='w-6 h-6' />
                </button>
            )}

            {/* Mobile ChatSidebar Overlay */}
{isChatOpen && (
    <>
        {/* Backdrop */}
        <div
            className='lg:hidden fixed inset-0 bg-black/50 z-50'
            onClick={() => setIsChatOpen(false)}
        />

        {/* Full Screen Chat Panel */}
        <div className='lg:hidden fixed inset-0 z-50 bg-card flex flex-col'>
            <div className='flex items-center justify-between p-4 border-b border-border flex-shrink-0'>
                <h2 className='text-lg font-semibold'>Chat</h2>
                <button
                    onClick={() => setIsChatOpen(false)}
                    className='p-2 hover:bg-muted rounded-lg transition-colors'
                    aria-label='Close chat'
                >
                    <X className='w-5 h-5' />
                </button>
            </div>
            <div className='flex-1 overflow-hidden'>
                <ChatSidebar
                    messages={messages}
                    chatInput={chatInput}
                    showSuggestions={showSuggestions}
                    onInputChange={handleInputChange}
                    onSendMessage={handleSendMessage}
                    onSuggestionClick={handleSuggestionClick}
                    isMobile={true}
                />
            </div>
        </div>
    </>
)}

{/* Audio Player - Hidden when mobile chat is open */}
{(!isChatOpen || window.innerWidth >= 1024) && (
    <CustomAudioPlayer
        recordingUrl={meetingData?.recordingUrl}
        isOwner={isOwner}
        isChatOpen={isDesktopChatOpen}
        isSidebarCollapsed={isSidebarCollapsed}
    />
)}
        </div>
    )
}

export default MeetingDetail