"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactInfoCardProps {
    icon: "mail" | "phone" | "map-pin";
    label: string;
    value: string;
    href?: string;
    gradient: string;
}

export function ContactInfoCard({ icon, label, value, href, gradient }: ContactInfoCardProps) {
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

    // Map icon string to component
    const Icon = icon === "mail" ? Mail : icon === "phone" ? Phone : MapPin;

    const content = (
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
                    "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10",
                    href && "cursor-pointer"
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

                <div style={{ transform: "translateZ(30px)" }} className="flex items-start gap-4">
                    {/* Icon container with 3D effect */}
                    <motion.div
                        className={cn(
                            "w-14 h-14 rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden",
                            "transition-all duration-300"
                        )}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        style={{ transform: "translateZ(20px)" }}
                    >
                        {/* Gradient background */}
                        <div className={cn(
                            "absolute inset-0 bg-gradient-to-br opacity-20 group-hover/card:opacity-30 transition-opacity",
                            gradient
                        )} />

                        {/* Animated ring */}
                        <div className={cn(
                            "absolute inset-0 rounded-xl border-2 opacity-0 group-hover/card:opacity-100 transition-opacity",
                            `bg-gradient-to-r ${gradient}`,
                            "animate-pulse"
                        )}
                            style={{
                                borderImage: `linear-gradient(to right, var(--tw-gradient-stops)) 1`,
                            }}
                        />

                        <Icon className={cn(
                            "w-7 h-7 relative z-10 transition-colors",
                            "text-foreground group-hover/card:text-primary"
                        )} />
                    </motion.div>

                    <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70 mb-1.5">
                            {label}
                        </h4>
                        <p className={cn(
                            "font-semibold text-foreground transition-colors",
                            href && "group-hover/card:text-primary"
                        )}>
                            {value}
                        </p>
                    </div>

                    {/* Hover indicator */}
                    {href && (
                        <motion.div
                            initial={{ x: -5, opacity: 0 }}
                            animate={isHovered ? { x: 0, opacity: 1 } : { x: -5, opacity: 0 }}
                            className="text-primary"
                        >
                            →
                        </motion.div>
                    )}
                </div>

                {/* Floating particle on hover */}
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

    if (href) {
        return (
            <Link href={href} className="block">
                {content}
            </Link>
        );
    }

    return content;
}
