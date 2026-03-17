import Link from "next/link";
import { getOrderedContentTree } from "@/lib/content";

export function PageBackdrop() {
  return (
    <>
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -left-20 top-24 h-56 w-56 rounded-full bg-[color:var(--color-accent-soft)]/70 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-0 h-72 w-72 rounded-full bg-[color:var(--color-highlight)]/12 blur-3xl" />
    </>
  );
}

export async function TopNavigation() {
  const sections = await getOrderedContentTree();
  const navItems = [
    { href: "/", label: "All plans" },
    ...sections
      .filter((node) => node.kind === "folder")
      .map((node) => ({ href: node.route, label: node.label })),
  ];

  return (
    <nav className="mb-10 flex flex-wrap items-center gap-3">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-md border border-[color:var(--color-line)] bg-white/45 px-4 py-2 text-sm text-[color:var(--color-copy)] transition-colors duration-200 hover:border-[color:var(--color-accent)] hover:bg-white/60 hover:text-[color:var(--color-accent-strong)]"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
