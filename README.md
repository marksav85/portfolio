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

The production Strapi backend is hosted at [portfolio-strapi-api.marksavilledesigns.com](https://portfolio-strapi-api.marksavilledesigns.com).

For Cloudflare Pages production deployments, set `VITE_STRAPI_URL` to
`https://portfolio-strapi-api.marksavilledesigns.com`. Vite injects this value at
build time, so redeploy after changing the Pages environment variable.

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

## Portfolio Projects transition (Stage 2)

The frontend supports the new `/api/portfolio-projects` collection and retains the
legacy `/api/projects` adapter. Set `VITE_PROJECT_SOURCE=collection` at build time
to opt in. The default remains `legacy` as an explicit rollback-safe build setting.
There is no automatic fallback after a collection request fails. Legacy selection
emits a console warning; `#two[data-project-source]` identifies the selected source.
Invalid source configuration fails explicitly.

Edit `src/config/projects.ts` to configure:

- `preferredOrder`: reviewed slugs in display order; unlisted published entries
  follow in API slug order, with no hardcoded project limit.
- `initialVisibleCount`: initially six; changing it requires only this config.
- `featuredSlugs`: optional slugs that lead the initial group, ahead of preferred
  order. The configured visible count still controls the group size. Missing slugs
  are ignored. Remaining projects stay behind the existing expansion control.
- `projectLinks`: migrated homepage flags are now honored directly
  (`homepageFlagsReviewed=true`). The legacy adapter retains its former policy.
  Current migrated flags remain false/null; no links are enabled by this change.

Repository links require `hasRepository === true`; homepage links require
`hasHomepage === true`. Both URLs must be
valid absolute HTTP(S) URLs without embedded credentials. The legacy adapter
preserves its old homepage behavior and hides repositories. No project-number
conditions remain in card rendering.

Collection requests explicitly select published EN/DE entries, populate nested
Images and traverse all result pages. The adapter preserves media order and skips
missing media, rejects duplicate slugs/document identities, and excludes draft or
wrong-locale responses. The existing provider still owns locale caching, request
cancellation and error reporting. Cards, galleries, modal and CSS are retained.

Offline validation (Node 22.13 recommended):

```sh
node tests/projects.test.cjs
npx --no-install tsc --noEmit
npm run lint
npm run build
git diff --check
```

The fixture tests do not contact Strapi or production. Verify real API permissions,
media and EN/DE visual output against the isolated migrated restore before cutover.
The installed lint plugin predates React's existing `fetchPriority` attribute;
the lint configuration now recognizes that attribute without dependency changes.

Backend migration and public collection access are complete. Before frontend
cutover, set Cloudflare Pages production build variables to:

```text
VITE_PROJECT_SOURCE=collection
VITE_STRAPI_URL=https://portfolio-strapi-api.marksavilledesigns.com
```

Then build/deploy this reviewed frontend revision after separate authorization.
Use `VITE_PROJECT_SOURCE=legacy` and rebuild to roll back the data source. No
runtime API error silently switches sources. The preferred order contains the
approved eleven migration slugs; the first six remain initially visible.
