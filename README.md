# Magic Money

A Canton-native liquidity app — **spend the value of your Canton Coin without ever selling it.** Lock collateral, draw a self-liquidating spending line against it, and earn Magic Points on every transaction.

Built with **Next.js (App Router)**. Three routes:

- `/` — Home
- `/how-it-works` — The lock → spend → earn → settle flow
- `/economics` — Where points come from + a live LTV calculator

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset auto-detects **Next.js** — no config needed. Click **Deploy**.

Or from the CLI:

```bash
npm i -g vercel
vercel
```

## Stack

- Next.js 14 (App Router)
- React 18
- `next/font` (Space Grotesk · Inter · JetBrains Mono)
- Zero UI dependencies — all styling in `app/globals.css`, all motion in vanilla React/CSS

## Structure

```
app/
  layout.jsx            # fonts, metadata, background, nav, footer
  globals.css           # full design system (violet-on-black)
  page.jsx              # Home
  how-it-works/page.jsx
  economics/page.jsx
  components/
    Background.jsx       # ambient orbs, animated grid, scanline, grain
    Nav.jsx              # active-route highlighting + mobile menu
    Footer.jsx
    Stores.jsx           # app-store buttons
    HeroVisual.jsx       # phone mockup + animated collateral ring
    Timeline.jsx         # auto-advancing how-it-works steps
    Calculator.jsx       # interactive LTV / spending-power calculator
    fx.js                # scroll reveals, count-up, card cursor glow
```

> Magic Money is a product concept. Figures shown are illustrative. Not financial advice.
