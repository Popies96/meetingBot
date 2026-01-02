import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'

// MyMemory Translation API - free tier, no credit card required
const MYMEMORY_API_URL = 'https://api.mymemory.translated.net/get'

// Map our language codes to MyMemory preferred locales
const LANGUAGE_CODE_MAP: Record<string, string> = {
  'pt-BR': 'pt-BR',
  'zh-CN': 'zh-CN',
  'zh-TW': 'zh-TW',
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  it: 'it-IT',
  ja: 'ja-JP',
  ko: 'ko-KR',
  ru: 'ru-RU',
}

function normalizeLanguageCode(code: string): string {
  return LANGUAGE_CODE_MAP[code] || code
}

function validateInput(text: string, targetLanguage: string): boolean {
  if (!text || typeof text !== 'string') return false
  if (!targetLanguage || typeof targetLanguage !== 'string') return false
  if (text.length > 50000) return false
  if (!/^[a-z]{2}(-[a-zA-Z]{2})?$/.test(targetLanguage)) return false
  return true
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await getAuth(request)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { text, targetLanguage, meetingId } = body

    if (!validateInput(text, targetLanguage)) {
      return NextResponse.json({ error: 'Invalid input parameters' }, { status: 400 })
    }

    if (!meetingId || typeof meetingId !== 'string') {
      return NextResponse.json({ error: 'Invalid meeting ID' }, { status: 400 })
    }

    const normalizedLanguage = normalizeLanguageCode(targetLanguage)

    const params = new URLSearchParams({
      q: text,
      langpair: `en|${normalizedLanguage}`,
      de: 'support@meetingbot.local',
    })

    const url = `${MYMEMORY_API_URL}?${params.toString()}`

    const response = await fetch(url, {
      method: 'GET',
    })

    if (!response.ok) {
      console.error('MyMemory API error:', response.status, response.statusText)
      return NextResponse.json({ error: 'Translation service unavailable' }, { status: 503 })
    }

    const data = await response.json()
    const translatedText = data?.responseData?.translatedText as string | undefined

    if (translatedText && translatedText.trim()) {
      return NextResponse.json({ success: true, translatedText, targetLanguage })
    }

    console.error('MyMemory translation failed:', data)
    return NextResponse.json({ error: 'Translation failed - language may not be supported' }, { status: 400 })
  } catch (error) {
    console.error('Translation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
