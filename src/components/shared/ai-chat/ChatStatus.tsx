import { useAiChat } from "@/contexts/AiChatContext";

const ChatStatus = () => {
  const { messages, loading, error } = useAiChat();

  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <h3 className="mb-2 font-semibold">Chat Status</h3>
      <p>Messages: {messages.length}</p>
      <p>Loading: {loading ? "Yes" : "No"}</p>
      {error && <p className="text-red-500">Error: {error}</p>}
    </div>
  );
};

export default ChatStatus;
