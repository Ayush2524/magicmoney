import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-in">
          <Link href="/" className="logo">
            <span className="spark" style={{ width: "11px", height: "11px" }} />
            Magic&nbsp;Money
          </Link>
          <div className="foot-links">
            <Link href="/">Home</Link>
            <Link href="/how-it-works">How it works</Link>
            <Link href="/economics">Economics</Link>
          </div>
        </div>
        <p className="disclaimer">
          Magic Money is a Canton-native liquidity app. Spendable lines are
          over-collateralized and self-liquidating; Magic Points are a loyalty
          unit funded by on-chain yield and interchange, not a redeemable
          security. Figures shown are illustrative. Not financial advice.
        </p>
      </div>
    </footer>
  );
}
