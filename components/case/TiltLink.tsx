"use client";

import Link from "next/link";
import { tilt, untilt } from "@/lib/tilt";

export default function TiltLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={className} onPointerMove={(e) => tilt(e, 0.7)} onPointerLeave={untilt}>
      <span className="b-glare" aria-hidden="true" />
      {children}
    </Link>
  );
}
