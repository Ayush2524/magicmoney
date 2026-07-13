import Link from "next/link";

export default function Stores() {
  return (
    <Link className="store" href="/wallet">
      <span className="ic">→</span>
      <span>
        <small>Magic Money</small>Launch Web App
      </span>
    </Link>
  );
}
