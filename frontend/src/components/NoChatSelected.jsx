import React from "react";
import { MessageSquare } from "lucide-react";

function NoChatSelected() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full p-8 rounded-r-lg md:p-16 bg-component-bg animate-fade-in">
      <div className="max-w-md space-y-6 text-center">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="flex items-center justify-center rounded-full shadow-lg size-20 bg-soft-teal/20 animate-bounce-slow">
              <MessageSquare className="size-10 text-soft-teal" />
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-extrabold leading-tight tracking-wide sm:text-4xl text-text-primary">
          Welcome to <span className="text-soft-teal">Chatty</span>
        </h2>
        <p className="text-base text-text-muted sm:text-lg">
          Select a conversation from the sidebar to start chatting or explore
          other features.
        </p>
      </div>
    </div>
  );
}

export default NoChatSelected;
