import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-in">
          <Link href="/" className="logo">
            <Image src="/logo.png" alt="Magic Money" width={100} height={30} style={{ objectFit: "contain" }} />
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
