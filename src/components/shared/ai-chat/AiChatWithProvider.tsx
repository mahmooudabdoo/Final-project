import { AiChatProvider } from "@/contexts/AiChatContext";
import AiChatDialog from "./AiChatDialog";
import { Bot } from "lucide-react";

const AiChatWithProvider = () => {
  return (
    <AiChatProvider>
      <AiChatDialog>
        <button className="right-3 lg:right-5 bottom-3 lg:bottom-5 fixed flex justify-center items-center bg-primary hover:opacity-90 rounded-full w-14 h-14 text-white text-4xl transition-all duration-200 cursor-pointer">
          <Bot />
        </button>
      </AiChatDialog>
    </AiChatProvider>
  );
};

export default AiChatWithProvider;
