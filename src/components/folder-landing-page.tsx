import { notFound } from "next/navigation";
import { SectionPanel } from "@/components/content-sections";
import { LayoutPreview } from "@/components/layout-preview";
import { PageBackdrop, TopNavigation } from "@/components/site-shell";
import { VisualAssetGallery } from "@/components/visual-asset-gallery";
import { getFolderBySegments } from "@/lib/content";

export async function FolderLandingPage({
  segments,
}: {
  segments: string[];
}) {
  const folderNode = await getFolderBySegments(segments);

  if (!folderNode) {
    notFound();
  }

  return (
    <main className="relative overflow-hidden px-6 py-10 sm:px-8 lg:px-12">
      <PageBackdrop />

      <div className="relative mx-auto max-w-6xl">
        <TopNavigation />

        <section
          className={`border-b border-[color:var(--color-line)] pb-10 ${
            folderNode.asset
              ? "grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-end"
              : ""
          }`}
        >
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--color-accent-strong)]">
              Collection view
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl leading-none text-[color:var(--color-foreground)] sm:text-6xl">
              {folderNode.label}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[color:var(--color-copy)] sm:text-lg">
              {folderNode.description}
            </p>
          </div>

          {folderNode.asset ? (
            <LayoutPreview
              imageSrc={folderNode.asset.src}
              alt={folderNode.asset.alt}
              title={folderNode.asset.title}
              caption={folderNode.asset.caption}
            />
          ) : null}
        </section>

        {folderNode.visualAssets.length > 0 ? (
          <section className="mt-10">
            <VisualAssetGallery
              assets={folderNode.visualAssets}
              description="These visuals are auto-discovered from the candidate asset folder that matches this page."
              eyebrow="Companion Visuals"
              title={`${folderNode.label} Visuals`}
            />
          </section>
        ) : null}

        <section className="mt-10">
          <SectionPanel node={folderNode} />
        </section>
      </div>
    </main>
  );
}
