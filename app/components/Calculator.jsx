"use client";
import { useEffect, useRef, useState } from "react";

const LTV = 0.48;
const PRICE = 1; // 1 CC ~ $1, illustrative
const LEN = 490;
const MIN = 500;
const MAX = 10000;

export default function Calculator() {
  const [cc, setCc] = useState(2500);
  const arcRef = useRef(null);
  const first = useRef(true);

  const coll = cc * PRICE;
  const spend = coll * LTV;
  const fmt = (n) => "$" + Math.round(n).toLocaleString();
  const sliderPct = ((cc - MIN) / (MAX - MIN)) * 100;

  useEffect(() => {
    const arc = arcRef.current;
    if (!arc) return;
    arc.style.transition = first.current
      ? "stroke-dashoffset 1.2s cubic-bezier(.16,1,.3,1)"
      : "stroke-dashoffset .25s ease";
    arc.style.strokeDashoffset = String(LEN * (1 - LTV));
    first.current = false;
  }, [cc]);

  return (
    <div className="calc reveal d1">
      <h3>Your spending power</h3>
      <p className="desc">
        Drag to see how much Canton Coin unlocks — without selling a single
        coin.
      </p>
      <div className="calc-ring">
        <svg width="150" height="150" viewBox="0 0 190 190">
          <circle
            cx="95"
            cy="95"
            r="78"
            fill="none"
            stroke="rgba(0,85,255,.12)"
            strokeWidth="13"
          />
          <circle
            ref={arcRef}
            cx="95"
            cy="95"
            r="78"
            fill="none"
            stroke="url(#g2)"
            strokeWidth="13"
            strokeLinecap="round"
            transform="rotate(-90 95 95)"
            strokeDasharray="490"
            strokeDashoffset="490"
          />
          <defs>
            <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#4da6ff" />
              <stop offset="1" stopColor="#0036cc" />
            </linearGradient>
          </defs>
          <text
            x="95"
            y="90"
            textAnchor="middle"
            fill="#e8ecf2"
            fontFamily="var(--font-display)"
            fontWeight="700"
            fontSize="26"
          >
            48%
          </text>
          <text
            x="95"
            y="112"
            textAnchor="middle"
            fill="#0055ff"
            fontFamily="var(--font-mono)"
            fontSize="10"
            letterSpacing="1.5"
          >
            LTV
          </text>
        </svg>
      </div>
      <div className="calc-readout">
        <div className="ro">
          <div className="k">Collateral locked</div>
          <div className="v">{fmt(coll)}</div>
        </div>
        <div className="ro">
          <div className="k">Spendable now</div>
          <div className="v accent">{fmt(spend)}</div>
        </div>
      </div>
      <div className="slider-wrap">
        <label>
          <span>Canton Coin locked</span>
          <b>{cc.toLocaleString()} CC</b>
        </label>
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={100}
          value={cc}
          onChange={(e) => setCc(parseInt(e.target.value, 10))}
          style={{ "--p": `${sliderPct}%` }}
        />
      </div>
      <div className="cooldown">
        ⟳&nbsp; Cash-out cooldown: <b>&nbsp;7 days</b>&nbsp; — a solvency
        control, and why your line never gets called at a bad moment.
      </div>
      <p className="note">
        Illustrative only. LTV held at 48% in this model; real LTV adjusts to CC
        volatility. Lines are over-collateralized and self-liquidating.
      </p>
    </div>
  );
}
