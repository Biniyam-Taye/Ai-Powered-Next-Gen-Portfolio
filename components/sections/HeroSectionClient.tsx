"use client";

import { motion } from "framer-motion";
import { Link2, Github, Linkedin, Twitter, Mail, MapPin, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { ProfileImage } from "./ProfileImage";
import { cn } from "@/lib/utils";

interface HeroSectionClientProps {
    profile: any;
    profileImageUrl: string;
}

export function HeroSectionClient({ profile, profileImageUrl }: HeroSectionClientProps) {
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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring" as const, stiffness: 100, damping: 20 },
        },
    };

    return (
        <div className="relative z-10 container mx-auto max-w-7xl">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative"
            >
                {/* Main Glass Card */}
                <div className="relative bg-card/30 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-[3rem] p-8 md:p-12 lg:p-16 shadow-2xl overflow-hidden group">

                    {/* Internal Ambient Glow */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Left Column: Content */}
                        <motion.div variants={containerVariants} className="space-y-8">

                            {/* Intro Animation */}
                            <motion.div variants={itemVariants} className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                    </span>
                                    Available for Work
                                </div>

                                <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-foreground">
                                    {profile.firstName}{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                                        {profile.lastName}
                                    </span>
                                </h1>
                            </motion.div>

                            {/* Dynamic Headline */}
                            <motion.div variants={itemVariants} className="h-20 sm:h-auto">
                                {profile.headlineStaticText &&
                                    profile.headlineAnimatedWords &&
                                    profile.headlineAnimatedWords.length > 0 ? (
                                    <LayoutTextFlip
                                        text={profile.headlineStaticText}
                                        words={profile.headlineAnimatedWords}
                                        duration={profile.headlineAnimationDuration || 3000}
                                        className="text-2xl sm:text-3xl lg:text-4xl font-medium text-muted-foreground"
                                    />
                                ) : (
                                    <p className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground font-medium">
                                        {profile.headline}
                                    </p>
                                )}
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                className="relative group"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-purple-600/30 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
                                <div className="relative p-6 md:p-8 rounded-2xl bg-background/80 backdrop-blur-xl border border-white/10 shadow-lg">
                                    <p className="text-lg md:text-xl font-normal leading-relaxed text-foreground/80">
                                        <span className="text-primary text-2xl mr-2">❝</span>
                                        {profile.shortBio}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Social Actions */}
                            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
                                {/* Social Buttons */}
                                {profile.socialLinks && (
                                    <div className="flex flex-wrap gap-3">
                                        {profile.socialLinks.github && (
                                            <SocialButton href={profile.socialLinks.github} icon={<Github size={20} />} label="GitHub" />
                                        )}
                                        {profile.socialLinks.linkedin && (
                                            <SocialButton href={profile.socialLinks.linkedin} icon={<Linkedin size={20} />} label="LinkedIn" />
                                        )}
                                        {profile.socialLinks.twitter && (
                                            <SocialButton href={profile.socialLinks.twitter} icon={<Twitter size={20} />} label="Twitter" />
                                        )}
                                        {profile.socialLinks.website && (
                                            <SocialButton href={profile.socialLinks.website} icon={<Link2 size={20} />} label="Website" />
                                        )}
                                    </div>
                                )}
                            </motion.div>

                            {/* Footer Info */}
                            <motion.div variants={itemVariants} className="flex flex-wrap gap-6 pt-6 text-sm font-medium text-muted-foreground border-t border-border/50">
                                {profile.email && (
                                    <div className="flex items-center gap-2 hover:text-primary transition-colors">
                                        <Mail size={16} />
                                        <span>{profile.email}</span>
                                    </div>
                                )}
                                {profile.location && (
                                    <div className="flex items-center gap-2 hover:text-primary transition-colors">
                                        <MapPin size={16} />
                                        <span>{profile.location}</span>
                                    </div>
                                )}
                                {profile.availability && (
                                    <div className="flex items-center gap-2 text-emerald-500">
                                        <CheckCircle2 size={16} />
                                        <span>{profile.availability}</span>
                                    </div>
                                )}
                            </motion.div>

                        </motion.div>

                        {/* Right Column: Profile Image */}
                        <motion.div variants={itemVariants} className="relative mx-auto w-full max-w-md lg:max-w-full">
                            <div className="relative aspect-square w-full">
                                {/* Decorative blobs behind image */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-3xl blur-2xl transform rotate-6 scale-95 opacity-70 animate-pulse" />

                                {/* The actual image component */}
                                <div className="relative z-10 rounded-3xl shadow-2xl ring-1 ring-white/20 dark:ring-white/10 overflow-hidden transform transition-transform duration-500 hover:scale-[1.02]">
                                    <ProfileImage
                                        imageUrl={profileImageUrl}
                                        firstName={profile.firstName || ""}
                                        lastName={profile.lastName || ""}
                                    />
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function SocialButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-background/50 border border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm group"
        >
            <span className="group-hover:scale-110 transition-transform duration-300">{icon}</span>
            <span className="font-semibold">{label}</span>
        </Link>
    );
}
