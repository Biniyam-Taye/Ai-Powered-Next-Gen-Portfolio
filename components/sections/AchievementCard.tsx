"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { IconExternalLink } from "@tabler/icons-react";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

interface Achievement {
    title?: string | null;
    type?: string | null;
    issuer?: string | null;
    date?: string | null;
    description?: string | null;
    image?: any;
    url?: string | null;
    featured?: boolean | null;
}

interface AchievementCardProps {
    achievement: Achievement;
    isFeatured?: boolean;
}

export function AchievementCard({ achievement, isFeatured = false }: AchievementCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const [isHovered, setIsHovered] = useState(false);

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left - width / 2);
        y.set(clientY - top - height / 2);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    }

    const rotateX = useTransform(mouseY, [-300, 300], [8, -8]);
    const rotateY = useTransform(mouseX, [-300, 300], [-8, 8]);

    // Add a light glare effect
    const glareX = useTransform(mouseX, [-300, 300], [0, 100]);
    const glareY = useTransform(mouseY, [-300, 300], [0, 100]);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    const getTypeColor = (type: string | null | undefined) => {
        if (!type) return "bg-gray-500/10 text-gray-500 border-gray-500/20";
        const colors: Record<string, string> = {
            award: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
            hackathon: "bg-purple-500/10 text-purple-600 border-purple-500/20",
            publication: "bg-blue-500/10 text-blue-600 border-blue-500/20",
            speaking: "bg-green-500/10 text-green-600 border-green-500/20",
            "open-source": "bg-orange-500/10 text-orange-600 border-orange-500/20",
            milestone: "bg-pink-500/10 text-pink-600 border-pink-500/20",
            recognition: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
            other: "bg-gray-500/10 text-gray-600 border-gray-500/20",
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

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            style={{
                perspective: 1000,
            }}
            className="w-full h-full"
        >
            <motion.div
                style={{
                    rotateX: isHovered ? rotateX : 0,
                    rotateY: isHovered ? rotateY : 0,
                    transformStyle: "preserve-3d",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                    "relative w-full h-full rounded-2xl border bg-card p-6 transition-all duration-300 ease-out",
                    "shadow-lg",
                    isFeatured
                        ? "hover:shadow-[15px_-15px_30px_rgba(0,0,0,0.7)] dark:hover:shadow-[15px_-15px_30px_rgba(0,0,0,0.9)]"
                        : "hover:shadow-[15px_-15px_30px_rgba(234,179,8,0.5)] dark:hover:shadow-[15px_-15px_30px_rgba(234,179,8,0.4)]",
                    isFeatured ? "border-primary/20" : "border-border/50",
                    "group"
                )}
            >
                {/* 3D Lift Content Wrapper */}
                <div style={{ transform: "translateZ(30px)" }} className="relative z-10 flex flex-col h-full">

                    {/* Image Section */}
                    {achievement.image && (
                        <div className={cn(
                            "relative w-full rounded-xl overflow-hidden mb-5 shadow-sm group-hover:shadow-md transition-all",
                            isFeatured ? "h-48" : "h-32"
                        )}>
                            <Image
                                src={urlFor(achievement.image).width(400).height(200).url()}
                                alt={achievement.title || "Achievement"}
                                fill
                                className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    )}

                    {/* Metadata Tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        {achievement.type && (
                            <span className={cn(
                                "px-3 py-1 text-xs rounded-full font-semibold border shadow-sm backdrop-blur-sm transition-colors",
                                getTypeColor(achievement.type)
                            )}>
                                {getTypeLabel(achievement.type)}
                            </span>
                        )}
                        {achievement.date && (
                            <span className="text-xs font-medium text-muted-foreground ml-auto bg-muted/50 px-2 py-1 rounded-md">
                                {formatDate(achievement.date)}
                            </span>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <h4 className={cn(
                            "font-bold text-foreground mb-2 group-hover:text-primary transition-colors",
                            isFeatured ? "text-xl" : "text-lg"
                        )}>
                            {achievement.title}
                        </h4>

                        {achievement.issuer && (
                            <p className="text-sm font-medium text-primary/80 mb-2 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                                {achievement.issuer}
                            </p>
                        )}

                        {achievement.description && (
                            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                                {achievement.description}
                            </p>
                        )}
                    </div>

                    {/* Footer / Link */}
                    {achievement.url && (
                        <motion.div
                            className="mt-5 pt-4 border-t border-border/50"
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1, x: 2 }}
                        >
                            <Link
                                href={achievement.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                            >
                                Learn More
                                <IconExternalLink size={16} />
                            </Link>
                        </motion.div>
                    )}
                </div>

                {/* Background Decoration/Glow */}
                <div
                    className={cn(
                        "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                        // Add a gradient based on type or just primary? Let's use a subtle gradient.
                        "bg-gradient-to-br from-white/5 via-transparent to-transparent dark:from-white/5"
                    )}
                    style={{ transform: "translateZ(0px)" }}
                />
            </motion.div>
        </motion.div>
    );
}
