"use client";

import type { CHAT_PROFILE_QUERYResult } from "@/sanity.types";
// Re-introducing useSidebar to get the toggleSidebar function
import { useSidebar } from "../ui/sidebar"; 

export function Chat({
  profile,
}: {
  profile: CHAT_PROFILE_QUERYResult | null;
}) {
  // Re-initialize the hook to access the function that closes/minimizes the chat
  const { toggleSidebar } = useSidebar(); 
  
  // Use a simple function to handle the close action
  const handleClose = () => {
    toggleSidebar();
  };

  return (
    // The main container for the chat interface
    <div className="h-full w-full z-50 flex flex-col bg-white dark:bg-gray-900 shadow-xl">
      
      {/* 1. HEADER SECTION (with Close Button) */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
       
        
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          aria-label="Close chat window"
        >
          {/* You can replace this simple 'X' with an actual Icon component like <IoClose /> 
              if you are using an icon library (e.g., Lucide, Feather, Heroicons). */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      {/* 2. IFRAME CONTENT SECTION */}
      <div className="flex-grow">
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/qfOq16MK0m61_17ki_jCC"
          // We apply the h-full and w-full classes here to ensure the iframe takes 
          // up all the remaining space in the flex container
          className="w-full h-full min-h-[700px]" 
          frameBorder="0"
          title="Biniyam Taye Chatbase AI"
        ></iframe>
      </div>
    </div>
  );
}

export default Chat;