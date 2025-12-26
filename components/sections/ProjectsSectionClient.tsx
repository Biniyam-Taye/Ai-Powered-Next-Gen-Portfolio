"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconExternalLink, IconCode } from "@tabler/icons-react";

// --- Types ---

interface Technology {
    name: string | null;
    category?: string | null;
    color?: string | null;
}

interface Project {
    title: string | null;
    slug: { current?: string | null } | null;
    tagline: string | null;
    category: string | null;
    liveUrl: string | null;
    githubUrl: string | null;
    coverImage: any;
    technologies: Technology[] | null;
}

interface ProjectsSectionClientProps {
    projects: Project[];
}

// --- Modern Project Card Component ---

function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative h-full flex flex-col"
        >
            {/* 3D Border Effect Layer */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500 via-blue-500 to-amber-400 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-sm transition duration-500" />

            <div className="relative h-full flex flex-col bg-card/90 backdrop-blur-xl border border-white/10 dark:border-white/5 rounded-[1.9rem] overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-2xl hover:-translate-y-1">

                {/* Image Section */}
                <div className="relative aspect-video overflow-hidden">
                    {project.coverImage ? (
                        <>
                            <Image
                                src={urlFor(project.coverImage).width(800).height(600).url()}
                                alt={project.title || "Project image"}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                        </>
                    ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                            <IconCode className="w-12 h-12 text-muted-foreground/50" />
                        </div>
                    )}

                    {/* Floating Category Badge */}
                    {project.category && (
                        <div className="absolute top-4 left-4 backdrop-blur-md bg-black/40 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg transform transition-transform duration-300 group-hover:scale-105">
                            {project.category}
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 md:p-8 flex flex-col gap-4">
                    <div>
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 mb-2 group-hover:text-primary transition-colors duration-300">
                            {project.title || "Untitled Project"}
                        </h3>
                        <p className="text-muted-foreground line-clamp-2 text-sm md:text-base leading-relaxed">
                            {project.tagline}
                        </p>
                    </div>

                    {/* Tech Stack Pills */}
                    {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto pt-4">
                            {project.technologies.slice(0, 4).map((tech, idx) => (
                                tech.name && (
                                    <span
                                        key={idx}
                                        className="text-xs font-medium px-2.5 py-1 rounded-md bg-primary/5 text-primary border border-primary/10"
                                    >
                                        {tech.name}
                                    </span>
                                )
                            ))}
                            {project.technologies.length > 4 && (
                                <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-muted text-muted-foreground border border-border">
                                    +{project.technologies.length - 4}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-border/50">
                        {project.liveUrl && (
                            <Link
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-sm shadow-md hover:shadow-cyan-500/25 transition-all duration-300 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Live Demo <IconExternalLink className="w-4 h-4" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                            </Link>
                        )}
                        {project.githubUrl && (
                            <Link
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-card border-2 border-muted hover:border-foreground/20 text-foreground font-semibold text-sm transition-all duration-300"
                            >
                                <span className="flex items-center gap-2 group-hover/btn:scale-105 transition-transform duration-300">
                                    <IconBrandGithub className="w-4 h-4" /> Code
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// --- Main Client Component ---

export function ProjectsSectionClient({ projects }: ProjectsSectionClientProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 perspective-1000">
            {projects.map((project, index) => (
                <ProjectCard key={project.slug?.current || index} project={project} index={index} />
            ))}
        </div>
    );
}
