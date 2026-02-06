"use client";
import { createContext, useContext, useState, useRef, useEffect } from "react";
import { MessageType } from "@/types/ai";
import { useMessage } from "@/hooks/use-message";

interface AiChatContextType {
  history: MessageType[];
  setHistory: React.Dispatch<React.SetStateAction<MessageType[]>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  currentMessage: MessageType | undefined;
  setCurrentMessage: React.Dispatch<
    React.SetStateAction<MessageType | undefined>
  >;
  processedAiMessageId: string | null;
  setProcessedAiMessageId: React.Dispatch<React.SetStateAction<string | null>>;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  aiMessage: MessageType | undefined;
  loading: boolean;
  error: string | null;
  HandleSendMessage: () => void;
  scrollToBottom: () => void;
}

const AiChatContext = createContext<AiChatContextType | undefined>(undefined);

export const useAiChat = () => {
  const context = useContext(AiChatContext);
  if (!context) {
    throw new Error("useAiChat must be used within an AiChatProvider");
  }
  return context;
};

interface AiChatProviderProps {
  children: React.ReactNode;
}

export const AiChatProvider = ({ children }: AiChatProviderProps) => {
  const [history, setHistory] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [currentMessage, setCurrentMessage] = useState<
    MessageType | undefined
  >();
  const [processedAiMessageId, setProcessedAiMessageId] = useState<
    string | null
  >(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { aiMessage, loading, error } = useMessage(
    "/api/ai",
    currentMessage,
    history
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Update history to keep last 10 messages (excluding current typing/loading states)
    const validMessages = messages.filter(
      (msg) => msg.content && msg.content.trim() !== ""
    );
    setHistory(validMessages.slice(-10));
  }, [messages]);

  useEffect(() => {
    if (aiMessage && currentMessage && aiMessage.id !== processedAiMessageId) {
      // Add AI response to messages
      const newAiMessage = {
        id: aiMessage.id,
        content: aiMessage.content,
        isUserMessage: false,
      };

      setMessages((prevMessages) => [...prevMessages, newAiMessage]);
      setProcessedAiMessageId(aiMessage.id);
      setCurrentMessage(undefined);
    }
  }, [aiMessage, currentMessage, processedAiMessageId]);

  function HandleSendMessage() {
    if (!inputValue.trim()) return;

    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: inputValue,
      isUserMessage: true,
    };

    // Add user message to messages
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Set current message to trigger API call
    setCurrentMessage(userMessage);

    setInputValue("");
  }

  const value: AiChatContextType = {
    history,
    setHistory,
    inputValue,
    setInputValue,
    messages,
    setMessages,
    currentMessage,
    setCurrentMessage,
    processedAiMessageId,
    setProcessedAiMessageId,
    messagesEndRef,
    aiMessage,
    loading,
    error,
    HandleSendMessage,
    scrollToBottom,
  };

  return (
    <AiChatContext.Provider value={value}>{children}</AiChatContext.Provider>
  );
};
