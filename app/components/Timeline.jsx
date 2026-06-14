"use client";
import { useEffect, useRef, useState } from "react";

const VAULT =
  '<svg viewBox="0 0 200 200"><rect x="46" y="50" width="108" height="100" rx="12" fill="none" stroke="#7f00e2" stroke-width="3"/><circle cx="100" cy="100" r="26" fill="none" stroke="#b14dff" stroke-width="3"/><circle cx="100" cy="100" r="6" fill="#7f00e2"/><path d="M100 74v8M100 118v8M74 100h8M118 100h8" stroke="#6a0fc0" stroke-width="3"/></svg>';
const LINE =
  '<svg viewBox="0 0 200 200"><rect x="40" y="76" width="120" height="74" rx="12" fill="none" stroke="#b14dff" stroke-width="3"/><path d="M40 100h120" stroke="#6a0fc0" stroke-width="3"/><rect x="52" y="118" width="44" height="9" rx="4" fill="#7f00e2"/><circle cx="138" cy="58" r="16" fill="none" stroke="#7f00e2" stroke-width="3"/><path d="M138 50v16M130 58h16" stroke="#7f00e2" stroke-width="3"/></svg>';
const SPEND =
  '<svg viewBox="0 0 200 200"><path d="M60 120l40-40 30 30 30-50" fill="none" stroke="#7f00e2" stroke-width="3" stroke-linecap="round"/><circle cx="160" cy="60" r="5" fill="#b14dff"/><path d="M100 40l4 12h13l-10 8 4 13-11-8-11 8 4-13-10-8h13z" fill="#b14dff" opacity=".9"/></svg>';
const SETTLE =
  '<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="50" fill="none" stroke="#6a0fc0" stroke-width="3"/><path d="M78 100l16 16 30-34" fill="none" stroke="#7f00e2" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M100 40a60 60 0 0 1 52 30" fill="none" stroke="#b14dff" stroke-width="3" stroke-linecap="round"/><path d="M150 62l4 14-14-2" fill="none" stroke="#b14dff" stroke-width="3" stroke-linecap="round"/></svg>';

const STEPS = [
  {
    title: "Lock your collateral",
    badge: "STEP 01",
    body:
      "Move Canton Coin into your Magic vault. It stays yours, keeps earning on-chain yield, and is fully visible only to you.",
    svg: VAULT,
    caption: 'STEP 01 — <span>collateral locked</span>',
  },
  {
    title: "Draw a spendable line",
    badge: "STEP 02",
    body:
      "We open a USD-value line at a conservative LTV (typically 40–60%). Lock 2,000 CC, spend up to ~$1,240 — instantly.",
    svg: LINE,
    caption: 'STEP 02 — <span>line opened</span>',
  },
  {
    title: "Spend & earn",
    badge: "STEP 03",
    body:
      "Pay merchants, in-app, or on-chain. Every transaction earns Magic Points — funded by yield + interchange, not IOUs.",
    svg: SPEND,
    caption: 'STEP 03 — <span>spend & earn</span>',
  },
  {
    title: "Auto-settle, on your clock",
    badge: "STEP 04",
    body:
      "Top up to free collateral, or let the line auto-settle against your CC after a cooldown. No due dates, no collections — it's self-liquidating.",
    svg: SETTLE,
    caption: 'STEP 04 — <span>auto-settle</span>',
  },
];

export default function Timeline() {
  const [idx, setIdx] = useState(0);
  const timer = useRef(null);

  const restart = () => {
    if (timer.current) clearInterval(timer.current);
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    timer.current = setInterval(() => {
      setIdx((i) => (i + 1) % STEPS.length);
    }, 3200);
  };

  useEffect(() => {
    restart();
    return () => timer.current && clearInterval(timer.current);
  }, []);

  const pick = (i) => {
    setIdx(i);
    restart();
  };

  return (
    <div className="timeline">
      <div className="steps reveal">
        <div className="rail" />
        <div
          className="rail-fill"
          style={{ height: `${(idx / (STEPS.length - 1)) * 100}%` }}
        />
        {STEPS.map((s, i) => (
          <div
            key={i}
            className={`step${i === idx ? " active" : ""}`}
            onClick={() => pick(i)}
          >
            <span className="node" />
            <div className="box">
              <div className="st-top">
                <h3>{s.title}</h3>
                <span className="badge">{s.badge}</span>
              </div>
              <p>{s.body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="tl-visual">
        <div
          className="tl-stage"
          style={{ transition: "opacity .5s", opacity: 1 }}
          dangerouslySetInnerHTML={{ __html: STEPS[idx].svg }}
        />
        <div
          className="tl-caption"
          dangerouslySetInnerHTML={{ __html: STEPS[idx].caption }}
        />
      </div>
    </div>
  );
}
