# Yash Barot — 3D Portfolio

Dark space / neon themed portfolio for **Yash Barot — Data Analyst**.
Live at **[yashdbarot.me/portfolio](https://yashdbarot.me/portfolio/)** (GitHub Pages).

## Stack

- **React 19 + Vite** (rolldown)
- **Tailwind CSS v4** — design tokens, shadcn-style component primitives (`cva` + `cn`)
- **Three.js** via **@react-three/fiber** + **drei** — lazy-loaded 3D hero (starfield, holographic data bars, floating wireframes, pointer parallax)
- **GSAP + ScrollTrigger** — scroll reveals, timeline scrub, hero intro
- **lucide-react** icons, dark/light theme toggle
- Contact form via FormSubmit → email

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
```

## Deploy (GitHub Pages)

```bash
npm run deploy     # builds /dist and pushes to the gh-pages branch
```

All content (bio, skills, experience, projects, links) lives in **`src/data/resume.js`**.

## Structure

```
src/
├── data/resume.js          # ← all content here
├── context/theme.jsx       # dark/light theme
├── components/
│   ├── Scene3D.jsx         # three.js hero scene
│   ├── Hero.jsx            # typewriter + counters
│   ├── Navbar.jsx          # + theme toggle
│   ├── About/Skills/Experience/Projects/Contact/Footer
│   └── ui/button.jsx       # cva variants
└── lib/utils.js            # cn()
```
