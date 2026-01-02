import { useChatCore } from "@/app/hooks/chat/useChatCore";
import { useAuth } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const serializeTranscript = (transcript: any): string => {
  if (!transcript) return "";
  if (typeof transcript === "string") return transcript;

  if (Array.isArray(transcript)) {
    return transcript
      .map((segment: any) => {
        const speaker = segment?.speaker ? `${segment.speaker}: ` : "";
        const words = Array.isArray(segment?.words)
          ? segment.words
              .map((w: any) => w?.word)
              .filter(Boolean)
              .join(" ")
          : "";
        return `${speaker}${words}`.trim();
      })
      .filter(Boolean)
      .join("\n\n");
  }

  return JSON.stringify(transcript);
};

export interface MeetingData {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  transcript?: any;
  summary?: string;
  actionItems?: Array<{
    id: number;
    text: string;
  }>;
  processed: boolean;
  processedAt?: string;
  recordingUrl?: string;
  emailSent: boolean;
  emailSentAt?: string;
  userId?: string;
  user?: {
    firstName?: string;
    LastName?: string;
    email?: string;
  };
  ragProcessed?: boolean;
}

export function useMeetingDetail() {
  const params = useParams();
  const meetingId = params.meetingId as string;
  const { userId, isLoaded } = useAuth();

  const [isOwner, setIsOwner] = useState(false);
  const [userChecked, setUserChecked] = useState(false);

  const [activeTab, setActiveTab] = useState<"summary" | "transcript">(
    "summary"
  );
  const [localActionItems, setLocalActionItems] = useState<any[]>([]);

  const [meetingData, setMeetingData] = useState<MeetingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [translatedContent, setTranslatedContent] = useState<{
    summary?: string;
    transcript?: any;
  }>({});
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const chat = useChatCore({
    apiEndpoint: "/api/rag/chat-meeting",
    getRequestBody: (input) => ({
      meetingId,
      question: input,
    }),
  });

  const handleSendMessage = async () => {
    if (!chat.chatInput.trim() || !isOwner) {
      return;
    }
    await chat.handleSendMessage();
  };

  const serializeTranscript = (transcript: any): string => {
    if (!transcript) return "";
    if (typeof transcript === "string") return transcript;

    if (Array.isArray(transcript)) {
      return transcript
        .map((segment: any) => {
          const speaker = segment?.speaker ? `${segment.speaker}: ` : "";
          const words = Array.isArray(segment?.words)
            ? segment.words
                .map((w: any) => w?.word)
                .filter(Boolean)
                .join(" ")
            : "";
          return `${speaker}${words}`.trim();
        })
        .filter(Boolean)
        .join("\n\n");
    }

    return JSON.stringify(transcript);
  };

  const getSegmentWordsText = (segment: any): string => {
    if (!segment?.words) return "";
    return segment.words
      .map((w: any) => w?.word)
      .filter(Boolean)
      .join(" ");
  };

  const translateText = async (text: string, languageCode: string) => {
    const response = await fetch("/api/meetings/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        targetLanguage: languageCode,
        meetingId,
      }),
    });

    if (!response.ok) {
      throw new Error("Translation failed");
    }

    const data = await response.json();
    return data.translatedText as string;
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!isOwner) {
      return;
    }

    chat.handleSuggestionClick(suggestion);
  };

  const handleInputChange = (value: string) => {
    if (!isOwner) {
      return;
    }

    chat.handleInputChange(value);
  };

  useEffect(() => {
    const fetchMeetingData = async () => {
      try {
        const response = await fetch(`/api/meetings/${meetingId}`);
        if (response.ok) {
          const data = await response.json();
          setMeetingData(data);

          if (isLoaded) {
            const ownerStatus = userId === data.userId;
            setIsOwner(ownerStatus);
            setUserChecked(true);
          }

          if (data.actionItems && data.actionItems.length > 0) {
            setLocalActionItems(data.actionItems);
          } else {
            setLocalActionItems([]);
          }
        }
      } catch (error) {
        console.error("error fetching meeting:", error);
      } finally {
        setLoading(false);
      }
    };
    if (isLoaded) {
      fetchMeetingData();
    }
  }, [meetingId, userId, isLoaded]);

  useEffect(() => {
    const processTranscript = async () => {
      try {
        const meetingResponse = await fetch(`/api/meetings/${meetingId}`);
        if (!meetingResponse.ok) {
          return;
        }
        const meeting = await meetingResponse.json();

        if (
          meeting.transcript &&
          !meeting.ragProcessed &&
          userId == meeting.userId
        ) {
          let transcriptText = "";
          if (typeof meeting.transcript === "string") {
            transcriptText = meeting.transcript;
          } else if (Array.isArray(meeting.transcript)) {
            transcriptText = meeting.transcript
              .map(
                (segment: any) =>
                  `${segment.speaker}: ${segment.words
                    .map((w: any) => w.word)
                    .join(" ")}`
              )
              .join("\n");
          }

          await fetch("/api/rag/process", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              meetingId,
              transcript: transcriptText,
              meetingTitle: meeting.title,
            }),
          });
        }
      } catch (error) {
        console.error("error checking RAG processing:", error);
      }
    };
    if (isLoaded && userChecked) {
      processTranscript();
    }
  }, [meetingId, userId, isLoaded, userChecked]);

  const deleteActionItem = async (id: number) => {
    if (!isOwner) {
      return;
    }

    setLocalActionItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addActionItem = async (text: string) => {
    if (!isOwner) {
      return;
    }
    try {
      const response = await fetch(`/api/meetings/${meetingId}`);
      if (response.ok) {
        const data = await response.json();
        setMeetingData(data);
        setLocalActionItems(data.actionItems || []);
      }
    } catch (error) {
      console.error("error refetching meeting data: ", error);
    }
  };

  const displayActionItems =
    localActionItems.length > 0
      ? localActionItems.map((item: any) => ({
          id: item.id,
          text: item.text,
        }))
      : [];

  const meetingInfoData = meetingData
    ? {
        title: meetingData.title,
        date: new Date(meetingData.startTime).toLocaleDateString(),
        time: `${new Date(
          meetingData.startTime
        ).toLocaleTimeString()} - ${new Date(
          meetingData.endTime
        ).toLocaleTimeString()}`,
        firstName: meetingData.user?.firstName || "User",
        LastName: meetingData.user?.LastName || "User",
      }
    : {
        title: "loading...",
        date: "loading...",
        time: "loading...",
        firstName: "loading...",
        LastName: "",
      };

  const handleTranslate = async (languageCode: string) => {
    if (languageCode === "en") {
      setTranslatedContent({});
      setSelectedLanguage("en");
      return;
    }

    // Translate both summary and transcript in one go
    if (!meetingData?.summary && !meetingData?.transcript) {
      return;
    }

    setIsTranslating(true);
    setSelectedLanguage(languageCode);

    try {
      const results: { [key: string]: any } = {};

      if (meetingData?.summary) {
        results.summary = await translateText(meetingData.summary, languageCode);
      }

      if (Array.isArray(meetingData?.transcript)) {
        const translatedSegments: any[] = [];
        for (const segment of meetingData.transcript as any[]) {
          const segmentText = getSegmentWordsText(segment) || serializeTranscript([segment]);
          const translated = await translateText(segmentText, languageCode);
          const lastEnd = segment?.words?.[segment.words.length - 1]?.end ?? segment?.offset ?? 0;
          
          const cleanSegment = {
            speaker: String(segment?.speaker || ""),
            offset: Number(segment?.offset ?? 0),
            words: [
              {
                word: String(translated || ""),
                start: Number(segment?.offset ?? 0),
                end: Number(lastEnd),
              },
            ],
          };
          
          translatedSegments.push(cleanSegment);
        }
        results.transcript = translatedSegments;
      } else if (meetingData?.transcript) {
        results.transcript = await translateText(
          serializeTranscript(meetingData.transcript),
          languageCode
        );
      }

      setTranslatedContent(results);
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedContent({});
    } finally {
      setIsTranslating(false);
    }
  };

  return {
    meetingId,
    isOwner,
    userChecked,
    activeTab,
    setActiveTab,
    localActionItems,
    setLocalActionItems,
    meetingData,
    setMeetingData,
    loading,
    setLoading,
    chatInput: chat.chatInput,
    setChatInput: chat.setChatInput,
    messages: chat.messages,
    setMessages: chat.setMessages,
    showSuggestions: chat.showSuggestions,
    setShowSuggestions: chat.setShowSuggestions,
    isLoading: chat.isLoading,
    setIsLoading: chat.setIsLoading,
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
    handleTranslate,
  };
}
