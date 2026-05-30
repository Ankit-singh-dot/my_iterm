export type FileType = 'file' | 'directory';

export interface FileNode {
  name: string;
  type: FileType;
  content?: string; // For files
  children?: { [name: string]: FileNode }; // For directories
}

export const virtualFS: FileNode = {
  name: '~',
  type: 'directory',
  children: {
    'about.txt': {
      name: 'about.txt',
      type: 'file',
      content: `Hi, I am Ankit Singh.
I am a passionate Full-Stack Developer with a knack for building beautiful, highly interactive web applications.
I love pushing the boundaries of user interfaces to create next-level experiences.`,
    },
    'contact.txt': {
      name: 'contact.txt',
      type: 'file',
      content: `GitHub: https://github.com/Ankit-singh-dot\nLinkedIn: https://www.linkedin.com/in/ankit-raj-4b1343320/\nX/Twitter: https://x.com/_ankitstwt\nInstagram: https://www.instagram.com/_ankitsig/`,
    },
    'projects': {
      name: 'projects',
      type: 'directory',
      children: {
        'my_iterm.md': {
          name: 'my_iterm.md',
          type: 'file',
          content: `# my_iterm
A sleek interactive terminal portfolio built with Next.js, TailwindCSS, and Framer Motion. 
Features a simulated virtual file system, glassmorphic UI, and draggable windows.`,
        },
        'xpenseSnap.md': {
          name: 'xpenseSnap.md',
          type: 'file',
          content: `# xpenseSnap
A comprehensive expense tracking platform.
Designed with modern aesthetics to help users visualize and manage their daily expenses seamlessly.`,
        },
        'ecommerce_ui.md': {
          name: 'ecommerce_ui.md',
          type: 'file',
          content: `# E-Commerce UI
A premium, modern storefront designed to drive conversions.
Built with smooth animations, dynamic product cards, and a robust cart system.`,
        },
      },
    },
    'skills': {
      name: 'skills',
      type: 'directory',
      children: {
        'frontend.txt': {
          name: 'frontend.txt',
          type: 'file',
          content: `React, Next.js, Tailwind CSS, Framer Motion, HTML, CSS, Redux`,
        },
        'languages.txt': {
          name: 'languages.txt',
          type: 'file',
          content: `JavaScript, TypeScript, Python`,
        },
        'tools.txt': {
          name: 'tools.txt',
          type: 'file',
          content: `Git, GitHub, VS Code, Figma`,
        }
      },
    },
  },
};

/**
 * Resolves a path string into a FileNode based on the current working directory.
 * @param cwd Current working directory (e.g., '~', '~/projects')
 * @param targetPath Target path (e.g., 'projects', '..', '/projects')
 */
export const resolvePath = (cwd: string, targetPath: string): { node?: FileNode; newPath?: string; error?: string } => {
  if (!targetPath) return { node: getNodeFromPath(cwd), newPath: cwd };

  // Handle absolute path starting from ~ (our root)
  let workingPath = targetPath.startsWith('~') ? '~' : cwd;
  let targetSegments = targetPath.split('/').filter(Boolean);
  
  if (targetPath.startsWith('~')) {
    targetSegments = targetSegments.slice(1);
  } else if (targetPath.startsWith('/')) {
     workingPath = '~'; // Treat / as root ~
  }

  const currentSegments = workingPath === '~' ? [] : workingPath.substring(2).split('/');
  
  let finalSegments = [...currentSegments];

  for (const segment of targetSegments) {
    if (segment === '.') continue;
    if (segment === '..') {
      finalSegments.pop();
    } else {
      finalSegments.push(segment);
    }
  }

  const newPath = finalSegments.length > 0 ? `~/${finalSegments.join('/')}` : '~';
  const node = getNodeFromPath(newPath);

  if (!node) {
    return { error: `no such file or directory: ${targetPath}` };
  }

  return { node, newPath };
};

export const getNodeFromPath = (path: string): FileNode | undefined => {
  if (path === '~' || path === '~/') return virtualFS;

  const segments = path.startsWith('~/') ? path.substring(2).split('/') : path.split('/');
  let current: FileNode | undefined = virtualFS;

  for (const segment of segments) {
    if (!current?.children || !current.children[segment]) {
      return undefined;
    }
    current = current.children[segment];
  }

  return current;
};
