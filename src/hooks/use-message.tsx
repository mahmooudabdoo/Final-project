"use client";
import { MessageType } from "@/types/ai";
import { useEffect, useState, useRef } from "react";

export const useMessage = (
  endpoint: string,
  message?: MessageType,
  history?: MessageType[]
) => {
  const [aiMessage, setAiMessage] = useState<MessageType | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastMessageRef = useRef<string | null>(null);

  useEffect(() => {
    // Don't fetch if no message is provided or if it's the same as the last one
    if (!message || message.id === lastMessageRef.current) return;

    async function fetchMessage() {
      try {
        setLoading(true);
        setError(null);
        lastMessageRef.current = message!.id;

        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
            history: history || [],
          }),
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch message: ${res.status}`);
        }

        const data = await res.json();
        setAiMessage(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        lastMessageRef.current = null;
      } finally {
        setLoading(false);
      }
    }

    fetchMessage();
  }, [message, endpoint, history]);

  return { aiMessage, loading, error };
};
