import Link from "next/link";
import { notFound } from "next/navigation";
import { PageBackdrop, TopNavigation } from "@/components/site-shell";
import { getDocumentBySegments, renderMarkdown } from "@/lib/content";

export async function MarkdownDocumentPage({
  segments,
}: {
  segments: string[];
}) {
  const document = await getDocumentBySegments(segments);

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
              All designs
            </Link>
            <Link
              href={document.collectionRoute}
              className="rounded-md bg-[color:var(--color-accent-soft)] px-4 py-2 uppercase tracking-[0.18em] text-[color:var(--color-accent-strong)] transition-colors hover:bg-[color:var(--color-accent)]/14"
            >
              {document.collectionLabel}
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
              className="design-prose prose prose-stone mt-10 max-w-none prose-a:no-underline hover:prose-a:text-[color:var(--color-highlight)] prose-code:font-medium prose-headings:font-semibold prose-img:rounded-[1.5rem] prose-pre:rounded-[1.5rem] prose-table:text-sm sm:prose-lg"
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
