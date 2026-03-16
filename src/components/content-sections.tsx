import Link from "next/link";
import { type ContentTreeNode, countDocuments } from "@/lib/content";

const sectionTones = {
  back: "from-[rgba(240,228,209,0.92)] via-[rgba(255,250,241,0.86)] to-[rgba(255,255,255,0.72)]",
  front:
    "from-[rgba(215,225,209,0.92)] via-[rgba(255,250,241,0.86)] to-[rgba(255,255,255,0.72)]",
  neutral:
    "from-[rgba(225,234,221,0.92)] via-[rgba(255,250,241,0.86)] to-[rgba(255,255,255,0.72)]",
};

function TreeBranch({
  nodes,
  depth = 0,
}: {
  depth?: number;
  nodes: ContentTreeNode[];
}) {
  return (
    <ul className={depth === 0 ? "space-y-4" : "mt-4 space-y-3 pl-4"}>
      {nodes.map((node) => {
        if (node.kind === "document") {
          return (
            <li key={node.route}>
              <Link
                href={node.route}
                className="group block rounded-lg border border-[color:var(--color-line)] bg-white/35 px-4 py-3 transition-colors duration-200 hover:border-[color:var(--color-accent)] hover:bg-white/55"
              >
                <p className="text-[0.95rem] font-medium leading-6 tracking-[-0.01em] text-[color:var(--color-foreground)] transition-colors group-hover:text-[color:var(--color-accent-strong)]">
                  {node.label}
                </p>
              </Link>
            </li>
          );
        }

        return (
          <li key={node.route}>
            <div className="rounded-md border border-dashed border-[color:var(--color-line)]/80 bg-white/20 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
                Folder
              </p>
              <p className="mt-1 text-lg font-medium text-[color:var(--color-foreground)]">
                {node.label}
              </p>
              <TreeBranch depth={depth + 1} nodes={node.children} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function ModelGroups({ nodes }: { nodes: ContentTreeNode[] }) {
  const documents = nodes.flatMap((node) =>
    node.kind === "document" ? [node.document] : [],
  );

  const groups = documents.reduce<
    Map<
      string,
      { items: typeof documents; modelName: string; modelSlug: string }
    >
  >((accumulator, document) => {
    const existingGroup = accumulator.get(document.modelSlug);

    if (existingGroup) {
      existingGroup.items.push(document);
      return accumulator;
    }

    accumulator.set(document.modelSlug, {
      items: [document],
      modelName: document.modelName,
      modelSlug: document.modelSlug,
    });

    return accumulator;
  }, new Map());

  const orderedGroups = [...groups.values()].sort((left, right) =>
    left.modelSlug.localeCompare(right.modelSlug, undefined, { numeric: true }),
  );

  orderedGroups.forEach((group) => {
    group.items.sort((left, right) =>
      left.slug.localeCompare(right.slug, undefined, { numeric: true }),
    );
  });

  return (
    <div className="space-y-6">
      {orderedGroups.map((group) => (
        <section key={group.modelSlug}>
          <div className="border-b border-[color:var(--color-line)] pb-3">
            <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
              Model
            </p>
            <h3 className="mt-1 text-2xl font-medium text-[color:var(--color-foreground)]">
              {group.modelName}
            </h3>
          </div>

          <ul className="mt-4 space-y-3">
            {group.items.map((document) => (
              <li key={document.route}>
                <Link
                  href={document.route}
                  className="group block rounded-lg border border-[color:var(--color-line)] bg-white/35 px-4 py-3 transition-colors duration-200 hover:border-[color:var(--color-accent)] hover:bg-white/55"
                >
                  <p className="text-[0.95rem] font-medium leading-6 tracking-[-0.01em] text-[color:var(--color-foreground)] transition-colors group-hover:text-[color:var(--color-accent-strong)]">
                    {document.listTitle}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export function SectionPanel({
  eyebrow = "Section",
  node,
}: {
  eyebrow?: string;
  node: ContentTreeNode;
}) {
  const tone =
    node.kind === "folder"
      ? sectionTones[node.segment as keyof typeof sectionTones] ??
        sectionTones.neutral
      : sectionTones.neutral;

  return (
    <article
      className={`rounded-xl border border-[color:var(--color-line)] bg-gradient-to-br ${tone} p-6 sm:p-8`}
    >
      <div className="flex items-start justify-between gap-4 border-b border-[color:var(--color-line)] pb-5">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--color-accent-strong)]">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl leading-none text-[color:var(--color-foreground)]">
            {node.label}
          </h2>
        </div>
        <p className="rounded-md border border-[color:var(--color-line)] bg-white/35 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
          {countDocuments(node)} docs
        </p>
      </div>

      <div className="mt-6">
        {node.kind === "folder" &&
        node.children.every((childNode) => childNode.kind === "document") ? (
          <ModelGroups nodes={node.children} />
        ) : node.kind === "folder" ? (
          <TreeBranch nodes={node.children} />
        ) : (
          <TreeBranch nodes={[node]} />
        )}
      </div>
    </article>
  );
}
