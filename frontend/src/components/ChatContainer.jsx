import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeleton/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

function ChatContainer() {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscibeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscibeToMessages();
      return () => unsubscribeFromMessages();
    }
  }, [
    selectedUser._id,
    getMessages,
    subscibeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex flex-col flex-1 rounded-r-lg bg-component-bg">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
  return (
    <div className="flex flex-col flex-1 rounded-r-lg shadow-inner bg-component-bg">
      <ChatHeader />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto custom-scrollbar">
        {messages.map((message) => {
          // CORRECTED LOGIC:
          // If message sender is YOUR authUser, it's 'chat-end' (your side)
          // Otherwise, it's 'chat-start' (other person's side)
          const isSender = message.senderId === authUser._id;
          return (
            <div
              key={message._id}
              className={`flex items-start gap-3 my-2 ${
                isSender ? "justify-end" : "justify-start"
              } animate-fade-in`}
            >
              {!isSender && ( // Show avatar for other user's messages
                <div className="flex-shrink-0">
                  <img
                    src={selectedUser.profilePic || "/avatar.png"}
                    alt="profile pic"
                    className="object-cover border-2 rounded-full size-10 border-soft-teal"
                  />
                </div>
              )}

              <div
                className={`flex flex-col ${
                  isSender ? "items-end" : "items-start"
                } max-w-[75%]`}
              >
                <div className="flex items-center gap-1 mb-1 text-xs text-text-muted">
                  {!isSender && selectedUser?.fullName && (
                    <span className="mr-1 text-xs font-semibold text-soft-teal">
                      {selectedUser.fullName.split(" ")[0]}
                    </span>
                  )}
                  <time className="opacity-70">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
                <div
                  className={`p-3 rounded-2xl shadow-md text-sm break-words 
                    ${
                      isSender
                        ? "bg-soft-teal text-deep-ocean-blue rounded-br-none"
                        : "bg-card-bg text-text-primary rounded-bl-none"
                    }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="attachment"
                      className="sm:max-w-[200px] max-w-[150px] rounded-lg mb-2 object-cover border border-border-color"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>

              {isSender && ( // Show avatar for your messages
                <div className="flex-shrink-0">
                  <img
                    src={authUser.profilePic || "/avatar.png"}
                    alt="profile pic"
                    className="object-cover border-2 rounded-full size-10 border-muted-gold"
                  />
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput />
    </div>
  );
}

export default ChatContainer;
