'use client'

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, User, Filter, X, Calendar, Clock, LogOut, Settings, HelpCircle } from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { useSearch } from "@/app/contexts/SearchContext";

export function NavBar() {
    const { user } = useUser()
    const { signOut } = useClerk()
    const router = useRouter()
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
    const [showResults, setShowResults] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)

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

    // Show results when there are search results
    useEffect(() => {
        if (searchResults.length > 0) {
            setShowResults(true)
        }
    }, [searchResults])

    // Close results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleClearFilters = () => {
        clearSearch()
        setSearchResults([])
        setShowResults(false)
    }

    const handleResultClick = (meetingId: string) => {
        router.push(`/meeting/${meetingId}`)
        setShowResults(false)
        setSearchQuery('')
    }

    const handleSignOut = async () => {
        await signOut()
        router.push('/')
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        })
    }

    return (
        <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between gap-4 border-b bg-background px-6">
            {/* Left Section */}
            <div className="flex items-center gap-4">
                <SidebarTrigger className="h-8 w-8" />
            </div>

            {/* Center Section - Search with Filter */}
            <div className="flex-1 max-w-md relative flex items-center gap-2" ref={searchRef}>
                <div className="relative flex-1 flex items-center gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search meetings by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => searchResults.length > 0 && setShowResults(true)}
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

                {/* Search Results Dropdown */}
                {showResults && searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-12 mt-2 bg-card border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                        <div className="p-2">
                            <div className="text-xs text-muted-foreground px-3 py-2 font-medium">
                                {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
                            </div>
                            {searchResults.map((meeting: any) => (
                                <button
                                    key={meeting.id}
                                    onClick={() => handleResultClick(meeting.id)}
                                    className="w-full text-left px-3 py-3 rounded-md hover:bg-muted transition-colors border-b border-border last:border-0"
                                >
                                    <div className="flex flex-col gap-1">
                                        <div className="font-medium text-sm text-foreground truncate">
                                            {meeting.title}
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {formatDate(meeting.startTime)}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {formatTime(meeting.startTime)}
                                            </span>
                                        </div>
                                        {meeting.description && (
                                            <div className="text-xs text-muted-foreground truncate">
                                                {meeting.description}
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* No Results Message */}
                {showResults && searchResults.length === 0 && !isSearching && (debouncedQuery || startDate || endDate || attendeeEmail) && (
                    <div className="absolute top-full left-0 right-12 mt-2 bg-card border border-border rounded-lg shadow-lg z-50">
                        <div className="p-4 text-center text-sm text-muted-foreground">
                            No meetings found
                        </div>
                    </div>
                )}

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

                {/* User Profile Dropdown */}
                {/* User Profile Dropdown */}
<DropdownMenu>
    <DropdownMenuTrigger asChild>
        <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full overflow-hidden p-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer transition-all duration-200 hover:scale-110 hover:ring-2 hover:ring-primary/20 hover:shadow-lg"
        >
            {user?.imageUrl ? (
                <img
                    src={user.imageUrl}
                    alt="profile"
                    className="h-8 w-8 rounded-full object-cover transition-transform duration-200 hover:brightness-110"
                />
            ) : (
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-primary/20">
                    <User className="h-4 w-4 text-primary" />
                </div>
            )}
        </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-64 p-2">
        <DropdownMenuLabel className="px-3 py-3">
            <div className="flex flex-col space-y-1.5">
                <p className="text-sm font-semibold leading-none">
                    {user?.fullName || user?.firstName || 'User'}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                    {user?.primaryEmailAddress?.emailAddress}
                </p>
            </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem 
            onClick={() => router.push('/profile')} 
            className="cursor-pointer px-3 py-2.5 rounded-md"
        >
            <User className="mr-3 h-4 w-4" />
            <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
            onClick={() => router.push('/settings')} 
            className="cursor-pointer px-3 py-2.5 rounded-md"
        >
            <Settings className="mr-3 h-4 w-4" />
            <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
            onClick={() => router.push('/help')} 
            className="cursor-pointer px-3 py-2.5 rounded-md"
        >
            <HelpCircle className="mr-3 h-4 w-4" />
            <span>Help & Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem 
            onClick={handleSignOut}
            className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950 cursor-pointer px-3 py-2.5 rounded-md"
        >
            <LogOut className="mr-3 h-4 w-4" />
            <span>Sign Out</span>
        </DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>
            </div>
        </header>
    )
}