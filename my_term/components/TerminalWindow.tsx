"use client";

import React from 'react';
import TerminalPrompt from './TerminalPrompt';

export default function TerminalWindow() {
  return (
    <div className="w-full h-full flex flex-col bg-transparent overflow-hidden">
      {/* Pure Terminal Content Area */}
      <div className="flex-1 relative bg-transparent overflow-hidden">
        <TerminalPrompt />
      </div>
    </div>
  );
}
