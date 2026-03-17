import { notFound } from "next/navigation";
import { SectionPanel } from "@/components/content-sections";
import { GardenLayoutPreview } from "@/components/garden-layout-preview";
import { PageBackdrop, TopNavigation } from "@/components/site-shell";
import { getSectionNode } from "@/lib/content";
import { getSectionConfig } from "@/lib/section-config";

export async function SectionLandingPage({ section }: { section: string }) {
  const sectionNode = await getSectionNode(section);

  if (!sectionNode || sectionNode.kind !== "folder") {
    notFound();
  }

  const config = getSectionConfig(section);

  return (
    <main className="relative overflow-hidden px-6 py-10 sm:px-8 lg:px-12">
      <PageBackdrop />

      <div className="relative mx-auto max-w-6xl">
        <TopNavigation />

        <section
          className={`border-b border-[color:var(--color-line)] pb-10 ${
            config.asset
              ? "grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-end"
              : ""
          }`}
        >
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--color-accent-strong)]">
              Section view
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl leading-none text-[color:var(--color-foreground)] sm:text-6xl">
              {sectionNode.label}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[color:var(--color-copy)] sm:text-lg">
              {config.description}
            </p>
          </div>

          {config.asset ? (
            <GardenLayoutPreview
              image={config.asset.image}
              alt={config.asset.alt}
              title={config.asset.title}
              caption={config.asset.caption}
            />
          ) : null}
        </section>

        <section className="mt-10">
          <SectionPanel eyebrow={config.eyebrow} node={sectionNode} />
        </section>
      </div>
    </main>
  );
}
