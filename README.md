# Mark Saville — Developer Portfolio

A bilingual developer portfolio presenting Mark Saville's projects, technical skills and professional background. The application combines server-rendered Strapi content with an interactive project gallery and a server-backed contact form.

## Features

- German by default, with English available at `/?lang=en`; language navigation preserves section anchors.
- Published project collection with six initial cards, a reveal control and a configurable presentation order.
- Accessible project dialog with ordered screenshots, thumbnail selection, keyboard navigation and safe optional project links.
- Responsive profile, grouped Skills disclosure and professional contact links.
- Localized contact validation, pending feedback, preserved input on failure and confirmation after provider acceptance.

## Technology stack

| Area              | Technology                                                      |
| ----------------- | --------------------------------------------------------------- |
| Application       | Next.js App Router conventions, React 19, strict TypeScript     |
| Build and runtime | vinext, Vite, Cloudflare Workers and the Cloudflare Vite plugin |
| Interface         | Tailwind CSS 4, CSS design tokens, Radix Dialog                 |
| Content           | Separate Strapi REST API                                        |
| Email             | Resend through a same-origin server route                       |
| Abuse protection  | Native Cloudflare Workers rate-limit binding                    |
| Verification      | Node test runner, Playwright, axe and local workerd simulation  |

## Technical highlights

Content is fetched on the server at request time. Each section has an independent result, so a failed CMS request does not discard successfully loaded sections. Relative media URLs resolve against the configured CMS origin; credentials stay outside the client content payload.

Projects come from `/api/portfolio-projects`. The adapter traverses pagination, requests published localized entries, rejects duplicate identities and preserves image and rich-text ordering. Presentation order and the initial visible count are configured in `src/config/projects.ts`. Optional project destinations require explicit visibility flags and valid HTTP(S) URLs without embedded credentials.

The browser submits the three contact fields to `/api/contact`. The route validates and normalizes them independently, applies origin, payload-size and honeypot checks, then enforces a native rate limit before invoking Resend. Sender and recipient are fixed server configuration; Reply-To uses the validated visitor email. Provider acceptance triggers the success state; it does not prove inbox delivery.

## Getting started

Use Node.js 22 or newer and the npm version declared in `package.json`. The validated local environment uses Node.js 24. Install the locked dependencies and start the local Worker development runtime:

```sh
npm ci
npm run dev
```

Open the loopback address printed by Vite. Configure the separate Strapi service through a private, ignored `.env.local` in the repository root. For an offline UI preview, set `PORTFOLIO_FIXTURES=true`; synthetic content is labelled and never used as an automatic CMS fallback.

### Environment

These names are read from server-side Cloudflare Worker bindings. Do not prefix secrets with `VITE_` or `NEXT_PUBLIC_`.

| Name                     | Responsibility                                                                                |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| `STRAPI_URL`             | Base URL of the Strapi REST service; required for genuine content.                            |
| `STRAPI_API_TOKEN`       | Optional server token if the configured CMS permissions require it.                           |
| `PORTFOLIO_FIXTURES`     | Explicit synthetic preview mode when exactly `true`; omit or use `false` for genuine content. |
| `SITE_URL`               | Optional public canonical origin for canonical and alternate-language metadata.               |
| `RESEND_API_KEY`         | Private sending credential; required for contact delivery.                                    |
| `CONTACT_FROM`           | Authorized sender on a verified Resend domain.                                                |
| `CONTACT_TO`             | Fixed contact recipient.                                                                      |
| `CONTACT_ALLOWED_ORIGIN` | Optional exact accepted origin; defaults to the request URL origin.                           |

The native `CONTACT_RATE_LIMITER` binding is declared in `wrangler.jsonc`, not an environment string. Do not add a competing root `.dev.vars`: it would mask existing `.env` bindings. Build output includes private local bindings for preview and must stay untracked.

### Validation

```sh
npm run format:check
npm run lint
npm run typecheck
npm test
npm run test:contact-worker
npm run build
```

The contact unit and Worker tests use mocked email delivery. To check the built application locally:

```sh
npm run start -- --port 4173
```

Rebuild before restarting this preview after environment changes. With this real-content preview running, execute:

```sh
PORTFOLIO_TEST_URL=http://127.0.0.1:4173 node tests/contact-browser.test.cjs
PORTFOLIO_LIVE_TEST_URL=http://127.0.0.1:4173 npm run test:live
```

The contact browser test intercepts delivery requests. The live test performs read-only Strapi requests and checks the current twelve-project collection, galleries, localization, fonts and accessibility. `npm run test:browser` additionally checks synthetic edge cases such as zero/one/many gallery images; it expects a separate preview built with `PORTFOLIO_FIXTURES=true`.

## Cloudflare architecture and staging

vinext builds the application into a Cloudflare Worker plus client assets. `npm run start` uses the generated `dist/server/wrangler.json` for local preview. This server-backed application requires Workers execution for CMS access and `/api/contact`; publishing only the static assets is insufficient.

The configured contact policy allows approximately three valid attempts per client IP per 60 seconds in each Cloudflare location. Limited requests receive `429` and `Retry-After: 60`. Missing or unusable limiter bindings or client identity fail closed with `503`, including in local preview. IP identity relies on trusted Cloudflare ingress, not arbitrary forwarding headers. Shared networks share quota, and distributed traffic can evade per-IP limits. Native limits are approximate, not a strict global cap.

Before staging, confirm the dedicated namespace identifier is unused in the target account, preserve bindings in any named environment, provision server secrets securely and validate client-IP forwarding and origin policy. Keep fixtures disabled for genuine content. Test accessibility and interactions on target devices, and verify delivery separately under an explicitly approved test. The repository configuration does not establish a deployed staging environment.

## Fonts

Inter, Plus Jakarta Sans and JetBrains Mono are served locally from their installed Fontsource packages. Their license texts are included with those dependencies.
