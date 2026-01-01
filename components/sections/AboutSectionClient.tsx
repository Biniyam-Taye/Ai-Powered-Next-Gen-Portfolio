"use client";

import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    Code2,
    Rocket,
    Brain,
    Award,
    Star,
    Zap,
    Mail,
    MapPin,
    Terminal,
    Cpu,
    Fingerprint,
    Globe,
    Share2,
    Sparkles
} from "lucide-react";
import {
    IconUserScan,
    IconId,
    IconAnalyze,
    IconTopologyStar3,
    IconWorldWww,
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandTwitter,
    IconBrandTelegram
} from "@tabler/icons-react";

interface Stat {
    label?: string | null;
    value?: string | null;
}

interface Profile {
    fullBio: any;
    stats?: Stat[] | null;
    email?: string | null;
    location?: string | null;
    firstName?: string | null;
    lastName?: string | null;
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
        <section id="about" className="py-24 relative overflow-hidden bg-background group/section">
            {/* Massive Glow Field */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="max-w-6xl mx-auto"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <IconUserScan size={16} />
                            <span>Developer Profile</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 relative">
                                Me
                            </span>
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
                            Turning complex ideas into elegant, scalable digital reality.
                        </p>
                    </motion.div>

                    {/* Unified "Amazing" Story Card Wrappers */}
                    <motion.div
                        variants={itemVariants}
                        className={cn(
                            "relative rounded-[2rem] md:rounded-[3rem] overflow-hidden group/card",
                            // Light Mode Styles
                            "bg-gradient-to-br from-slate-50 via-white to-zinc-50 border-4 border-slate-200/80 shadow-2xl",
                            // Dark Mode Styles
                            "dark:from-zinc-950 dark:via-black dark:to-zinc-900 dark:border-zinc-800/80 dark:shadow-black/50"
                        )}
                    >
                        {/* --- DECORATIVE HUD LAYERS --- */}
                        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1.5px, transparent 0)', backgroundSize: '32px 32px' }} />

                        {/* Scanning Laser */}
                        <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-sm animate-[scan_8s_infinite] pointer-events-none z-0" />

                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-primary/20 rounded-tl-[2.5rem] m-6 pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-primary/20 rounded-br-[2.5rem] m-6 pointer-events-none" />



                        {/* Content Split */}
                        <div className="relative z-10 flex flex-col lg:flex-row gap-6 md:gap-8 p-5 md:p-12 lg:p-16">

                            {/* CARD 1: My Story Wrapper (Expands on Hover) */}
                            <motion.div
                                whileHover="hover"
                                initial="rest"
                                animate="rest"
                                className="lg:w-[65%] group/story relative rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-10 transition-all duration-500"
                            >
                                {/* Wrapper Background & Expansion Effect */}
                                <motion.div
                                    variants={{
                                        rest: { scale: 1, borderRadius: "2.5rem", borderWidth: "1px", borderColor: "rgba(226, 232, 240, 0.6)" },
                                        hover: { scale: 1.02, borderRadius: "2rem", borderWidth: "2px", borderColor: "rgba(59, 130, 246, 0.3)", boxShadow: "0 20px 50px -12px rgba(59, 130, 246, 0.25)" }
                                    }}
                                    className="absolute inset-0 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm z-0"
                                />

                                {/* Header (Inside Wrapper) */}
                                <div className="flex items-center gap-5 mb-8 relative z-10 px-2">
                                    <div className="relative w-16 h-16 shrink-0">
                                        <motion.div
                                            variants={{ hover: { rotate: 90, borderRadius: "50%" } }}
                                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                            className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg flex items-center justify-center text-white"
                                        >
                                            <Code2 size={32} strokeWidth={2.5} />
                                        </motion.div>
                                        <motion.div
                                            variants={{ rest: { scale: 0, opacity: 0 }, hover: { scale: 1, opacity: 1, rotate: -20, x: 50, y: -20 } }}
                                            className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full p-1.5 shadow-sm"
                                        >
                                            <Sparkles size={12} fill="currentColor" />
                                        </motion.div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                                            My Story
                                            <motion.span
                                                variants={{ rest: { width: 0, opacity: 0 }, hover: { width: "auto", opacity: 1 } }}
                                                className="text-xs font-bold text-blue-600 px-2 py-0.5 bg-blue-100 rounded-full overflow-hidden whitespace-nowrap"
                                            >
                                                OPEN_FILE
                                            </motion.span>
                                        </h3>
                                        <div className="relative h-1.5 w-16 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                                            <motion.div
                                                variants={{ rest: { x: "-100%" }, hover: { x: "0%" } }}
                                                transition={{ duration: 0.4 }}
                                                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* CARD 2: Content Inner Card (Grid Lines, No Expansion) */}
                                <div className="relative bg-white dark:bg-zinc-950 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 border-2 border-slate-100 dark:border-zinc-800 group-hover/story:border-blue-400/30 overflow-hidden transition-colors duration-500 shadow-sm z-10">

                                    {/* Tech Grid Pattern (Fades in BOLD on Wrapper Hover) */}
                                    <div className="absolute inset-0 opacity-0 group-hover/story:opacity-[0.15] transition-opacity duration-500 pointer-events-none"
                                        style={{ backgroundImage: 'linear-gradient(#3b82f6 2px, transparent 2px), linear-gradient(90deg, #3b82f6 2px, transparent 2px)', backgroundSize: '40px 40px' }} />

                                    <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-zinc-400 leading-relaxed relative z-10">
                                        {profile.fullBio && (
                                            <PortableText
                                                value={profile.fullBio}
                                                components={{
                                                    block: {
                                                        normal: ({ children }) => <p className="mb-6 text-base md:text-[1.05rem]">{children}</p>,
                                                        h2: ({ children }) => <h4 className="inline-block px-3 py-1 bg-slate-100 dark:bg-zinc-900 rounded-lg text-sm font-bold text-slate-900 dark:text-slate-200 mt-6 mb-4 uppercase tracking-widest">{children}</h4>,
                                                    },
                                                    marks: {
                                                        strong: ({ children }) => (
                                                            <motion.span
                                                                variants={{ hover: { backgroundColor: "rgba(59, 130, 246, 0.1)", borderColor: "rgba(59, 130, 246, 0.3)", color: "#2563eb" } }}
                                                                className="inline box-decoration-clone px-1.5 py-0.5 mx-0.5 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded text-slate-900 dark:text-slate-200 font-bold text-[0.9em] align-baseline transition-colors leading-[1.8]"
                                                            >
                                                                {children}
                                                            </motion.span>
                                                        ),
                                                        link: ({ children, value }) => (
                                                            <Link href={value?.href || "#"} target="_blank" className="text-blue-600 hover:text-blue-700 font-bold underline underline-offset-4 decoration-blue-200 hover:decoration-blue-500 transition-all">
                                                                {children}
                                                            </Link>
                                                        ),
                                                    }
                                                }}
                                            />
                                        )}
                                    </div>

                                    {/* Bottom Tags */}
                                    <div className="mt-8 flex flex-wrap gap-3 relative z-10">
                                        {["Full Stack", "AI Integration", "Performance", "UX/UI"].map((tag, i) => (
                                            <motion.div
                                                key={tag}
                                                variants={{ hover: { y: -3, scale: 1.05 } }}
                                                transition={{ delay: i * 0.05 }}
                                                className="px-5 py-2 rounded-full border-2 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 text-[10px] font-black uppercase tracking-widest bg-white dark:bg-zinc-950"
                                            >
                                                #{tag}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right Side: Stats & Details (35%) */}
                            <div className="lg:w-[35%] flex flex-col gap-6">
                                {/* Stats Container */}
                                <div className="bg-slate-50/50 dark:bg-zinc-900/40 rounded-[2.5rem] border border-slate-200/60 dark:border-zinc-800 p-8 h-full relative overflow-hidden group/stats">
                                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover/stats:opacity-[0.06] transition-opacity" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1.5px, transparent 0)', backgroundSize: '24px 24px' }} />

                                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-2">
                                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                                            <IconAnalyze size={16} className="text-blue-600" />
                                        </motion.div>
                                        Metrics
                                    </h4>

                                    <div className="space-y-3">
                                        {stats.map((stat, idx) => {
                                            const styles = [
                                                "bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400",
                                                "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400",
                                                "bg-purple-50/50 dark:bg-purple-900/10 border-purple-100 dark:border-purple-800 text-purple-600 dark:text-purple-400",
                                                "bg-orange-50/50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-800 text-orange-600 dark:text-orange-400",
                                            ];
                                            const Icons = [Zap, Award, Rocket, Brain];
                                            const Icon = Icons[idx % Icons.length];

                                            return (
                                                <motion.div
                                                    key={idx}
                                                    whileHover={{ scale: 1.05, x: 5 }}
                                                    className={cn(
                                                        "p-4 rounded-2xl border flex items-center justify-between cursor-default transition-shadow hover:shadow-md",
                                                        styles[idx % styles.length]
                                                    )}
                                                >
                                                    <div>
                                                        <div className="text-2xl font-black tracking-tight">{stat.value}</div>
                                                        <div className="text-[9px] font-bold uppercase opacity-80 tracking-wider">{stat.label}</div>
                                                    </div>
                                                    <Icon size={18} />
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Contact Mini-Card */}
                                <div className="bg-slate-50/50 dark:bg-zinc-900/40 rounded-[2.5rem] border border-slate-200/60 dark:border-zinc-800 p-8">
                                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                                        <IconTopologyStar3 size={16} className="text-blue-600" /> Connect
                                    </h4>
                                    <div className="flex gap-2 justify-between">
                                        {[
                                            { Icon: IconBrandGithub, url: "https://github.com/Biniyam-Taye" },
                                            { Icon: IconBrandLinkedin, url: "https://www.linkedin.com/in/biniyam-taye/" },
                                            { Icon: IconBrandTwitter, url: "https://twitter.com" },
                                            { Icon: IconBrandTelegram, url: "https://t.me/Biniyam_taye" }
                                        ].map(({ Icon, url }, i) => (
                                            <motion.a
                                                key={i}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ y: -5, scale: 1.1 }}
                                                className="flex-1 h-12 rounded-xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm hover:shadow-blue-200/50"
                                            >
                                                <Icon size={20} strokeWidth={1.5} />
                                            </motion.a>
                                        ))}
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
