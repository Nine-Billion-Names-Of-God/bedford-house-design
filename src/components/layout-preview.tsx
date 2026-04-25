"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type LayoutPreviewProps = {
  alt: string;
  caption: string;
  imageSrc: string;
  title: string;
};

export function LayoutPreview({
  alt,
  caption,
  imageSrc,
  title,
}: LayoutPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <div className="border border-[color:var(--color-line)] bg-white/35 p-3">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group block w-full text-left"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[color:var(--color-line)] bg-[color:var(--color-surface-strong)]">
            <Image
              src={imageSrc}
              alt={alt}
              fill
              priority
              className="object-cover transition-transform duration-300 group-hover:scale-[1.015]"
              sizes="(max-width: 1024px) 100vw, 32rem"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(18,31,24,0.72)] via-[rgba(18,31,24,0.28)] to-transparent p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-white/80">
                Click to expand
              </p>
              <p className="mt-1 text-sm text-white/95">{caption}</p>
            </div>
          </div>
        </button>
      </div>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(14,23,18,0.76)] p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-7xl border border-white/18 bg-[rgba(250,246,238,0.96)] p-4 shadow-[0_30px_120px_rgba(10,18,12,0.35)] sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[color:var(--color-line)] pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--color-accent-strong)]">
                  Layout image
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl leading-none text-[color:var(--color-foreground)] sm:text-4xl">
                  {title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md border border-[color:var(--color-line)] bg-white/70 px-3 py-2 text-sm text-[color:var(--color-copy)] transition-colors hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent-strong)]"
              >
                Close
              </button>
            </div>

            <div className="mt-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-[color:var(--color-line)] bg-[color:var(--color-surface-strong)]">
                <Image
                  src={imageSrc}
                  alt={alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-[color:var(--color-copy)]">
                {caption}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
