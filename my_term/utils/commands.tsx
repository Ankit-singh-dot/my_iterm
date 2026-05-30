import React from 'react';
import { resolvePath } from './fileSystem';
import { SocialsCard, GithubCard, ProjectsCard, ExperienceCard } from '../components/InteractiveCard';

export interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

export interface CommandContext {
  cwd: string;
  setCwd: (path: string) => void;
  clearHistory: () => void;
  setTheme: (theme: string) => void;
}

export const executeCommand = (cmd: string, context: CommandContext): React.ReactNode => {
  const args = cmd.trim().split(' ').filter(Boolean);
  const command = args[0]?.toLowerCase();
  
  if (!command) return null;

  switch (command) {
    case 'help':
      return (
        <div className="flex flex-col gap-1 text-gray-300">
          <p>Available commands:</p>
          <div className="grid grid-cols-[100px_1fr] gap-2 ml-4 mt-2">
            <span className="text-blue-400 font-semibold">ls</span>
            <span>List directory contents</span>
            <span className="text-blue-400 font-semibold">cd</span>
            <span>Change directory</span>
            <span className="text-blue-400 font-semibold">pwd</span>
            <span>Print working directory</span>
            <span className="text-blue-400 font-semibold">cat</span>
            <span>Concatenate and print files</span>
            <span className="text-blue-400 font-semibold">clear</span>
            <span>Clear the terminal screen</span>
            <span className="text-blue-400 font-semibold">projects</span>
            <span><span className="text-purple-400 text-xs font-bold px-1 rounded bg-purple-400/20 mr-1">GUI</span> View my featured projects</span>
            <span className="text-blue-400 font-semibold">experience</span>
            <span><span className="text-purple-400 text-xs font-bold px-1 rounded bg-purple-400/20 mr-1">GUI</span> View my proof of work</span>
            <span className="text-blue-400 font-semibold">socials</span>
            <span><span className="text-purple-400 text-xs font-bold px-1 rounded bg-purple-400/20 mr-1">GUI</span> View my social profiles</span>
            <span className="text-blue-400 font-semibold">github</span>
            <span><span className="text-purple-400 text-xs font-bold px-1 rounded bg-purple-400/20 mr-1">GUI</span> View my GitHub stats</span>
            <span className="text-blue-400 font-semibold">theme</span>
            <span>Change colors (try: 'theme matrix', 'theme hacker')</span>
            <span className="text-blue-400 font-semibold">help</span>
            <span>Show this help message</span>
          </div>
        </div>
      );
    
    case 'pwd':
      return <div className="text-gray-300">{context.cwd}</div>;

    case 'ls': {
      const targetPath = args[1] || '.';
      const { node, error } = resolvePath(context.cwd, targetPath);
      
      if (error) {
        return <div className="text-red-400">ls: {error}</div>;
      }

      if (node?.type === 'file') {
        return <div className="text-gray-300">{node.name}</div>;
      }

      if (node?.children) {
        const childrenNodes = Object.values(node.children);
        return (
          <div className="flex gap-4 flex-wrap text-gray-300">
            {childrenNodes.map((child) => (
              <span 
                key={child.name} 
                className={child.type === 'directory' ? 'text-blue-400 font-semibold' : 'text-gray-300'}
              >
                {child.name}{child.type === 'directory' ? '/' : ''}
              </span>
            ))}
          </div>
        );
      }
      return null;
    }

    case 'cd': {
      const targetPath = args[1] || '~';
      const { node, newPath, error } = resolvePath(context.cwd, targetPath);

      if (error) {
        return <div className="text-red-400">cd: {error}</div>;
      }

      if (node?.type === 'file') {
        return <div className="text-red-400">cd: not a directory: {targetPath}</div>;
      }

      if (newPath) {
        context.setCwd(newPath);
      }
      return null;
    }

    case 'cat': {
      if (!args[1]) {
        return <div className="text-red-400">cat: missing file operand</div>;
      }
      
      const { node, error } = resolvePath(context.cwd, args[1]);

      if (error) {
        return <div className="text-red-400">cat: {error}</div>;
      }

      if (node?.type === 'directory') {
        return <div className="text-red-400">cat: {args[1]}: Is a directory</div>;
      }

      return (
        <div className="text-gray-300 whitespace-pre-wrap font-mono">
          {node?.content}
        </div>
      );
    }

    case 'clear':
      context.clearHistory();
      return null;
      
    case 'socials':
      return <SocialsCard />;
      
    case 'github':
      return <GithubCard />;

    case 'projects':
      return <ProjectsCard />;

    case 'experience':
    case 'work':
      return <ExperienceCard />;
      
    case 'theme': {
      const selectedTheme = args[1]?.toLowerCase();
      if (['matrix', 'hacker', 'dracula', 'neon', 'default'].includes(selectedTheme)) {
        context.setTheme(selectedTheme);
        return <div className="text-green-400">Theme updated to: {selectedTheme}</div>;
      }
      return (
        <div className="text-gray-300">
          Available themes: <span className="text-blue-400 font-bold">default, matrix, hacker, dracula, neon</span>
          <br />Usage: theme &lt;name&gt;
        </div>
      );
    }
      
    case 'sudo':
      if (cmd.trim().includes('rm -rf /')) {
        return (
          <div className="text-red-500 font-bold ">
            HAVE SOME OTHERS JOB MAN
            <br />
            
          </div>
        );
      }
      return (
        <div className="text-yellow-400">
          admin privileges are restricted. You have no power here, guest!
        </div>
      );

    case 'rm':
      return <div className="text-red-400">rm: permission denied</div>;
      
    // Legacy commands support
    case 'about':
      return executeCommand('cat ~/about.txt', context);
    case 'contact':
      return executeCommand('cat ~/contact.txt', context);
    case 'skills':
      return executeCommand('cat ~/skills.txt', context);

    default:
      return (
        <div className="text-red-400">
          Command not found: {command}. Type <span className="text-blue-400 font-bold">'help'</span> for a list of commands.
        </div>
      );
  }
};
