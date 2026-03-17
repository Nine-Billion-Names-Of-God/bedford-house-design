import type { Metadata } from "next";
import { MarkdownDocumentPage } from "@/components/markdown-document-page";
import { getAllDocuments, getDocumentBySegments } from "@/lib/content";

type PageProps = {
  params: Promise<{
    section: string;
    slug: string[];
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const documents = await getAllDocuments();

  return documents.map((document) => ({
    section: document.section,
    slug: document.segments.slice(1),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { section, slug } = await params;
  const document = await getDocumentBySegments([section, ...slug]);

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

export default async function DocumentPage({ params }: PageProps) {
  const { section, slug } = await params;

  return <MarkdownDocumentPage section={section} slug={slug} />;
}
