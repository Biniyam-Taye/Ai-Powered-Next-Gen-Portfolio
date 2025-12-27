"use client";

import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Mail, MapPin, Code2, Rocket, Brain, Award, Star, Zap } from "lucide-react";

interface Stat {
    label: string;
    value: string;
}

interface Profile {
    fullBio: any;
    stats?: Stat[] | null;
    email?: string;
    location?: string;
    firstName?: string;
    lastName?: string;
}

interface AboutSectionClientProps {
    profile: Profile;
}

export function AboutSectionClient({ profile }: AboutSectionClientProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring" as const, stiffness: 100, damping: 20 },
        },
    };

    // Safe access to stats
    const stats = profile.stats || [];

    return (
        <section id="about" className="py-24 relative overflow-hidden bg-background">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px] -translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="max-w-6xl mx-auto"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 relative">
                                Me
                            </span>
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
                            Turning complex ideas into elegant, scalable digital reality.
                        </p>
                    </motion.div>

                    {/* Unified "Story Card" Layout */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-[3rem] shadow-2xl overflow-hidden ring-1 ring-white/20 dark:ring-white/5"
                    >
                        <div className="flex flex-col lg:flex-row">

                            {/* Left Side: Biography (65%) */}
                            <div className="lg:w-[65%] p-8 md:p-12 lg:p-16 relative">
                                {/* Decorative background for text area */}
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-background via-background to-secondary/20 -z-10" />

                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                        <Code2 size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground">My Story</h3>
                                </div>

                                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground/90 leading-8">
                                    {profile.fullBio && (
                                        <PortableText
                                            value={profile.fullBio}
                                            components={{
                                                block: {
                                                    normal: ({ children }) => <p className="mb-6">{children}</p>,
                                                    h2: ({ children }) => <h4 className="text-xl font-bold text-foreground mt-8 mb-4">{children}</h4>,
                                                },
                                                marks: {
                                                    strong: ({ children }) => <strong className="text-foreground font-semibold border-b-2 border-primary/20">{children}</strong>,
                                                    link: ({ children, value }) => (
                                                        <Link href={value?.href || "#"} target="_blank" className="text-primary hover:text-primary/80 font-medium transition-colors">
                                                            {children}
                                                        </Link>
                                                    ),
                                                }
                                            }}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Right Side: Stats & Details (35%) */}
                            <div className="lg:w-[35%] bg-muted/30 border-t lg:border-t-0 lg:border-l border-border/50 p-8 md:p-10 flex flex-col gap-8">

                                {/* Stats Container */}
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                                        <Star size={14} /> Highlights
                                    </h4>

                                    <div className="space-y-4">
                                        {stats.map((stat, idx) => {
                                            const colors = [
                                                "bg-blue-500/10 text-blue-600 border-blue-200/50 dark:border-blue-500/20",
                                                "bg-emerald-500/10 text-emerald-600 border-emerald-200/50 dark:border-emerald-500/20",
                                                "bg-purple-500/10 text-purple-600 border-purple-200/50 dark:border-purple-500/20",
                                                "bg-orange-500/10 text-orange-600 border-orange-200/50 dark:border-orange-500/20",
                                            ];
                                            const Icons = [Zap, Award, Rocket, Brain];
                                            const Icon = Icons[idx % Icons.length];

                                            return (
                                                <motion.div
                                                    key={idx}
                                                    whileHover={{ scale: 1.02, x: 5 }}
                                                    className={cn(
                                                        "p-4 rounded-2xl border flex items-center justify-between transition-all",
                                                        colors[idx % colors.length]
                                                    )}
                                                >
                                                    <div>
                                                        <div className="text-2xl font-black">{stat.value}</div>
                                                        <div className="text-xs font-bold uppercase opacity-70">{stat.label}</div>
                                                    </div>
                                                    <Icon size={20} className="opacity-80" />
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Contact Mini-Section */}
                                <div className="mt-auto">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Contact</h4>
                                    <div className="space-y-3">
                                        {profile.email && (
                                            <div className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border/50 shadow-sm">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                    <Mail size={16} />
                                                </div>
                                                <span className="text-sm font-medium truncate">{profile.email}</span>
                                            </div>
                                        )}
                                        {profile.location && (
                                            <div className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border/50 shadow-sm">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                    <MapPin size={16} />
                                                </div>
                                                <span className="text-sm font-medium truncate">{profile.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>

                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
