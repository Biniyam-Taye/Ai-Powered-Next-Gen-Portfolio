"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import { IconAward, IconCalendar, IconExternalLink, IconSchool, IconBook, IconClock, IconActivity, IconBolt, IconCode, IconCpu, IconCertificate } from "@tabler/icons-react";

// --- Types ---

interface Education {
    institution: string | null;
    degree: string | null;
    fieldOfStudy: string | null;
    startDate: string | null;
    endDate: string | null;
    current: boolean | null;
    gpa: string | null;
    description: string | null;
    achievements: string[] | null;
    logo: any;
    website: string | null;
}

interface EducationSectionClientProps {
    education: Education[];
}

// --- "Exploding" Layered Card Component ---

function LayeredCard({ edu, index }: { edu: Education; index: number }) {

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="group relative h-full perspective-1000">
            {/* --- 3D Colored Under-Layers (The "Stack") --- */}

            {/* Layer 3: Soft Purple Bottom */}
            <div className={cn(
                "absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] bg-gradient-to-br from-purple-500/40 to-indigo-500/40 opacity-0 group-hover:opacity-100",
                "transform transition-all duration-500 ease-out",
                "translate-x-0 translate-y-0 rotate-0",
                "group-hover:translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2 md:group-hover:translate-x-5 md:group-hover:translate-y-5",
                "shadow-2xl shadow-purple-500/10"
            )} />

            {/* Layer 2: Soft Blue Middle */}
            <div className={cn(
                "absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] bg-gradient-to-br from-blue-500/40 to-cyan-500/40 opacity-0 group-hover:opacity-100",
                "transform transition-all duration-500 ease-out",
                "translate-x-0 translate-y-0 rotate-0",
                "group-hover:translate-x-1.5 group-hover:translate-y-1.5 group-hover:-rotate-1 md:group-hover:translate-x-2.5 md:group-hover:translate-y-2.5",
                "shadow-xl shadow-blue-500/10"
            )} />

            {/* --- Main Content Card (Top Layer) --- */}
            <div className={cn(
                "relative h-full rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8",
                "bg-card/80 backdrop-blur-xl", // Lighter, glass-like background
                "border border-white/20 dark:border-white/10",
                "transform transition-all duration-500 ease-out",
                "group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:rotate-0",
                "shadow-lg hover:shadow-2xl hover:shadow-primary/5"
            )} >
                {/* Internal Glow Blob */}
                <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-primary/10 rounded-full blur-[60px] md:blur-[80px] pointer-events-none group-hover:bg-primary/20 transition-colors duration-500" />
                {/* Decorative Top Gradient Line */}
                <div className="absolute top-0 left-6 right-6 md:left-8 md:right-8 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

                {/* Header */}
                <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-5 mb-6 md:mb-8 text-center sm:text-left">
                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-background/80 border border-border/50 flex items-center justify-center p-2 md:p-3 shadow-sm shrink-0 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                        {edu.logo ? (
                            <Image
                                src={urlFor(edu.logo).width(128).height(128).url()}
                                alt={`${edu.institution} logo`}
                                width={72}
                                height={72}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <IconSchool className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground/50" />
                        )}
                    </div>

                    <div className="flex-1 min-w-0 pt-0 sm:pt-1">
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-1 md:mb-2 leading-tight group-hover:text-primary transition-colors">
                            {edu.degree}
                        </h3>
                        <p className="text-base md:text-lg font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                            {edu.institution}
                        </p>
                    </div>
                </div>

                {/* Badges */}
                <div className="relative flex flex-wrap justify-center sm:justify-start gap-2 md:gap-3 mb-6 md:mb-8">
                    <span className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs md:text-sm font-semibold tracking-wide shadow-sm">
                        <IconCalendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        {edu.startDate ? formatDate(edu.startDate) : 'N/A'} - {edu.current ? "Present" : edu.endDate ? formatDate(edu.endDate) : "N/A"}
                    </span>
                    {edu.gpa && (
                        <span className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs md:text-sm font-semibold tracking-wide shadow-sm">
                            <IconAward className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            GPA: {edu.gpa}
                        </span>
                    )}
                </div>

                {/* Content */}
                <div className="relative space-y-4 md:space-y-6">
                    {edu.description && (
                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base text-justify sm:text-left">
                            {edu.description}
                        </p>
                    )}

                    {edu.achievements && edu.achievements.length > 0 && (
                        <div className="space-y-3 md:space-y-4 pt-4 md:pt-6 border-t border-border/40">
                            <h4 className="text-xs md:text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse" />
                                Key Achievements
                            </h4>
                            <ul className="grid gap-2 md:gap-3">
                                {edu.achievements.slice(0, 3).map((ach, i) => (
                                    <li key={i} className="flex items-start gap-2.5 md:gap-3 text-xs md:text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                                        <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-primary/60 mt-1.5 md:mt-2 shrink-0" />
                                        <span>{ach}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Footer / Link */}
                    {edu.website && (
                        <div className="pt-2 md:pt-4 flex justify-center sm:justify-end">
                            <Link
                                href={edu.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 md:gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-xl bg-background border border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all group/link shadow-sm text-sm md:text-base"
                            >
                                Visit Institution
                                <IconExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// --- Main Client Component ---

export function EducationSectionClient({ education }: EducationSectionClientProps) {
    return (
        <div className="group/wrapper relative perspective-1000 py-8 md:py-12 px-4">
            {/* Massive Glow Field */}
            <div className="absolute -inset-10 rounded-[4rem] bg-gradient-to-br from-slate-200/10 via-zinc-100/10 to-transparent opacity-0 group-hover/wrapper:opacity-100 blur-[100px] transition-all duration-1000 pointer-events-none" />

            {/* Main Wrapper Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={cn(
                    "relative rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 lg:p-16",
                    // DEFAULT (Light Mode): Silver/White
                    "bg-gradient-to-br from-slate-50/98 via-white to-zinc-50/98",
                    // DARK MODE: Deep Black/Zinc
                    "dark:from-zinc-950 dark:via-black dark:to-zinc-900",
                    "backdrop-blur-3xl border-4",
                    // DEFAULT Border: Slate-200
                    "border-slate-200/80",
                    // DARK Border: Zinc-800
                    "dark:border-zinc-800/80",
                    // Shadow handling
                    "shadow-[0_40px_100px_rgba(0,0,0,0.12)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.5)]",
                    // Hover states
                    "group-hover/wrapper:border-slate-300 dark:group-hover/wrapper:border-zinc-700 group-hover/wrapper:-translate-y-3",
                    "overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                )}
            >
                {/* --- TOTAL DECORATION "STUFFES" LAYER --- */}

                {/* 1. Technical Background Elements */}
                <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1.5px, transparent 0)', backgroundSize: '40px 40px' }} />

                {/* NEW: Bold Movable Grid Pattern on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover/wrapper:opacity-[0.15] transition-opacity duration-700 pointer-events-none animate-[grid-move_3s_linear_infinite]"
                    style={{
                        backgroundImage: `linear-gradient(to right, #333 2px, transparent 2px), linear-gradient(to bottom, #333 2px, transparent 2px)`,
                        backgroundSize: '40px 40px'
                    }}
                />

                <div className="absolute top-0 left-0 w-full h-[300px] md:h-[500px] bg-gradient-to-b from-slate-200/20 to-transparent dark:from-blue-500/5" />

                {/* 2. Scanning Laser Effect */}
                <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent blur-sm animate-[scan_6s_infinite] pointer-events-none z-0" />

                {/* 5. Center Background Spinning Tech (Massive) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] dark:opacity-[0.1] pointer-events-none scale-150">
                    <div className="w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] border-[1px] border-slate-900 dark:border-white rounded-full animate-spin-slow rotate-45" />
                    <div className="absolute w-[400px] md:w-[800px] h-[400px] md:h-[800px] border border-dashed border-slate-900 dark:border-zinc-400 rounded-full animate-reverse-spin" />
                </div>

                {/* 6. Floating Tech Artifacts */}
                <motion.div animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute bottom-1/3 left-[15%] p-5 bg-white/80 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-700 rounded-[2rem] shadow-2xl opacity-0 group-hover/wrapper:opacity-100 transition-opacity hidden lg:block">
                    <IconCertificate className="w-8 h-8 text-slate-800 dark:text-zinc-100" />
                    <div className="mt-2 text-[8px] font-bold uppercase overflow-hidden whitespace-nowrap dark:text-zinc-300"><span className="inline-block animate-marquee italic">degree_verified.sig</span></div>
                </motion.div>

                <div className="absolute top-1/3 right-[15%] hidden lg:block z-0">
                    <div className="absolute w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
                </div>

                {/* 7. Top Center Status Bar */}
                <div className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 flex items-center gap-5 md:gap-10 opacity-40 hidden sm:flex">
                    <div className="flex items-center gap-2 dark:text-zinc-400"><IconCode className="w-3 h-3 md:w-4 md:h-4" /><span className="text-[8px] md:text-[10px] font-mono">01000101_01000100</span></div>
                    <div className="w-px h-4 md:h-6 bg-slate-300 dark:bg-zinc-700" />
                    <div className="flex items-center gap-2 uppercase font-black text-[8px] md:text-[10px] dark:text-zinc-300"><IconCpu className="w-3 h-3 md:w-4 md:h-4 text-blue-500 animate-pulse" /><span>Processing</span></div>
                </div>

                {/* Content: The Grid */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-14 mt-4 md:mt-0">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="h-full"
                        >
                            <LayeredCard edu={edu} index={index} />
                        </motion.div>
                    ))}
                </div>

                <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-25deg] animate-shimmer opacity-0 group-hover/wrapper:opacity-100 pointer-events-none" />
            </motion.div>

            <style jsx global>{`
                @keyframes scan {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                @keyframes marquee {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                 .animate-spin-slow {
                    animation: spin 15s linear infinite;
                 }
                .animate-reverse-spin {
                    animation: spin 20s linear infinite reverse;
                 }
                 @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                 }
                 .animate-shimmer {
                    animation: shimmer 2s infinite;
                 }
                 @keyframes shimmer {
                    100% {
                        left: 200%;
                    }
                 }
                 @keyframes grid-move {
                    0% { background-position: 0 0; }
                    100% { background-position: 40px 40px; }
                 }
            `}</style>
        </div>
    );
}
