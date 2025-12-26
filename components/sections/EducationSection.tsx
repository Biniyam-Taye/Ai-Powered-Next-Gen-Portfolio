import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { EducationSectionClient } from "./EducationSectionClient";

const EDUCATION_QUERY =
  defineQuery(`*[_type == "education"] | order(endDate desc, startDate desc){
  institution,
  degree,
  fieldOfStudy,
  startDate,
  endDate,
  current,
  gpa,
  description,
  achievements,
  logo,
  website,
  order
}`);

export async function EducationSection() {
  const { data: education } = await sanityFetch({ query: EDUCATION_QUERY });

  if (!education || education.length === 0) {
    return null;
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <section
      id="education"
      className="relative py-24 px-6 overflow-hidden perspective-distant"
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <h2
            className="inline-block text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-amber-400 pb-2"
            style={{ WebkitTextStroke: "1.5px black" }}
          >
            Education
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My academic foundation and continuous learning journey.
          </p>
        </div>

        <EducationSectionClient education={education} />
      </div>
    </section>
  );
}
