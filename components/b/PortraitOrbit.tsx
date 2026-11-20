"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";
import { isDark } from "@/lib/theme";

const skills = ["AWS", "Redshift", "Python", "Glue", "SQL", "Informatica", "Athena", "LLMs", "RAG", "S3", "LangGraph", "Ollama"];
const aws = new Set(["AWS", "Redshift", "Glue", "Athena", "S3"]);

/** Portrait tile: a three.js neural sphere behind the photo, a 3D ring of tools orbiting it, and the whole scene tilting with the cursor. */
export default function PortraitOrbit() {
  const tile = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [time, setTime] = useState("GMT+3");

  useEffect(() => {
    const fmt = () => {
      try {
        setTime(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Amman" }).format(new Date()) + " GMT+3");
      } catch {}
    };
    fmt();
    const id = setInterval(fmt, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stop = false;
    let cleanup = () => {};
    (async () => {
      const THREE = await import("three");
      if (stop || !canvas.current) return;
      const cv = canvas.current;
      const renderer = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
      const sc = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      cam.position.z = 7;
      const N = 140, R = 2.2, ga = Math.PI * (3 - Math.sqrt(5));
      const pts: InstanceType<typeof THREE.Vector3>[] = [];
      for (let i = 0; i < N; i++) {
        const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), t = ga * i;
        pts.push(new THREE.Vector3(Math.cos(t) * r * R, y * R, Math.sin(t) * r * R));
      }
      const group = new THREE.Group();
      group.position.y = 0.5;
      sc.add(group);
      const pos = new Float32Array(N * 3);
      pts.forEach((p, i) => pos.set([p.x, p.y, p.z], i * 3));
      const pg = new THREE.BufferGeometry();
      pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const tex = (c1: string, c2: string) => {
        const c = document.createElement("canvas");
        c.width = c.height = 64;
        const x = c.getContext("2d")!;
        const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
        g.addColorStop(0, c1);
        g.addColorStop(0.35, c2);
        g.addColorStop(1, "rgba(0,0,0,0)");
        x.fillStyle = g;
        x.fillRect(0, 0, 64, 64);
        return new THREE.CanvasTexture(c);
      };
      const pm = new THREE.PointsMaterial({ size: 0.22, transparent: true, depthWrite: false });
      group.add(new THREE.Points(pg, pm));
      const segs: number[] = [];
      pts.forEach((p, i) =>
        pts
          .map((q, j) => [j, p.distanceToSquared(q)] as const)
          .filter((a) => a[0] > i)
          .sort((a, b) => a[1] - b[1])
          .slice(0, 3)
          .forEach(([j]) => segs.push(p.x, p.y, p.z, pts[j].x, pts[j].y, pts[j].z))
      );
      const lg = new THREE.BufferGeometry();
      lg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(segs), 3));
      const lm = new THREE.LineBasicMaterial({ transparent: true });
      group.add(new THREE.LineSegments(lg, lm));
      const paint = () => {
        const d = isDark();
        pm.map?.dispose();
        pm.map = d ? tex("rgba(253,227,216,1)", "rgba(228,138,106,.9)") : tex("rgba(158,61,36,1)", "rgba(196,87,58,.8)");
        pm.blending = d ? THREE.AdditiveBlending : THREE.NormalBlending;
        pm.needsUpdate = true;
        lm.color.set(d ? 0xf0a48a : 0x9e3d24);
        lm.opacity = d ? 0.22 : 0.28;
      };
      paint();
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      window.addEventListener("themechange", paint);
      mq.addEventListener("change", paint);
      const size = () => {
        const w = cv.clientWidth, h = cv.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        cam.aspect = w / h;
        cam.updateProjectionMatrix();
      };
      size();
      window.addEventListener("resize", size);
      let ry = 0, raf = 0, visible = true;
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
      io.observe(cv);
      const loop = () => {
        raf = requestAnimationFrame(loop);
        if (!visible) return;
        if (!reduce) ry += 0.0025;
        group.rotation.x += (mouse.current.y * 0.6 - group.rotation.x) * 0.06;
        group.rotation.y += (ry + mouse.current.x * 0.8 - group.rotation.y) * 0.06;
        renderer.render(sc, cam);
      };
      loop();
      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener("themechange", paint);
        mq.removeEventListener("change", paint);
        window.removeEventListener("resize", size);
        renderer.dispose();
      };
    })();
    return () => {
      stop = true;
      cleanup();
    };
  }, []);

  return (
    <div
      className="b-tile b-photo"
      ref={tile}
      onPointerMove={(e) => {
        const r = tile.current!.getBoundingClientRect();
        mouse.current = { x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 };
        if (scene.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches)
          scene.current.style.transform = `rotateY(${mouse.current.x * 16}deg) rotateX(${-mouse.current.y * 10}deg)`;
      }}
      onPointerLeave={() => {
        mouse.current = { x: 0, y: 0 };
        if (scene.current) scene.current.style.transform = "";
      }}
    >
      <canvas ref={canvas} aria-hidden="true" />
      <div className="b-plate">
        {profile.location} <span>{time}</span>
      </div>
      <span className="b-hint" aria-hidden="true">move your mouse</span>
      <div className="b-stage">
        <div className="b-scene" ref={scene}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="b-me" src="/me.webp" alt={profile.name} width={760} height={883} fetchPriority="high" />
          <div className="b-orbit" aria-hidden="true">
            <div className="b-spinner">
              <div className="b-ring" />
              {skills.map((s, i) => (
                <span key={s} className={`b-chip${aws.has(s) ? " aws" : i % 4 === 1 ? " hot" : ""}`} style={{ "--a": `${(360 / skills.length) * i}deg` } as React.CSSProperties}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
