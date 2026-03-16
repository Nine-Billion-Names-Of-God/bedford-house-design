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
                className="group block rounded-2xl border border-[color:var(--color-line)] bg-white/55 px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-[color:var(--color-accent)] hover:bg-white/85"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                  {node.document.pathLabel}
                </p>
                <p className="mt-2 font-medium text-[color:var(--color-foreground)] transition-colors group-hover:text-[color:var(--color-accent-strong)]">
                  {node.label}
                </p>
                {node.document.summary ? (
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[color:var(--color-copy)]">
                    {node.document.summary}
                  </p>
                ) : null}
              </Link>
            </li>
          );
        }

        return (
          <li key={node.route}>
            <div className="rounded-2xl border border-dashed border-[color:var(--color-line)]/80 bg-white/30 px-4 py-3">
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
      className={`rounded-[2rem] border border-[color:var(--color-line)] bg-gradient-to-br ${tone} p-6 shadow-[0_26px_80px_rgba(55,73,58,0.08)] backdrop-blur sm:p-8`}
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
        <p className="rounded-full border border-[color:var(--color-line)] bg-white/50 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
          {countDocuments(node)} docs
        </p>
      </div>

      <div className="mt-6">
        {node.kind === "folder" ? (
          <TreeBranch nodes={node.children} />
        ) : (
          <TreeBranch nodes={[node]} />
        )}
      </div>
    </article>
  );
}
