import Desktop from "@/components/os/Desktop";
import PlainCV from "@/components/PlainCV";
import { profile, SITE_URL } from "@/lib/profile";
import { contact } from "@/lib/about";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.headline,
  description: profile.description,
  url: SITE_URL,
  email: `mailto:${contact.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Tunis", addressCountry: "TN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "ESPRIT — Private Higher School of Engineering and Technology" },
  sameAs: [contact.linkedin, contact.github, contact.kaggle],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* The desktop is drawn in the browser; this is the same content as real
          HTML for search engines and screen readers. */}
      <div className="sr-only">
        <PlainCV />
        <a href="/cv">Plain CV page</a>
      </div>
      <Desktop />
    </>
  );
}
