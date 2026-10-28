# Portfolio — Deployment and Operations Runbook

## 1\. Purpose

This document describes the operational procedures for deploying, verifying, maintaining and recovering the Mark Saville Developer Portfolio.

It is intended for the project owner and developers maintaining the application. It supplements the public-facing README and the reusable MSD Projects Playbook documentation.

The priorities are:

- Maintain a reliable production website.

- Preserve the separation between production and staging.

- Protect credentials and existing Cloudflare infrastructure.

- Verify CMS content and contact functionality after deployments.

- Provide a clear, controlled rollback procedure.

Infrastructure changes, production deployments and destructive cleanup require explicit authorization.

---

## 2\. Application Architecture

The portfolio is a bilingual Next.js application running on Cloudflare Workers through vinext.

The frontend retrieves published content from an independently hosted Strapi CMS. Contact enquiries are processed through a server-side API route using Resend.

| Component        | Technology / Service       | Responsibility                         |
| ---------------- | -------------------------- | -------------------------------------- |
| Frontend         | Next.js, React, TypeScript | Rendering, navigation and interactions |
| Runtime          | vinext, Cloudflare Workers | Server rendering and API execution     |
| CMS              | Strapi REST API            | Portfolio content and media            |
| CMS hosting      | VPS with Caddy             | Existing backend hosting and HTTPS     |
| Contact delivery | Resend                     | Email delivery                         |
| Rate limiting    | Cloudflare native binding  | Contact submission throttling          |
| Configuration    | Wrangler                   | Worker environment definitions         |

The Strapi backend is independent of the frontend Worker. Deploying the portfolio frontend must not modify or redeploy Strapi.

### Request flows

**Content delivery**

Visitor → Cloudflare Worker → Strapi API → Rendered portfolio page

**Contact delivery**

Visitor → `/api/contact` → Server-side validation and abuse protection → Resend → Recipient mailbox

The contact form has no database storage requirement.

---

## 3\. Environments and Hostnames

### Production

| Setting          | Value                                                         |
| ---------------- | ------------------------------------------------------------- |
| Worker           | `portfolio-frontend-production`                               |
| Public domain    | `https://portfolio.marksavilledesigns.com`                    |
| Worker URL       | `https://portfolio-frontend-production.marksav85.workers.dev` |
| Environment      | `production`                                                  |
| Fixtures         | Disabled                                                      |
| Search indexing  | Enabled on the public domain                                  |
| Contact delivery | Enabled                                                       |

The public Custom Domain is the canonical production address.

The production `workers.dev` URL remains available as a diagnostic endpoint but carries `noindex, nofollow` restrictions. It must not be treated as a second canonical website.

### Staging

| Setting         | Value                                                      |
| --------------- | ---------------------------------------------------------- |
| Worker          | `portfolio-frontend-staging`                               |
| URL             | `https://portfolio-frontend-staging.marksav85.workers.dev` |
| Environment     | `staging`                                                  |
| Search indexing | Disabled                                                   |
| Purpose         | Testing and deployment verification                        |

Staging must remain independent from production.

Do not assume staging and production have identical secret availability, bindings or delivery permissions. Verify the effective environment configuration before running integration tests.

### Existing CMS

`https://portfolio-strapi-api.marksavilledesigns.com`

The API is hosted on the existing VPS behind Caddy and is represented by a DNS-only Cloudflare record.

This arrangement is intentional. Do not change the CMS hostname, proxy setting, origin configuration or Caddy routing as part of routine frontend deployments.

### Retired legacy deployment

`https://portfolio-eek.pages.dev`

The legacy Cloudflare Pages project `portfolio` was permanently deleted on **27 October 2026**. The URL above is historical and is no longer an available deployment or rollback target.

Its Custom Domain had already been removed and its GitHub integration disconnected before deletion.

Deployment history was reduced from 126 to 99 by deleting 27 historical preview deployments to overcome Cloudflare's project-deletion limitation. The owner then deleted the project. Recovery uses the supported Worker version rollback procedure below.

---

## 4\. Configuration Ownership

### Wrangler

The source-controlled `wrangler.jsonc` defines the intended Worker configuration.

It includes environment-specific values, Worker settings, compatibility flags, rate-limit bindings and production domain configuration.

**Treat the repository configuration as the source of truth for routine deployments.**

Cloudflare dashboard changes can create a newer deployed version or configuration differences. Before deploying, compare the effective dashboard settings with the repository configuration, especially after modifying secrets or bindings through the dashboard.

Generated Wrangler configuration and build artifacts are not the primary source of truth.

### Important environment values

| Variable                 | Purpose                                                      |
| ------------------------ | ------------------------------------------------------------ |
| `STRAPI_URL`             | Strapi REST API base URL                                     |
| `STRAPI_API_TOKEN`       | Optional server-only CMS read token                          |
| `PORTFOLIO_FIXTURES`     | Enables synthetic content only when explicitly set to `true` |
| `DEPLOYMENT_ENV`         | Controls environment-specific indexing behavior              |
| `SITE_URL`               | Canonical origin for the selected environment                |
| `CONTACT_ALLOWED_ORIGIN` | Accepted origin for contact requests                         |
| `RESEND_API_KEY`         | Private Resend credential                                    |
| `CONTACT_FROM`           | Authorized email sender                                      |
| `CONTACT_TO`             | Recipient address                                            |

Do not copy production secrets into source control, documentation or publicly visible build variables.

Production normally requires:

- `DEPLOYMENT_ENV=production`

- `PORTFOLIO_FIXTURES=false`

- `SITE_URL=https://portfolio.marksavilledesigns.com`

- `CONTACT_ALLOWED_ORIGIN=https://portfolio.marksavilledesigns.com`

Indexing is permitted only when `DEPLOYMENT_ENV=production` and the request origin matches `SITE_URL`. Other origins retain `noindex, nofollow` in response headers and HTML robots metadata. The configuration helpers are in `src/lib/strapi-server.ts`; hostname enforcement is in `src/middleware.ts` and `src/app/page.tsx`.

The current production environment contains the required server-side secrets. Confirm their presence without revealing their values.

### Cloudflare bindings

The contact form uses the native `CONTACT_RATE_LIMITER` binding.

The production configuration uses the rate-limit namespace `2026102601`; staging uses `2026102602`.

Both environments also require the `ASSETS` binding for the generated client assets. Its source directory is `dist/client` in `wrangler.jsonc`; preserve the generated deployment configuration rather than editing its paths manually.

The contact policy is approximately three valid submission attempts per client IP per 60 seconds, subject to Cloudflare's native enforcement behavior.

Preserve the configured namespace and binding when deploying. Staging must retain its own approved configuration.

A missing required rate-limit binding must not silently disable the protection.

---

## 5\. Cloudflare Compatibility Requirements

The production Worker uses these compatibility flags:

- `nodejs_compat`

- `global_fetch_strictly_public`

Both must be preserved during routine production deployments.

Staging inherits `nodejs_compat` only. The configured compatibility date is `2026-10-24`.

### Why `global_fetch_strictly_public` is present

During the October 2026 migration, CMS requests worked through the production `workers.dev` URL but failed through the portfolio Custom Domain.

The Worker repeatedly encountered:

`Too many subrequests by single Worker invocation`

A controlled diagnostic test identified an HTTP 308 redirect back to the identical HTTPS Strapi URL when the request used the original same-zone routing behavior.

Adding `global_fetch_strictly_public` caused the test request to return HTTP 200 with valid CMS content.

The corrected production Worker subsequently loaded all expected CMS sections in both languages.

### Operational rule

This flag is required by the verified portfolio configuration, but it is not universally required by Strapi or Cloudflare Workers.

Do not remove it during an unrelated deployment.

Do not automatically apply it to other Workers without testing their routing topology.

Do not change the Cloudflare zone's SSL mode, CMS DNS record or Caddy configuration as a speculative workaround.

For future diagnostics, consult the MSD Playbook Strapi integration module and Cloudflare runtime guidance.

---

## 6\. Local Development and Validation

Use the Node.js version supported by the current package configuration.

Node.js 24 is the validated preferred development environment. The installed Vite toolchain requires Node.js 22.12 or newer if using Node 22.

Use npm `11.19.0`, as declared by `packageManager` in `package.json`.

Install dependencies using the lockfile:

```
npm ci
```

Start the local development environment:

```
npm run dev
```

The application requires a suitable local CMS configuration for genuine content. Synthetic fixture mode can be used for isolated interface development but must not be confused with production CMS verification.

Local environment files and private build bindings must remain untracked.

### Standard validation

Run:

```
npm run format:check
npm run lint
npm run typecheck
npm test
npm run test:contact-worker
npm run build
```

For browser and live-content testing, use the repository's existing test scripts and documented preview requirements.

Some tests require a built local Worker preview and specific environment variables.

Avoid running live contact submissions simply to verify that the application builds. The existing contact tests support mocked or intercepted delivery.

Review the current `package.json` before executing commands if scripts have changed.

---

## 7\. Deployment Procedure

### Automatic production deployment — Workers Builds

Cloudflare Workers Builds is connected to the existing `portfolio-frontend-production` Worker. Every push to `main` in GitHub repository `marksav85/portfolio` triggers an automatic production build and deployment. Treat a push to `main` as a production release and complete the pre-deployment checks below before pushing.

| Setting           | Value                          |
| ----------------- | ------------------------------ |
| Root directory    | `/`                            |
| Production branch | `main`                         |
| Preview builds    | Disabled                       |
| Build variable    | `NODE_VERSION=24`              |
| Build variable    | `SKIP_DEPENDENCY_INSTALL=true` |

Build command:

```sh
npm ci && CLOUDFLARE_ENV=production CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV=false npm run build
```

Deploy command:

```sh
npx wrangler deploy --config dist/server/wrangler.json --keep-vars
```

Dependency installation is explicit through `npm ci`. The build selects production and generates flattened configuration; do not add an environment selector to the deploy command. Runtime secrets remain on the Worker and must not be copied into build variables. The existing variable, secret and binding preservation rules below apply.

Monitor the production Worker's **Deployments → View build history** for build/deploy logs and its active deployment/version for the result. Confirm the Git commit and run the production verification checklist after a successful deployment. The `portfolio-frontend-staging` Worker remains separately managed; this integration does not deploy staging.

If a build fails, inspect the failed installation, build or deployment step and verify the active production version before taking action. Correct the cause and push a reviewed fix, or retry the failed build after confirming its source commit and current build settings. Do not assume a failed build changed the active deployment.

For a production regression, pause automatic builds before restoring a verified known-good Worker version using section 9. Preserve the Custom Domain, runtime secrets and bindings. Keep automatic builds paused until `main` is corrected or reverted through a reviewed commit, so a later push cannot immediately overwrite the recovery. Resume only when the intended source and target are confirmed. The manual procedures below remain available for recovery.

### 7.1 Pre-deployment checks

Before any production deployment:

1.  Confirm that the change has been authorized.

2.  Inspect Git status and the intended diff.

3.  Confirm the correct repository branch and commit.

4.  Check that required validation has passed.

5.  Confirm the production Worker name and target environment.

6.  Record the currently active production Worker version.

7.  Review changes to `wrangler.jsonc`.

8.  Confirm that production secrets and required bindings exist.

9.  Confirm that staging and unrelated Cloudflare resources will remain untouched.

10. Ensure a rollback path is available.

Do not deploy unexpected generated files, local secret files or unrelated changes.

### 7.2 Deploying to staging

Run from the repository root using the intended Cloudflare account and an authenticated Wrangler session:

```sh
CLOUDFLARE_ENV=staging CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV=false npm run build
npx wrangler deploy --config dist/server/wrangler.json --keep-vars
```

`CLOUDFLARE_ENV` selects the named environment at build time. The build generates a flattened `dist/server/wrangler.json`; inspect its Worker name, variables, compatibility flags and bindings before running the deploy command. Do not add `--env staging` to deployment of this flattened configuration or reuse an artifact built for production.

Confirm that the command targets:

`portfolio-frontend-staging`

The `--keep-vars` option preserves dashboard-defined variables while applying configured values. Wrangler deployments preserve existing secrets; these commands do not provision missing secrets. Disabling `.env` loading during the build prevents private local preview bindings from being copied into the generated artifact.

After deployment, test the staging URL with real CMS content and confirm that noindex remains active.

Contact email delivery should only be tested when valid staging credentials are available and an email test is explicitly approved.

### 7.3 Deploying to production

Run from the repository root using the intended Cloudflare account and an authenticated Wrangler session:

```sh
CLOUDFLARE_ENV=production CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV=false npm run build
npx wrangler deploy --config dist/server/wrangler.json --keep-vars
```

Rebuild explicitly for production, then inspect the generated configuration before uploading. Its Worker name must be `portfolio-frontend-production`. Do not add `--env production` to deployment of this flattened configuration or reuse an artifact built for staging. The variable and secret preservation rules in section 7.2 also apply.

Do not infer the target from the current Git branch or the presence of a Custom Domain.

The deployment must preserve:

- The existing production Worker identity.

- The portfolio Custom Domain attachment.

- `nodejs_compat`.

- `global_fetch_strictly_public`.

- All required secrets and environment variables.

- `CONTACT_RATE_LIMITER`.

- Production indexing configuration.

- Independent staging configuration.

After deployment, record the new Worker version.

Do not modify DNS, shared SSL settings, Strapi or unrelated Cloudflare resources as part of the normal deployment.

---

## 8\. Production Verification Checklist

Verify the actual public Custom Domain rather than relying on `workers.dev` alone.

### 8.1 Application functionality

- Public homepage loads successfully.

- Default German content renders.

- English content loads through `/?lang=en`.

- Language switching works and preserves appropriate navigation context.

- All seven CMS-dependent sections load.

- All 12 portfolio projects are available.

- All 13 skills are available.

- Project images and galleries load.

- Gallery navigation and close behavior work.

- Responsive navigation works at representative viewport widths.

- No unexpected browser or Worker errors occur.

The numerical content totals are a verification baseline from October 2026, not permanent application limits. Update them when the published CMS content legitimately changes.

### 8.2 Accessibility

- Interactive controls are keyboard accessible.

- Project dialogs open and close correctly.

- Gallery details can be focused and scrolled using the keyboard.

- Escape closes the dialog.

- Focus returns to the triggering control.

- Contact fields have appropriate labels.

- No new serious automated accessibility findings appear.

Automated checks do not replace all manual accessibility testing.

### 8.3 SEO and indexing

Production should provide:

- Indexable content on the canonical hostname.

- Correct canonical URLs.

- Reciprocal English/German language alternates.

- Correct robots metadata and response directives.

- Valid `/robots.txt`.

- Valid `/sitemap.xml`.

- Localized Open Graph and social sharing metadata.

- Working branded social preview image.

The production `workers.dev` alias must retain `noindex, nofollow`.

Staging must remain non-indexable.

Enabling indexing does not guarantee that a search engine has already indexed the pages.

### 8.4 Contact form

Confirm:

- The server-side API route is available.

- Validation and honeypot regression tests pass.

- Rate-limit binding is present.

- Production email credentials remain configured.

- Reply-To uses the validated visitor email.

- No private credentials are exposed to browsers.

A real email-delivery test requires separate authorization. Do not send repeated production messages during routine smoke tests.

### 8.5 Runtime monitoring

Inspect Cloudflare Worker logs and deployment status for:

- Exceptions.

- Excessive subrequests.

- Repeated redirects.

- Unexpected upstream CMS errors.

- Failed contact API requests.

- Deployment configuration or binding errors.

A successful HTTP 200 response is not sufficient evidence that CMS content loaded. The application can render fallback content when individual CMS requests fail.

---

## 9\. Rollback Procedure

Prefer restoring a previously verified production Worker version when a new frontend deployment introduces a serious regression.

### 9.1 When to roll back

Consider rollback when:

- Production pages become unavailable.

- Major CMS sections fail unexpectedly.

- A deployment breaks critical application functionality.

- Required bindings or environment configuration are missing.

- A security-sensitive regression is introduced.

- Worker errors or redirect loops recur.

Minor cosmetic issues may be addressed through a targeted correction instead, depending on impact.

### 9.2 Recovery steps

1.  Identify the failing deployment and the last known-good Worker version.

2.  Confirm the scope of the regression using logs and live checks.

3.  Inspect Cloudflare's available Worker versions and deployment history.

4.  Restore the known-good production version using the supported Cloudflare rollback/deployment mechanism.

5.  Confirm that the previous effective configuration, bindings and necessary secrets are preserved or restored as appropriate.

6.  Verify the public Custom Domain after rollback.

7.  Recheck Strapi content, localization, galleries, indexing and Worker logs.

8.  Record the regression, restored version and any required repository correction.

Rollback should not automatically redeploy staging.

### 9.3 Known historical production versions

| Worker version                         | Description                                       |
| -------------------------------------- | ------------------------------------------------- |
| `cb685d63-5f53-437d-8130-8421fb878f03` | Verified CMS routing correction                   |
| `a060c765-1aa9-47cb-b4cf-971549eb3549` | Production indexing enabled                       |
| `00cac4a9-afb5-42b6-8ca3-6a1b8e34f360` | Sitemap and social metadata deployed and verified |

These are historical reference points, not guaranteed permanent rollback targets.

Cloudflare may retain deployment versions according to platform behavior and account settings. Confirm availability and effective configuration before selecting a version.

The most recently verified production deployment should be recorded with each release.

### 9.4 Legacy Pages retirement

The Pages project `portfolio` was permanently deleted on 27 October 2026 and cannot be used for recovery. Use a verified available version of `portfolio-frontend-production`; preserve its Custom Domain, secrets and bindings. Creating a replacement Pages project or changing DNS is outside routine rollback scope and requires separate authorization.

---

## 10\. Troubleshooting

### CMS content missing on the public domain

If the application interface loads but CMS sections disappear:

1.  Compare the public Custom Domain with the production `workers.dev` URL.

2.  Verify the current Worker version and effective environment configuration.

3.  Confirm `STRAPI_URL` and required CMS credentials are present.

4.  Check Strapi directly through HTTPS.

5.  Inspect Worker logs for redirects, timeouts and subrequest-limit errors.

6.  Confirm that `global_fetch_strictly_public` is still enabled.

7.  If needed, investigate redirects with a controlled, authorized diagnostic request using `redirect: 'manual'`.

Avoid unrestricted retries and speculative zone-wide configuration changes.

### Contact form stops delivering

Check the request chain independently:

1.  Client-side validation.

2.  POST to `/api/contact`.

3.  Origin and request validation.

4.  Honeypot handling.

5.  Rate-limit result.

6.  Resend response.

7.  Recipient mailbox and spam folder.

Check secret presence without revealing credentials.

A Resend acceptance response does not guarantee final inbox delivery.

### Unexpected indexing behavior

Check:

- `DEPLOYMENT_ENV`.

- Requested hostname.

- Response-level `X-Robots-Tag`.

- HTML robots metadata.

- Canonical and hreflang URLs.

- `/robots.txt`.

- `/sitemap.xml`.

Staging and production `workers.dev` requests should not become indexable simply because the production Custom Domain is indexable.

### Deployment differs from repository configuration

Compare:

- Active Worker deployment version.

- Wrangler environment configuration.

- Dashboard-managed settings.

- Compatibility flags and dates.

- Secret presence.

- Bindings and Custom Domain attachments.

Resolve configuration drift before another routine deployment.

---

## 11\. Infrastructure Retention Policy

The following retention and retirement decisions apply following the October 2026 migration.

| Resource                                    | Current decision                               |
| ------------------------------------------- | ---------------------------------------------- |
| Production Worker                           | Retain                                         |
| Staging Worker                              | Retain for future development                  |
| Production `workers.dev` URL                | Retain temporarily for diagnosis; keep noindex |
| Legacy Cloudflare Pages project             | Permanently deleted on 27 October 2026         |
| Legacy Git branches (`master`, `legacy`)    | Preserve pending separate retirement approval  |
| Existing Strapi VPS and Caddy configuration | Preserve                                       |
| Playbook submodule                          | Maintain through approved submodule updates    |

Deletion, disabling or repurposing any retained resource requires a separate decision.

The retired Pages project is not part of the current hosting or recovery arrangement. Do not recreate it or reconnect GitHub automatically.

---

## 12\. Repository Maintenance and Operational Handoff

For each significant production release, record:

- Deployment date.

- Source commit.

- Production Worker version.

- Relevant configuration changes.

- Validation results.

- Rollback reference.

- Known issues and accepted limitations.

Keep operational instructions current after changes to Worker deployment commands, CMS endpoints, rate-limit bindings, secret names or hosting architecture.

The public `README.md` should remain focused on presenting the project. This runbook owns project-specific operational guidance.

Reusable architectural and implementation patterns belong in the MSD Projects Playbook.

### Outstanding follow-up decisions

At the time of the October 2026 modernization:

- Review suitable legal notice and privacy information for the contact form.

- Retain documented staging and rollback arrangements.

- Consider additional browser, device and accessibility testing as future maintenance work.

These items are not authorization to make infrastructure changes.

---

## 13\. Document Maintenance

**Created:** 27 October 2026
**Project:** Mark Saville Developer Portfolio
**Status:** Verified against repository configuration — 27 October 2026

Deployment commands, environment selection, binding and secret names, runtime requirements and indexing behavior have been checked against the repository and installed tooling. Effective Cloudflare account settings and secret presence must still be confirmed before each deployment.

Update the document when the architecture or approved operational procedures change.
