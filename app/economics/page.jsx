"use client";
import { useRef } from "react";
import { useScrollFx } from "../components/fx";
import Calculator from "../components/Calculator";
import Stores from "../components/Stores";

export default function Economics() {
  const ref = useRef(null);
  useScrollFx(ref);

  return (
    <div ref={ref} className="page-in">
      <div className="wrap">
        <section style={{ paddingTop: "64px" }}>
          <div className="sec-head">
            <span className="eyebrow reveal">Points &amp; economics</span>
            <h2 className="reveal d1">Where the rewards actually come from.</h2>
            <p className="reveal d2">
              Most points programs quietly print IOUs. Magic Points are funded
              by real revenue — so the rewards are sustainable and the app stays
              solvent.
            </p>
          </div>
          <div className="econ-grid">
            <div className="flow-card reveal">
              <h3>Funded by real yield, not promises</h3>
              <p className="desc">
                Two genuine revenue sources back every point — never your
                treasury.
              </p>
              <div className="src">
                <span className="badge2">≈ 4–8%</span>
                <div className="t">
                  <b>On-chain Canton yield</b>
                  <p>
                    Your locked collateral earns validator / staking yield while
                    it sits. Points are a skin over real earnings.
                  </p>
                </div>
              </div>
              <div className="src">
                <span className="badge2">≈ 1–2%</span>
                <div className="t">
                  <b>Interchange &amp; spread</b>
                  <p>
                    Every settlement earns a margin. A slice flows back to you
                    as points — classic cashback economics, on-chain.
                  </p>
                </div>
              </div>
              <div className="src">
                <span className="badge2">0</span>
                <div className="t">
                  <b>Treasury IOUs</b>
                  <p>
                    We never owe a fixed dollar on demand. That&apos;s how
                    loyalty programs avoid billion-dollar redemption
                    liabilities.
                  </p>
                </div>
              </div>
            </div>

            <Calculator />
          </div>
        </section>

        <section style={{ paddingTop: "20px" }}>
          <div className="sec-head">
            <span className="eyebrow reveal">The points model</span>
            <h2 className="reveal d1">Soft, tunable, and in-ecosystem first.</h2>
          </div>
          <div className="why-grid">
            <div className="why reveal">
              <div className="ic">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2-6.3-4.6L5.7 21 8 13.8 2 9.4h7.6z" />
                </svg>
              </div>
              <h3>Earn on everything</h3>
              <p>
                Every spend, settle, and referral earns Magic Points. The earn
                rate is generous because it&apos;s backed by real margin.
              </p>
            </div>
            <div className="why reveal d1">
              <div className="ic">
                <svg viewBox="0 0 24 24">
                  <path d="M3 12h18M12 3v18" />
                </svg>
              </div>
              <h3>Spend points in-app first</h3>
              <p>
                Cover fees, boost your yield tier, or unlock prediction-market
                credits. Points work hardest inside the ecosystem.
              </p>
            </div>
            <div className="why reveal d2">
              <div className="ic">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>
              <h3>Convert on a cooldown</h3>
              <p>
                Cash points to USD-value after a short cooldown. Predictable for
                you, solvent for us — no on-demand dollar run.
              </p>
            </div>
          </div>
        </section>

        <div className="cta reveal">
          <h2>
            Spend it all
            <br />
            without <span className="em">selling a coin.</span>
          </h2>
          <p>
            Lock, spend, earn, repeat. Your Canton never leaves your side.
          </p>
          <div className="store-row" style={{ justifyContent: "center" }}>
            <Stores />
          </div>
        </div>
      </div>
    </div>
  );
}
