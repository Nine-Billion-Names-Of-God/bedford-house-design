import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionPanel } from "@/components/content-sections";
import { PageBackdrop, TopNavigation } from "@/components/site-shell";
import { getSectionNode } from "@/lib/content";

export const metadata: Metadata = {
  description: "Back garden markdown plans.",
  title: "Back Garden",
};

export default async function BackGardenPage() {
  const section = await getSectionNode("back");

  if (!section) {
    notFound();
  }

  return (
    <main className="relative overflow-hidden px-6 py-10 sm:px-8 lg:px-12">
      <PageBackdrop />

      <div className="relative mx-auto max-w-6xl">
        <TopNavigation />

        <section className="max-w-3xl border-b border-[color:var(--color-line)] pb-10">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--color-accent-strong)]">
            Section view
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl leading-none text-[color:var(--color-foreground)] sm:text-6xl">
            Back garden
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[color:var(--color-copy)] sm:text-lg">
            This view isolates the back garden markdown plans.
          </p>
        </section>

        <section className="mt-10">
          <SectionPanel eyebrow="Back collection" node={section} />
        </section>
      </div>
    </main>
  );
}
