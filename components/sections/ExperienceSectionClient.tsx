"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import { Calendar, MapPin, Building2, Briefcase, CheckCircle2, Trophy, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Technology {
    name: string | null;
    category?: string | null;
}

interface Experience {
    company: string | null;
    position: string | null;
    employmentType?: string | null;
    location?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    current?: boolean | null;
    description?: any;
    responsibilities?: string[] | null;
    achievements?: string[] | null;
    technologies?: (Technology | null)[] | null;
    companyLogo?: any;
    companyWebsite?: string | null;
}

interface ExperienceSectionClientProps {
    experiences: Experience[];
}

export function ExperienceSectionClient({ experiences }: ExperienceSectionClientProps) {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="space-y-12 md:space-y-16 relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary/50 via-purple-500/30 to-transparent hidden md:block" />

            {experiences.map((exp, index) => (
                <motion.div
                    key={`${exp.company}-${index}`}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative pl-0 md:pl-24 group"
                >
                    {/* Timeline Dot */}
                    <div className="absolute left-[30px] top-8 w-4 h-4 rounded-full bg-background border-[3px] border-primary z-10 hidden md:block group-hover:scale-125 group-hover:border-purple-500 transition-all duration-300 shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />

                    {/* Main Card Content */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className={cn(
                            "relative overflow-hidden rounded-[2.5rem] p-6 md:p-10",
                            "bg-card/40 backdrop-blur-2xl border border-white/10 dark:border-white/5",
                            "shadow-xl hover:shadow-2xl transition-all duration-500",
                            "group/card"
                        )}
                    >
                        {/* Decorative Background Effects */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                        {/* Company Header */}
                        <div className="relative flex flex-col md:flex-row gap-6 mb-10 border-b border-border/50 pb-8">
                            <div className="relative shrink-0">
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-background/80 border border-white/10 flex items-center justify-center p-3 shadow-lg group-hover/card:scale-105 transition-transform duration-500">
                                    {exp.companyLogo ? (
                                        <Image
                                            src={urlFor(exp.companyLogo).width(128).height(128).url()}
                                            alt={exp.company || "Company Logo"}
                                            width={80}
                                            height={80}
                                            className="object-contain"
                                        />
                                    ) : (
                                        <Building2 className="w-10 h-10 md:w-12 md:h-12 text-muted-foreground/50" />
                                    )}
                                </div>
                            </div>

                            <div className="flex-1 min-w-0 pt-2">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div>
                                        <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 mb-3">
                                            {exp.position}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-4 text-base text-muted-foreground">
                                            <span className="flex items-center gap-2 text-primary font-semibold text-lg">
                                                <Building2 className="w-5 h-5" />
                                                {exp.company}
                                            </span>
                                            {exp.location && (
                                                <>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-border" />
                                                    <span className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4" />
                                                        {exp.location}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium whitespace-nowrap shadow-sm">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            {exp.startDate ? formatDate(exp.startDate) : 'N/A'} - {exp.current ? "Present" : exp.endDate ? formatDate(exp.endDate) : "N/A"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Grid */}
                        <div className="flex flex-col gap-6">

                            {/* Description Mini-Card */}
                            {exp.description && (
                                <div className="p-6 rounded-2xl bg-background/40 border border-white/5 hover:border-white/10 transition-colors">
                                    <div className="text-muted-foreground leading-relaxed text-lg">
                                        <PortableText value={exp.description} />
                                    </div>
                                </div>
                            )}

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Responsibilities Mini-Card */}
                                {exp.responsibilities && exp.responsibilities.length > 0 && (
                                    <div className="group/section relative p-6 rounded-3xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/30 transition-all duration-300">
                                        <h4 className="flex items-center gap-3 font-bold text-xl text-foreground mb-6">
                                            <span className="p-2 rounded-lg bg-blue-500/20 text-blue-500">
                                                <Briefcase className="w-5 h-5" />
                                            </span>
                                            Key Responsibilities
                                        </h4>
                                        <ul className="space-y-4">
                                            {exp.responsibilities.map((resp, i) => (
                                                <li key={i} className="flex items-start gap-3 text-muted-foreground text-base group/item">
                                                    <CheckCircle2 className="w-5 h-5 text-blue-500/60 shrink-0 mt-0.5 group-hover/item:text-blue-500 transition-colors" />
                                                    <span className="group-hover/item:text-foreground/90 transition-colors">{resp}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Achievements Mini-Card */}
                                {exp.achievements && exp.achievements.length > 0 && (
                                    <div className="group/section relative p-6 rounded-3xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/30 transition-all duration-300">
                                        <h4 className="flex items-center gap-3 font-bold text-xl text-foreground mb-6">
                                            <span className="p-2 rounded-lg bg-purple-500/20 text-purple-500">
                                                <Trophy className="w-5 h-5" />
                                            </span>
                                            Key Achievements
                                        </h4>
                                        <ul className="space-y-4">
                                            {exp.achievements.map((ach, i) => (
                                                <li key={i} className="flex items-start gap-3 text-muted-foreground text-base group/item">
                                                    <span className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-purple-500/30 transition-colors">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                                    </span>
                                                    <span className="group-hover/item:text-foreground/90 transition-colors">{ach}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Technologies Mini-Card */}
                            {exp.technologies && exp.technologies.length > 0 && (
                                <div className="p-6 rounded-2xl bg-zinc-500/10 border border-zinc-500/20 hover:border-zinc-500/30 transition-colors">
                                    <h5 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Technologies Used</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.technologies.map((tech, i) => (
                                            tech?.name && (
                                                <span
                                                    key={i}
                                                    className="px-4 py-2 rounded-xl bg-background/60 border border-white/10 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/10 transition-all duration-300 cursor-default shadow-sm"
                                                >
                                                    {tech.name}
                                                </span>
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Website Link */}
                            {exp.companyWebsite && (
                                <div className="flex justify-end">
                                    <Link
                                        href={exp.companyWebsite}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/link"
                                    >
                                        Visit Website
                                        <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
}
