import type { Metadata } from "next";
import frontGardenLayout from "../../../assets/front-garden-layout.jpeg";
import { GardenLayoutPreview } from "@/components/garden-layout-preview";
import { notFound } from "next/navigation";
import { SectionPanel } from "@/components/content-sections";
import { PageBackdrop, TopNavigation } from "@/components/site-shell";
import { getSectionNode } from "@/lib/content";

export const metadata: Metadata = {
  description: "Front garden markdown plans.",
  title: "Front Garden",
};

export default async function FrontGardenPage() {
  const section = await getSectionNode("front");

  if (!section) {
    notFound();
  }

  return (
    <main className="relative overflow-hidden px-6 py-10 sm:px-8 lg:px-12">
      <PageBackdrop />

      <div className="relative mx-auto max-w-6xl">
        <TopNavigation />

        <section className="grid gap-8 border-b border-[color:var(--color-line)] pb-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--color-accent-strong)]">
              Section view
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl leading-none text-[color:var(--color-foreground)] sm:text-6xl">
              Front garden
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[color:var(--color-copy)] sm:text-lg">
              This view isolates the front garden markdown plans and the current
              layout reference image.
            </p>
          </div>

          <GardenLayoutPreview
            image={frontGardenLayout}
            alt="Front garden layout plan"
            title="Front Garden Layout"
            caption="Current front garden reference layout. Click to open the full image."
          />
        </section>

        <section className="mt-10">
          <SectionPanel eyebrow="Front collection" node={section} />
        </section>
      </div>
    </main>
  );
}
