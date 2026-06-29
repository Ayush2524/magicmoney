import "./globals.css";
import Background from "./components/Background";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export const metadata = {
  title: "Magic Money — Spend your Canton. Never sell it.",
  description:
    "Lock your Canton Coin, draw a spendable line against it, and earn Magic Points on every transaction. Real liquidity, zero selling — built on Canton.",
  openGraph: {
    title: "Magic Money — Spend your Canton. Never sell it.",
    description:
      "A Canton-native liquidity app. Spend the value of your coins without ever selling them.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#020409",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Background />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
