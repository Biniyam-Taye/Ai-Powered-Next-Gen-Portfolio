import {
  AboutSection,
  AchievementsSection,
  BlogSection,
  CertificationsSection,
  ContactSection,
  EducationSection,
  ExperienceSection,
  HeroSection,
  ProjectsSection,
  ServicesSection,
  SkillsSection,
  TestimonialsSection,
  DownloadCVSection, // Imported
} from "@/components/sections";

async function PortfolioContent() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      {/* <TestimonialsSection /> */}
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <CertificationsSection />
      <AchievementsSection />
      <ServicesSection />
      <DownloadCVSection />
      {/* <BlogSection /> */}
      <ContactSection />
    </>
  );
}

export default PortfolioContent;
