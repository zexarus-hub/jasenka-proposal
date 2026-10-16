# jasenka-proposal

An interactive, single-page web proposal (in Czech) for redesigning the website of the folklore ensemble **Jasenka**. It presents the project scope, a detailed price breakdown, the payment schedule, the timeline and the terms of cooperation, with scroll-driven animations.

## Contents

- **Cover:** a hero section with a photo and parallax effect
- **Scope:** visual redesign, site structure, the "Kde nás najdete" events section, a book order form, social media templates, HTTPS, launch and support
- **Pricing:** costs and hours broken down into six blocks (Design & UX, graphics, development, security, SEO, launch)
- **Payments:** a three-instalment schedule (40 % / 30 % / 30 %)
- **Timeline:** 12 weeks, from analysis to post-launch support
- **Terms:** offer validity, form of contract, hourly rate for changes

## Tech stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [Framer Motion](https://motion.dev/): animations and scroll effects
- [Oxlint](https://oxc.rs/): linting

## Getting started

Requires [Node.js](https://nodejs.org/) (version 20 or later recommended).

```bash
npm install
npm run dev
```

The app then runs at <http://localhost:5173/>.

## Scripts

| Command           | Description                            |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Development server with hot reload     |
| `npm run build`   | Production build into the `dist/` folder |
| `npm run preview` | Local preview of the production build  |
| `npm run lint`    | Code check with Oxlint                 |

## Project structure

```
├── index.html
├── public/            # favicon and icons
├── src/
│   ├── App.jsx        # proposal content and components
│   ├── App.css        # proposal styles
│   ├── index.css      # global styles
│   ├── main.jsx       # entry point
│   └── assets/        # cover photo, Jasenka logo
└── vite.config.js
```

## Editing the content

All proposal data (scope items, prices, payments, timeline, terms) is defined as arrays at the top of `src/App.jsx`. Editing those arrays is enough to change the content, with no need to touch the components.
