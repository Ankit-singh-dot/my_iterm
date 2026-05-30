"use client";

import React, { useState, useEffect } from 'react';
import { Mail, ExternalLink, Loader2, ShieldAlert, Network, Cpu, MailCheck, FolderGit2, Briefcase, Trophy, GitCommit } from 'lucide-react';
import { motion } from 'framer-motion';

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const SocialsCard = () => {
  const socials = [
    { name: 'GitHub', icon: <GithubIcon size={20} />, url: 'https://github.com/Ankit-singh-dot', color: 'bg-gray-800 hover:bg-gray-700' },
    { name: 'LinkedIn', icon: <LinkedinIcon size={20} />, url: 'https://www.linkedin.com/in/ankit-raj-4b1343320/', color: 'bg-blue-600 hover:bg-blue-500' },
    { name: 'X / Twitter', icon: <TwitterIcon size={20} />, url: 'https://x.com/_ankitstwt', color: 'bg-black border border-white/20 hover:bg-gray-900' },
    { name: 'Instagram', icon: <InstagramIcon size={20} />, url: 'https://www.instagram.com/_ankitsig/', color: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-white/5 border border-white/10 rounded-lg max-w-md my-4"
    >
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        Connect with me <span className="text-blue-400">@ankit</span>
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 p-3 rounded-md transition-all ${social.color} text-white no-underline`}
          >
            {social.icon}
            <span className="font-medium">{social.name}</span>
          </a>
        ))}
      </div>
    </motion.div>
  );
};

export const GithubCard = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/Ankit-singh-dot')
      .then((res) => res.json())
      .then((userData) => {
        setData(userData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-5 max-w-lg my-4 flex items-center gap-3 text-blue-400">
        <Loader2 className="animate-spin" size={20} /> Fetching live GitHub data...
      </div>
    );
  }

  if (!data || data.message === "Not Found") {
    return (
      <div className="p-5 bg-red-900/20 text-red-400 border border-red-500/30 rounded-xl max-w-lg my-4">
        Failed to fetch GitHub data.
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-5 bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl max-w-lg my-4 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <GithubIcon size={100} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={data.avatar_url} 
            alt="GitHub Avatar" 
            className="w-16 h-16 rounded-full border-2 border-purple-500"
          />
          <div>
            <h3 className="text-2xl font-bold text-white">{data.name || 'Ankit Singh'}</h3>
            <p className="text-gray-400 flex items-center gap-1">
              @{data.login} <a href={data.html_url} target="_blank" rel="noopener noreferrer"><ExternalLink size={14} className="hover:text-blue-400 transition-colors cursor-pointer" /></a>
            </p>
          </div>
        </div>

        <p className="text-gray-300 mb-6 line-clamp-2">
          {data.bio || "Full-Stack Developer passionate about building beautiful, highly interactive web applications."}
        </p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 p-3 rounded-lg text-center border border-white/5">
            <p className="text-2xl font-bold text-white">{data.public_repos}</p>
            <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">Repositories</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center border border-white/5">
            <p className="text-2xl font-bold text-white">{data.followers}</p>
            <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">Followers</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center border border-white/5">
            <p className="text-2xl font-bold text-white">{data.following}</p>
            <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">Following</p>
          </div>
        </div>

        {data.blog && (
          <div>
            <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider font-semibold">Website</p>
            <a href={data.blog.startsWith('http') ? data.blog : `https://${data.blog}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm">
              {data.blog}
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const ProjectsCard = () => {
  const projects = [
    {
      id: "01",
      title: "AstroVault",
      subtitle: "Enterprise AI Safety Validation",
      description: "A zero-trust, microservice-based adversarial testing infrastructure. It evaluates Large Language Models against Prompt Injections, Jailbreaks, and Data Exfiltration vectors using a highly scalable Semantic Threat Engine powered by Gemini 2.5 Flash.",
      tech: ["Docker", "Gemini 2.5 Flash", "Microservices", "Cryptographic Ledger"],
      highlights: ["Zero-Trust Networking", "ML Threat Sidecar", "Tamper-Evident Audit Ledger"],
      icon: <ShieldAlert className="w-8 h-8 text-red-400" />,
      github: "https://github.com/Ankit-singh-dot/byaro_ai",
      live: null,
    },
    {
      id: "02",
      title: "PostConnect",
      subtitle: "AI-Powered Social Scheduling",
      description: "An advanced omnichannel publishing platform built for agencies. Write a single core message and let Google Gemini and Groq tailor it for Twitter, LinkedIn, and Instagram. Features precise cron scheduling via Upstash QStash.",
      tech: ["Next.js", "tRPC", "Prisma", "Upstash QStash", "Razorpay"],
      highlights: ["Multi-Tenant RBAC", "AI Content Optimization", "Omnichannel Queues"],
      icon: <Network className="w-8 h-8 text-blue-400" />,
      github: null,
      live: "https://post-connect-v5sx.vercel.app/",
    },
    {
      id: "03",
      title: "AI Assistance",
      subtitle: "Intelligent Lead Capture CRM",
      description: "A comprehensive open-source CRM platform that automates lead capture, scores prospects via Gemini, and orchestrates multi-channel outreach through Twilio (Voice/SMS) and Nodemailer.",
      tech: ["Next.js 16", "Neon Postgres", "Clerk", "Twilio", "Three.js"],
      highlights: ["Gemini Lead Scoring", "Webhook Automations", "3D Interactive UI"],
      icon: <Cpu className="w-8 h-8 text-purple-400" />,
      github: null,
      live: "https://ai-assi-vj4j.vercel.app/",
    },
    {
      id: "04",
      title: "Email Verifier",
      subtitle: "High-Volume Verification API",
      description: "A highly robust Node.js API that saves startups thousands in bounce rates. It performs strict format validation, deep MX record resolution, direct SMTP handshake verification, and blocks disposable domains.",
      tech: ["Node.js", "SMTP Validation", "DNS Resolution", "Regex Engine"],
      highlights: ["MX Record Checks", "Direct SMTP Ping", "Disposable Email Blocking"],
      icon: <MailCheck className="w-8 h-8 text-green-400" />,
      github: "https://github.com/Ankit-singh-dot/email-verifier",
      live: null,
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-4 max-w-4xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <FolderGit2 className="text-purple-500 w-6 h-6" />
        <h2 className="text-2xl font-bold text-white tracking-tight">Featured Projects</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, idx) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-300 overflow-hidden"
          >
            {/* Background Glow Effect */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                  {project.icon}
                </div>
                <div className="flex gap-2">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-md hover:bg-white/20 transition-colors text-gray-300 hover:text-white" title="View Source">
                      <GithubIcon size={18} />
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-500/20 text-blue-400 rounded-md hover:bg-blue-500/40 transition-colors" title="Live Preview">
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              <div className="mb-1">
                <span className="text-xs font-bold text-gray-500 mb-1 block">{project.id}</span>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">{project.title}</h3>
                <p className="text-sm text-purple-400 font-medium mb-3">{project.subtitle}</p>
              </div>

              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="mb-4">
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-2">Key Highlights</p>
                <ul className="space-y-1">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="text-xs text-gray-300 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-green-400" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                {project.tech.map((t, i) => (
                  <span key={i} className="px-2 py-1 bg-black/30 border border-white/10 rounded-md text-[10px] font-medium text-gray-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export const ExperienceCard = () => {
  const experiences = [
    {
      hash: "8f4a2b1",
      role: "Software Developer Intern",
      company: "Avionyz",
      date: "Nov 2025 – Feb 2026",
      location: "Remote, India",
      bullets: [
        "Developed full-stack MERN applications with optimized database queries, indexing strategies, and schema design, achieving 50% faster query execution on datasets with Neon DB.",
        "Integrated third-party APIs (payment gateways, analytics platforms, CRM systems) and automated workflows with Node.js scripts to reduce manual processes by 40%.",
        "Built a complete Twitter-clone module with post/comment features, nested comments, and a real-time WebSocket chat application, along with a mini Pinterest clone."
      ]
    },
    {
      hash: "3c9d7e5",
      role: "Product Engineering Intern",
      company: "Peak AI",
      date: "Aug 2025 – Oct 2025",
      location: "Remote, India",
      bullets: [
        "Engineered a scalable Email Verifier API (SMTP-based) performing syntax validation, DNS/MX lookup, catch-all detection, and real-time mailbox verification.",
        "Designed RESTful APIs using Node.js and Express to improve backend performance and ensure reliable data processing.",
        "Implemented email generation and validation logic (20+ permutations) to enhance email discovery accuracy across domains.",
        "Built large-scale web scraping systems for MCA & GST portals using Puppeteer, proxy rotation, and parallel requests, processing 9GB+ datasets into structured data.",
        "Containerized backend services using Docker and deployed on AWS/Render for production-ready API systems."
      ]
    }
  ];

  const achievements = [
    "[1ST PLACE] - Hackathon Winner at Bennett University (50+ teams, 24-hour coding competition)",
    "[WINNER] - Hackathon Winner at IILM University (AI-powered solution, technical excellence)",
    "[WINNER] - Hackathon Winner at Jamia Hamdard (Full-stack application development)"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="my-6 max-w-4xl font-mono text-sm md:text-base selection:bg-gray-700"
    >
      <div className="text-gray-500 mb-6 whitespace-pre-wrap">
{`=============================================================
                  P R O O F   O F   W O R K
=============================================================`}
      </div>
      
      <div className="space-y-10">
        {experiences.map((exp, idx) => (
          <div key={idx} className="relative">
            <div className="text-yellow-500 font-bold">commit {exp.hash}</div>
            <div className="text-gray-400">Author: <span className="text-gray-300">Ankit Singh &lt;ankitsingh@dev.local&gt;</span></div>
            <div className="text-gray-400">Date:   <span className="text-gray-300">{exp.date}</span></div>
            
            <div className="mt-4 ml-4 md:ml-8">
              <div className="text-white font-bold text-lg mb-1">{exp.role} @ {exp.company}</div>
              <div className="text-gray-500 italic mb-4">[{exp.location}]</div>
              
              <div className="space-y-2">
                {exp.bullets.map((bullet, i) => (
                  <div key={i} className="text-gray-300 flex items-start gap-3 leading-relaxed">
                    <span className="text-gray-500 mt-0.5">*</span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-gray-500 mt-12 mb-6 whitespace-pre-wrap">
{`-------------------------------------------------------------
                      A C H I E V E M E N T S
-------------------------------------------------------------`}
      </div>
      
      <div className="ml-4 md:ml-8 space-y-3">
        {achievements.map((achievement, idx) => (
          <div key={idx} className="text-gray-300 flex items-start gap-3">
            <span className="text-green-500 font-bold mt-0.5">&gt;</span>
            <span className={achievement.includes('1ST PLACE') ? "text-yellow-400 font-bold" : "text-gray-200"}>
              {achievement}
            </span>
          </div>
        ))}
      </div>
      
      <div className="text-gray-500 mt-8">
        =============================================================
      </div>
    </motion.div>
  );
};
