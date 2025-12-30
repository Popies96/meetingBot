'use client'

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, User, Filter, X } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useState, useCallback, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { useSearch } from "@/app/contexts/SearchContext";

export function NavBar() {
    const { user } = useUser()
    const {
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
    } = useSearch()
    const [showFilters, setShowFilters] = useState(false)
    const [debouncedQuery, setDebouncedQuery] = useState("")

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery)
        }, 300)
        return () => clearTimeout(timer)
    }, [searchQuery])

    // Reactive search based on debounced query and filters
    const handleSearch = useCallback(async () => {
        if (!debouncedQuery && !startDate && !endDate && !attendeeEmail) {
            setSearchResults([])
            setIsSearching(false)
            return
        }

        setIsSearching(true)
        try {
            const params = new URLSearchParams()
            if (debouncedQuery) params.append("q", debouncedQuery)
            if (startDate) params.append("startDate", startDate)
            if (endDate) params.append("endDate", endDate)
            if (attendeeEmail) params.append("attendee", attendeeEmail)

            const response = await fetch(`/api/meetings/search?${params}`)
            if (response.ok) {
                const data = await response.json()
                setSearchResults(data.meetings || [])
            } else {
                setSearchResults([])
            }
        } catch (error) {
            console.error("Search error:", error)
            setSearchResults([])
        } finally {
            setIsSearching(false)
        }
    }, [debouncedQuery, startDate, endDate, attendeeEmail, setSearchResults, setIsSearching])

    // Trigger search when debounced query or filters change
    useEffect(() => {
        handleSearch()
    }, [handleSearch])

    const handleClearFilters = () => {
        clearSearch()
        setSearchResults([])
    }

    return (
        <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between gap-4 border-b bg-background px-6">
            {/* Left Section */}
            <div className="flex items-center gap-4">
                <SidebarTrigger className="h-8 w-8" />
            </div>

            {/* Center Section - Search with Filter */}
            <div className="flex-1 max-w-md relative flex items-center gap-2">
                <div className="relative flex-1 flex items-center gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search meetings by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    handleSearch()
                                }
                            }}
                            className="pl-10 pr-4 h-9 bg-muted border-0 rounded-lg"
                        />
                    </div>
                   
                </div>

                {/* Filter Button Beside Search */}
                <Popover open={showFilters} onOpenChange={setShowFilters}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 relative flex-shrink-0"
                            title="Filter Results"
                        >
                            <Filter className="h-4 w-4" />
                            {(startDate || endDate || attendeeEmail) && (
                                <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full"></span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80" align="end">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h4 className="font-semibold text-sm">Filter Results</h4>
                                {(startDate || endDate || attendeeEmail) && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleClearFilters}
                                        className="h-6 px-2 text-xs"
                                    >
                                        <X className="h-3 w-3 mr-1" />
                                        Clear All
                                    </Button>
                                )}
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <Label htmlFor="start-date" className="text-xs font-medium">Start Date (Optional)</Label>
                                    <Input
                                        id="start-date"
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="h-8 text-xs mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="end-date" className="text-xs font-medium">End Date (Optional)</Label>
                                    <Input
                                        id="end-date"
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="h-8 text-xs mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="attendee" className="text-xs font-medium">Attendee Email (Optional)</Label>
                                    <Input
                                        id="attendee"
                                        type="email"
                                        placeholder="attendee@example.com"
                                        value={attendeeEmail}
                                        onChange={(e) => setAttendeeEmail(e.target.value)}
                                        className="h-8 text-xs mt-1"
                                    />
                                </div>
                            </div>

                            <p className="text-xs text-muted-foreground">
                                Add any combination of name, dates, or attendee email to filter.
                            </p>
                        </div>
                    </PopoverContent>
                </Popover>

            </div>

            {/* Right Section - Docs, Profile */}
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    title="Documentation"
                >
                    <BookOpen className="h-5 w-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full overflow-hidden p-0"
                    title="User Profile"
                >
                    {user?.imageUrl ? (
                        <img
                            src={user.imageUrl}
                            alt="profile"
                            className="h-8 w-8 rounded-full object-cover"
                        />
                    ) : (
                        <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                        </div>
                    )}
                </Button>
            </div>
        </header>
    )
}
