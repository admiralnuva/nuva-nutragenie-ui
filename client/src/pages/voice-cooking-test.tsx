import React from "react";
import { BackButton } from "@/components/ui/back-button";

export default function VoiceCookingTestScreen() {
  return (
    <div className="min-h-screen bg-white">
      <div className="p-4">
        <BackButton to="/home" />
        <h1 className="text-2xl font-bold text-purple-600 text-center mt-4">Voice Cooking Test</h1>
        <p className="text-center mt-4">This is a test page to verify routing works.</p>
        
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h2 className="font-semibold mb-2">Test Content:</h2>
          <p>If you can see this page, routing is working correctly.</p>
        </div>
        
        <div className="fixed bottom-20 left-4 right-4">
          <div className="bg-black p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center">
                <span className="text-white">🎤</span>
              </div>
              
              <div className="flex-1 bg-gray-700 rounded-full px-6 py-4">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full bg-transparent text-white placeholder-gray-400 outline-none text-lg"
                />
              </div>
              
              <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center">
                <span className="text-white">⏸️</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}