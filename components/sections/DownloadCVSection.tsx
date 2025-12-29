"use client";

import { motion } from "framer-motion";
import { IconDownload, IconFileText } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function DownloadCVSection() {
    return (
        <section className="pt-0 pb-16 px-4 -mt-16 overflow-hidden relative z-30">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto animate-[float_6s_ease-in-out_infinite]"
            >
                <div className="group relative rounded-[2.5rem] overflow-hidden shadow-2xl hover:shadow-[0_0_50px_rgba(37,99,235,0.3)] transition-shadow duration-500">
                    {/* --- Animated Background Layers --- */}

                    {/* Layer 1: Living Blue-White Mix Gradient Base */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-500 to-white bg-[length:200%_200%] animate-[gradient-shift_8s_ease_infinite]" />

                    {/* Layer 1.5: Unique "Holographic Scanner" Beam */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-0 -left-[20%] w-[10%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] blur-md animate-[scan-fast_5s_ease-in-out_infinite_2s]" />
                    </div>

                    {/* Layer 2: Unique "Liquid Wave" Hover Animation */}
                    <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.8),transparent_70%)] group-hover:scale-[1.5] transition-transform duration-1000 ease-in-out" />
                    </div>

                    {/* Layer 3: Animated Polka Pattern */}
                    <div className="absolute inset-0 opacity-[0.1] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:20px_20px] animate-[slide_10s_linear_infinite]" />

                    {/* Layer 4: Big White Glow on Right */}
                    <div className="absolute -right-20 -bottom-20 w-[500px] h-[500px] bg-white/40 rounded-full blur-[100px] pointer-events-none group-hover:bg-white/60 transition-colors duration-700" />

                    {/* --- Content --- */}
                    <div className="relative z-10 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">

                        {/* Text Content */}
                        <div className="space-y-6 max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-semibold backdrop-blur-md"
                            >
                                <IconFileText className="w-4 h-4" />
                                <span>Professional Resume</span>
                            </motion.div>

                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-lg">
                                Ready to collaborate? <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-white">
                                    Download my CV.
                                </span>
                            </h2>

                            <p className="text-lg text-blue-100/80 font-medium leading-relaxed max-w-lg">
                                Get a detailed overview of my skills, experience, and certifications. Let's build something amazing together.
                            </p>
                        </div>

                        {/* Button Wrapper */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, type: "spring" }}
                            className="relative"
                        >
                            {/* Pulse Effect behind button */}
                            <div className="absolute inset-0 rounded-full bg-white/20 blur-xl animate-ping [animation-duration:2s]" />

                            <a
                                href="/Biniyam_Taye_CV.pdf"
                                download="Biniyam_Taye_CV.pdf"
                                className="group/btn relative inline-flex items-center gap-3 px-8 py-5 rounded-full bg-blue-600 text-white font-black text-lg tracking-wide hover:scale-105 hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] transition-all duration-300 overflow-hidden ring-4 ring-white/50"
                            >
                                {/* Button Interior Shine */}
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />

                                <span className="relative">Download CV</span>
                                <IconDownload className="relative w-6 h-6 group-hover/btn:translate-y-1 transition-transform" />
                            </a>
                        </motion.div>

                    </div>

                    {/* Decorative Border Gradient */}
                    <div className="absolute inset-0 rounded-[2.5rem] border-2 border-white/20 group-hover:border-white/40 transition-colors duration-500 pointer-events-none" />
                </div>
            </motion.div>

            <style jsx global>{`
                @keyframes slide {
                    0% { background-position: 0 0; }
                    100% { background-position: 40px 40px; }
                }
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes scan-fast {
                    0% { left: -20%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { left: 120%; opacity: 0; }
                }
            `}</style>
        </section >
    );
}
