import type { Metadata } from "next";
import Link from "next/link";
import PlainCV from "@/components/PlainCV";

export const metadata: Metadata = {
  title: "CV",
  description: "Ramy Gharbi: experience, projects, skills and education on one plain page.",
  alternates: { canonical: "/cv" },
};

export default function CvPage() {
  return (
    // the body is locked for the desktop UI, so this page scrolls in its own container
    <div className="h-dvh overflow-y-auto bg-(--color-paper) print:h-auto print:overflow-visible">
      <main className="mx-auto max-w-3xl px-5 sm:px-8 py-10 sm:py-14">
        <Link
          href="/"
          className="inline-block mb-8 text-[13px] font-medium text-(--color-accent) hover:underline print:hidden"
        >
          ← Back to the interactive desktop
        </Link>
        <PlainCV />
      </main>
    </div>
  );
}
