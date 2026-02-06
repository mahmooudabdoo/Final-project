"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useAiChat } from "@/contexts/AiChatContext";
import Message from "./Message";

type AiChatDialogProps = {
  children?: React.ReactNode;
};

const AiChatDialog = ({ children }: AiChatDialogProps) => {
  const {
    inputValue,
    setInputValue,
    messages,
    loading,
    error,
    messagesEndRef,
    HandleSendMessage,
  } = useAiChat();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center">Chat with AI</DialogTitle>
          <DialogDescription className="text-center">
            Ask questions and get answers from the AI.
          </DialogDescription>
        </DialogHeader>
        {/* MESSAGES FROM AI */}
        <div className="relative flex flex-col gap-2 p-2 border rounded-md h-[400px] overflow-y-auto">
          {messages.map((msg, index) => (
            <Message
              key={index}
              content={msg.content}
              isUserMessage={msg.isUserMessage}
            />
          ))}
          {loading && (
            <Message content="Thinking..." isUserMessage={false} loading />
          )}
          {error && (
            <Message content={`Error: ${error}`} isUserMessage={false} />
          )}
          <div ref={messagesEndRef} />
        </div>
        <DialogFooter>
          <div className="flex justify-between items-center gap-2 w-full">
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && HandleSendMessage()}
              disabled={loading}
            />
            <Button
              size="icon"
              onClick={HandleSendMessage}
              disabled={loading || !inputValue.trim()}
            >
              <Send />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AiChatDialog;
