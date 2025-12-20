"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from 'react'; // <--- NEW IMPORTS

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();
  
  // 1. New State for mounting status
  const [mounted, setMounted] = useState(false);

  // 2. Set mounted to true once component is client-side mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // 3. Return a placeholder on the server and during initial hydration
  if (!mounted) {
    // Return a div that takes up the same space to prevent layout shift
    // This uses the dimensions you defined in your layout.tsx
    return <div className="w-10 h-10 md:w-12 md:h-12" />; 
  }

  // 4. Only render the full interactive component client-side
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="w-full h-full rounded-full bg-white/20 dark:bg-black/30 hover:bg-white/30 dark:hover:bg-black/40 backdrop-blur-xl border border-white/30 dark:border-white/20 hover:border-white/40 dark:hover:border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex items-center justify-center text-neutral-500 dark:text-neutral-300 hover:text-neutral-600 dark:hover:text-neutral-200 transition-all duration-300 hover:scale-110"
          aria-label="Toggle theme"
        >
          {/* Note: The 'next-themes' hooks inside the component still handle the actual theme logic */}
          <Sun className="h-5 w-5 md:h-6 md:w-6 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-5 w-5 md:h-6 md:w-6 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}