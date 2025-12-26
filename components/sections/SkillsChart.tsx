"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Cloud,
  Palette,
  Brain,
  Terminal,
  Wrench,
  Users,
  Layout,
  Smartphone,
  Globe,
  Cpu,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Skill {
  name: string | null;
  category: string | null;
  proficiency: string | null;
  percentage: number | null;
  yearsOfExperience: number | null;
  color: string | null;
}

interface SkillsChartProps {
  skills: Skill[];
}

export function SkillsChart({ skills }: SkillsChartProps) {
  if (!skills || skills.length === 0) {
    return null;
  }

  // 1. Group skills by category
  const groupedSkills = new Map<string, Skill[]>();
  skills.forEach((skill) => {
    const category = skill.category || "other";
    const existing = groupedSkills.get(category) || [];
    groupedSkills.set(category, [...existing, skill]);
  });

  // 2. Icon Mapping Helper
  const getCategoryIcon = (category: string) => {
    const lowerCat = category.toLowerCase();
    if (lowerCat.includes("front")) return Layout;
    if (lowerCat.includes("back")) return Server;
    if (lowerCat.includes("data") || lowerCat.includes("sql")) return Database;
    if (lowerCat.includes("cloud") || lowerCat.includes("devops")) return Cloud;
    if (lowerCat.includes("ai") || lowerCat.includes("ml") || lowerCat.includes("intelligence")) return Brain;
    if (lowerCat.includes("design") || lowerCat.includes("ui")) return Palette;
    if (lowerCat.includes("mobile") || lowerCat.includes("app")) return Smartphone;
    if (lowerCat.includes("soft") || lowerCat.includes("management")) return Users;
    if (lowerCat.includes("tool")) return Wrench;
    return Terminal;
  };

  // 3. Styling Theme Helper
  const getCategoryTheme = (category: string) => {
    const lowerCat = category.toLowerCase();

    if (lowerCat.includes("front")) {
      return {
        bg: "bg-blue-50/50 dark:bg-blue-900/10",
        border: "border-blue-200 dark:border-blue-800",
        hover: "hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-blue-500/10",
        iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        title: "text-blue-900 dark:text-blue-100",
        pill: "hover:bg-blue-100 dark:hover:bg-blue-900/40"
      };
    }
    if (lowerCat.includes("back") || lowerCat.includes("data")) {
      return {
        bg: "bg-emerald-50/50 dark:bg-emerald-900/10",
        border: "border-emerald-200 dark:border-emerald-800",
        hover: "hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-emerald-500/10",
        iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        title: "text-emerald-900 dark:text-emerald-100",
        pill: "hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
      };
    }
    if (lowerCat.includes("ai") || lowerCat.includes("intelligence")) {
      return {
        bg: "bg-purple-50/50 dark:bg-purple-900/10",
        border: "border-purple-200 dark:border-purple-800",
        hover: "hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-purple-500/10",
        iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
        title: "text-purple-900 dark:text-purple-100",
        pill: "hover:bg-purple-100 dark:hover:bg-purple-900/40"
      };
    }
    if (lowerCat.includes("cloud") || lowerCat.includes("devops")) {
      return {
        bg: "bg-orange-50/50 dark:bg-orange-900/10",
        border: "border-orange-200 dark:border-orange-800",
        hover: "hover:border-orange-400 dark:hover:border-orange-500 hover:shadow-orange-500/10",
        iconBg: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
        title: "text-orange-900 dark:text-orange-100",
        pill: "hover:bg-orange-100 dark:hover:bg-orange-900/40"
      };
    }
    if (lowerCat.includes("design") || lowerCat.includes("ui")) {
      return {
        bg: "bg-pink-50/50 dark:bg-pink-900/10",
        border: "border-pink-200 dark:border-pink-800",
        hover: "hover:border-pink-400 dark:hover:border-pink-500 hover:shadow-pink-500/10",
        iconBg: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
        title: "text-pink-900 dark:text-pink-100",
        pill: "hover:bg-pink-100 dark:hover:bg-pink-900/40"
      };
    }
    // Default / Tools / Soft Skills
    return {
      bg: "bg-slate-50/50 dark:bg-slate-900/10",
      border: "border-slate-200 dark:border-slate-800",
      hover: "hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-slate-500/10",
      iconBg: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
      title: "text-slate-900 dark:text-slate-100",
      pill: "hover:bg-slate-100 dark:hover:bg-slate-900/40"
    };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {Array.from(groupedSkills.entries()).map(([category, categorySkills]) => {
        const Icon = getCategoryIcon(category);
        const theme = getCategoryTheme(category);

        const displayLabel = category
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        return (
          <motion.div
            key={category}
            variants={itemVariants}
            className={cn(
              "group relative overflow-hidden rounded-[2rem] p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 background-blur-md",
              theme.bg,
              theme.border,
              "border shadow-sm",
              theme.hover
            )}
          >
            {/* Ambient Background Glow Effect */}
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-white/40 to-white/0 dark:from-white/10 dark:to-transparent blur-2xl transition-all group-hover:scale-150 duration-700" />

            {/* Header Section */}
            <div className="flex items-center gap-5 mb-8 relative z-10">
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm",
                theme.iconBg
              )}>
                <Icon size={28} />
              </div>
              <div className="flex flex-col">
                <h3 className={cn("text-xl font-bold tracking-tight", theme.title)}>
                  {displayLabel}
                </h3>
                <span className="text-xs font-semibold text-muted-foreground uppercase opacity-70 tracking-widest">
                  {categorySkills.length} Skills
                </span>
              </div>
            </div>

            {/* Skills Pills Grid */}
            <div className="flex flex-wrap gap-3 relative z-10">
              {categorySkills.map((skill, idx) => (
                <div
                  key={`${skill.name}-${idx}`}
                  className="relative group/skill"
                >
                  <div className={cn(
                    "px-4 py-2 rounded-xl border border-transparent bg-background/60 shadow-sm backdrop-blur-sm text-sm font-semibold text-muted-foreground transition-all duration-300 cursor-default flex items-center gap-2.5",
                    "group-hover/skill:border-border/50 group-hover/skill:text-foreground group-hover/skill:scale-105 group-hover/skill:shadow-md",
                    theme.pill
                  )}>
                    {/* Color Dot */}
                    <span
                      className="w-2.5 h-2.5 rounded-full ring-2 ring-background/50"
                      style={{ backgroundColor: skill.color || "currentColor" }}
                    />
                    {skill.name}
                  </div>

                  {/* Enhanced Tooltip */}
                  <div className="absolute bottom-[calc(100%+0.75rem)] left-1/2 -translate-x-1/2 min-w-[180px] p-4 bg-popover/95 backdrop-blur-xl border border-border/60 rounded-2xl shadow-2xl opacity-0 invisible group-hover/skill:opacity-100 group-hover/skill:visible transition-all duration-300 z-30 pointer-events-none translate-y-2 group-hover/skill:translate-y-0">

                    {/* Tooltip Arrow */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-popover/95 border-b border-r border-border/60 rotate-45" />

                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2">
                        <Sparkles size={12} className="text-primary" />
                        <span className="text-sm font-bold">{skill.name}</span>
                      </div>
                      <span className="text-lg font-black text-primary">{skill.percentage}%</span>
                    </div>

                    {/* Rich Progress Bar */}
                    <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden mb-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                      />
                    </div>

                    {skill.yearsOfExperience && (
                      <div className="flex justify-between text-[11px] font-medium text-muted-foreground/80">
                        <span>Experience</span>
                        <span>{skill.yearsOfExperience} Year{skill.yearsOfExperience !== 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
