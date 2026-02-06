# AI Chat Context System

This document explains how to use the new AI Chat Context system that centralizes all chat-related state and logic.

## Overview

The AI Chat Context system provides a centralized way to manage chat state across multiple components. It includes:

- **AiChatContext**: The main context provider
- **useAiChat**: Hook to access chat state and functions
- **useChatActions**: Extended hook with additional utility functions

## Files Created

1. `src/contexts/AiChatContext.tsx` - Main context provider
2. `src/components/shared/ai-chat/AiChatWithProvider.tsx` - Pre-wrapped component
3. `src/components/shared/ai-chat/ChatStatus.tsx` - Example usage component
4. `src/hooks/use-chat-actions.ts` - Extended hook with utilities

## Usage

### Basic Usage with Provider

```tsx
import { AiChatProvider } from "@/contexts/AiChatContext";
import AiChatDialog from "./AiChatDialog";

function App() {
  return (
    <AiChatProvider>
      <AiChatDialog>
        <button>Open Chat</button>
      </AiChatDialog>
    </AiChatProvider>
  );
}
```

### Using the Pre-wrapped Component

```tsx
import AiChatWithProvider from "@/components/shared/ai-chat/AiChatWithProvider";

function App() {
  return (
    <div>
      <AiChatWithProvider />
    </div>
  );
}
```

### Access Chat State in Other Components

```tsx
import { useAiChat } from "@/contexts/AiChatContext";

function MyComponent() {
  const { messages, loading, error, HandleSendMessage } = useAiChat();

  return (
    <div>
      <p>Messages: {messages.length}</p>
      <p>Loading: {loading ? "Yes" : "No"}</p>
      {error && <p>Error: {error}</p>}
    </div>
  );
}
```

### Using Extended Chat Actions

```tsx
import { useChatActions } from "@/hooks/use-chat-actions";

function ChatControls() {
  const { clearChat, sendMessage, getMessageCount, getUserMessages } =
    useChatActions();

  return (
    <div>
      <button onClick={clearChat}>Clear Chat</button>
      <button onClick={() => sendMessage("Hello!")}>Send Hello</button>
      <p>Total messages: {getMessageCount()}</p>
      <p>User messages: {getUserMessages().length}</p>
    </div>
  );
}
```

## Available Context Values

### State Variables

- `history`: MessageType[] - Last 10 messages for context
- `inputValue`: string - Current input value
- `messages`: MessageType[] - All chat messages
- `currentMessage`: MessageType | undefined - Message being processed
- `processedAiMessageId`: string | null - ID of last processed AI message
- `loading`: boolean - Whether AI is processing
- `error`: string | null - Any error message
- `aiMessage`: MessageType | undefined - Latest AI response

### Functions

- `HandleSendMessage()`: Send the current input message
- `scrollToBottom()`: Scroll chat to bottom
- `setInputValue(value)`: Update input value
- `setMessages(messages)`: Update messages array

### Refs

- `messagesEndRef`: Reference to scroll target element

## Extended Hook Functions (useChatActions)

- `clearChat()`: Clear all messages
- `sendMessage(message)`: Send a specific message
- `getLastMessage()`: Get the most recent message
- `getMessageCount()`: Get total message count
- `getUserMessages()`: Get only user messages
- `getAiMessages()`: Get only AI messages

## Migration Guide

### Before (Component-based state)

```tsx
const [messages, setMessages] = useState<MessageType[]>([]);
const [loading, setLoading] = useState(false);
// ... other state
```

### After (Context-based state)

```tsx
const { messages, loading, HandleSendMessage } = useAiChat();
```

## Benefits

1. **Centralized State**: All chat state in one place
2. **Reusability**: Share state across multiple components
3. **Consistency**: Single source of truth for chat data
4. **Extensibility**: Easy to add new features
5. **Testing**: Easier to test with isolated context
6. **Performance**: Avoid prop drilling

## Important Notes

- Always wrap components that use `useAiChat` with `AiChatProvider`
- The context maintains history of last 10 messages automatically
- Use `useChatActions` for additional utility functions
- The context handles all the complex state management automatically
