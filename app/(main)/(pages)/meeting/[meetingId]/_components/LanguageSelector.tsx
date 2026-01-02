'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Search } from 'lucide-react'

// Comprehensive list of languages supported by Google Translate
const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'pt-BR', name: 'Portuguese (Brazilian)' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
  { code: 'zh-TW', name: 'Chinese (Traditional)' },
  { code: 'ko', name: 'Korean' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'th', name: 'Thai' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'id', name: 'Indonesian' },
  { code: 'pl', name: 'Polish' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'tr', name: 'Turkish' },
  { code: 'gr', name: 'Greek' },
  { code: 'cs', name: 'Czech' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'ro', name: 'Romanian' },
  { code: 'bg', name: 'Bulgarian' },
  { code: 'hr', name: 'Croatian' },
  { code: 'da', name: 'Danish' },
  { code: 'fi', name: 'Finnish' },
  { code: 'sv', name: 'Swedish' },
  { code: 'no', name: 'Norwegian' },
  { code: 'nl', name: 'Dutch' },
  { code: 'be', name: 'Belgian' },
  { code: 'el', name: 'Greek' },
  { code: 'sl', name: 'Slovenian' },
  { code: 'sk', name: 'Slovak' },
  { code: 'he', name: 'Hebrew' },
  { code: 'fa', name: 'Persian' },
  { code: 'ur', name: 'Urdu' },
  { code: 'bn', name: 'Bengali' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'kn', name: 'Kannada' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'fil', name: 'Filipino' },
  { code: 'ms', name: 'Malay' },
  { code: 'sw', name: 'Swahili' },
  { code: 'af', name: 'Afrikaans' },
  { code: 'sq', name: 'Albanian' },
  { code: 'hy', name: 'Armenian' },
  { code: 'az', name: 'Azerbaijani' },
  { code: 'eu', name: 'Basque' },
  { code: 'gl', name: 'Galician' },
  { code: 'ca', name: 'Catalan' },
  { code: 'et', name: 'Estonian' },
  { code: 'lt', name: 'Lithuanian' },
  { code: 'lv', name: 'Latvian' },
  { code: 'mt', name: 'Maltese' },
  { code: 'is', name: 'Icelandic' },
]

interface LanguageSelectorProps {
  onLanguageSelect: (languageCode: string) => void
  isTranslating?: boolean
}

export default function LanguageSelector({ onLanguageSelect, isTranslating = false }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Filter languages based on search query
  const filteredLanguages = SUPPORTED_LANGUAGES.filter(lang =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectLanguage = (languageCode: string) => {
    setSelectedLanguage(languageCode)
    onLanguageSelect(languageCode)
    setIsOpen(false)
    setSearchQuery('')
  }

  const selectedLanguageName = SUPPORTED_LANGUAGES.find(lang => lang.code === selectedLanguage)?.name || 'Language'

  return (
    <div ref={dropdownRef} className='relative inline-block'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isTranslating}
        className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-border rounded-md hover:bg-muted/50'
      >
        <span>🌐</span>
        <span className='hidden sm:inline'>{selectedLanguageName}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50'>
          {/* Search Box */}
          <div className='p-3 border-b border-border'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <input
                type='text'
                placeholder='Search language...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full pl-9 pr-3 py-2 bg-background border border-border rounded text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary'
                autoFocus
              />
            </div>
          </div>

          {/* Language List */}
          <div className='max-h-64 overflow-y-auto'>
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleSelectLanguage(language.code)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                    selectedLanguage === language.code
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-foreground'
                  }`}
                >
                  <div className='flex items-center justify-between'>
                    <span>{language.name}</span>
                    {selectedLanguage === language.code && <span className='text-primary'>✓</span>}
                  </div>
                </button>
              ))
            ) : (
              <div className='px-4 py-6 text-center text-sm text-muted-foreground'>
                No languages found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
