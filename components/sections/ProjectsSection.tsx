import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { ProjectsSectionClient } from "./ProjectsSectionClient";

const PROJECTS_QUERY =
  defineQuery(`*[_type == "project" && featured == true] | order(order asc){
  title,
  slug,
  tagline,
  category,
  liveUrl,
  githubUrl,
  coverImage,
  technologies[]->{name, category, color}
}`);

export async function ProjectsSection() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="py-24 px-6 bg-muted/10 overflow-hidden perspective-distant relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <h2
            className="inline-block text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-amber-400 pb-2"
            style={{ WebkitTextStroke: "1.5px black" }}
          >
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground">Some of my best work</p>
        </div>

        <ProjectsSectionClient projects={projects} />
      </div>
    </section>
  );
}
