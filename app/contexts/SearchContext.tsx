'use client'

import React, { createContext, useContext, useState } from 'react'

interface SearchContextType {
    searchQuery: string
    startDate: string
    endDate: string
    attendeeEmail: string
    searchResults: any[]
    isSearching: boolean
    setSearchQuery: (query: string) => void
    setStartDate: (date: string) => void
    setEndDate: (date: string) => void
    setAttendeeEmail: (email: string) => void
    setSearchResults: (results: any[]) => void
    setIsSearching: (val: boolean) => void
    clearSearch: () => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: React.ReactNode }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [attendeeEmail, setAttendeeEmail] = useState('')
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [isSearching, setIsSearching] = useState(false)

    const clearSearch = () => {
        setSearchQuery('')
        setStartDate('')
        setEndDate('')
        setAttendeeEmail('')
        setSearchResults([])
        setIsSearching(false)
    }

    return (
        <SearchContext.Provider
            value={{
                searchQuery,
                startDate,
                endDate,
                attendeeEmail,
                searchResults,
                isSearching,
                setSearchQuery,
                setStartDate,
                setEndDate,
                setAttendeeEmail,
                setSearchResults,
                setIsSearching,
                clearSearch,
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}

export function useSearch() {
    const context = useContext(SearchContext)
    if (!context) {
        throw new Error('useSearch must be used within SearchProvider')
    }
    return context
}
