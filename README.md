# গণিতকোষ (GonitKosh) — Web

Interactive, game-like site for the GonitKosh C++ math library (Bangla function names).
Next.js 14 (static export) + Tailwind CSS. No backend.

## Run
```
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out  (deploy anywhere)
```
## Notes
- `lib/gk.js` is a JavaScript port of `cpp/gonitkosh.hpp` (same functions, same error messages) so it runs in the browser.
- `lib/data.js` holds function docs, the 8 island levels and the practice problems — edit it to add more.
- Stars: 0 mistakes = 3★, 1–2 = 2★, 3+ = 1★. Progress is saved in localStorage.
- Your original C++ files are in `cpp/`.
