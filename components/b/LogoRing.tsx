"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/content/profile";
import { jumpTo } from "@/lib/jump";

const orgs = [...profile.employers, ...profile.clients];

/** Every organization on a 3D ring. It turns on its own, can be dragged, pauses on hover, and a click jumps to the related work. */
export default function LogoRing() {
  const box = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const st = useRef({ ang: 0, vel: 0.12, hover: false, drag: false, lastX: 0, moved: 0 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const base = reduce ? 0 : 0.12;
    const s = st.current;
    s.vel = base;
    const setR = () => {
      const r = Math.max(300, Math.min(480, (box.current?.clientWidth ?? 1000) * 0.38));
      ring.current?.style.setProperty("--r", `${r}px`);
    };
    setR();
    window.addEventListener("resize", setR);
    const move = (e: PointerEvent) => {
      if (!s.drag) return;
      const dx = e.clientX - s.lastX;
      s.lastX = e.clientX;
      s.moved += Math.abs(dx);
      if (s.moved > 4) box.current?.classList.add("dragging");
      s.ang += dx * 0.3;
      s.vel = dx * 0.3;
    };
    const up = () => {
      s.drag = false;
      box.current?.classList.remove("dragging");
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    let raf = 0;
    const spin = () => {
      raf = requestAnimationFrame(spin);
      if (!s.drag) {
        s.vel += (base - s.vel) * 0.03;
        if (!s.hover) s.ang += s.vel;
      }
      if (ring.current) ring.current.style.transform = `rotateY(${s.ang}deg)`;
    };
    spin();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setR);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div
      className="b-car"
      ref={box}
      aria-label="Organizations I have worked at or built for"
      onPointerDown={(e) => {
        st.current.drag = true;
        st.current.moved = 0;
        st.current.lastX = e.clientX;
      }}
    >
      <div className="b-floor" />
      <div className="b-car-core">
        <strong>{orgs.length}</strong>
        <span>organizations</span>
      </div>
      <div className="b-tiltx">
        <div className="b-ringc" ref={ring}>
          {orgs.map((o, i) => (
            <button
              key={o.name}
              type="button"
              className="b-lc"
              style={{ "--a": `${(360 / orgs.length) * i}deg` } as React.CSSProperties}
              aria-label={`${o.name}: go to the related ${o.target.startsWith("exp") ? "experience" : "project"}`}
              onPointerEnter={() => (st.current.hover = true)}
              onPointerLeave={() => (st.current.hover = false)}
              onFocus={() => (st.current.hover = true)}
              onBlur={() => (st.current.hover = false)}
              onClick={() => {
                if (st.current.moved > 4) return;
                jumpTo(o.target);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={o.logo} alt="" width={o.w} height={o.h} className={o.h > o.w ? "tall" : undefined} loading="lazy" decoding="async" />
              <span className="b-nm">
                {o.short} → {o.target.startsWith("exp") ? "experience" : "project"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
