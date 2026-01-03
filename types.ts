import React from 'react';

export interface Command {
  id: string;
  description: string;
  cmd?: string;     // The shell command (e.g., tmux new)
  shortcut?: string; // The internal keybinding (e.g., % for split)
  note?: string;    // Extra context
  tags: string[];   // For search indexing
}

export interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  items: Command[];
}