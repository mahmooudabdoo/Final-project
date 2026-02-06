import { cn } from "@/lib/utils";
import { Bot, Loader, User } from "lucide-react";

type MessageProps = {
  content: string;
  isUserMessage?: boolean;
  loading?: boolean;
  ref?: React.Ref<HTMLDivElement>;
};

const Message = ({
  content,
  isUserMessage = true,
  loading = false,
  ref,
}: MessageProps) => {
  return (
    <div
      ref={ref}
      className={cn(
        "w-full flex items-start gap-2 h-fit mb-2",
        isUserMessage ? "text-right flex-row-reverse" : "text-left"
      )}
    >
      {isUserMessage ? (
        <span className="flex-shrink-0 bg-primary/30 p-1 rounded-full font-semibold text-primary">
          <User size={16} />
        </span>
      ) : (
        <span className="flex-shrink-0 bg-secondary/50 p-1 rounded-full font-semibold">
          <Bot size={16} />
        </span>
      )}
      <span
        className={cn(
          "inline-block px-3 py-2 rounded-md max-w-[80%] break-words",
          isUserMessage
            ? "bg-primary text-white"
            : "bg-secondary text-muted-foreground"
        )}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader size={20} className="animate-spin" />
            <span>Thinking...</span>
          </div>
        ) : (
          content
        )}
      </span>
    </div>
  );
};

export default Message;
