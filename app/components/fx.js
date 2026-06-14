"use client";
import { useEffect } from "react";

export function useScrollFx(ref) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- scroll reveals ----
    const reveals = root.querySelectorAll(".reveal");
    let io;
    if (reduce) {
      reveals.forEach((e) => e.classList.add("in"));
    } else if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("in");
              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.14 }
      );
      reveals.forEach((e) => io.observe(e));
    } else {
      reveals.forEach((e) => e.classList.add("in"));
    }

    // ---- count up ----
    const countUp = (el) => {
      const target = parseFloat(el.getAttribute("data-count"));
      const dec = parseInt(el.getAttribute("data-dec") || "0", 10);
      const suf = el.getAttribute("data-suffix") || "";
      const dur = 1400;
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(dec) + suf;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toFixed(dec) + suf;
      };
      requestAnimationFrame(step);
    };
    const counters = root.querySelectorAll("[data-count]");
    let cio;
    if ("IntersectionObserver" in window) {
      cio = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting && !en.target._done) {
              en.target._done = true;
              countUp(en.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach((c) => cio.observe(c));
    } else {
      counters.forEach(countUp);
    }

    // ---- card cursor glow ----
    const cards = root.querySelectorAll(".card");
    const handlers = [];
    cards.forEach((c) => {
      const h = (e) => {
        const r = c.getBoundingClientRect();
        c.style.setProperty("--mx", e.clientX - r.left + "px");
        c.style.setProperty("--my", e.clientY - r.top + "px");
      };
      c.addEventListener("mousemove", h);
      handlers.push([c, h]);
    });

    return () => {
      if (io) io.disconnect();
      if (cio) cio.disconnect();
      handlers.forEach(([c, h]) => c.removeEventListener("mousemove", h));
    };
  }, [ref]);
}
