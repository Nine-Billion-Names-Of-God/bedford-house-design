import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageBackdrop, TopNavigation } from "@/components/site-shell";
import {
  getAllDocuments,
  getDocumentBySegments,
  renderMarkdown,
} from "@/lib/content";

type PageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const documents = await getAllDocuments();

  return documents.map((document) => ({
    slug: document.segments,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const document = await getDocumentBySegments(slug);

  if (!document) {
    return {};
  }

  return {
    description:
      document.summary ??
      `Markdown plan for the ${document.sectionLabel.toLowerCase()} garden.`,
    title: document.title,
  };
}

export default async function MarkdownDocumentPage({ params }: PageProps) {
  const { slug } = await params;
  const document = await getDocumentBySegments(slug);

  if (!document) {
    notFound();
  }

  const html = await renderMarkdown(document.body);

  return (
    <main className="relative overflow-hidden px-6 py-10 sm:px-8 lg:px-12">
      <PageBackdrop />

      <div className="relative mx-auto max-w-7xl">
        <TopNavigation />

        <div className="rounded-[2rem] border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-6 shadow-[0_28px_90px_rgba(55,73,58,0.08)] backdrop-blur sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--color-muted)]">
            <Link
              href="/"
              className="rounded-full border border-[color:var(--color-line)] bg-white/65 px-4 py-2 transition-colors hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent-strong)]"
            >
              All plans
            </Link>
            <span className="rounded-full bg-[color:var(--color-accent-soft)] px-4 py-2 uppercase tracking-[0.18em] text-[color:var(--color-accent-strong)]">
              {document.sectionLabel}
            </span>
            <span className="text-xs uppercase tracking-[0.18em]">
              {document.pathLabel}
            </span>
          </div>

          <header className="mt-8 border-b border-[color:var(--color-line)] pb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-accent-strong)]">
              Markdown document
            </p>
            <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-display)] text-5xl leading-none text-[color:var(--color-foreground)] sm:text-6xl">
              {document.title}
            </h1>
            {document.summary ? (
              <p className="mt-5 max-w-3xl text-base leading-8 text-[color:var(--color-copy)] sm:text-lg">
                {document.summary}
              </p>
            ) : null}
          </header>

          {document.body.trim() ? (
            <article
              className="garden-prose prose prose-stone mt-10 max-w-none prose-a:no-underline hover:prose-a:text-[color:var(--color-highlight)] prose-code:font-medium prose-headings:font-semibold prose-img:rounded-[1.5rem] prose-pre:rounded-[1.5rem] prose-table:text-sm sm:prose-lg"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <section className="mt-10 rounded-[1.75rem] border border-dashed border-[color:var(--color-line)] bg-white/50 px-6 py-10 text-[color:var(--color-copy)]">
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
