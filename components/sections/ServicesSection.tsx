import { Star, Zap } from "lucide-react";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { ServiceCard } from "./ServiceCard";

const SERVICES_QUERY =
  defineQuery(`*[_type == "service"] | order(order asc, _createdAt desc){
  title,
  slug,
  icon,
  shortDescription,
  fullDescription,
  features,
  technologies[]->{name, category},
  deliverables,
  pricing,
  timeline,
  featured,
  order
}`);

export async function ServicesSection() {
  const { data: services } = await sanityFetch({ query: SERVICES_QUERY });

  if (!services || services.length === 0) {
    return null;
  }

  // Separate featured and regular services
  const featured = services.filter((s) => s.featured);
  const regular = services.filter((s) => !s.featured);

  return (
    <section id="services" className="py-28 relative overflow-hidden bg-background">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap size={16} className="fill-current" />
            <span>Supercharged Workflow</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Elevate your digital presence with high-impact solutions. <br className="hidden md:block" />
            From concept to deployment, I've got you covered.
          </p>
        </div>

        {/* Featured Services */}
        {featured.length > 0 && (
          <div className="mb-24">
            <div className="flex items-center gap-3 mb-12">
              <div className="p-2.5 bg-yellow-500/10 rounded-xl">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Premium Packages</h3>
                <p className="text-muted-foreground text-sm">Comprehensive solutions for maximum impact</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {featured.map((service) => (
                <div key={service.slug?.current || service.title} className="h-full">
                  <ServiceCard service={service} isFeatured={true} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Services */}
        {regular.length > 0 && (
          <div>
            {featured.length > 0 && (
              <h3 className="text-2xl font-bold mb-10 tracking-tight flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-500 rounded-full" />
                Specialized Solutions
              </h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regular.map((service) => (
                <div key={service.slug?.current || service.title} className="h-full">
                  <ServiceCard service={service} isFeatured={false} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
