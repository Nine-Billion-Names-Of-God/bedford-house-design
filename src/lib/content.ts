import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const CONTENT_ROOT = path.join(process.cwd(), "md");
const MARKDOWN_EXTENSION = ".md";

export type DocumentEntry = {
  body: string;
  displayTitle: string;
  listTitle: string;
  modelName: string;
  modelSlug: string;
  optionNumber: number | null;
  pathLabel: string;
  route: string;
  section: string;
  sectionLabel: string;
  segments: string[];
  slug: string;
  sourcePath: string;
  summary: string | null;
  title: string;
};

export type ContentTreeNode =
  | {
      children: ContentTreeNode[];
      kind: "folder";
      label: string;
      route: string;
      segment: string;
    }
  | {
      document: DocumentEntry;
      kind: "document";
      label: string;
      route: string;
      segment: string;
    };

function humanizeSegment(segment: string) {
  return segment
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatSectionLabel(section: string) {
  const normalized = section.toLowerCase();

  if (normalized === "front") {
    return "Front Garden";
  }

  if (normalized === "back") {
    return "Back Garden";
  }

  return humanizeSegment(section);
}

function formatModelName(segment: string) {
  const normalized = segment.toLowerCase();

  if (normalized === "chatgpt") {
    return "ChatGPT";
  }

  if (normalized === "claude") {
    return "Claude";
  }

  return humanizeSegment(segment);
}

function formatDocumentTitle(sectionLabel: string, slug: string) {
  const optionMatch = slug.match(/^(.*)-(\d+)$/);

  if (!optionMatch) {
    return `${sectionLabel} · ${humanizeSegment(slug)} · Design`;
  }

  const [, rawModelName, optionNumber] = optionMatch;

  return `${sectionLabel} · ${formatModelName(rawModelName)} · Design Option ${optionNumber}`;
}

function parseDocumentIdentity(slug: string) {
  const optionMatch = slug.match(/^(.*)-(\d+)$/);

  if (!optionMatch) {
    return {
      listTitle: humanizeSegment(slug),
      modelName: humanizeSegment(slug),
      modelSlug: slug.toLowerCase(),
      optionNumber: null,
    };
  }

  const [, rawModelName, rawOptionNumber] = optionMatch;
  const optionNumber = Number(rawOptionNumber);

  return {
    listTitle: `Design Option ${optionNumber}`,
    modelName: formatModelName(rawModelName),
    modelSlug: rawModelName.toLowerCase(),
    optionNumber,
  };
}

function stripMarkdown(markdown: string) {
  return markdown
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_~>#-]/g, " ")
    .replace(/\|/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractSummary(source: string) {
  const lines = source.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (
      !line ||
      line.startsWith("#") ||
      line.startsWith("|") ||
      line === "---" ||
      line === "***" ||
      line.startsWith("- ") ||
      line.startsWith("* ") ||
      /^\d+\.\s/.test(line)
    ) {
      continue;
    }

    const cleaned = stripMarkdown(line);

    if (cleaned.length > 40) {
      return cleaned;
    }
  }

  return null;
}

async function readMarkdownDirectory(
  directory: string,
): Promise<DocumentEntry[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const sortedEntries = entries.sort((left, right) =>
    left.name.localeCompare(right.name),
  );

  const documents: DocumentEntry[] = [];

  for (const entry of sortedEntries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      documents.push(...(await readMarkdownDirectory(fullPath)));
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith(MARKDOWN_EXTENSION)) {
      continue;
    }

    const source = await fs.readFile(fullPath, "utf8");
    const relativePath = path.relative(CONTENT_ROOT, fullPath);
    const routePath = relativePath.slice(0, -MARKDOWN_EXTENSION.length);
    const segments = routePath.split(path.sep);
    const slug = segments.at(-1) ?? routePath;
    const section = segments[0] ?? "content";
    const sectionLabel = formatSectionLabel(section);
    const documentIdentity = parseDocumentIdentity(slug);

    documents.push({
      body: source,
      displayTitle: formatDocumentTitle(sectionLabel, slug),
      listTitle: documentIdentity.listTitle,
      modelName: documentIdentity.modelName,
      modelSlug: documentIdentity.modelSlug,
      optionNumber: documentIdentity.optionNumber,
      pathLabel: routePath.split(path.sep).join(" / "),
      route: `/${routePath.split(path.sep).join("/")}`,
      section,
      sectionLabel,
      segments,
      slug,
      sourcePath: fullPath,
      summary: extractSummary(source),
      title: formatDocumentTitle(sectionLabel, slug),
    });
  }

  return documents;
}

export const getAllDocuments = cache(async () => {
  const documents = await readMarkdownDirectory(CONTENT_ROOT);

  return documents.sort((left, right) =>
    left.route.localeCompare(right.route, undefined, { numeric: true }),
  );
});

export const getDocumentBySegments = cache(async (segments: string[]) => {
  const documents = await getAllDocuments();

  return (
    documents.find(
      (document) =>
        document.segments.length === segments.length &&
        document.segments.every((segment, index) => segment === segments[index]),
    ) ?? null
  );
});

export const renderMarkdown = cache(async (source: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(source);

  return String(result);
});

export async function getContentTree() {
  const documents = await getAllDocuments();
  const root: ContentTreeNode = {
    children: [],
    kind: "folder",
    label: "Root",
    route: "/",
    segment: "",
  };

  for (const document of documents) {
    let currentNode = root;

    document.segments.forEach((segment, index) => {
      const isLeaf = index === document.segments.length - 1;

      if (isLeaf) {
        currentNode.children.push({
          document,
          kind: "document",
          label: document.listTitle,
          route: document.route,
          segment,
        });

        return;
      }

      let nextNode = currentNode.children.find(
        (node) => node.kind === "folder" && node.segment === segment,
      );

      if (!nextNode || nextNode.kind !== "folder") {
        nextNode = {
          children: [],
          kind: "folder",
          label:
            index === 0 ? formatSectionLabel(segment) : humanizeSegment(segment),
          route: `/${document.segments.slice(0, index + 1).join("/")}`,
          segment,
        };

        currentNode.children.push(nextNode);
      }

      currentNode = nextNode;
    });
  }

  const sortNodes = (nodes: ContentTreeNode[]) => {
    nodes.sort((left, right) => {
      if (left.kind !== right.kind) {
        return left.kind === "folder" ? -1 : 1;
      }

      if (left.kind === "document" && right.kind === "document") {
        return left.document.slug.localeCompare(right.document.slug, undefined, {
          numeric: true,
        });
      }

      return left.label.localeCompare(right.label, undefined, {
        numeric: true,
      });
    });

    nodes.forEach((node) => {
      if (node.kind === "folder") {
        sortNodes(node.children);
      }
    });
  };

  sortNodes(root.children);

  return root.children;
}

const PREFERRED_SECTION_ORDER = ["front", "back"];

export function orderTopLevelNodes(nodes: ContentTreeNode[]) {
  return [...nodes].sort((left, right) => {
    const leftIndex = PREFERRED_SECTION_ORDER.indexOf(left.segment);
    const rightIndex = PREFERRED_SECTION_ORDER.indexOf(right.segment);

    if (leftIndex !== -1 || rightIndex !== -1) {
      if (leftIndex === -1) {
        return 1;
      }

      if (rightIndex === -1) {
        return -1;
      }

      return leftIndex - rightIndex;
    }

    return left.label.localeCompare(right.label, undefined, {
      numeric: true,
    });
  });
}

export async function getOrderedContentTree() {
  const nodes = await getContentTree();

  return orderTopLevelNodes(nodes);
}

export async function getSectionNode(section: string) {
  const nodes = await getContentTree();

  return (
    nodes.find((node) => node.kind === "folder" && node.segment === section) ??
    null
  );
}

export function countDocuments(node: ContentTreeNode): number {
  if (node.kind === "document") {
    return 1;
  }

  return node.children.reduce(
    (total, childNode) => total + countDocuments(childNode),
    0,
  );
}
