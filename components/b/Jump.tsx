"use client";

import { usePathname, useRouter } from "next/navigation";
import { jumpTo } from "@/lib/jump";

/** An in-page link that scrolls with Lenis and flashes its target. Falls back to a normal link. */
export default function Jump({ to, className, children, label }: { to: string; className?: string; children: React.ReactNode; label?: string }) {
  const path = usePathname();
  const router = useRouter();
  return (
    <a
      href={`/#${to}`}
      className={className}
      aria-label={label}
      onClick={(e) => {
        e.preventDefault();
        if (path === "/") jumpTo(to);
        else router.push(`/#${to}`);
      }}
    >
      {children}
    </a>
  );
}
