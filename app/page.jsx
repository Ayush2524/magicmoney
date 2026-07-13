"use client";
import { useRef } from "react";
import { useScrollFx } from "./components/fx";
import HeroVisual from "./components/HeroVisual";
import Stores from "./components/Stores";

export default function Home() {
  const ref = useRef(null);
  useScrollFx(ref);

  return (
    <div ref={ref} className="page-in">
      <div className="wrap">
        <div className="hero">
          <div>
            <div className="pill reveal">
              <span className="spark" style={{ width: "9px", height: "9px" }} />{" "}
              Built on <b>Canton</b>
            </div>
            <h1 className="reveal d1">
              Spend your Canton.
              <br />
              <span className="em">Never sell it.</span>
            </h1>
            <p className="lede reveal d2">
              Lock your Canton Coin, draw a spendable line against it, and{" "}
              <b>earn Magic Points on every transaction.</b> Real liquidity,
              zero selling — your assets keep working while you spend.
            </p>
            <div className="store-row reveal d3">
              <Stores />
            </div>
            <p className="trust reveal d3">
              Over-collateralized · <b>self-liquidating</b> · no fees to begin
            </p>
          </div>
          <HeroVisual />
        </div>
      </div>

      {/* live now */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">Working today</span>
            <h2 className="reveal d1">
              Your coins stay put.
              <br />
              Their value gets spent.
            </h2>
            <p className="reveal d2">
              Three parts, one loop: a vault that holds your coin, a line you
              can spend in dollars, and points that pay you back — every move
              settled on Canton.
            </p>
          </div>
          <div className="cards">
            <div className="card reveal">
              <span className="tag">
                <span className="d" />
                LIVE
              </span>
              <div className="ic">▢</div>
              <h3>Collateral vault</h3>
              <p>
                Drop your Canton Coin into a vault in one tap. It stays in your
                name, stays recoverable, and keeps earning while it backs your
                line.
              </p>
            </div>
            <div className="card reveal d1">
              <span className="tag">
                <span className="d" />
                LIVE
              </span>
              <div className="ic">↗</div>
              <h3>Spending line</h3>
              <p>
                Borrow dollars against your vault at a safe ratio and spend them
                anywhere. The line quietly settles itself from your collateral.
              </p>
            </div>
            <div className="card reveal d2">
              <span className="tag">
                <span className="d" />
                LIVE
              </span>
              <div className="ic">✦</div>
              <h3>Magic Points</h3>
              <p>
                Every transaction pays you back in points — funded by real yield
                and card margin, not promises. Use them in-app or cash out on
                your own clock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* opportunity */}
      <section>
        <div className="wrap">
          <div className="band reveal">
            <div className="inner">
              <span className="eyebrow dark">The gap we close</span>
              <h2>Your coin should spend like cash — without leaving you.</h2>
              <p className="sub">
                Today, spending a single dollar of your Canton means selling it
                — and giving up the position. Magic Money unlocks the value and
                hands the coin right back to you.
              </p>
              <div className="stat-grid">
                <div className="stat">
                  <div className="num">
                    <span data-count="48" data-suffix="%">
                      0
                    </span>
                  </div>
                  <p>
                    of your locked Canton is <b>spendable on day one</b> — with
                    headroom kept in reserve
                  </p>
                </div>
                <div className="stat">
                  <div className="num">
                    24<span style={{ opacity: 0.5 }}>/</span>7
                  </div>
                  <p>
                    <b>self-liquidating settlement</b> — no due dates, no
                    collections, no late fees, ever
                  </p>
                </div>
                <div className="stat">
                  <div className="num">
                    $<span data-count="0">0</span> sold
                  </div>
                  <p>
                    to unlock a balance — <b>your coin stays in your name</b>,
                    still earning the whole time
                  </p>
                </div>
              </div>
              <div className="secured">
                <span className="cc">Canton</span> Settled on Canton ·
                self-liquidating · selective-disclosure privacy
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* why */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">Why Magic Money</span>
            <h2 className="reveal d1">
              Built like infrastructure.
              <br />
              Feels like cash.
            </h2>
          </div>
          <div className="why-grid">
            <div className="why reveal">
              <div className="ic">
                <svg viewBox="0 0 24 24">
                  <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3>Never sell, never miss the upside</h3>
              <p>
                Your Canton Coin stays in your name, earning yield, while you
                spend its value. The credit is invisible — it feels like
                spending your own money.
              </p>
            </div>
            <div className="why reveal d1">
              <div className="ic">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
                </svg>
              </div>
              <h3>Self-liquidating by design</h3>
              <p>
                Every line is over-collateralized and auto-settles against your
                CC. No collections, no surprise APRs, no &quot;minimum
                payment&quot; anxiety.
              </p>
            </div>
            <div className="why reveal d2">
              <div className="ic">
                <svg viewBox="0 0 24 24">
                  <path d="M4 7h16M4 12h16M4 17h10" />
                </svg>
              </div>
              <h3>One app that keeps growing</h3>
              <p>
                Vault, spending line, points today — with cards and automated
                payments on the way. Each piece makes the rest more useful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* final cta */}
      <div className="wrap">
        <div className="cta reveal">
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Get Magic Money
          </span>
          <h2>
            Stop choosing between
            <br />
            holding and <span className="em">spending.</span>
          </h2>
          <p>
            No install required — open it in your browser. Setup takes about
            a minute.
          </p>
          <div className="store-row" style={{ justifyContent: "center" }}>
            <Stores />
          </div>
          <p className="trust">
            Over-collateralized · self-liquidating · no fees to begin
          </p>
        </div>
      </div>
    </div>
  );
}
