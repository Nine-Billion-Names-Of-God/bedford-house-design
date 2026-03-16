import { SectionPanel } from "@/components/content-sections";
import { PageBackdrop, TopNavigation } from "@/components/site-shell";
import { getOrderedContentTree } from "@/lib/content";

export default async function Home() {
  const contentTree = await getOrderedContentTree();

  return (
    <main className="relative overflow-hidden px-6 py-10 sm:px-8 lg:px-12">
      <PageBackdrop />

      <div className="relative mx-auto max-w-6xl">
        <TopNavigation />

        <section className="max-w-3xl border-b border-[color:var(--color-line)] pb-12">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--color-accent-strong)]">
            Internal Garden Study
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl leading-none text-[color:var(--color-foreground)] sm:text-6xl">
            Bedford Garden plans
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[color:var(--color-copy)] sm:text-lg">
            The main page lists every markdown document in sequence. Use the top
            navigation to switch between all plans, front garden, and back
            garden views.
          </p>
        </section>

        <section className="mt-10 space-y-8">
          {contentTree.map((section) => (
            <SectionPanel key={section.route} node={section} />
          ))}
        </section>
      </div>
    </main>
  );
}
