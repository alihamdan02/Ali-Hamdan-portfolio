"use client";

import { tilt, untilt } from "@/lib/tilt";

/** A block that tilts toward the cursor, with a moving glare. */
export default function Tilt({ className, children, strength = 1 }: { className?: string; children: React.ReactNode; strength?: number }) {
  return (
    <div className={className} onPointerMove={(e) => tilt(e, strength)} onPointerLeave={untilt}>
      <span className="b-glare" aria-hidden="true" />
      {children}
    </div>
  );
}
