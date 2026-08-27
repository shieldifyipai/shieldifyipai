# Shieldify IP Astro site

Independent static implementation of the Shieldify IP website using Astro and TypeScript, with no legacy CMS or PHP runtime dependency.

## Commands

```sh
npm install
npm run dev
npm run check
npm run build
```

The production output is written to `dist/`.

## Contact form

The form submits asynchronously to the Vercel Function at `/api/contact`, validates the request again on the server, filters honeypot submissions, and sends the inquiry through Resend.

Before deploying:

1. Add and verify `shieldifyip.ai` in Resend.
2. Create a Resend API key with sending-only access.
3. Add `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`, and `CONTACT_ALLOWED_ORIGINS` in Vercel Project Settings → Environment Variables. Use `info@shieldifyip.ai` for `CONTACT_TO_EMAIL`; `CONTACT_FROM_EMAIL` must match the exact domain or subdomain verified in Resend.
4. Redeploy after saving the variables.

Use `.env.example` as the configuration template. `PUBLIC_CONTACT_FORM_ENDPOINT` is browser-visible and defaults to `/api/contact`; all other variables are server-only. Never commit an API key or prefix it with `PUBLIC_`.

The root-level Vercel Function is not executed by the regular `astro dev` server. In local Astro development, the form intentionally falls back to the visitor's email application. Test automatic delivery on a Vercel deployment, or use `vercel dev` with the required server-only environment variables.

A successful API response means Resend accepted the message. If a notification is missing, use the returned request reference to inspect the Vercel Function logs and the Resend Email logs for delivery, bounce, or spam status.

## Blog content

Blog posts live in `src/content/blog/`. Add Markdown or MDX files with this frontmatter:

```yaml
---
title: "Article title"
seoTitle: "Concise search title"
description: "Article description"
publishedDate: 2026-08-26
image: "/images/blog/example.webp"
imageAlt: "Descriptive image alternative text"
imageWidth: 1200
imageHeight: 675
author: "Shieldify IP"
category: "Trademark Protection"
tags:
  - "Trademark Monitoring"
---
```

New entries are listed at `/blog` and built at `/blog/[slug]` automatically.

Run `npm run generate:og` after editing the Open Graph card definitions in `scripts/generate-og-images.mjs`. The RSS feed is generated at `/rss.xml` during every production build.

## Case studies

Case study entries live in `src/content/case-studies/` and are generated at `/case-studies/[slug]`. Current entries are explicitly marked `illustrative: true`; keep the visible disclosure unless the content is replaced with an authorized, verifiable client case. Never add client names, testimonials, metrics, or outcomes without permission and supporting records.

When adding a case study, also add its social card definition to `scripts/generate-og-images.mjs` and run `npm run generate:og`.

## Service pages and navigation

Detailed service entries live in `src/content/services/` and are generated at `/our-services/[slug]`. Each entry includes unique overview content, capabilities, workflow steps, audiences, FAQs, related resources, and SEO metadata.

The desktop mega menu, mobile menu, and footer link definitions live in `src/data/site.ts`. When adding or renaming a service, update that navigation data and its Open Graph card in `scripts/generate-og-images.mjs`.

## Industry pages

Industry entries live in `src/content/industries/` and are generated at `/industries/[slug]`. Each entry defines industry-specific challenges, protection priorities, workflow steps, recommended services, FAQs, and related resources.

The Industries overview is generated at `/industries`. Keep `industryNavigation` in `src/data/site.ts` aligned with the collection when adding or renaming an industry.

## Search Console

Set `PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel to the token supplied by Google Search Console, then redeploy. Do not paste the full `<meta>` element. Submit `https://shieldifyip.ai/sitemap-index.xml` in Search Console after the production domain is live.
