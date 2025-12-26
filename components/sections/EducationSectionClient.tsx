"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import { IconAward, IconCalendar, IconExternalLink, IconSchool } from "@tabler/icons-react";

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
                "absolute inset-0 rounded-[2rem] bg-gradient-to-br from-purple-500/40 to-indigo-500/40 opacity-0 group-hover:opacity-100",
                "transform transition-all duration-500 ease-out",
                "translate-x-0 translate-y-0 rotate-0",
                "group-hover:translate-x-5 group-hover:translate-y-5 group-hover:-rotate-2",
                "shadow-2xl shadow-purple-500/10"
            )} />

            {/* Layer 2: Soft Blue Middle */}
            <div className={cn(
                "absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-500/40 to-cyan-500/40 opacity-0 group-hover:opacity-100",
                "transform transition-all duration-500 ease-out",
                "translate-x-0 translate-y-0 rotate-0",
                "group-hover:translate-x-2.5 group-hover:translate-y-2.5 group-hover:-rotate-1",
                "shadow-xl shadow-blue-500/10"
            )} />

            {/* --- Main Content Card (Top Layer) --- */}
            <div className={cn(
                "relative h-full rounded-[2rem] p-8",
                "bg-card/80 backdrop-blur-xl", // Lighter, glass-like background
                "border border-white/20 dark:border-white/10",
                "transform transition-all duration-500 ease-out",
                "group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:rotate-0",
                "shadow-lg hover:shadow-2xl hover:shadow-primary/5"
            )} >
                {/* Internal Glow Blob */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/20 transition-colors duration-500" />
                {/* Decorative Top Gradient Line */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

                {/* Header */}
                <div className="relative flex items-start gap-5 mb-8">
                    <div className="relative w-18 h-18 rounded-2xl bg-background/80 border border-border/50 flex items-center justify-center p-3 shadow-sm shrink-0 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                        {edu.logo ? (
                            <Image
                                src={urlFor(edu.logo).width(128).height(128).url()}
                                alt={`${edu.institution} logo`}
                                width={72}
                                height={72}
                                className="object-cover"
                            />
                        ) : (
                            <IconSchool className="w-10 h-10 text-muted-foreground/50" />
                        )}
                    </div>

                    <div className="flex-1 min-w-0 pt-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 leading-tight group-hover:text-primary transition-colors">
                            {edu.degree}
                        </h3>
                        <p className="text-lg font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                            {edu.institution}
                        </p>
                    </div>
                </div>

                {/* Badges */}
                <div className="relative flex flex-wrap gap-3 mb-8">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-semibold tracking-wide shadow-sm">
                        <IconCalendar className="w-4 h-4" />
                        {edu.startDate ? formatDate(edu.startDate) : 'N/A'} - {edu.current ? "Present" : edu.endDate ? formatDate(edu.endDate) : "N/A"}
                    </span>
                    {edu.gpa && (
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold tracking-wide shadow-sm">
                            <IconAward className="w-4 h-4" />
                            GPA: {edu.gpa}
                        </span>
                    )}
                </div>

                {/* Content */}
                <div className="relative space-y-6">
                    {edu.description && (
                        <p className="text-muted-foreground leading-relaxed text-base">
                            {edu.description}
                        </p>
                    )}

                    {edu.achievements && edu.achievements.length > 0 && (
                        <div className="space-y-4 pt-6 border-t border-border/40">
                            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                Key Achievements
                            </h4>
                            <ul className="grid gap-3">
                                {edu.achievements.slice(0, 3).map((ach, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
                                        <span>{ach}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Footer / Link */}
                    {edu.website && (
                        <div className="pt-4 flex justify-end">
                            <Link
                                href={edu.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-background border border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all group/link shadow-sm"
                            >
                                Visit Institution
                                <IconExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 md:gap-14 px-4">
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
    );
}
