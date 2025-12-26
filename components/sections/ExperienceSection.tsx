import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { ExperienceSectionClient } from "./ExperienceSectionClient";

const EXPERIENCE_QUERY =
  defineQuery(`*[_type == "experience"] | order(startDate desc){
  company,
  position,
  employmentType,
  location,
  startDate,
  endDate,
  current,
  description,
  responsibilities,
  achievements,
  technologies[]->{name, category},
  companyLogo,
  companyWebsite
}`);

export async function ExperienceSection() {
  const { data: experiences } = await sanityFetch({ query: EXPERIENCE_QUERY });

  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="py-20 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">
            Work Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the impact I've delivered along the way.
          </p>
        </div>

        <ExperienceSectionClient experiences={experiences} />
      </div>
    </section>
  );
}
