"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    IconExternalLink,
    IconCertificate,
    IconShieldCheck,
    IconGlobe,
    IconCpu,
    IconActivity,
    IconWorld,
    IconLock,
    IconDatabase,
    IconDeviceFloppy,
    IconServer,
    IconUserCheck,
    IconChartBar,
    IconRocket,
    IconSatellite,
    IconTerminal2,
    IconCloud,
    IconAperture,
    IconWifi,
    IconBolt
} from "@tabler/icons-react";
import { ChevronLeft, ChevronRight, Binary, Fingerprint, ScanText, QrCode, HardDrive, Network, Cpu, Shield, Zap, Info, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import { CometCard } from "@/components/ui/comet-card";

// --- Types ---
interface Skill {
    name: string | null;
    category?: string | null;
}

interface Certification {
    name: string | null;
    issuer: string | null;
    issueDate: string | null;
    expiryDate: string | null;
    credentialId: string | null;
    credentialUrl: string | null;
    logo: any;
    description: string | null;
    skills: Skill[] | null;
}

interface CertificationsSectionClientProps {
    certifications: Certification[];
}

// --- Card Component ---
const CertificateCard = ({ cert, isActive }: { cert: Certification, isActive: boolean }) => {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long" });
    };

    // The inner content of the card
    const CardContent = (
        <div className="w-[300px] md:w-[380px] h-[520px] bg-card border-8 border-card/80 rounded-sm shadow-2xl p-3 relative select-none cursor-grab active:cursor-grabbing">
            {/* Inner Certificate - Dark Background */}
            <div className="relative h-full bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border-2 border-yellow-600/40 p-6 flex flex-col overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-yellow-600/60 m-2" />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-yellow-600/60 m-2" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-yellow-600/60 m-2" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-yellow-600/60 m-2" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center h-full">
                    {/* Header */}
                    <div className="mb-2">
                        <IconCertificate className="w-8 h-8 text-yellow-600/80 mb-1 mx-auto" />
                        <h4 className="text-sm font-bold text-yellow-600/80 uppercase tracking-widest">Certificate</h4>
                    </div>

                    {/* Logo */}
                    <div className="my-4 relative w-16 h-16 rounded-full bg-white/10 border border-yellow-600/30 p-2 flex items-center justify-center shrink-0">
                        {cert.logo ? (
                            <Image
                                src={urlFor(cert.logo).width(64).height(64).url()}
                                alt={cert.issuer || "Issuer"}
                                width={48}
                                height={48}
                                className="object-contain"
                            />
                        ) : (
                            <div className="text-2xl font-bold text-white">
                                {cert.issuer?.charAt(0)}
                            </div>
                        )}
                    </div>

                    {/* Name & Issuer */}
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">
                        {cert.name}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-4">{cert.issuer}</p>

                    {/* Description */}
                    {cert.description && (
                        <p className="text-xs text-zinc-500 line-clamp-3 mb-4 px-2 italic">
                            &quot;{cert.description}&quot;
                        </p>
                    )}

                    {/* Skills */}
                    {cert.skills && cert.skills.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-1.5 mb-auto">
                            {cert.skills.slice(0, 3).map((skill, i) => (
                                <span key={i} className="px-2 py-0.5 text-[10px] bg-yellow-600/10 text-yellow-500 border border-yellow-600/20 rounded-full">
                                    {skill.name || "Skill"}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Footer Date & Link */}
                    <div className="mt-4 pt-4 border-t border-yellow-600/20 w-full">
                        <p className="text-[10px] text-zinc-400 mb-3">
                            Issued: {cert.issueDate ? formatDate(cert.issueDate) : 'N/A'}
                        </p>
                        {(cert.credentialUrl || cert.name?.includes("Gig-101")) && (
                            <Link
                                href={cert.credentialUrl || "/certificates/gig101"}
                                target={cert.credentialUrl ? "_blank" : undefined}
                                rel={cert.credentialUrl ? "noopener noreferrer" : undefined}
                                className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-black text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-lg hover:shadow-yellow-500/20 pointer-events-auto"
                            >
                                Verify ID <IconExternalLink className="w-3 h-3" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    // Only apply the 3D CometCard effect if it's the active card
    if (isActive) {
        return (
            <CometCard className="w-[300px] md:w-[380px]" rotateDepth={10} translateDepth={15}>
                {CardContent}
            </CometCard>
        );
    }

    return CardContent;
};


// --- Carousel Client ---
export function CertificationsSectionClient({ certifications }: CertificationsSectionClientProps) {
    const [currIndex, setCurrIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-play interval in ms
    const AUTO_PLAY_INTERVAL = 8000;

    const next = useCallback(() => {
        setCurrIndex((prev) => (prev + 1) % certifications.length);
    }, [certifications.length]);

    const prev = useCallback(() => {
        setCurrIndex((prev) => (prev - 1 + certifications.length) % certifications.length);
    }, [certifications.length]);

    // Setup Auto-play
    useEffect(() => {
        if (!isHovered) {
            autoPlayRef.current = setInterval(next, AUTO_PLAY_INTERVAL);
        }
        return () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        };
    }, [isHovered, next]);

    // Calculate positions for 3D Carousel
    const getCardStyle = (index: number) => {
        const total = certifications.length;
        // Circular difference
        let diff = (index - currIndex) % total;
        if (diff < 0) diff += total;
        if (diff > total / 2) diff -= total; // Normalize to -total/2 to +total/2

        // Determine visibility window
        const isActive = diff === 0;
        const isVisible = Math.abs(diff) <= 2;

        // 3D Transforms
        const rotateY = diff * 45;
        const translateX = diff * 60;
        const translateZ = Math.abs(diff) * -400;
        const zIndex = 100 - Math.abs(diff);
        const opacity = isActive ? 1 : Math.max(0.2, 1 - Math.abs(diff) * 0.4);
        const scale = isActive ? 1 : 0.8;

        return {
            rotateY,
            translateX,
            translateZ,
            zIndex,
            opacity,
            scale,
            isVisible,
            isActive
        };
    };

    return (
        <div className="group/wrapper relative perspective-1000 px-4">
            {/* Massive Glow Field */}
            <div className="absolute -inset-10 rounded-[4rem] bg-gradient-to-br from-slate-200/10 via-zinc-100/10 to-transparent opacity-0 group-hover/wrapper:opacity-100 blur-[100px] transition-all duration-1000 pointer-events-none" />

            {/* Main Wrapper Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={cn(
                    "relative rounded-[3rem] p-8 md:p-12 lg:p-16",
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
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-200/20 to-transparent dark:from-blue-500/5" />

                {/* 2. Scanning Laser Effect */}
                <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent blur-sm animate-[scan_6s_infinite] pointer-events-none z-0" />

                {/* 3. Left Side: Mission Control HUD */}
                <div className="absolute top-1/4 left-10 flex flex-col gap-8 opacity-20 group-hover/wrapper:opacity-90 transition-all duration-700 hidden lg:flex">
                    <div className="p-3 bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-xl flex items-center gap-3">
                        <IconSatellite className="w-6 h-6 text-blue-600 animate-spin-slow" />
                        <div><div className="text-[10px] font-black uppercase tracking-tighter dark:text-zinc-300">Sat_Link</div><div className="text-[8px] font-mono text-green-600">ACTIVE_TX</div></div>
                    </div>
                    <div className="p-3 bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-xl flex items-center gap-3">
                        <IconRocket className="w-6 h-6 text-orange-600" />
                        <div><div className="text-[10px] font-black uppercase tracking-tighter dark:text-zinc-300">Deployments</div><div className="text-[8px] font-mono text-slate-500 dark:text-slate-400">CNT: 0048</div></div>
                    </div>
                    <div className="flex flex-col gap-2 pl-2">
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-ping" /><span className="text-[9px] font-bold uppercase dark:text-zinc-400">System Healthy</span></div>
                        <div className="flex items-center gap-2 font-mono text-[8px] dark:text-zinc-500"><Timer className="w-3 h-3" /><span>UPTIME: 124D:08H</span></div>
                    </div>
                    <div className="p-4 bg-slate-900 border border-slate-900 dark:border-zinc-700 rounded-2xl shadow-2xl"><QrCode className="w-16 h-16 text-white" /></div>
                </div>

                {/* 4. Right Side: Security & Core HUD */}
                <div className="absolute top-12 right-12 flex flex-col items-end gap-6 opacity-20 group-hover/wrapper:opacity-90 transition-all duration-700 hidden lg:flex">
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col items-end"><div className="text-[10px] font-black uppercase tracking-widest dark:text-zinc-300">Core_Temp</div><div className="text-[12px] font-mono font-bold text-red-500">42°C</div></div>
                        <div className="w-12 h-12 rounded-full border-4 border-slate-100 dark:border-zinc-800 border-t-red-500 animate-spin flex items-center justify-center"><IconBolt className="w-5 h-5 text-slate-800 dark:text-zinc-200" /></div>
                    </div>
                    <div className="flex flex-col items-end gap-2 border-r-2 border-slate-300 dark:border-zinc-700 pr-4">
                        <div className="flex items-center gap-2 dark:text-zinc-300"><span className="text-[9px] font-bold">WIFI_STRENGTH</span><IconWifi className="w-4 h-4" /></div>
                        <div className="flex gap-1"><div className="w-1 h-3 bg-slate-800 dark:bg-zinc-200" /><div className="w-1 h-3 bg-slate-800 dark:bg-zinc-200" /><div className="w-1 h-3 bg-slate-800 dark:bg-zinc-200" /><div className="w-1 h-3 bg-slate-200 dark:bg-zinc-700" /></div>
                    </div>
                    <div className="bg-white/40 dark:bg-zinc-900/40 p-4 rounded-3xl border border-slate-200 dark:border-zinc-700 backdrop-blur-md shadow-inner flex flex-col gap-3">
                        <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-slate-900 dark:text-zinc-100" /><span className="text-[9px] font-black uppercase dark:text-zinc-300">Firewall_Encrypted</span></div>
                        <div className="flex items-center gap-2"><Cpu className="w-4 h-4 text-slate-900 dark:text-zinc-100" /><span className="text-[9px] font-black uppercase dark:text-zinc-300">AMD_EPYC_9984</span></div>
                    </div>
                </div>

                {/* 5. Center Background Spinning Tech (Massive) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] dark:opacity-[0.1] pointer-events-none scale-150">
                    <div className="w-[1000px] h-[1000px] border-[1px] border-slate-900 dark:border-white rounded-full animate-spin-slow rotate-45" />
                    <div className="absolute w-[800px] h-[800px] border border-dashed border-slate-900 dark:border-zinc-400 rounded-full animate-reverse-spin" />
                    <div className="absolute w-[600px] h-[600px] border-[20px] border-slate-900/10 dark:border-white/5 rounded-full" />
                </div>

                {/* 6. Original Branding Sections (Beautified) */}
                <div className="absolute bottom-10 left-10 flex flex-col gap-2 opacity-30 group-hover/wrapper:opacity-90 transition-all hidden sm:flex">
                    <svg width="220" height="80" viewBox="0 0 140 60" fill="none" className="text-slate-900 dark:text-white scale-150 origin-bottom-left group-hover/wrapper:scale-[1.6] transition-transform duration-700">
                        <path d="M10 40C30 35 50 45 70 30C90 15 110 25 130 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-70" />
                        <text x="15" y="55" className="text-[12px] font-serif italic fill-current opacity-80">Biniyam Taye</text>
                    </svg>
                    <div className="pl-8 flex items-center gap-3"><div className="w-12 h-[1px] bg-slate-900 dark:bg-white" /><span className="text-[10px] font-black uppercase tracking-[0.6em] dark:text-zinc-300">Portfolio Lead</span></div>
                </div>

                {/* 7. Floating Tech Artifacts (3D Bobbing) */}
                <motion.div animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute bottom-1/3 left-[20%] p-5 bg-white/80 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-700 rounded-[2rem] shadow-2xl opacity-0 group-hover/wrapper:opacity-100 transition-opacity hidden lg:block">
                    <IconTerminal2 className="w-8 h-8 text-slate-800 dark:text-zinc-100" />
                    <div className="mt-2 text-[8px] font-bold uppercase overflow-hidden whitespace-nowrap dark:text-zinc-300"><span className="inline-block animate-marquee italic">root@portfolio: sudo certify --all</span></div>
                </motion.div>

                <motion.div animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-1/3 right-[20%] p-5 bg-white/80 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-700 rounded-[2rem] shadow-2xl opacity-0 group-hover/wrapper:opacity-100 transition-opacity hidden lg:block">
                    <IconCloud className="w-8 h-8 text-blue-500" />
                    <div className="mt-2 text-[8px] font-bold uppercase dark:text-zinc-300">Cloud_Sync_OK</div>
                </motion.div>

                {/* 8. Top Center Status Bar */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-10 opacity-40 hidden sm:flex">
                    <div className="flex items-center gap-2 dark:text-zinc-400"><Binary className="w-4 h-4" /><span className="text-[10px] font-mono">01100010_01101001_01101110_01101001</span></div>
                    <div className="w-px h-6 bg-slate-300 dark:bg-zinc-700" />
                    <div className="flex items-center gap-2 uppercase font-black text-[10px] dark:text-zinc-300"><Zap className="w-4 h-4 text-orange-500 animate-pulse" /><span>Power: Optimised</span></div>
                </div>

                {/* 9. Content: The Cards */}
                <div className="relative z-10 flex flex-col items-center justify-center w-full" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <div className="relative w-full h-[600px] flex items-center justify-center perspective-[1200px] mb-8">
                        <div className="relative w-[300px] md:w-[380px] h-full flex items-center justify-center transform-style-3d">
                            <AnimatePresence>
                                {certifications.map((cert, index) => {
                                    const style = getCardStyle(index);
                                    if (!style.isVisible) return null;
                                    return (
                                        <motion.div key={`${cert.name}-${index}`} className="absolute top-1/2 left-1/2" style={{ zIndex: style.zIndex }} initial={false} animate={{ x: "-50%", y: "-50%", rotateY: style.rotateY, translateX: `${style.translateX}%`, translateZ: style.translateZ, scale: style.scale, opacity: style.opacity }} transition={{ type: "spring", stiffness: 80, damping: 20 }}>
                                            <CertificateCard cert={cert} isActive={style.isActive} />
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* 10. Navigation: Deep Glassmorphism */}
                    <div className="flex items-center gap-4 z-40 bg-white/60 dark:bg-black/60 backdrop-blur-3xl px-6 py-3 rounded-full border border-slate-200 dark:border-zinc-800 shadow-xl hover:border-blue-300 hover:shadow-blue-200/20 transition-all duration-500 group/controls">
                        <button onClick={prev} className="p-2 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black hover:scale-110 active:scale-95 shadow transition-all"><ChevronLeft className="w-5 h-5" /></button>
                        <div className="flex gap-2">{certifications.map((_, i) => (<button key={i} onClick={() => setCurrIndex(i)} className={cn("h-1.5 rounded-full transition-all duration-700", currIndex === i ? "bg-slate-900 dark:bg-white w-8" : "bg-slate-200 dark:bg-zinc-800 w-1.5 hover:bg-slate-400 dark:hover:bg-zinc-600")} />))}</div>
                        <button onClick={next} className="p-2 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black hover:scale-110 active:scale-95 shadow transition-all"><ChevronRight className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* 11. Corner Accents & Info Labels */}
                <div className="absolute top-10 left-10 opacity-60 hidden sm:block"><div className="flex gap-2"><Info className="w-4 h-4 dark:text-zinc-500" /><span className="text-[10px] font-bold uppercase tracking-widest text-slate-900 dark:text-zinc-300">System_Info: SEC_AUDIT_PASS</span></div></div>
                <div className="absolute bottom-10 right-10 opacity-60 hidden sm:block"><div className="flex gap-2"><HardDrive className="w-4 h-4 dark:text-zinc-500" /><span className="text-[10px] font-bold uppercase tracking-widest text-slate-900 dark:text-zinc-300">Disk_Usage: 12%_USED</span></div></div>

                <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-25deg] animate-shimmer opacity-0 group-hover/wrapper:opacity-100 pointer-events-none" />
            </motion.div>
        </div>
    );
}

// Custom animation for laser scan
const scanKeyframes = `
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
`;
