import React from "react";
import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser?._id);

  if (!selectedUser) {
    return null;
  }

  return (
    <div className="p-4 border-b shadow-md border-soft-teal/30 bg-card-bg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0 rounded-full size-10">
            <img
              src={selectedUser?.profilePic || "/avatar.webp"}
              alt={selectedUser?.fullName}
              className={`object-cover rounded-full w-full h-full border-2 ${
                isOnline ? "border-soft-teal" : "border-border-color"
              }`}
            />
            {isOnline && (
              <span className="absolute bottom-0 right-0 bg-green-500 rounded-full size-2.5 ring-2 ring-card-bg animate-pulse"></span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              {selectedUser?.fullName}
            </h3>
            <p
              className={`text-sm ${
                isOnline ? "text-green-400" : "text-text-muted"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 transition-colors duration-200 rounded-full text-text-muted hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-soft-teal"
          aria-label="Close chat"
        >
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
