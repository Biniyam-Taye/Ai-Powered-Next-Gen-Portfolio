import Link from "next/link";
import { defineQuery } from "next-sanity";
import WorldMapDemo from "@/components/world-map-demo";
import { sanityFetch } from "@/sanity/lib/live";
import { ContactForm } from "./ContactForm";
import { ContactInfoCard } from "./ContactInfoCard";
import { LocationCard } from "./LocationCard";

const PROFILE_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  email,
  phone,
  location,
  socialLinks
}`);

export async function ContactSection() {
  const { data: profile } = await sanityFetch({ query: PROFILE_QUERY });

  if (!profile) {
    return null;
  }

  const socialPlatforms = [
    { name: "GitHub", url: profile.socialLinks?.github, icon: "github" },
    { name: "LinkedIn", url: profile.socialLinks?.linkedin, icon: "linkedin" },
    { name: "Twitter", url: profile.socialLinks?.twitter, icon: "twitter" },
    { name: "Website", url: profile.socialLinks?.website, icon: "globe" },
    { name: "YouTube", url: profile.socialLinks?.youtube, icon: "youtube" },
  ].filter(platform => platform.url);

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <WorldMapDemo />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
            </svg>
            <span>Let's Connect</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-blue-600">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Wherever you are in the world, let's work together on your next project. <br className="hidden md:block" />
            I'm just a message away.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-gradient-to-b from-primary to-purple-500 rounded-full" />
                Contact Information
              </h3>

              <div className="space-y-4">
                {profile.email && (
                  <ContactInfoCard
                    icon="mail"
                    label="Email"
                    value={profile.email}
                    href={`mailto:${profile.email}`}
                    gradient="from-primary to-purple-600"
                  />
                )}

                {profile.phone && (
                  <ContactInfoCard
                    icon="phone"
                    label="Phone"
                    value={profile.phone}
                    href={`tel:${profile.phone}`}
                    gradient="from-blue-500 to-cyan-600"
                  />
                )}

                {profile.location && (
                  <LocationCard
                    value={profile.location}
                    gradient="from-emerald-500 to-teal-600"
                    mapQuery="Arba Minch, Ethiopia"
                  />
                )}
              </div>
            </div>

            {/* Social Links */}
            {socialPlatforms.length > 0 && (
              <div>
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Follow Me
                </h4>
                <div className="flex flex-wrap gap-3">
                  {socialPlatforms.map((platform) => (
                    <Link
                      key={platform.name}
                      href={platform.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                    >
                      <div className={`absolute -inset-0.5 bg-gradient-to-r ${platform.icon === 'github' ? 'from-gray-600 to-gray-800' :
                        platform.icon === 'linkedin' ? 'from-blue-600 to-blue-800' :
                          platform.icon === 'twitter' ? 'from-sky-500 to-blue-600' :
                            platform.icon === 'globe' ? 'from-emerald-500 to-teal-600' :
                              'from-red-600 to-red-800'
                        } rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300`} />
                      <div className="relative px-5 py-2.5 bg-card border-2 border-border/50 rounded-xl font-semibold text-sm transition-all duration-300 group-hover:border-transparent group-hover:scale-105">
                        {platform.name}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Contact Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
