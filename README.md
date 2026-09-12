# Mark Saville Portfolio

## Overview

Frontend for Mark Saville's personal developer portfolio. It is built with React, TypeScript, and Vite, loads portfolio content from a separate Strapi backend, supports German and English content, and is deployed as a static frontend.

## Tech Stack

- React 18 and TypeScript
- Vite
- React Bootstrap and Bootstrap
- Font Awesome React SVG components
- React Loading Skeleton
- Strapi REST API

## Local Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

## Environment

Set `VITE_STRAPI_URL` to the Strapi base URL for the environment:

```text
VITE_STRAPI_URL=https://your-strapi-instance.example.com
```

Environment files are local configuration and should not contain credentials in the frontend.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite in development mode. |
| `npm run dev:local` | Start Vite in development mode with local configuration. |
| `npm run dev:prod` | Start Vite in production mode for configuration checks. |
| `npm run build` | Create the production build in `dist/`. |
| `npm run lint` | Run ESLint and fail on warnings. |
| `npm run preview` | Serve the production build locally. |
| `npx tsc --noEmit` | Type-check the application without emitting files. |

## CMS and Locales

Portfolio content is loaded from Strapi through REST using `VITE_STRAPI_URL`. German (`de`) and English (`en`) content are supported, with German as the current default locale.

`LanguageProvider` owns the active language state. `PortfolioContentProvider` centralizes content loading, caches successfully loaded locale content, cancels obsolete requests, and exposes normalized content to components.

## Deployment

The production frontend is deployed with Cloudflare Pages at [marksavilledesigns.com](https://marksavilledesigns.com). Build it with `npm run build`; the output directory is `dist/`.

The production Strapi backend is a separate project at [portfolio-strapi-wsn7.onrender.com](https://portfolio-strapi-wsn7.onrender.com).

## Project Structure

| Path | Purpose |
| --- | --- |
| `src/api` | Strapi REST requests and data normalization. |
| `src/components` | Page sections and reusable UI components. |
| `src/context` | Language and shared portfolio-content providers. |
| `src/types` | Portfolio content TypeScript contracts. |
| `src/assets` | Global CSS and bundled visual assets. |
| `public` | Static files copied to the production build. |

## Notes

Portfolio content is managed through the separate Strapi project. Visual redesign and CMS restructuring are outside the scope of this interim frontend refresh.
