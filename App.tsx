import React, { useState, useEffect, useRef } from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import { TMUX_DATA } from './constants';
import { Command } from './types';
import { Sidebar } from './components/Sidebar';
import { SearchBar } from './components/SearchBar';
import { CommandCard } from './components/CommandCard';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(TMUX_DATA[0].id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [highlightedCmd, setHighlightedCmd] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Ref for the scrolling container
  const mainScrollRef = useRef<HTMLElement>(null);
  
  // Flatten commands for search
  const allCommands = React.useMemo(() => {
    return TMUX_DATA.flatMap(cat => cat.items);
  }, []);

  // Initialize Theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Scroll handling for category selection (Fixed to scroll the main container)
  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(`section-${id}`);
    const container = mainScrollRef.current;

    if (element && container) {
      const headerOffset = 100; // Account for sticky header
      // Calculate relative position to the container
      const elementTop = element.getBoundingClientRect().top;
      const containerTop = container.getBoundingClientRect().top;
      const offsetPosition = container.scrollTop + elementTop - containerTop - headerOffset;
  
      container.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Scroll handling for command selection from search
  const handleCommandSelect = (cmdId: string) => {
    // Find category of command
    const category = TMUX_DATA.find(cat => cat.items.some(item => item.id === cmdId));
    if (category) {
      setActiveCategory(category.id);
    }

    setHighlightedCmd(cmdId);
    
    // Slight delay to allow render/expand if needed, then scroll
    setTimeout(() => {
        const element = document.getElementById(`cmd-${cmdId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 100);

    // Remove highlight after animation
    setTimeout(() => setHighlightedCmd(null), 3000);
  };

  // Intersection Observer to update active category on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
             setActiveCategory(entry.target.id.replace('section-', ''));
          }
        });
      },
      { 
        root: mainScrollRef.current, // Observe within the scrollable container
        rootMargin: '-20% 0px -60% 0px' 
      } 
    );

    TMUX_DATA.forEach((cat) => {
      const el = document.getElementById(`section-${cat.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [TMUX_DATA]); // Add dependency to ensure elements exist

  return (
    <div className={`flex min-h-screen font-sans selection:bg-emerald-500/30 selection:text-emerald-900 dark:selection:text-emerald-200 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300`}>
      
      {/* Sidebar Navigation */}
      <Sidebar 
        categories={TMUX_DATA}
        activeCategory={activeCategory}
        onSelectCategory={scrollToCategory}
        isOpen={mobileMenuOpen}
        setIsOpen={setMobileMenuOpen}
      />

      {/* Main Content Area */}
      <main 
        ref={mainScrollRef}
        className="flex-1 w-full min-w-0 flex flex-col h-screen overflow-y-auto scroll-smooth"
      >
        
        {/* Sticky Header */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
            <div className="max-w-5xl mx-auto px-4 py-4 md:px-8">
                <div className="flex items-center gap-4">
                    {/* Hamburger (Mobile) */}
                    <button 
                        onClick={() => setMobileMenuOpen(true)}
                        className="lg:hidden p-2 -ml-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <Menu size={24} />
                    </button>

                    {/* Search Bar */}
                    <div className="flex-1">
                        <SearchBar allCommands={allCommands} onSelect={handleCommandSelect} />
                    </div>

                    {/* Theme Toggle */}
                    <button
                      onClick={toggleTheme}
                      className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                      aria-label="Toggle Theme"
                    >
                      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </div>
        </header>

        {/* Content Container */}
        <div className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-8 py-8 md:py-12 space-y-16">
            
            {/* Intro Hero (Small) */}
            <div className="space-y-2 mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                    快速入门
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
                    Tmux 快速参考指南。请记住，默认的前缀键是 <code className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-emerald-600 dark:text-emerald-400 font-mono text-sm border border-slate-300 dark:border-slate-700">Ctrl + b</code>。
                </p>
            </div>

            {/* Render Categories */}
            {TMUX_DATA.map((category) => (
                <section 
                    key={category.id} 
                    id={`section-${category.id}`} 
                    className="scroll-mt-28"
                >
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
                        <div className="p-2 bg-white dark:bg-slate-900 rounded-lg text-emerald-600 dark:text-emerald-500 border border-slate-200 dark:border-slate-800 shadow-sm">
                            {category.icon}
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                {category.title}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-500">
                                {category.description}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {category.items.map((cmd) => (
                            <CommandCard 
                                key={cmd.id} 
                                command={cmd} 
                                highlight={highlightedCmd === cmd.id}
                            />
                        ))}
                    </div>
                </section>
            ))}

            <div className="h-32" /> {/* Bottom Spacer */}
        </div>
      </main>
    </div>
  );
};

export default App;