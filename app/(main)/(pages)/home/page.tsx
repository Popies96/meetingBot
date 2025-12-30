'use client'

import React, { useState } from 'react'
import { useMeetings } from './hooks/useMeetings'
import { useRouter } from 'next/navigation'
import PastMeetings from './_components/PastMeeting'
import UpcomingMeetings from './_components/UpcomingMeeting'
import { Button } from '@/components/ui/button'
import { useSearch } from '@/app/contexts/SearchContext'


function Home() {
    const [showUpcoming, setShowUpcoming] = useState(true)
    const { searchResults, searchQuery, startDate, endDate, attendeeEmail, isSearching } = useSearch()

    const {
        userId,
        upcomingEvents,
        pastMeetings,
        loading,
        pastLoading,
        connected,
        error,
        botToggles,
        initialLoading,
        fetchUpcomingEvents,
        fetchPastMeetings,
        toggleBot,
        directOAuth,
        getAttendeeList,
        getInitials
    } = useMeetings()

    const router = useRouter()
    const handleMeetingClick = (meetingId: string) => {
        router.push(`/meeting/${meetingId}`)
    }

    const hasActiveSearch = searchQuery || startDate || endDate || attendeeEmail

    // Use search results if available, otherwise use all past meetings
    const displayMeetings = hasActiveSearch ? searchResults : pastMeetings

    if (!userId) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
                <p className='text-muted-foreground'>Loading...</p>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-background'>
            {/* Mobile toggle buttons */}
            <div className='md:hidden flex gap-2 p-4 border-b'>
                <Button 
                    variant={showUpcoming ? 'default' : 'outline'}
                    onClick={() => setShowUpcoming(true)}
                    className='flex-1'
                >
                    Upcoming Meetings
                </Button>
                <Button 
                    variant={!showUpcoming ? 'default' : 'outline'}
                    onClick={() => setShowUpcoming(false)}
                    className='flex-1'
                >
                    Past Meetings
                </Button>
            </div>

            {/* Mobile view */}
            <div className='md:hidden p-4'>
                {showUpcoming ? (
                    <UpcomingMeetings
                        upcomingEvents={upcomingEvents}
                        connected={connected}
                        error={error}
                        loading={loading}
                        initialLoading={initialLoading}
                        botToggles={botToggles}
                        onRefresh={fetchUpcomingEvents}
                        onToggleBot={toggleBot}
                        onConnectCalendar={directOAuth}
                    />
                ) : (
                    <div>
                        <div className='mb-6'>
                            <h2 className='text-2xl font-bold text-foreground'>
                                {hasActiveSearch ? 'Search Results' : 'Past Meetings'}
                            </h2>
                            {hasActiveSearch && (
                                <p className='text-sm text-muted-foreground mt-2'>
                                    Found {displayMeetings.length} meeting{displayMeetings.length !== 1 ? 's' : ''}
                                </p>
                            )}
                        </div>
                        <PastMeetings
                            pastMeetings={displayMeetings}
                            pastLoading={pastLoading}
                            searchLoading={isSearching}
                            onMeetingClick={handleMeetingClick}
                            getAttendeeList={getAttendeeList}
                            getInitials={getInitials}
                        />
                    </div>
                )}
            </div>

            {/* Desktop view */}
            <div className='hidden md:flex gap-6 p-6'>
                <div className='flex-1'>
                    <div className='mb-6'>
                        <h2 className='text-2xl font-bold text-foreground'>
                            {hasActiveSearch ? 'Search Results' : 'Past Meetings'}
                        </h2>
                        {hasActiveSearch && (
                            <p className='text-sm text-muted-foreground mt-2'>
                                Found {displayMeetings.length} meeting{displayMeetings.length !== 1 ? 's' : ''}
                            </p>
                        )}
                    </div>
                    <PastMeetings
                        pastMeetings={displayMeetings}
                        pastLoading={pastLoading}
                        searchLoading={isSearching}
                        onMeetingClick={handleMeetingClick}
                        getAttendeeList={getAttendeeList}
                        getInitials={getInitials}
                    />
                </div>
                <div className='w-px bg-border'></div>
                <div className='w-96'>
                    <div className='sticky top-6'>
                        <UpcomingMeetings
                            upcomingEvents={upcomingEvents}
                            connected={connected}
                            error={error}
                            loading={loading}
                            initialLoading={initialLoading}
                            botToggles={botToggles}
                            onRefresh={fetchUpcomingEvents}
                            onToggleBot={toggleBot}
                            onConnectCalendar={directOAuth}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home