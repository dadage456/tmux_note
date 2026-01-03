import React, { useState } from 'react';
import { Command } from '../types';
import { Terminal, Copy, Check } from 'lucide-react';

interface CommandCardProps {
  command: Command;
  highlight?: boolean;
}

export const CommandCard: React.FC<CommandCardProps> = ({ command, highlight }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (command.cmd) {
      navigator.clipboard.writeText(command.cmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div 
      id={`cmd-${command.id}`}
      className={`
        relative overflow-hidden group rounded-xl border p-4 transition-all duration-300
        ${highlight 
          ? 'bg-emerald-50/50 dark:bg-slate-800/80 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500' 
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 shadow-sm'}
      `}
    >
      <div className="flex flex-col gap-3">
        {/* Header: Description & Copy Button */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-lg leading-tight flex-1">
            {command.description}
          </h3>
          
          <div className="flex items-center gap-2 shrink-0">
            {/* Visual indicator for type */}
            {command.cmd && !command.shortcut && (
               <span className="hidden sm:inline-block text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-950 px-2 py-1 rounded border border-slate-200 dark:border-slate-800">
                 Shell
               </span>
            )}
            {command.shortcut && (
               <span className="hidden sm:inline-block text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-900/50">
                 快捷键
               </span>
            )}

            {/* Copy Button (Only if cmd exists) */}
            {command.cmd && (
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="复制命令"
              >
                {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
              </button>
            )}
          </div>
        </div>

        {/* Content: Shortcut or Command */}
        <div className="space-y-2">
          {command.shortcut && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">前缀键 +</span>
              <kbd className="px-2.5 py-1 bg-slate-100 dark:bg-slate-100 text-slate-700 dark:text-slate-900 rounded font-mono font-bold text-md shadow-sm border-b-2 border-slate-300 min-w-[2rem] text-center">
                {command.shortcut}
              </kbd>
            </div>
          )}

          {command.cmd && (
            <div className="flex items-start gap-2 bg-slate-100 dark:bg-black/40 rounded-lg p-2 font-mono text-sm text-slate-700 dark:text-emerald-400 border border-slate-200 dark:border-slate-800/50 w-full break-words group-hover:border-emerald-500/30 transition-colors">
              <Terminal size={14} className="shrink-0 mt-1 text-slate-400 dark:text-slate-600" />
              <span className="whitespace-pre-wrap">{command.cmd}</span>
            </div>
          )}
        </div>

        {/* Note */}
        {command.note && (
          <p className="text-sm text-slate-500 italic mt-1 border-t border-slate-100 dark:border-slate-800 pt-2">
            {command.note}
          </p>
        )}
      </div>
    </div>
  );
};