"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationCardProps {
    value: string;
    gradient: string;
    mapQuery: string;
}

export function LocationCard({ value, gradient, mapQuery }: LocationCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

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

    const rotateX = useTransform(mouseY, [-100, 100], [8, -8]);
    const rotateY = useTransform(mouseX, [-100, 100], [-8, 8]);

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            style={{ perspective: 1000 }}
            className="w-full group/card"
        >
            <motion.div
                style={{
                    rotateX: isHovered ? rotateX : 0,
                    rotateY: isHovered ? rotateY : 0,
                    transformStyle: "preserve-3d",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={cn(
                    "relative p-5 rounded-2xl border-2 border-border/50",
                    "bg-gradient-to-br from-card/50 to-card",
                    "backdrop-blur-sm transition-all duration-300",
                    "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 overflow-hidden"
                )}
            >
                {/* Gradient glow on hover */}
                <div
                    className={cn(
                        "absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-50 transition-opacity duration-500 -z-10 blur-lg",
                        `bg-gradient-to-r ${gradient}`
                    )}
                    style={{ transform: "translateZ(-20px)" }}
                />

                <div className="flex flex-col gap-4 relative z-10">
                    {/* Header Section */}
                    <div style={{ transform: "translateZ(30px)" }} className="flex items-start gap-4">
                        {/* Icon container */}
                        <motion.div
                            className={cn(
                                "w-14 h-14 rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden",
                                "transition-all duration-300"
                            )}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            style={{ transform: "translateZ(20px)" }}
                        >
                            <div className={cn(
                                "absolute inset-0 bg-gradient-to-br opacity-20 group-hover/card:opacity-30 transition-opacity",
                                gradient
                            )} />
                            <div className={cn(
                                "absolute inset-0 rounded-xl border-2 opacity-0 group-hover/card:opacity-100 transition-opacity",
                                `bg-gradient-to-r ${gradient}`,
                                "animate-pulse"
                            )} />
                            <MapPin className={cn(
                                "w-7 h-7 relative z-10 transition-colors",
                                "text-foreground group-hover/card:text-primary"
                            )} />
                        </motion.div>

                        <div className="flex-1 min-w-0 pt-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70 mb-1.5">
                                Location
                            </h4>
                            <p className="font-semibold text-foreground">
                                {value}
                            </p>
                        </div>
                    </div>

                    {/* Map Container */}
                    <div
                        className="relative w-full h-48 rounded-xl overflow-hidden border border-border/50 group-hover/card:border-primary/30 transition-colors"
                        style={{ transform: "translateZ(20px)" }}
                    >
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight={0}
                            marginWidth={0}
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                            className="w-full h-full transition-opacity duration-500"
                        />


                    </div>

                    {/* View Detail Button */}
                    <Link
                        href={`https://www.google.com/maps/place/${encodeURIComponent(mapQuery)}`}
                        target="_blank"
                        className="w-full"
                    >
                        <motion.button
                            className={cn(
                                "w-full py-2 px-4 rounded-xl flex items-center justify-center gap-2",
                                "bg-primary/10 text-primary font-medium text-sm",
                                "hover:bg-primary hover:text-primary-foreground transition-all duration-300",
                                "border border-primary/20 hover:border-transparent"
                            )}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{ transform: "translateZ(25px)" }}
                        >
                            <span>View Map Detail</span>
                            <ExternalLink className="w-4 h-4" />
                        </motion.button>
                    </Link>
                </div>

                {/* Floating particle */}
                <motion.div
                    className={cn(
                        "absolute top-1/2 right-4 w-1.5 h-1.5 rounded-full opacity-0 group-hover/card:opacity-60",
                        `bg-gradient-to-r ${gradient}`
                    )}
                    animate={isHovered ? {
                        y: [-10, -30],
                        opacity: [0, 0.6, 0],
                        scale: [0, 1, 0],
                    } : {}}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                    }}
                />
            </motion.div>
        </motion.div>
    );
}
