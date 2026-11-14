

# গণিতকোষ (GonitKosh)

An interactive, game-like web platform and C++20 math library with **Bangla function names**. Built with **Next.js 14** (static export) and **Tailwind CSS** — zero backend required.

---

## Live Previews

| Island Quest (3D Archipelago) | All-in-One REPL Console |
| :---: | :---: |
|  |  |

---

## Features

- **Island Quest (`components/World.js`)**: Explore a 3D archipelago of 8 progressive math islands with your custom explorer avatar (`public/scholar.png`) and earn up to 24 stars (`0 mistakes = 3★`, `1–2 = 2★`, `3+ = 1★`).
- **Function Lab (`components/Docs.js`)**: Test all **26 built-in Bangla math functions** (`jog`, `biyog`, `gun`, `bhag`, `gosagu`, `moulik`, and more) with live C++-style error reporting.
- **All-in-One Console**: Run nested expressions like `borgo(jog(2, 3))` or list operations like `gorh({1, 2, 3})` in a live REPL, alongside a full cheat-sheet table.
- **Practice Arena**: Solve 10 guided math challenges with hints and progress saved automatically in `localStorage`.

---

## Getting Started

```bash
npm install
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Generate static export in ./out
```

---

## Project Structure

```text
gonitkosh-web/
├── app/
│   ├── globals.css          # Theme variables, 3D archipelago & animation styles
│   ├── layout.js            # Root layout, Bangla + monospace fonts
│   └── page.js              # Hero, 3D interactive cube, navigation
├── components/
│   ├── World.js             # 3D Island Quest map & challenge modal
│   ├── Docs.js              # Function Lab, REPL Console, Cheat-sheet & Practice
│   └── Ic.js                # Icon & star rating helpers
├── lib/
│   ├── gk.js                # JS port of cpp/gonitkosh.hpp (exact functions & errors)
│   └── data.js              # 26 function docs, 8 island levels & practice problems
├── cpp/
│   ├── gonitkosh.hpp        # Original C++20 header library
│   └── main.cpp             # C++ CLI/demo entry point
├── public/
│   └── scholar.png          # Custom explorer avatar
├── gonitkosh-repo-banner.svg
├── gonitkosh-islands.gif
└── gonitkosh-console.gif
```

---

## Notes

- `lib/gk.js` mirrors `cpp/gonitkosh.hpp` so every calculation and exception matches the C++ library directly in the browser.
- Edit `lib/data.js` to add new functions, islands, or practice problems.
