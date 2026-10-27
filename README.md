# Mark Saville — Developer Portfolio

A bilingual developer portfolio showcasing my web development projects, technical skills and professional experience. Built with Next.js and React, the website combines an interactive, responsive interface with content managed through a separate Strapi CMS.

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

| Area               | Technologies                         |
| ------------------ | ------------------------------------ |
| Frontend           | Next.js, React 19, TypeScript        |
| Styling and UI     | Tailwind CSS 4, Radix UI             |
| Build and runtime  | vinext, Vite, Cloudflare Workers     |
| Content management | Strapi REST API                      |
| Email integration  | Resend                               |
| Testing            | Playwright, axe, Node.js test runner |

## Technical Highlights

### Headless CMS integration

Portfolio projects, skills and profile content are managed independently through Strapi. Next.js retrieves the published content server-side, allowing updates without rebuilding the frontend.

Content-loading operations are isolated so that a temporary failure in one CMS section does not prevent other sections from rendering.

### Cloudflare Workers architecture

The application runs on Cloudflare Workers using vinext, combining server-rendered pages and server-side API functionality within a single deployment.

The existing Strapi backend remains independently hosted, separating content management from frontend delivery.

### Localization and SEO

German and English content is supported throughout the interface, including project descriptions, navigation and contact-form feedback.

The application provides localized page metadata, canonical URLs, language alternates and an XML sitemap to support search-engine discovery.

### Interactive project presentation

Project galleries support multiple screenshots, responsive layouts, thumbnail navigation and keyboard-accessible dialogs.

Project content is mapped from structured CMS responses, preserving image ordering, descriptions and optional links to live projects or source repositories.

### Secure contact integration

Contact enquiries are processed through a server-side API route using Resend.

The implementation includes server-side validation, origin checking, a honeypot field and Cloudflare rate limiting. Email credentials remain server-side, while validated visitor addresses are used for Reply-To.

## Architecture

The portfolio uses a headless architecture that separates content management, application rendering and email delivery.

- **Strapi** manages the project's structured content and media.

- **Next.js** retrieves and renders published content, including localized project information.

- **Cloudflare Workers** hosts the application and its server-side functionality.

- **Resend** handles contact-form email delivery through a protected API route.

This architecture allows content updates to be managed independently while retaining server-side rendering, interactive frontend functionality and centralized deployment.

## Project Status

The portfolio is live and actively maintained, with English and German versions available through the production website.
