"use client";
import { useRef } from "react";
import { useScrollFx } from "../components/fx";
import Timeline from "../components/Timeline";

export default function HowItWorks() {
  const ref = useRef(null);
  useScrollFx(ref);

  return (
    <div ref={ref} className="page-in">
      <div className="wrap">
        <section style={{ paddingTop: "64px" }}>
          <div className="sec-head">
            <span className="eyebrow reveal">How it works</span>
            <h2 className="reveal d1">Four steps. None of them is &quot;sell.&quot;</h2>
            <p className="reveal d2">
              Magic Money never lends you a stranger&apos;s money. You spend
              against what you already own — and you get it all back when the
              line settles.
            </p>
          </div>
          <Timeline />
        </section>

        <section style={{ paddingTop: "30px" }}>
          <div className="band reveal">
            <div className="inner" style={{ textAlign: "center" }}>
              <span
                className="eyebrow dark"
                style={{ justifyContent: "center" }}
              >
                The long game
              </span>
              <h2 style={{ marginBottom: "14px" }}>
                A full bank that never asks you to sell.
              </h2>
              <p className="sub" style={{ margin: "0 auto" }}>
                Spending lines today. Physical and virtual cards next. Then
                payments your agents can make on your behalf, inside limits you
                set — every layer built on coins you got to keep.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
