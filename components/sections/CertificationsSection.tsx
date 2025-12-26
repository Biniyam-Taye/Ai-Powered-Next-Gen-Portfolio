import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { CertificationsSectionClient } from "./CertificationsSectionClient";

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
      className="py-20 px-6 bg-gradient-to-b from-background via-muted/5 to-background overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Certifications
          </h2>
          <p className="text-xl text-muted-foreground">
            Professional credentials and certifications
          </p>
        </div>

        <CertificationsSectionClient certifications={certifications} />
      </div>
    </section>
  );
}
