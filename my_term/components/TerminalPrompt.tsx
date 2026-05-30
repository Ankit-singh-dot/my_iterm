"use client";

import React, { useState, useRef, useEffect } from 'react';
import { executeCommand, CommandOutput } from '../utils/commands';
import { resolvePath, getNodeFromPath } from '../utils/fileSystem';

export default function TerminalPrompt() {
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('~');
  const [theme, setTheme] = useState('default');
  const [isBooting, setIsBooting] = useState(true);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "",
      output: (
        <div className="text-gray-300 mb-6">
          <pre className="text-gray-200 font-bold text-[8px] sm:text-[10px] leading-[1.1] mb-2 overflow-hidden drop-shadow-md">
            {`
█████╗ ███╗   ██╗██╗  ██╗██╗████████╗     ██████╗██╗     ██╗
██╔══██╗████╗  ██║██║ ██╔╝██║╚══██╔══╝    ██╔════╝██║     ██║
███████║██╔██╗ ██║█████╔╝ ██║   ██║       ██║     ██║     ██║
██╔══██║██║╚██╗██║██╔═██╗ ██║   ██║       ██║     ██║     ██║
██║  ██║██║ ╚████║██║  ██╗██║   ██║       ╚██████╗███████╗██║
╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝   ╚═╝        ╚═════╝╚══════╝╚═╝
`}
          </pre>
          <pre className="text-gray-400 font-mono text-[4px] sm:text-[6px] leading-[1] mb-6 overflow-hidden">
            {`
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@# +@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@     *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@        #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@         :@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@-     :%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@         . @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.         -@@@@@@@@@@@@@@@@@@@@@@@@#         . %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%             #@@@@@@@@@@@@@@@@@@@@#   .       #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*               -@@@@@@@@@@@@@@@@@+           *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+               . -@@@@@@@@@@@@@@-           *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                   +@@@@@@@@@@@=           #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@          .          @@@@@@@@@* .         %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%  . .                +@@@@@@#           @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@               .      @@@@@          .@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@=                     %@@     .    *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.                    +%         @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#               .          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*:..              .@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@..        .        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*                       :@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#                .          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  .                           @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+   .           .                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+                                 %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:  *.%@@@@       +*+                        .@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    *   @@#            .                      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*.:    +   =.       .                .          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  :  #  #    .        .  .              .      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@* +  -  #-  .  .-                               :@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  +   *  :=  :  @                               @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   %      *                                    *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  =@        .  : .@@@: .  .     .           %@@@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@. .@.   @  :  -  -@@@@@@@@@*      . *    *@@+    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#  @.      *  +  @@@@@@@@@@@     +@@@ +@@*     @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ .@:         =  @@@@@@@@@@@=.*@#  -@@-    .%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  -+            @@@@@@*.   +*      @%  .@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@-  @         . *@@@@@@@-    .      #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#  :#        ++:  +@@@@@    +@@+    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*%@  %*    #@  %    .. *@@ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   :** *@:@+   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@ . +@ =@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.@@@.@- #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%@@@@%%%+:#@@@@@@%%%%@%%%%%@%%%@@%%%%%%%@@@@@#=+%@@@%%%%@%%%@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@        :         @@@:    -     #  .          @@       -.    % .  @@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@   @:   @.  :#  .*@@  :   @%   -  #@@.   %   @    @+   #%   :  -@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@       =@.       @@:      @@@    =@@@.       %   :@#   .@@    +@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@   @@@@@@.  ..  @@#  .     @@@   @@@@    @        @-   @@@%   @@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@     +@@@     -       @@  .. *     @@     ..  %@       *@@@     @@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
`}
          </pre>
          <p className="text-lg text-gray-200">
            Welcome to my portfolio CLI! 
          </p>
          <p className="text-lg text-gray-200">
            Listening to the port 2410 🫶🏻
          </p>
          <p className="text-gray-400 mt-2 mb-4">
            Type "help" see available commands.
          </p>
        </div>
      ),
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Keep focus on input when clicking anywhere in the terminal body
  useEffect(() => {
    const handleGlobalClick = () => {
      inputRef.current?.focus();
    };
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  const clearHistory = () => {
    setHistory([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const parts = input.split(' ');
      
      // Command autocompletion
      if (parts.length === 1) {
        const commands = ['help', 'about', 'projects', 'skills', 'contact', 'clear', 'socials', 'github', 'ls', 'cd', 'cat', 'pwd', 'sudo'];
        const matches = commands.filter(c => c.startsWith(input.toLowerCase()));
        if (matches.length === 1) {
          setInput(matches[0] + ' ');
        }
      } 
      // File autocompletion
      else if (parts.length === 2 && ['cd', 'cat', 'ls'].includes(parts[0].toLowerCase())) {
        const searchPath = parts[1];
        
        // If they haven't typed anything yet or are typing in current dir
        const { node } = resolvePath(cwd, '.');
        if (node?.children) {
          const childrenNames = Object.keys(node.children);
          const matches = childrenNames.filter(name => name.startsWith(searchPath));
          
          if (matches.length === 1) {
            setInput(`${parts[0]} ${matches[0]}`);
          }
        }
      }
      return;
    }

    if (e.key === 'Enter') {
      const trimmedCmd = input.trim();
      
      if (trimmedCmd) {
        const output = executeCommand(trimmedCmd, {
          cwd,
          setCwd,
          clearHistory,
          setTheme,
        });
        
        // Only add to history if it's not a clear command
        if (trimmedCmd.toLowerCase() !== 'clear') {
          setHistory((prev) => [...prev, { command: trimmedCmd, output }]);
        }
      } else {
        // empty command just adds a new prompt line
        setHistory((prev) => [...prev, { command: '', output: null }]);
      }
      
      setInput('');
    }
  };

  const getThemeColors = () => {
    switch (theme) {
      case 'matrix':
      case 'hacker':
        return {
          text: 'text-green-500',
          bg: 'bg-black',
          prompt: 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]',
          symbol: 'text-green-400',
          path: 'text-green-600',
        };
      case 'dracula':
        return {
          text: 'text-purple-300',
          bg: 'bg-[#282a36]',
          prompt: 'text-[#ff79c6] drop-shadow-[0_0_8px_rgba(255,121,198,0.8)]',
          symbol: 'text-[#50fa7b]',
          path: 'text-[#8be9fd]',
        };
      case 'neon':
        return {
          text: 'text-cyan-300',
          bg: 'bg-[#000000]',
          prompt: 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]',
          symbol: 'text-pink-500',
          path: 'text-purple-400',
        };
      default:
        return {
          text: 'text-gray-300',
          bg: 'bg-transparent',
          prompt: 'text-[#d866db] drop-shadow-[0_0_8px_rgba(216,102,219,0.8)]',
          symbol: 'text-[#a6e22e] drop-shadow-[0_0_8px_rgba(166,226,46,0.8)]',
          path: 'text-purple-400',
        };
    }
  };

  const currentTheme = getThemeColors();

  const PromptPrefix = ({ path }: { path: string }) => (
    <div className={`flex gap-2 items-center whitespace-nowrap ${currentTheme.text}`}>
      <span className={`font-semibold ${currentTheme.prompt}`}>dev@ankit</span>
      <span className={currentTheme.symbol}>:</span>
      <span className={`font-semibold ${currentTheme.path}`}>{path}</span>
      <span className={`font-bold ${currentTheme.symbol}`}>$</span>
    </div>
  );

  // Boot sequence logic
  useEffect(() => {
    if (!isBooting) return;

    const logs = [
      "Initializing core system...",
      "Loading kernel modules [OK]",
      "Mounting virtual file system [OK]",
      "Starting network interface [OK]",
      "Establishing secure connection...",
      "Connecting to github.com/Ankit-singh-dot...",
      "Fetching profile data [OK]",
      "Booting ANKIT CLI v2.0.0...",
      "System ready."
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < logs.length) {
        setBootLogs((prev) => [...prev, logs[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsBooting(false), 400); // Small pause before clearing
      }
    }, 150); // Fast typing speed

    return () => clearInterval(interval);
  }, [isBooting]);

  if (isBooting) {
    return (
      <div className={`h-full w-full p-4 font-mono text-sm sm:text-base terminal-scrollbar overflow-y-auto ${currentTheme.bg} ${currentTheme.text}`}>
        {bootLogs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
        <div ref={bottomRef} />
      </div>
    );
  }

  return (
    <div className={`h-full w-full p-4 font-mono text-sm sm:text-base terminal-scrollbar overflow-y-auto ${currentTheme.bg} transition-colors duration-500`}>
      {/* Render History */}
      {history.map((item, index) => (
        <div key={index} className="mb-2">
          {item.command !== '' && item.command !== undefined && (
            <div className={`flex gap-2 items-center ${currentTheme.text}`}>
              <span className={`font-semibold text-opacity-80 ${currentTheme.prompt}`}>dev@ankit</span>
              <span className={currentTheme.symbol}>:</span>
              <span className={`font-bold ${currentTheme.symbol}`}>$</span>
              <span className="ml-1 opacity-90">{item.command}</span>
            </div>
          )}
          {item.output && <div className={`mt-1 ${currentTheme.text}`}>{item.output}</div>}
        </div>
      ))}

      {/* Current Input Prompt */}
      <div className={`flex gap-2 items-center ${currentTheme.text}`}>
        <PromptPrefix path={cwd} />
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`flex-1 bg-transparent border-none outline-none shadow-none focus:ring-0 p-0 m-0 caret-current opacity-90 min-w-[50px] ${currentTheme.text}`}
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </div>
      <div ref={bottomRef} className="h-4" /> {/* Extra padding at bottom */}
    </div>
  );
}
