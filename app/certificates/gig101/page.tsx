"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function Gig101CertificatePage() {
    return (
        <div className="min-h-screen w-full bg-zinc-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">

            {/* Background Ambient Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
            </div>

            {/* Top Controls */}
            <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
                {/* Download Button (Optional utility) */}
                <a
                    href="/certificates/gig101_cert.png"
                    download="Biniyam_Taye_Gig101_Certificate.png"
                    className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:scale-105 transition-all backdrop-blur-md group"
                    title="Download Certificate"
                >
                    <Download className="w-5 h-5" />
                </a>

                {/* Close Button - RETURNS TO HOME */}
                <Link
                    href="/#certifications"
                    className="p-3 rounded-full bg-white/10 border border-white/10 text-white hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 hover:scale-105 transition-all backdrop-blur-md group"
                >
                    <X className="w-6 h-6" />
                </Link>
            </div>

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 max-w-5xl w-full"
            >
                <div className="relative group">
                    {/* Glow Border */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 via-purple-600 to-blue-600 rounded-sm opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-1000" />

                    {/* Image Container */}
                    <div className="relative bg-zinc-900 border border-white/10 rounded-sm shadow-2xl overflow-hidden">
                        <Image
                            src="/certificates/gig101_cert.png"
                            alt="Gig-101 Certificate"
                            width={1200}
                            height={850}
                            priority
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>

                {/* Caption / Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 text-center"
                >
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Gig-101: Business, Legal & Finance</h1>
                    <p className="text-zinc-400 flex items-center justify-center gap-2">
                        <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded text-xs font-mono uppercase">Verified</span>
                        <span>Mastercard Foundation & Mesirat</span>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}
