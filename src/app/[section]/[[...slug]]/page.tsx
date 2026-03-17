import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionPanel } from "@/components/content-sections";
import { GardenLayoutPreview } from "@/components/garden-layout-preview";
import { PageBackdrop, TopNavigation } from "@/components/site-shell";
import {
  getAllDocuments,
  getDocumentBySegments,
  getOrderedContentTree,
  getSectionNode,
  renderMarkdown,
} from "@/lib/content";
import { getSectionConfig } from "@/lib/section-config";

type PageProps = {
  params: Promise<{
    section: string;
    slug?: string[];
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const [documents, nodes] = await Promise.all([
    getAllDocuments(),
    getOrderedContentTree(),
  ]);

  const sections = nodes.filter((node) => node.kind === "folder");

  return [
    ...sections.map((section) => ({ section: section.segment })),
    ...documents.map((document) => ({
      section: document.section,
      slug: document.segments.slice(1),
    })),
  ];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { section, slug } = await params;
  const slugSegments = slug ?? [];

  if (slugSegments.length === 0) {
    const sectionNode = await getSectionNode(section);

    if (!sectionNode || sectionNode.kind !== "folder") {
      return {};
    }

    return {
      description: getSectionConfig(section).description,
      title: sectionNode.label,
    };
  }

  const document = await getDocumentBySegments([section, ...slugSegments]);

  if (!document) {
    return {};
  }

  return {
    description:
      document.summary ??
      `Markdown plan for the ${document.sectionLabel.toLowerCase()} section.`,
    title: document.title,
  };
}

async function SectionLanding({ section }: { section: string }) {
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

async function MarkdownDocument({
  section,
  slug,
}: {
  section: string;
  slug: string[];
}) {
  const document = await getDocumentBySegments([section, ...slug]);

  if (!document) {
    notFound();
  }

  const html = await renderMarkdown(document.body);

  return (
    <main className="relative overflow-hidden px-6 py-10 sm:px-8 lg:px-12">
      <PageBackdrop />

      <div className="relative mx-auto max-w-7xl">
        <TopNavigation />

        <div className="rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--color-muted)]">
            <Link
              href="/"
              className="rounded-md border border-[color:var(--color-line)] bg-white/45 px-4 py-2 transition-colors hover:border-[color:var(--color-accent)] hover:bg-white/60 hover:text-[color:var(--color-accent-strong)]"
            >
              All plans
            </Link>
            <Link
              href={`/${document.section}`}
              className="rounded-md bg-[color:var(--color-accent-soft)] px-4 py-2 uppercase tracking-[0.18em] text-[color:var(--color-accent-strong)] transition-colors hover:bg-[color:var(--color-accent)]/14"
            >
              {document.sectionLabel}
            </Link>
          </div>

          <header className="mt-8 border-b border-[color:var(--color-line)] pb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-accent-strong)]">
              Markdown document
            </p>
            <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-display)] text-5xl leading-none text-[color:var(--color-foreground)] sm:text-6xl">
              {document.displayTitle}
            </h1>
          </header>

          {document.body.trim() ? (
            <article
              className="garden-prose prose prose-stone mt-10 max-w-none prose-a:no-underline hover:prose-a:text-[color:var(--color-highlight)] prose-code:font-medium prose-headings:font-semibold prose-img:rounded-[1.5rem] prose-pre:rounded-[1.5rem] prose-table:text-sm sm:prose-lg"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <section className="mt-10 rounded-lg border border-dashed border-[color:var(--color-line)] bg-white/35 px-6 py-10 text-[color:var(--color-copy)]">
              <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
                Empty document
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[color:var(--color-foreground)]">
                No markdown content yet.
              </h2>
              <p className="mt-4 max-w-2xl leading-7">
                This route is wired correctly, but the source markdown file does
                not currently contain content.
              </p>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}

export default async function SectionOrDocumentPage({ params }: PageProps) {
  const { section, slug } = await params;
  const slugSegments = slug ?? [];

  if (slugSegments.length === 0) {
    return <SectionLanding section={section} />;
  }

  return <MarkdownDocument section={section} slug={slugSegments} />;
}
