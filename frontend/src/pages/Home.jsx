import React from "react";
import { useChatStore } from "../store/useChatStore";
import SideBar from "../components/SideBar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

function Home() {
  const { selectedUser } = useChatStore();
  return (
    // Overall page background with padding for the main chat component
    <div className="flex items-center justify-center min-h-screen px-4 pt-20 pb-8 bg-gray-background">
      {/* Main chat component card */}
      <div className="bg-component-bg rounded-2xl shadow-2xl w-full max-w-7xl h-[calc(100vh-8rem)] overflow-hidden flex transform transition-all duration-300 ease-in-out">
        <SideBar />
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>
    </div>
  );
}

export default Home;
