# Mark Saville — Developer Portfolio

A bilingual developer portfolio showcasing my web development projects, technical skills and professional experience. Built with React and TypeScript using Next.js-compatible vinext and Vite, the website combines an interactive, responsive interface with content managed through a separate Strapi CMS.

[**Explore the live website**](https://portfolio.marksavilledesigns.com/)

## Features

- **Bilingual experience:** German and English content, with language switching that preserves the current page section.

- **Project showcase:** A CMS-managed collection of development projects, presented through responsive cards and expandable project details.

- **Interactive galleries:** Project screenshots with thumbnail navigation, keyboard controls and accessible dialog interactions.

- **Technical skills:** An organized overview of development technologies, frameworks and tools.

- **Professional profile:** Background information, experience and contact details.

- **Contact form:** A localized enquiry form with submission feedback and secure server-side email delivery.

- **Responsive design:** Layouts and navigation adapted for desktop, tablet and mobile devices.

## Technology Stack

| Area               | Technologies                                    |
| ------------------ | ----------------------------------------------- |
| Frontend           | React 19, TypeScript, Next.js-compatible vinext |
| Styling and UI     | Tailwind CSS 4, Radix UI                        |
| Build and runtime  | Vite, Cloudflare Workers                        |
| Content management | Strapi REST API                                 |
| Email integration  | Resend                                          |
| Testing            | Playwright, axe, Node.js test runner            |

## Technical Highlights

### CMS-driven rendering and resilience

Published portfolio content is retrieved from Strapi on the server, so content updates do not require rebuilding the frontend. Sections load independently and can report unavailable content without preventing the rest of the page from rendering.

### Localization and accessibility

German and English content is supported throughout project descriptions, navigation, metadata and contact-form feedback. Project dialogs and galleries support keyboard interaction, focus management and responsive layouts.

### Curated project presentation

The portfolio presents 13 projects from Strapi. Eight appear initially; five more are available through **Show More**. Project ordering is curated in the frontend while project details and media remain CMS-managed.

### Search and contact

Localized metadata, canonical URLs, language alternates and an XML sitemap support search discovery. Contact enquiries are validated on the server, protected by origin checks, a honeypot and Cloudflare rate limiting, then delivered through Resend.

## How it works

The Vite build uses vinext to provide a Next.js-compatible React application on Cloudflare Workers. The server retrieves and normalizes localized content and media from the independently maintained Strapi REST API. The frontend does not administer or redeploy Strapi.

The contact form posts to a server-side API route. That route validates requests, applies abuse protection and sends accepted messages through Resend. Email credentials stay on the server; validated visitor addresses are used for Reply-To.

`wrangler.jsonc` defines separate production and staging Worker environments. Runtime bindings and secrets are server-side and are not included in the client bundle.

## Getting started

Use Node.js 20.19.x or another compatible release in the 20.x line, or Node.js 22.12.0 or newer, plus npm 11.19.0 as declared in `package.json`.

```sh
npm ci
npm run dev
```

The Vite development server uses `http://127.0.0.1:5173` by default. To display live portfolio content, provide the local Worker with `STRAPI_URL` and, if required, the server-side `STRAPI_API_TOKEN`. For isolated interface development, set the local `PORTFOLIO_FIXTURES` binding to `true`; this displays labeled synthetic content and does not verify live CMS data. Keep credentials out of source control.

### Testing

Run `npm test` for the deterministic project, content, contact, indexing and SEO checks. The Playwright browser suite is available through `npm run test:browser` and requires a running local application and a compatible Chrome/Chromium executable; set `PORTFOLIO_TEST_URL` if it is not available at the test's default address.

## Project Status

The portfolio is live and actively maintained, with English and German versions available through the production website.
