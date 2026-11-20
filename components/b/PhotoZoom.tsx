"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/** A photo that opens large on click. Esc, a click outside or the close button shut it. */
export default function PhotoZoom({ className, children, alt = "Ali Hamdan" }: { className?: string; children: React.ReactNode; alt?: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", key);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      document.documentElement.style.overflow = "";
    };
  }, [open]);
  return (
    <>
      <button type="button" className={`b-zoom ${className ?? ""}`} onClick={() => setOpen(true)} aria-label={`Open a larger photo of ${alt}`}>
        {children}
      </button>
      {open &&
        createPortal(
          <div className="b-lightbox" role="dialog" aria-modal="true" aria-label={`Photo of ${alt}`} onClick={() => setOpen(false)}>
            <figure onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/me.webp" alt={alt} width={760} height={883} />
              <figcaption>
                <b>Ali Hamdan</b> AI &amp; Data Engineer, Amman
              </figcaption>
              <button type="button" className="b-lightbox-x" onClick={() => setOpen(false)} aria-label="Close" autoFocus>
                ✕
              </button>
            </figure>
          </div>,
          document.body
        )}
    </>
  );
}
