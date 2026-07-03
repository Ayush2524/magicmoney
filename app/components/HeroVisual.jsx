"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function HeroVisual() {
  const arcRef = useRef(null);

  useEffect(() => {
    const arc = arcRef.current;
    if (!arc) return;
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pct = 0.48;
    const len = 490;
    if (reduce) {
      arc.style.strokeDashoffset = String(len * (1 - pct));
      return;
    }
    arc.style.transition = "none";
    arc.style.strokeDashoffset = String(len);
    const id = requestAnimationFrame(() => {
      arc.style.transition = "stroke-dashoffset 1.6s cubic-bezier(.16,1,.3,1)";
      arc.style.strokeDashoffset = String(len * (1 - pct));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="stage reveal d2">
      <div className="ring-halo" />
      <div className="phone">
        <div className="screen">
          <div className="scr-top">
            <span className="scr-logo">
              <Image src="/logo.png" alt="Magic Money logo" width={18} height={18} style={{ objectFit: "contain", verticalAlign: "middle" }} />
              <span style={{ marginLeft: "5px" }}>MM</span>
            </span>
            <span>● live</span>
          </div>
          <div className="lbl-mini" style={{ marginTop: "16px" }}>
            Locked collateral · Canton Coin
          </div>
          <div className="ringbox">
            <svg width="190" height="190" viewBox="0 0 190 190">
              <circle
                cx="95"
                cy="95"
                r="78"
                fill="none"
                stroke="rgba(0,85,255,.12)"
                strokeWidth="12"
              />
              <circle
                ref={arcRef}
                cx="95"
                cy="95"
                r="78"
                fill="none"
                stroke="url(#g1)"
                strokeWidth="12"
                strokeLinecap="round"
                transform="rotate(-90 95 95)"
                strokeDasharray="490"
                strokeDashoffset="490"
              />
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#4da6ff" />
                  <stop offset="1" stopColor="#0036cc" />
                </linearGradient>
              </defs>
            </svg>
            <div className="ring-center">
              <div className="big">$1,240</div>
              <div className="sub">spendable</div>
            </div>
          </div>
          <div className="lbl-mini" style={{ marginBottom: "10px" }}>
            48% LTV · 2,000 CC locked
          </div>
          <div className="scr-actions">
            <div className="act">
              <div className="ai">↗</div>
              <div className="at">Spend</div>
            </div>
            <div className="act">
              <div className="ai">⟳</div>
              <div className="at">Settle</div>
            </div>
            <div className="act">
              <div className="ai">＋</div>
              <div className="at">Top up</div>
            </div>
          </div>
          <div className="scr-row">
            <span className="k">Magic Points earned</span>
            <span className="v">+184 ✦</span>
          </div>
        </div>
      </div>
      <div className="chip c1">
        <span className="dot" />
        +1.5% back, every spend
      </div>
      <div className="chip c2">
        <span className="dot" />
        Auto-settles. No due date stress.
      </div>
    </div>
  );
}
