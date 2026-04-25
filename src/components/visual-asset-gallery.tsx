"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { VisualAsset } from "@/lib/content";

type VisualAssetGalleryProps = {
  assets: VisualAsset[];
  description?: string;
  eyebrow?: string;
  title?: string;
};

function usesSvgPreview(asset: VisualAsset) {
  return asset.previewSrc.toLowerCase().endsWith(".svg");
}

export function VisualAssetGallery({
  assets,
  description = "Companion visuals discovered from the matching asset folder.",
  eyebrow = "Visual Assets",
  title = "Design Visuals",
}: VisualAssetGalleryProps) {
  const [selectedAsset, setSelectedAsset] = useState<VisualAsset | null>(null);

  useEffect(() => {
    if (!selectedAsset) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedAsset(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedAsset]);

  if (assets.length === 0) {
    return null;
  }

  return (
    <>
      <section className="rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-6 sm:p-8">
        <div className="border-b border-[color:var(--color-line)] pb-5">
          <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--color-accent-strong)]">
            {eyebrow}
          </p>
          <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-4xl leading-none text-[color:var(--color-foreground)]">
                {title}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--color-copy)]">
                {description}
              </p>
            </div>
            <p className="rounded-md border border-[color:var(--color-line)] bg-white/35 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
              {assets.length} assets
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {assets.map((asset) => (
            <article
              key={asset.key}
              className="overflow-hidden rounded-lg border border-[color:var(--color-line)] bg-white/45"
            >
              <button
                type="button"
                onClick={() => setSelectedAsset(asset)}
                className="group block w-full text-left"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--color-surface-strong)]">
                  <Image
                    src={asset.previewSrc}
                    alt={asset.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    unoptimized={usesSvgPreview(asset)}
                  />
                </div>
              </button>

              <div className="space-y-3 px-4 py-4">
                <div>
                  <h3 className="text-lg font-medium text-[color:var(--color-foreground)]">
                    {asset.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--color-copy)]">
                    {asset.caption}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em]">
                  <a
                    href={asset.previewSrc}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border border-[color:var(--color-line)] bg-white/55 px-3 py-2 text-[color:var(--color-copy)] transition-colors hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent-strong)]"
                  >
                    Open Image
                  </a>

                  {asset.vectorSrc ? (
                    <a
                      href={asset.vectorSrc}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-md border border-[color:var(--color-line)] bg-white/55 px-3 py-2 text-[color:var(--color-copy)] transition-colors hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent-strong)]"
                    >
                      Open SVG
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedAsset ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(14,23,18,0.76)] p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={selectedAsset.title}
          onClick={() => setSelectedAsset(null)}
        >
          <div
            className="w-full max-w-7xl border border-white/18 bg-[rgba(250,246,238,0.98)] p-4 shadow-[0_30px_120px_rgba(10,18,12,0.35)] sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[color:var(--color-line)] pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--color-accent-strong)]">
                  Visual Asset
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl leading-none text-[color:var(--color-foreground)] sm:text-4xl">
                  {selectedAsset.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAsset(null)}
                className="rounded-md border border-[color:var(--color-line)] bg-white/70 px-3 py-2 text-sm text-[color:var(--color-copy)] transition-colors hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent-strong)]"
              >
                Close
              </button>
            </div>

            <div className="mt-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-[color:var(--color-line)] bg-[color:var(--color-surface-strong)]">
                <Image
                  src={selectedAsset.previewSrc}
                  alt={selectedAsset.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  unoptimized={usesSvgPreview(selectedAsset)}
                />
              </div>
              <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
                <p className="max-w-3xl text-sm leading-6 text-[color:var(--color-copy)]">
                  {selectedAsset.caption}
                </p>
                <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em]">
                  <a
                    href={selectedAsset.previewSrc}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border border-[color:var(--color-line)] bg-white/70 px-3 py-2 text-[color:var(--color-copy)] transition-colors hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent-strong)]"
                  >
                    Open Image
                  </a>

                  {selectedAsset.vectorSrc ? (
                    <a
                      href={selectedAsset.vectorSrc}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-md border border-[color:var(--color-line)] bg-white/70 px-3 py-2 text-[color:var(--color-copy)] transition-colors hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent-strong)]"
                    >
                      Open SVG
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
