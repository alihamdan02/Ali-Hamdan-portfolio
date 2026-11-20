"use client";

import { useEffect, useRef } from "react";

/** A thin bar under the header that fills as you read, in the four classification colours. */
export default function ScrollProgress() {
  const bar = useRef<HTMLElement>(null);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
  return (
    <span className="b-progress" aria-hidden="true">
      <i ref={bar} />
    </span>
  );
}
