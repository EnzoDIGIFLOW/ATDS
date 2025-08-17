import React, { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  // Check loading state after all hooks
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-temple-pink"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <h1>Test</h1>
    </div>
  )
}