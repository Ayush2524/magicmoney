"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/economics", label: "Points & economics" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <div className="nav-in">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="Magic Money logo" width={32} height={32} style={{ objectFit: "contain" }} />
          Magic&nbsp;Money
        </Link>
        <div className={`nav-links${open ? " open" : ""}`}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link className="btn" href="/wallet">
            Launch Web App
          </Link>
          <button
            className="menu-btn"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}
