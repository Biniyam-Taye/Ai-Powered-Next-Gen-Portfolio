"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconExternalLink, IconCertificate } from "@tabler/icons-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight line-clamp-2">
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
                        {cert.credentialUrl && (
                            <Link
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
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
        <div
            className="flex flex-col items-center justify-center w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative w-full h-[600px] flex items-center justify-center perspective-[1000px] mb-8">
                <div className="relative w-[300px] md:w-[380px] h-full flex items-center justify-center transform-style-3d">
                    <AnimatePresence>
                        {certifications.map((cert, index) => {
                            const style = getCardStyle(index);
                            if (!style.isVisible) return null;

                            return (
                                <motion.div
                                    key={`${cert.name}-${index}`}
                                    className="absolute top-1/2 left-1/2"
                                    style={{
                                        zIndex: style.zIndex,
                                    }}
                                    initial={false}
                                    animate={{
                                        x: "-50%",
                                        y: "-50%",
                                        rotateY: style.rotateY,
                                        translateX: `${style.translateX}%`,
                                        translateZ: style.translateZ,
                                        scale: style.scale,
                                        opacity: style.opacity,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 20,
                                        mass: 1
                                    }}
                                >
                                    <CertificateCard cert={cert} isActive={style.isActive} />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* Controls Container (Buttons + Dots) */}
            <div className="flex items-center gap-8 z-40 bg-card/60 backdrop-blur-md px-6 py-3 rounded-full border border-border/50 shadow-2xl">
                {/* Prev Button */}
                <button
                    onClick={prev}
                    className="p-3 rounded-full bg-primary/10 border border-primary/20 text-foreground hover:bg-primary hover:text-primary-foreground hover:scale-110 active:scale-95 transition-all group"
                    aria-label="Previous Certificate"
                >
                    <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                {/* Pagination Dots */}
                <div className="flex gap-2">
                    {certifications.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrIndex(i)}
                            className={cn(
                                "h-2 rounded-full transition-all duration-300",
                                currIndex === i
                                    ? "bg-yellow-500 w-8"
                                    : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"
                            )}
                            aria-label={`Go to certificate ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={next}
                    className="p-3 rounded-full bg-primary/10 border border-primary/20 text-foreground hover:bg-primary hover:text-primary-foreground hover:scale-110 active:scale-95 transition-all group"
                    aria-label="Next Certificate"
                >
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>
        </div>
    );
}
