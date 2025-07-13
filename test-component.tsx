import React from "react";

// Minimal test component to check basic functionality
export default function TestComponent() {
  return (
    <div className="p-4 bg-gray-900 text-white">
      <h1>Test Component Working</h1>
      <button className="p-4 rounded-lg border text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap bg-blue-600 border-blue-500 text-white">
        Test Button
      </button>
    </div>
  );
}