import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Command as CmdIcon } from 'lucide-react';
import { Command } from '../types';

interface SearchBarProps {
  allCommands: Command[];
  onSelect: (commandId: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ allCommands, onSelect }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [matches, setMatches] = useState<Command[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter logic
  useEffect(() => {
    if (!query.trim()) {
      setMatches([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = allCommands.filter(cmd => 
      cmd.description.toLowerCase().includes(q) ||
      cmd.cmd?.toLowerCase().includes(q) ||
      cmd.shortcut?.toLowerCase().includes(q) ||
      cmd.tags.some(tag => tag.toLowerCase().includes(q))
    ).slice(0, 8); // Limit to top 8 suggestions
    setMatches(filtered);
  }, [query, allCommands]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id: string) => {
    onSelect(id);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto z-50" ref={containerRef}>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-10 py-3 border rounded-xl leading-5 sm:text-sm transition-all shadow-sm
            bg-slate-100 dark:bg-slate-900 
            border-slate-200 dark:border-slate-700 
            text-slate-900 dark:text-slate-100 
            placeholder-slate-500 dark:placeholder-slate-500 
            focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 dark:focus:border-emerald-500
            hover:border-slate-300 dark:hover:border-slate-600"
          placeholder="搜索命令 (例如：'分屏', '重命名', 'detach')..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        {query && (
          <button
            onClick={() => {
                setQuery('');
                setMatches([]);
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-4 w-4 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && matches.length > 0 && (
        <div className="absolute mt-2 w-full rounded-xl shadow-2xl overflow-hidden ring-1 ring-black ring-opacity-5
          bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <ul className="max-h-80 overflow-auto py-1 custom-scrollbar">
            {matches.map((cmd) => (
              <li key={cmd.id}>
                <button
                  onClick={() => handleSelect(cmd.id)}
                  className="w-full text-left px-4 py-3 transition-colors flex items-center justify-between group border-b last:border-0
                    hover:bg-slate-50 dark:hover:bg-slate-700/50 
                    border-slate-100 dark:border-slate-700/30"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-white transition-colors">
                      {cmd.description}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-500 font-mono mt-0.5">
                      {cmd.shortcut ? `前缀键 + ${cmd.shortcut}` : cmd.cmd}
                    </span>
                  </div>
                  <CmdIcon className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-2" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {isOpen && query && matches.length === 0 && (
         <div className="absolute mt-2 w-full rounded-xl shadow-xl p-4 text-center
            bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400 text-sm">未找到与 "{query}" 相关的命令</p>
         </div>
      )}
    </div>
  );
};