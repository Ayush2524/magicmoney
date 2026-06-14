import Link from "next/link";

export default function Stores() {
  return (
    <>
      <Link className="store" href="/economics">
        <span className="ic">▶</span>
        <span>
          <small>Get it on</small>Google Play
        </span>
      </Link>
      <Link className="store" href="/economics">
        <span className="ic"></span>
        <span>
          <small>iOS · TestFlight</small>App Store
        </span>
      </Link>
      <Link className="store dark" href="/how-it-works">
        <span className="ic">◎</span>
        <span>
          <small>Add to</small>Chrome
        </span>
      </Link>
    </>
  );
}
