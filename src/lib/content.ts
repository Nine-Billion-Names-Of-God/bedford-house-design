import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const DESIGNS_ROOT = path.join(process.cwd(), "designs");
const CONTENT_DIRECTORY_NAME = "content";
const MARKDOWN_EXTENSION = ".md";
const META_FILENAME = "_meta.json";
const RASTER_EXTENSIONS = [".png", ".webp", ".jpg", ".jpeg", ".gif", ".avif"];
const VECTOR_EXTENSIONS = [".svg"];

type RawAssetMetadata = {
  alt?: string;
  caption?: string;
  path?: string;
  title?: string;
};

type RawFolderMetadata = {
  asset?: RawAssetMetadata;
  description?: string;
  eyebrow?: string;
  label?: string;
  order?: number;
};

export type AssetConfig = {
  alt: string;
  caption: string;
  path: string;
  src: string;
  title: string;
};

export type VisualAsset = {
  alt: string;
  caption: string;
  downloadSrc: string;
  filename: string;
  key: string;
  previewSrc: string;
  sourcePath: string;
  title: string;
  vectorSrc?: string;
};

export type DocumentEntry = {
  body: string;
  collectionLabel: string;
  collectionRoute: string;
  displayTitle: string;
  domain: string;
  domainLabel: string;
  listTitle: string;
  modelName: string;
  modelSlug: string;
  optionNumber: number | null;
  pathLabel: string;
  route: string;
  segments: string[];
  slug: string;
  sourcePath: string;
  summary: string | null;
  title: string;
  visualAssets: VisualAsset[];
};

export type FolderEntry = {
  asset?: AssetConfig;
  children: ContentTreeNode[];
  description: string;
  domain: string;
  domainLabel: string;
  eyebrow: string;
  kind: "folder";
  label: string;
  order: number | null;
  route: string;
  segment: string;
  segments: string[];
  sourcePath: string;
  visualAssets: VisualAsset[];
};

export type ContentTreeNode =
  | FolderEntry
  | {
      document: DocumentEntry;
      kind: "document";
      label: string;
      route: string;
      segment: string;
    };

type SiteContent = {
  documents: DocumentEntry[];
  folders: FolderEntry[];
  tree: FolderEntry[];
};

const VISUAL_ASSET_COPY: Record<string, { caption: string; title: string }> = {
  "back-wall-elevation": {
    caption: "Back wall elevation view.",
    title: "Back Wall Elevation",
  },
  "left-wall-elevation": {
    caption: "Left wall elevation view.",
    title: "Left Wall Elevation",
  },
  "right-wall-elevation": {
    caption: "Right wall elevation view.",
    title: "Right Wall Elevation",
  },
  "side-bay-workbench-view": {
    caption: "Interior perspective focused on the side bay and workbench area.",
    title: "Side Bay Workbench View",
  },
  "top-down-plan": {
    caption: "Dimensioned top-down plan.",
    title: "Top-Down Plan",
  },
  "view-from-door": {
    caption: "Interior perspective from the doorway looking inward.",
    title: "View From Door",
  },
};

function humanizeSegment(segment: string) {
  return segment
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
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

function formatDocumentTitle(collectionLabel: string, slug: string) {
  const optionMatch = slug.match(/^(.*)-(\d+)$/);

  if (!optionMatch) {
    return `${collectionLabel} · ${humanizeSegment(slug)} · Design`;
  }

  const [, rawModelName, optionNumber] = optionMatch;

  return `${collectionLabel} · ${formatModelName(rawModelName)} · Design Option ${optionNumber}`;
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

function matchesSegments(
  leftSegments: string[],
  rightSegments: string[],
): boolean {
  return (
    leftSegments.length === rightSegments.length &&
    leftSegments.every((segment, index) => segment === rightSegments[index])
  );
}

function toRoute(segments: string[]) {
  return `/${segments.join("/")}`;
}

function buildAssetSrc(domain: string, assetPath: string) {
  return `/design-assets/${[domain, ...assetPath.split("/")].map(encodeURIComponent).join("/")}`;
}

function describeVisualAsset(baseName: string) {
  return (
    VISUAL_ASSET_COPY[baseName] ?? {
      caption: `${humanizeSegment(baseName)} visual asset.`,
      title: humanizeSegment(baseName),
    }
  );
}

function compareOrderedValues(
  leftOrder: number | null | undefined,
  rightOrder: number | null | undefined,
) {
  const normalizedLeft = leftOrder ?? Number.MAX_SAFE_INTEGER;
  const normalizedRight = rightOrder ?? Number.MAX_SAFE_INTEGER;

  if (normalizedLeft !== normalizedRight) {
    return normalizedLeft - normalizedRight;
  }

  return 0;
}

function compareNodes(left: ContentTreeNode, right: ContentTreeNode) {
  if (left.kind !== right.kind) {
    return left.kind === "folder" ? -1 : 1;
  }

  if (left.kind === "folder" && right.kind === "folder") {
    return (
      compareOrderedValues(left.order, right.order) ||
      left.label.localeCompare(right.label, undefined, { numeric: true })
    );
  }

  if (left.kind === "document" && right.kind === "document") {
    return left.document.slug.localeCompare(right.document.slug, undefined, {
      numeric: true,
    });
  }

  return left.label.localeCompare(right.label, undefined, { numeric: true });
}

async function pathExists(targetPath: string) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function readFolderMetadata(
  metadataPath: string,
): Promise<RawFolderMetadata> {
  if (!(await pathExists(metadataPath))) {
    return {};
  }

  try {
    const source = await fs.readFile(metadataPath, "utf8");
    const parsed = JSON.parse(source);

    if (!parsed || typeof parsed !== "object") {
      return {};
    }

    return parsed as RawFolderMetadata;
  } catch {
    return {};
  }
}

function getVisualAssetDirectory(domain: string, relativeSegments: string[]) {
  return path.join(DESIGNS_ROOT, domain, "assets", ...relativeSegments);
}

async function readVisualAssets(
  domain: string,
  relativeSegments: string[],
): Promise<VisualAsset[]> {
  if (relativeSegments.length < 2) {
    return [];
  }

  const directory = getVisualAssetDirectory(domain, relativeSegments);

  if (!(await pathExists(directory))) {
    return [];
  }

  const entries = await fs.readdir(directory, { withFileTypes: true });
  const groupedEntries = new Map<
    string,
    {
      ext: string;
      filename: string;
    }[]
  >();

  entries.forEach((entry) => {
    if (
      !entry.isFile() ||
      entry.name.startsWith(".") ||
      entry.name === META_FILENAME
    ) {
      return;
    }

    const extension = path.extname(entry.name).toLowerCase();

    if (
      !RASTER_EXTENSIONS.includes(extension) &&
      !VECTOR_EXTENSIONS.includes(extension)
    ) {
      return;
    }

    const baseName = entry.name.slice(0, -extension.length);
    const existingGroup = groupedEntries.get(baseName);

    if (existingGroup) {
      existingGroup.push({ ext: extension, filename: entry.name });
      return;
    }

    groupedEntries.set(baseName, [{ ext: extension, filename: entry.name }]);
  });

  const orderedAssets = [...groupedEntries.entries()].sort(([left], [right]) => {
    const leftOrder = Object.keys(VISUAL_ASSET_COPY).indexOf(left);
    const rightOrder = Object.keys(VISUAL_ASSET_COPY).indexOf(right);

    if (leftOrder !== -1 || rightOrder !== -1) {
      if (leftOrder === -1) {
        return 1;
      }

      if (rightOrder === -1) {
        return -1;
      }

      return leftOrder - rightOrder;
    }

    return left.localeCompare(right, undefined, { numeric: true });
  });

  return orderedAssets.flatMap(([baseName, files]) => {
    const previewFile =
      RASTER_EXTENSIONS.map((extension) =>
        files.find((file) => file.ext === extension),
      ).find(Boolean) ??
      VECTOR_EXTENSIONS.map((extension) =>
        files.find((file) => file.ext === extension),
      ).find(Boolean);

    if (!previewFile) {
      return [];
    }

    const vectorFile = files.find((file) => file.ext === ".svg");
    const copy = describeVisualAsset(baseName);
    const previewRelativePath = [...relativeSegments, previewFile.filename].join("/");
    const vectorRelativePath = vectorFile
      ? [...relativeSegments, vectorFile.filename].join("/")
      : null;

    return [
      {
        alt: copy.title,
        caption: copy.caption,
        downloadSrc: buildAssetSrc(
          domain,
          vectorRelativePath ?? previewRelativePath,
        ),
        filename: previewFile.filename,
        key: `${domain}:${relativeSegments.join("/")}:${baseName}`,
        previewSrc: buildAssetSrc(domain, previewRelativePath),
        sourcePath: path.join(directory, previewFile.filename),
        title: copy.title,
        vectorSrc: vectorRelativePath
          ? buildAssetSrc(domain, vectorRelativePath)
          : undefined,
      },
    ];
  });
}

function resolveAssetConfig(
  domain: string,
  asset: RawAssetMetadata | undefined,
): AssetConfig | undefined {
  if (
    !asset ||
    typeof asset.path !== "string" ||
    typeof asset.alt !== "string" ||
    typeof asset.caption !== "string" ||
    typeof asset.title !== "string"
  ) {
    return undefined;
  }

  return {
    alt: asset.alt,
    caption: asset.caption,
    path: asset.path,
    src: buildAssetSrc(domain, asset.path),
    title: asset.title,
  };
}

type ReadFolderArgs = {
  domain: string;
  domainLabel: string;
  folderPath: string;
  initialMetadata?: RawFolderMetadata;
  relativeSegments: string[];
};

async function readFolder({
  domain,
  domainLabel,
  folderPath,
  initialMetadata,
  relativeSegments,
}: ReadFolderArgs): Promise<FolderEntry> {
  const metadata =
    initialMetadata ??
    (await readFolderMetadata(path.join(folderPath, META_FILENAME)));
  const segment = relativeSegments.at(-1) ?? domain;
  const routeSegments = [domain, ...relativeSegments];
  const visualAssets = await readVisualAssets(domain, relativeSegments);
  const label =
    metadata.label ??
    (relativeSegments.length === 0 ? humanizeSegment(domain) : humanizeSegment(segment));
  const children: ContentTreeNode[] = [];
  const entries = await fs.readdir(folderPath, { withFileTypes: true });
  const sortedEntries = entries.sort((left, right) =>
    left.name.localeCompare(right.name, undefined, { numeric: true }),
  );

  for (const entry of sortedEntries) {
    if (entry.name.startsWith(".") || entry.name === META_FILENAME) {
      continue;
    }

    const fullPath = path.join(folderPath, entry.name);

    if (entry.isDirectory()) {
      children.push(
        await readFolder({
          domain,
          domainLabel,
          folderPath: fullPath,
          relativeSegments: [...relativeSegments, entry.name],
        }),
      );
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith(MARKDOWN_EXTENSION)) {
      continue;
    }

    const source = await fs.readFile(fullPath, "utf8");
    const slug = entry.name.slice(0, -MARKDOWN_EXTENSION.length);
    const segments = [...routeSegments, slug];
    const documentIdentity = parseDocumentIdentity(slug);

    children.push({
      document: {
        body: source,
        collectionLabel: label,
        collectionRoute: toRoute(routeSegments),
        displayTitle: formatDocumentTitle(label, slug),
        domain,
        domainLabel,
        listTitle: documentIdentity.listTitle,
        modelName: documentIdentity.modelName,
        modelSlug: documentIdentity.modelSlug,
        optionNumber: documentIdentity.optionNumber,
        pathLabel: segments.join(" / "),
        route: toRoute(segments),
        segments,
        slug,
        sourcePath: fullPath,
        summary: extractSummary(source),
        title: formatDocumentTitle(label, slug),
        visualAssets,
      },
      kind: "document",
      label: documentIdentity.listTitle,
      route: toRoute(segments),
      segment: slug,
    });
  }

  children.sort(compareNodes);

  return {
    asset: resolveAssetConfig(domain, metadata.asset),
    children,
    description:
      metadata.description ??
      `Browse markdown plans and reference material for ${label.toLowerCase()}.`,
    domain,
    domainLabel,
    eyebrow:
      metadata.eyebrow ?? (relativeSegments.length === 0 ? "Design domain" : "Collection"),
    kind: "folder",
    label,
    order: typeof metadata.order === "number" ? metadata.order : null,
    route: toRoute(routeSegments),
    segment,
    segments: routeSegments,
    sourcePath: folderPath,
    visualAssets,
  };
}

async function readDomain(domain: string): Promise<FolderEntry | null> {
  const domainPath = path.join(DESIGNS_ROOT, domain);
  const contentPath = path.join(domainPath, CONTENT_DIRECTORY_NAME);

  if (!(await pathExists(contentPath))) {
    return null;
  }

  const domainMetadata = await readFolderMetadata(path.join(domainPath, META_FILENAME));
  const domainLabel = domainMetadata.label ?? humanizeSegment(domain);

  return readFolder({
    domain,
    domainLabel,
    folderPath: contentPath,
    initialMetadata: domainMetadata,
    relativeSegments: [],
  });
}

function collectSiteContent(tree: FolderEntry[]) {
  const folders: FolderEntry[] = [];
  const documents: DocumentEntry[] = [];

  const walk = (folder: FolderEntry) => {
    folders.push(folder);

    folder.children.forEach((child) => {
      if (child.kind === "folder") {
        walk(child);
        return;
      }

      documents.push(child.document);
    });
  };

  tree.forEach(walk);

  return { documents, folders, tree };
}

const getSiteContent = cache(async (): Promise<SiteContent> => {
  if (!(await pathExists(DESIGNS_ROOT))) {
    return {
      documents: [],
      folders: [],
      tree: [],
    };
  }

  const entries = await fs.readdir(DESIGNS_ROOT, { withFileTypes: true });
  const domains = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
      .map((entry) => readDomain(entry.name)),
  );
  const tree = domains
    .filter((folder): folder is FolderEntry => folder !== null)
    .sort((left, right) => compareNodes(left, right));

  return collectSiteContent(tree);
});

export const getAllDocuments = cache(async () => {
  const content = await getSiteContent();

  return [...content.documents].sort((left, right) =>
    left.route.localeCompare(right.route, undefined, { numeric: true }),
  );
});

export const getAllFolders = cache(async () => {
  const content = await getSiteContent();

  return content.folders;
});

export async function getOrderedContentTree() {
  const content = await getSiteContent();

  return content.tree;
}

export const getDocumentBySegments = cache(async (segments: string[]) => {
  const documents = await getAllDocuments();

  return (
    documents.find((document) => matchesSegments(document.segments, segments)) ??
    null
  );
});

export const getFolderBySegments = cache(async (segments: string[]) => {
  const folders = await getAllFolders();

  return folders.find((folder) => matchesSegments(folder.segments, segments)) ?? null;
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

export function countDocuments(node: ContentTreeNode): number {
  if (node.kind === "document") {
    return 1;
  }

  return node.children.reduce(
    (total, childNode) => total + countDocuments(childNode),
    0,
  );
}
