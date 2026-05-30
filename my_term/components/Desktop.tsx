"use client";

import React from 'react';
import TerminalWindow from './TerminalWindow';

export default function Desktop() {
  return (
    <main className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-[#0a0a0a]">
      <div className="absolute inset-0 z-0 bg-[#0a0a0a]" />

      {/* Grid Overlay for "Developer" feel */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Terminal Layer */}
      <div className="relative z-10 w-full h-full">
        <TerminalWindow />
      </div>
    </main>
  );
}
