"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { IconExternalLink, IconStar } from "@tabler/icons-react";
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

// --- 3D Tilt Card Component ---
// Wraps children in a card that tilts in 3D based on mouse position
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
            whileHover={{ scale: 1.02 }}
            className={cn("relative group transition-all duration-200 perspective-1000", className)}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 blur-xl" />
            <div className="relative z-10 h-full w-full bg-card/80 dark:bg-zinc-900/80 backdrop-blur-md border border-white/10 group-hover:border-primary/30 rounded-xl overflow-hidden shadow-lg group-hover:shadow-primary/10 transition-colors">
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
        <div className="space-y-16">
            {/* Featured Section */}
            {featured.length > 0 && (
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <div className="p-1.5 bg-yellow-500/20 rounded-lg">
                            <IconStar className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        </div>
                        Technical depth
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {featured.map((achievement, idx) => (
                            <TiltCard key={`${achievement.title}-${idx}`} className="h-full">
                                <div className="p-6 h-full flex flex-col">
                                    {achievement.image && (
                                        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                                            <Image
                                                src={urlFor(achievement.image).width(400).height(200).url()}
                                                alt={achievement.title || "Achievement"}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                        </div>
                                    )}

                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        {achievement.type && (
                                            <span className={cn("px-2.5 py-0.5 text-xs rounded-full font-medium border", getTypeColor(achievement.type))}>
                                                {getTypeLabel(achievement.type)}
                                            </span>
                                        )}
                                        {achievement.date && (
                                            <span className="text-xs text-muted-foreground ml-auto">
                                                {formatDate(achievement.date)}
                                            </span>
                                        )}
                                    </div>

                                    <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                        {achievement.title}
                                    </h4>

                                    {achievement.issuer && (
                                        <p className="text-sm font-semibold text-primary/80 mb-2">
                                            {achievement.issuer}
                                        </p>
                                    )}

                                    {achievement.description && (
                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                            {achievement.description}
                                        </p>
                                    )}

                                    {achievement.url && (
                                        <div className="mt-auto pt-4 border-t border-border/50">
                                            <Link
                                                href={achievement.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                                            >
                                                Learn More
                                                <IconExternalLink className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                </div>
            )}

            {/* Regular Achievements */}
            {regular.length > 0 && (
                <div className="space-y-6">
                    {featured.length > 0 && (
                        <h3 className="text-xl font-bold text-muted-foreground/80">Core Principles</h3>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {regular.map((achievement, idx) => (
                            <TiltCard key={`${achievement.title}-${idx}`} className="h-full">
                                <div className="p-5 h-full flex flex-col">
                                    {achievement.image && (
                                        <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden">
                                            <Image
                                                src={urlFor(achievement.image).width(300).height(150).url()}
                                                alt={achievement.title || "Achievement"}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 mb-3">
                                        {achievement.type && (
                                            <span className={cn("px-2 py-0.5 text-[10px] rounded-full font-medium border uppercase tracking-wider", getTypeColor(achievement.type))}>
                                                {getTypeLabel(achievement.type)}
                                            </span>
                                        )}
                                    </div>

                                    <h4 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors line-clamp-2">
                                        {achievement.title}
                                    </h4>

                                    <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                                        <span>{achievement.issuer}</span>
                                        <span>•</span>
                                        <span>{achievement.date && formatDate(achievement.date)}</span>
                                    </div>

                                    {achievement.description && (
                                        <p className="text-xs text-muted-foreground/80 line-clamp-3 mb-4">
                                            {achievement.description}
                                        </p>
                                    )}

                                    {achievement.url && (
                                        <div className="mt-auto pt-3 border-t border-border/50">
                                            <Link
                                                href={achievement.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-primary transition-colors"
                                            >
                                                Details
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
    );
}
