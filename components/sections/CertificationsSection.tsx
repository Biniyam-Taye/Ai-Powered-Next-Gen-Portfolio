import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { CertificationsSectionClient } from "./CertificationsSectionClient";
import { IconCertificate } from "@tabler/icons-react";

const CERTIFICATIONS_QUERY =
  defineQuery(`*[_type == "certification"] | order(issueDate desc){
  name,
  issuer,
  issueDate,
  expiryDate,
  credentialId,
  credentialUrl,
  logo,
  description,
  skills[]->{name, category},
  order
}`);

export async function CertificationsSection() {
  const { data: certifications } = await sanityFetch({
    query: CERTIFICATIONS_QUERY,
  });

  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <section
      id="certifications"
      className="py-24 px-6 bg-gradient-to-b from-background via-muted/5 to-background overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <IconCertificate size={16} />
            <span>Professional Standards</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Certifications</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Verified credentials demonstrating commitment to continuous learning and technical excellence.
          </p>
        </div>

        <CertificationsSectionClient certifications={certifications} />
      </div>
    </section>
  );
}
