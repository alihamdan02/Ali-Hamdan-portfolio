"use client";

import { useEffect } from "react";

/**
 * Turns the tab icon into the spinning AH cube from the header. Browsers only show a still image
 * for SVG icons, so the cube is drawn on a canvas a few times a second. Stops when the tab is hidden
 * and for people who prefer reduced motion; Safari keeps the static icon.
 */
export default function FaviconSpin() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const S = 64;
    const c = document.createElement("canvas");
    c.width = c.height = S;
    const x = c.getContext("2d");
    if (!x) return;
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon'][data-spin]");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/png";
      link.dataset.spin = "1";
      document.head.appendChild(link);
    }
    // Cube corners, half size 1. Faces: indexes into corners, colour, label.
    const P = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    const F: [number[], string, string][] = [
      [[4, 5, 6, 7], "#e48a6a", "AH"],
      [[1, 0, 3, 2], "#e48a6a", "AH"],
      [[5, 1, 2, 6], "#a8492d", "{}"],
      [[0, 4, 7, 3], "#a8492d", ">_"],
      [[0, 1, 5, 4], "#f8c9b6", ""],
      [[7, 6, 2, 3], "#6f3727", ""],
    ];
    const tilt = -0.42;
    const draw = (a: number) => {
      const ca = Math.cos(a), sa = Math.sin(a), ct = Math.cos(tilt), st = Math.sin(tilt);
      const pts = P.map(([px, py, pz]) => {
        const X = px * ca + pz * sa, Z = -px * sa + pz * ca;
        const Y = py * ct - Z * st, Z2 = py * st + Z * ct;
        return [S / 2 + X * 15, S / 2 + Y * 15, Z2];
      });
      x.clearRect(0, 0, S, S);
      F.map((f) => ({ f, z: f[0].reduce((s, i) => s + pts[i][2], 0) / 4 }))
        .sort((a2, b) => a2.z - b.z)
        .forEach(({ f: [idx, col, label] }) => {
          const q = idx.map((i) => pts[i]);
          const nx = (q[1][0] - q[0][0]) * (q[2][1] - q[0][1]) - (q[1][1] - q[0][1]) * (q[2][0] - q[0][0]);
          if (nx <= 0) return; // back face
          x.beginPath();
          q.forEach(([px, py], i) => (i ? x.lineTo(px, py) : x.moveTo(px, py)));
          x.closePath();
          x.fillStyle = col;
          x.fill();
          x.strokeStyle = "rgba(253,227,216,.55)";
          x.lineWidth = 1;
          x.stroke();
          if (label) {
            const cx = q.reduce((s, p) => s + p[0], 0) / 4, cy = q.reduce((s, p) => s + p[1], 0) / 4;
            const w = Math.hypot(q[1][0] - q[0][0], q[1][1] - q[0][1]);
            if (w > 12) {
              x.save();
              x.translate(cx, cy);
              x.scale(w / 30, 1);
              x.fillStyle = "#2a120b";
              x.font = "bold 13px ui-monospace, Menlo, monospace";
              x.textAlign = "center";
              x.textBaseline = "middle";
              x.fillText(label, 0, 1);
              x.restore();
            }
          }
        });
      link!.href = c.toDataURL("image/png");
    };
    let a = 0.6, id = 0;
    const start = () => {
      if (id) return;
      id = window.setInterval(() => {
        a += 0.18;
        draw(a);
      }, 120);
    };
    const stop = () => {
      clearInterval(id);
      id = 0;
    };
    draw(a);
    const vis = () => (document.hidden ? stop() : start());
    vis();
    document.addEventListener("visibilitychange", vis);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);
  return null;
}
