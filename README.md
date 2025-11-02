# My Portfolio Website

A Vite-powered React application that presents Mark Saville’s portfolio. The site pulls structured content from a Strapi GraphQL API, supports English and German copy, and uses Apollo Client to cache data between visits.

## Features
- Bilingual toggle that swaps between English and German copy without a full reload.
- Portfolio highlights with lightbox galleries, technology stacks, and live/demo links.
- Skills matrix and references driven by the CMS to keep content editable.
- Contact section with direct links for email, phone, and social profiles.

## Getting Started
1. Install dependencies with `npm install`.
2. Create a `.env` file and set `VITE_STRAPI_URL` to your Strapi GraphQL endpoint.
3. Run `npm run dev` and open the printed URL to view the site locally.

## Available Scripts
- `npm run dev` – start the Vite dev server locally.
- `npm run build` – create an optimized production build in `dist/`.
- `npm run preview` – preview the production build.
- `npm run deploy` – build and publish the site to GitHub Pages via `gh-pages`.

## Tech Stack
React 18, TypeScript, Vite, Apollo Client, React Bootstrap/Bootstrap 5, Font Awesome, and react-loading-skeleton.
