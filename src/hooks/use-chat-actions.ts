import { useAiChat } from "@/contexts/AiChatContext";

export const useChatActions = () => {
  const {
    inputValue,
    setInputValue,
    messages,
    loading,
    error,
    HandleSendMessage,
    setMessages,
  } = useAiChat();

  const clearChat = () => {
    setMessages([]);
  };

  const sendMessage = (message: string) => {
    setInputValue(message);
    HandleSendMessage();
  };

  const getLastMessage = () => {
    return messages.length > 0 ? messages[messages.length - 1] : null;
  };

  const getMessageCount = () => {
    return messages.length;
  };

  const getUserMessages = () => {
    return messages.filter((msg) => msg.isUserMessage);
  };

  const getAiMessages = () => {
    return messages.filter((msg) => !msg.isUserMessage);
  };

  return {
    inputValue,
    setInputValue,
    messages,
    loading,
    error,
    HandleSendMessage,
    clearChat,
    sendMessage,
    getLastMessage,
    getMessageCount,
    getUserMessages,
    getAiMessages,
  };
};
