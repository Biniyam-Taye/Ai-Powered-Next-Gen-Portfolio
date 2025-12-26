import { IconStar, IconTrophy } from "@tabler/icons-react";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { AchievementCard } from "./AchievementCard";

const ACHIEVEMENTS_QUERY =
  defineQuery(`*[_type == "achievement"] | order(date desc){
  title,
  type,
  issuer,
  date,
  description,
  image,
  url,
  featured,
  order
}`);

export async function AchievementsSection() {
  const { data: achievements } = await sanityFetch({
    query: ACHIEVEMENTS_QUERY,
  });

  if (!achievements || achievements.length === 0) {
    return null;
  }

  // Separate featured and regular achievements
  const featured = achievements.filter((a) => a.featured);
  const regular = achievements.filter((a) => !a.featured);

  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-muted/20">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <IconTrophy size={16} />
            <span>Excellence in Code</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Achievements</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real-world solutions across frontend, backend, and AI-powered
            systems demonstrating technical depth and product mindset.
          </p>
        </div>

        {/* Featured Achievements */}
        {featured.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <IconStar className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">Technical Depth</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featured.map((achievement) => (
                <div key={`${achievement.title}-${achievement.date}`} className="h-full">
                  <AchievementCard achievement={achievement} isFeatured={true} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Achievements */}
        {regular.length > 0 && (
          <div>
            {featured.length > 0 && (
              <h3 className="text-2xl font-bold mb-10 tracking-tight flex items-center gap-2">
                <span className="w-2 h-8 bg-primary rounded-full" />
                Core Principles & Milestones
              </h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regular.map((achievement) => (
                <div key={`${achievement.title}-${achievement.date}`} className="h-full">
                  <AchievementCard achievement={achievement} isFeatured={false} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

