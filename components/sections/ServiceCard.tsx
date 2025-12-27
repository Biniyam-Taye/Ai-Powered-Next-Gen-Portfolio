"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { IconCheck, IconClock, IconCurrencyDollar } from "@tabler/icons-react";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

interface Service {
    title?: string | null;
    slug?: { current?: string | null } | null;
    icon?: any;
    shortDescription?: string | null;
    fullDescription?: any;
    features?: string[] | null;
    technologies?: { name?: string | null; category?: string | null }[] | null;
    deliverables?: string[] | null;
    pricing?: {
        startingPrice?: number | null;
        priceType?: string | null;
        description?: string | null;
    } | null;
    timeline?: string | null;
    featured?: boolean | null;
}

interface ServiceCardProps {
    service: Service;
    isFeatured?: boolean;
}

export function ServiceCard({ service, isFeatured = false }: ServiceCardProps) {
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

    const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
    const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

    const formatPrice = (pricing: Service['pricing']) => {
        if (!pricing) return null;
        const { startingPrice, priceType, description } = pricing;

        const priceTypeLabels: Record<string, string> = {
            hourly: "/hr",
            project: "/proj",
            monthly: "/mo",
            custom: "",
        };

        if (priceType === "custom") {
            return <div className="text-primary font-bold text-lg">Custom Quote</div>;
        }

        return (
            <div className="flex flex-col">
                {startingPrice && (
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-foreground">
                            ${startingPrice.toLocaleString()}
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">
                            {priceType && priceTypeLabels[priceType]}
                        </span>
                    </div>
                )}
                {description && (
                    <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                )}
            </div>
        );
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            style={{ perspective: 1400 }}
            className="w-full h-full group/card"
        >
            <motion.div
                style={{
                    rotateX: isHovered ? rotateX : 0,
                    rotateY: isHovered ? rotateY : 0,
                    transformStyle: "preserve-3d",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={cn(
                    "relative w-full h-full rounded-3xl overflow-hidden transition-all duration-500",
                    "bg-gradient-to-br",
                    isFeatured
                        ? "from-primary/5 via-card to-card border-2 border-primary/30"
                        : "from-blue-500/5 via-card to-card border-2 border-blue-500/20",
                    "shadow-xl",
                    isFeatured
                        ? "hover:shadow-[0_20px_60px_-15px_rgba(var(--primary-rgb),0.4)]"
                        : "hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.4)]"
                )}
            >
                {/* Animated gradient border glow */}
                <div
                    className={cn(
                        "absolute inset-0 rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500",
                        "bg-gradient-to-r",
                        isFeatured
                            ? "from-primary/20 via-yellow-500/20 to-primary/20"
                            : "from-blue-500/20 via-cyan-500/20 to-blue-500/20",
                        "blur-xl -z-10"
                    )}
                    style={{ transform: "translateZ(-50px)" }}
                />

                {/* Main content container with 3D lift */}
                <div
                    style={{ transform: "translateZ(50px)" }}
                    className="relative z-10 p-8 h-full flex flex-col"
                >

                    {/* Animated background gradient overlay */}
                    <motion.div
                        className={cn(
                            "absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700",
                            "bg-gradient-to-br",
                            isFeatured
                                ? "from-primary/10 via-yellow-500/5 to-transparent"
                                : "from-blue-500/10 via-cyan-500/5 to-transparent"
                        )}
                        style={{ transform: "translateZ(10px)" }}
                    />

                    {/* Header: Icon & Title */}
                    <div className="flex items-start gap-5 mb-6 relative z-20">
                        {service.icon && (
                            <motion.div
                                className={cn(
                                    "flex items-center justify-center rounded-2xl shrink-0 relative overflow-hidden",
                                    "transition-all duration-500",
                                    isFeatured ? "w-16 h-16" : "w-14 h-14"
                                )}
                                whileHover={{ scale: 1.15, rotate: 5 }}
                                style={{ transform: "translateZ(30px)" }}
                            >
                                {/* Icon background with gradient */}
                                <div className={cn(
                                    "absolute inset-0 bg-gradient-to-br",
                                    isFeatured
                                        ? "from-primary/20 to-yellow-500/20 group-hover/card:from-primary/30 group-hover/card:to-yellow-500/30"
                                        : "from-blue-500/20 to-cyan-500/20 group-hover/card:from-blue-500/30 group-hover/card:to-cyan-500/30",
                                    "transition-all duration-500"
                                )} />

                                {/* Animated ring */}
                                <div className={cn(
                                    "absolute inset-0 rounded-2xl border-2 opacity-0 group-hover/card:opacity-100",
                                    isFeatured ? "border-primary/50" : "border-blue-500/50",
                                    "animate-pulse"
                                )} />

                                <Image
                                    src={urlFor(service.icon).width(64).height(64).url()}
                                    alt={service.title || "Service"}
                                    width={isFeatured ? 40 : 32}
                                    height={isFeatured ? 40 : 32}
                                    className="object-contain relative z-10 drop-shadow-lg"
                                />
                            </motion.div>
                        )}
                        <div className="flex-1">
                            <h3 className={cn(
                                "font-black leading-tight bg-clip-text text-transparent bg-gradient-to-r",
                                isFeatured
                                    ? "from-foreground to-primary text-2xl"
                                    : "from-foreground to-blue-600 text-xl",
                                "group-hover/card:from-primary group-hover/card:to-yellow-500 transition-all duration-500"
                            )}>
                                {service.title}
                            </h3>
                            {service.shortDescription && (
                                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                                    {service.shortDescription}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex-grow space-y-6 relative z-20">
                        {/* Features List */}
                        {service.features && service.features.length > 0 && (
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold uppercase tracking-wider opacity-70 flex items-center gap-2">
                                    <span className={cn(
                                        "w-8 h-0.5 rounded-full bg-gradient-to-r",
                                        isFeatured ? "from-primary to-yellow-500" : "from-blue-500 to-cyan-500"
                                    )} />
                                    Key Features
                                </h4>
                                <ul className="space-y-2.5">
                                    {service.features.slice(0, isFeatured ? 6 : 4).map((feature, idx) => (
                                        <motion.li
                                            key={idx}
                                            className="flex items-start gap-3 text-sm group/item"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            <div className={cn(
                                                "mt-1 w-5 h-5 rounded-lg flex items-center justify-center shrink-0",
                                                "bg-gradient-to-br shadow-sm",
                                                "transition-all duration-300 group-hover/item:scale-110",
                                                isFeatured
                                                    ? "from-primary/20 to-yellow-500/20 text-primary group-hover/item:from-primary/30 group-hover/item:to-yellow-500/30"
                                                    : "from-blue-500/20 to-cyan-500/20 text-blue-600 group-hover/item:from-blue-500/30 group-hover/item:to-cyan-500/30"
                                            )}>
                                                <IconCheck size={12} stroke={3} />
                                            </div>
                                            <span className="text-muted-foreground/90 group-hover/item:text-foreground transition-colors">
                                                {feature}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Technologies */}
                        {service.technologies && service.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-2">
                                {service.technologies.slice(0, 6).map((tech, idx) => (
                                    tech?.name && (
                                        <motion.span
                                            key={idx}
                                            className={cn(
                                                "px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide rounded-lg",
                                                "border-2 backdrop-blur-sm transition-all duration-300",
                                                "hover:scale-105 hover:-translate-y-0.5",
                                                isFeatured
                                                    ? "border-primary/30 bg-gradient-to-r from-primary/10 to-yellow-500/10 text-primary hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20"
                                                    : "border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 dark:text-blue-400 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20"
                                            )}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                        >
                                            {tech.name}
                                        </motion.span>
                                    )
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer: Pricing & Timeline */}
                    <div className="mt-8 pt-6 border-t border-border/50 grid grid-cols-2 gap-4 relative z-20">
                        <div className="space-y-1">
                            <div className={cn(
                                "flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-2",
                                isFeatured ? "text-primary/70" : "text-blue-600/70"
                            )}>
                                <IconCurrencyDollar size={16} /> Pricing
                            </div>
                            {formatPrice(service.pricing)}
                        </div>
                        <div className="space-y-1">
                            <div className={cn(
                                "flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-2",
                                isFeatured ? "text-primary/70" : "text-blue-600/70"
                            )}>
                                <IconClock size={16} /> Timeline
                            </div>
                            <div className="text-sm font-semibold">{service.timeline || "Flexible"}</div>
                        </div>
                    </div>

                </div>

                {/* Floating particles effect on hover */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={cn(
                                "absolute w-2 h-2 rounded-full opacity-0 group-hover/card:opacity-60",
                                isFeatured ? "bg-primary" : "bg-blue-500"
                            )}
                            style={{
                                left: `${20 + i * 30}%`,
                                top: `${30 + i * 20}%`,
                            }}
                            animate={isHovered ? {
                                y: [-20, -60],
                                opacity: [0, 0.6, 0],
                                scale: [0, 1, 0],
                            } : {}}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3,
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
