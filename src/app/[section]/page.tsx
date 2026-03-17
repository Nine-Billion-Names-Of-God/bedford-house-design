import type { Metadata } from "next";
import { SectionLandingPage } from "@/components/section-landing-page";
import { getOrderedContentTree, getSectionNode } from "@/lib/content";
import { getSectionConfig } from "@/lib/section-config";

type PageProps = {
  params: Promise<{
    section: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const nodes = await getOrderedContentTree();

  return nodes
    .filter((node) => node.kind === "folder")
    .map((node) => ({ section: node.segment }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { section } = await params;
  const sectionNode = await getSectionNode(section);

  if (!sectionNode || sectionNode.kind !== "folder") {
    return {};
  }

  return {
    description: getSectionConfig(section).description,
    title: sectionNode.label,
  };
}

export default async function SectionPage({ params }: PageProps) {
  const { section } = await params;

  return <SectionLandingPage section={section} />;
}
