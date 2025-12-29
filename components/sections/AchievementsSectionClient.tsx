"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { IconExternalLink, IconStar, IconTrophy } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

// --- Types ---
interface Achievement {
    title: string | null;
    type: string | null;
    issuer: string | null;
    date: string | null;
    description: string | null;
    image: any;
    url: string | null;
    featured: boolean | null;
}

interface AchievementsSectionClientProps {
    achievements: Achievement[];
}

// --- Utils ---
const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
    });
};

const getTypeColor = (type: string | null | undefined) => {
    if (!type) return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    const colors: Record<string, string> = {
        award: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        hackathon: "bg-purple-500/10 text-purple-500 border-purple-500/20",
        publication: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        speaking: "bg-green-500/10 text-green-500 border-green-500/20",
        "open-source": "bg-orange-500/10 text-orange-500 border-orange-500/20",
        milestone: "bg-pink-500/10 text-pink-500 border-pink-500/20",
        recognition: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
        other: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    };
    return colors[type] || colors.other;
};

const getTypeLabel = (type: string | null | undefined) => {
    if (!type) return "Achievement";
    const labels: Record<string, string> = {
        award: "API Engineering",
        hackathon: "Full-Stack Engineering",
        publication: "Dashboard Engineering",
        speaking: "Payment Engineering",
        "open-source": "AI Integration",
        milestone: "Developer Mindset",
        recognition: "Frontend Expertise",
        other: "Other",
    };
    return labels[type] || "Achievement";
};

// --- 3D Tilt Card Component (Inner Cards) ---
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.02, z: 20 }}
            className={cn("relative group transition-all duration-200 perspective-1000", className)}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 blur-xl" />
            <div className="relative z-10 h-full w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 group-hover:border-primary/50 rounded-xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all">
                {children}
            </div>
        </motion.div>
    );
}


export function AchievementsSectionClient({ achievements }: AchievementsSectionClientProps) {
    // Separate featured and regular achievements
    const featured = achievements.filter((a) => a.featured);
    const regular = achievements.filter((a) => !a.featured);

    return (
        <section className="py-24">
            {/* Massive Main Wrapper Card - HIGH CONTRAST & UNIQUE HOVER */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover="hover"
                className="relative max-w-7xl mx-auto rounded-[3.5rem] overflow-hidden group/main-card bg-slate-100 dark:bg-zinc-900 border-[6px] border-white dark:border-zinc-800 shadow-2xl transition-all duration-500"
            >
                {/* --- UNIQUE HOVER EFFECT: "Holographic Dome" --- */}

                {/* 1. Shifting Background Gradient (Aurora Effect) */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-zinc-900 dark:via-black dark:to-zinc-900 opacity-100 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-tl from-yellow-500/10 via-transparent to-blue-500/10 opacity-0 group-hover/main-card:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* 2. Moving Grid Floor */}
                <div className="absolute inset-0 opacity-[0.05] group-hover/main-card:opacity-[0.1] transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />

                {/* 3. Border Glow on Hover */}
                <div className="absolute inset-0 border-[6px] border-transparent group-hover/main-card:border-yellow-500/20 rounded-[3.5rem] transition-colors duration-500 pointer-events-none z-50" />

                {/* 4. Scanner Line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent -translate-y-full group-hover/main-card:animate-[scan_3s_linear_infinite] opacity-0 group-hover/main-card:opacity-100 z-10" />


                <div className="relative z-20 p-8 md:p-12 lg:p-16 space-y-16">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white dark:bg-zinc-800 shadow-lg mb-6 border border-slate-200 dark:border-zinc-700 mx-auto"
                        >
                            <IconTrophy size={18} className="text-yellow-600 dark:text-yellow-400" />
                            <span className="text-sm font-black uppercase tracking-widest bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Engineering Excellence</span>
                        </motion.div>
                        <h2 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
                            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600 relative">
                                Achievements
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-500/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                                </svg>
                            </span>
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto font-medium">
                            Real-world solutions across frontend, backend, and AI-powered systems demonstrating technical depth and product mindset.
                        </p>
                    </div>


                    {/* Featured Section */}
                    {featured.length > 0 && (
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 mb-8 border-b-2 border-slate-200/50 dark:border-zinc-800 pb-4">
                                <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-slate-100 dark:border-zinc-700">
                                    <IconStar className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-800 dark:text-zinc-100 tracking-tight">Technical Depth</h3>
                            </div>

                            <div className="relative group/depth-card rounded-[2.5rem] transition-all duration-700 hover:shadow-[0_0_80px_-20px_rgba(59,130,246,0.2)]">
                                {/* --- Animated Gradient Border --- */}
                                <div className="absolute -inset-[3px] bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-[2.6rem] opacity-0 group-hover/depth-card:opacity-100 blur-lg transition-all duration-700" />
                                <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-[2.5rem] opacity-30 group-hover/depth-card:opacity-100 transition-all duration-500" />

                                {/* --- Main Container Background --- */}
                                <div className="relative rounded-[2.5rem] bg-slate-50/80 dark:bg-black/60 backdrop-blur-2xl p-6 md:p-8 overflow-hidden border border-white/40 dark:border-white/10 h-full">

                                    {/* --- Interior Ambient Effects --- */}
                                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none group-hover/depth-card:bg-blue-500/20 transition-colors duration-700" />
                                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none group-hover/depth-card:bg-purple-500/20 transition-colors duration-700" />

                                    {/* --- High-Tech Grid Overlay --- */}
                                    <div className="absolute inset-0 opacity-[0.03] group-hover/depth-card:opacity-[0.08] transition-opacity duration-700 pointer-events-none"
                                        style={{ backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                                    />

                                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {featured.map((achievement, idx) => (
                                            <TiltCard key={`${achievement.title}-${idx}`} className="h-full">
                                                <div className="p-8 h-full flex flex-col bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-xl hover:bg-white/80 dark:hover:bg-zinc-900/80 transition-colors">
                                                    {/* Header Badge */}
                                                    <div className="flex flex-wrap items-center gap-2 mb-6">
                                                        {achievement.type && (
                                                            <span className={cn("px-3 py-1 text-xs rounded-full font-bold uppercase tracking-wider border shadow-sm", getTypeColor(achievement.type))}>
                                                                {getTypeLabel(achievement.type)}
                                                            </span>
                                                        )}
                                                        {achievement.date && (
                                                            <span className="text-xs font-bold text-slate-400 ml-auto bg-white/50 dark:bg-black/50 px-2 py-1 rounded-md backdrop-blur-md">
                                                                {formatDate(achievement.date)}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Title & Issuer */}
                                                    <h4 className="text-2xl font-black mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                                                        {achievement.title}
                                                    </h4>

                                                    <div className="flex gap-2 mb-4 text-sm font-bold text-slate-500 dark:text-zinc-400">
                                                        <span>{achievement.issuer}</span>
                                                    </div>

                                                    {/* Description */}
                                                    {achievement.description && (
                                                        <p className="text-base text-slate-600 dark:text-zinc-400 mb-6 line-clamp-3 leading-relaxed font-medium">
                                                            {achievement.description}
                                                        </p>
                                                    )}

                                                    {/* Footer Link */}
                                                    {achievement.url && (
                                                        <div className="mt-auto pt-6 border-t border-slate-200/50 dark:border-white/10">
                                                            <Link
                                                                href={achievement.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors group/link bg-white/50 dark:bg-white/5 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 w-fit"
                                                            >
                                                                Explore Case Study
                                                                <IconExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                                                            </Link>
                                                        </div>
                                                    )}
                                                </div>
                                            </TiltCard>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Regular Achievements */}
                    {regular.length > 0 && (
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 mb-8 border-b-2 border-slate-200/50 dark:border-zinc-800 pb-4">
                                <h3 className="text-xl font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest pl-2">Core Principles</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {regular.map((achievement, idx) => (
                                    <TiltCard key={`${achievement.title}-${idx}`} className="h-full">
                                        <div className="p-6 h-full flex flex-col">
                                            <div className="flex items-center gap-2 mb-4">
                                                {achievement.type && (
                                                    <span className={cn("px-2 py-0.5 text-[10px] rounded-full font-bold border uppercase tracking-wider shadow-sm", getTypeColor(achievement.type))}>
                                                        {getTypeLabel(achievement.type)}
                                                    </span>
                                                )}
                                            </div>

                                            <h4 className="text-lg font-bold mb-2 text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                                                {achievement.title}
                                            </h4>

                                            <p className="text-xs font-bold text-slate-400 mb-4 bg-slate-50 dark:bg-zinc-900 w-fit px-2 py-1 rounded">{achievement.issuer}</p>

                                            {achievement.description && (
                                                <p className="text-sm text-slate-600 dark:text-zinc-400/80 line-clamp-3 mb-4 leading-relaxed font-medium">
                                                    {achievement.description}
                                                </p>
                                            )}

                                            {achievement.url && (
                                                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-zinc-800/50">
                                                    <Link
                                                        href={achievement.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-zinc-400 hover:text-amber-600 transition-colors"
                                                    >
                                                        Quick View
                                                        <IconExternalLink className="w-3 h-3" />
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </TiltCard>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </section>
    );
}
