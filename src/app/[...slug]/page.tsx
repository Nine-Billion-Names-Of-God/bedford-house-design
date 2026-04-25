import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FolderLandingPage } from "@/components/folder-landing-page";
import { MarkdownDocumentPage } from "@/components/markdown-document-page";
import {
  getAllDocuments,
  getAllFolders,
  getDocumentBySegments,
  getFolderBySegments,
} from "@/lib/content";

type PageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const [folders, documents] = await Promise.all([getAllFolders(), getAllDocuments()]);

  return [
    ...folders.map((folder) => ({ slug: folder.segments })),
    ...documents.map((document) => ({ slug: document.segments })),
  ];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const document = await getDocumentBySegments(slug);

  if (document) {
    return {
      description:
        document.summary ??
        `Markdown plan in the ${document.collectionLabel.toLowerCase()} collection.`,
      title: document.title,
    };
  }

  const folder = await getFolderBySegments(slug);

  if (folder) {
    return {
      description: folder.description,
      title: folder.label,
    };
  }

  return {};
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;
  const document = await getDocumentBySegments(slug);

  if (document) {
    return <MarkdownDocumentPage segments={slug} />;
  }

  const folder = await getFolderBySegments(slug);

  if (folder) {
    return <FolderLandingPage segments={slug} />;
  }

  notFound();
}
