import Link from "next/link";

const navItems = [
  { href: "/", label: "All plans" },
  { href: "/front", label: "Front garden" },
  { href: "/back", label: "Back garden" },
];

export function PageBackdrop() {
  return (
    <>
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -left-20 top-24 h-56 w-56 rounded-full bg-[color:var(--color-accent-soft)]/70 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-0 h-72 w-72 rounded-full bg-[color:var(--color-highlight)]/12 blur-3xl" />
    </>
  );
}

export function TopNavigation() {
  return (
    <nav className="mb-10 flex flex-wrap items-center gap-3">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-full border border-[color:var(--color-line)] bg-white/65 px-4 py-2 text-sm text-[color:var(--color-copy)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent-strong)]"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
