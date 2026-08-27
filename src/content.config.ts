import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().max(60).optional(),
    description: z.string(),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageWidth: z.number().int().positive().optional(),
    imageHeight: z.number().int().positive().optional(),
    author: z.string().default('Shieldify IP'),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().max(60).optional(),
    description: z.string(),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    industry: z.string(),
    channels: z.array(z.string()).default([]),
    image: z.string(),
    imageAlt: z.string(),
    imageWidth: z.number().int().positive(),
    imageHeight: z.number().int().positive(),
    objectives: z.array(z.string()).default([]),
    deliverables: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    illustrative: z.literal(true),
  }),
});

const servicePages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().max(60).optional(),
    description: z.string(),
    navDescription: z.string(),
    icon: z.string(),
    heroImage: z.string(),
    heroImageAlt: z.string(),
    heroImageWidth: z.number().int().positive(),
    heroImageHeight: z.number().int().positive(),
    channels: z.array(z.string()).default([]),
    suitedFor: z.array(z.string()).default([]),
    capabilities: z.array(z.object({ title: z.string(), description: z.string() })).default([]),
    workflow: z.array(z.object({ title: z.string(), description: z.string() })).default([]),
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
    relatedCase: z.string().optional(),
    relatedBlog: z.string().optional(),
  }),
});

const industries = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/industries' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().max(60).optional(),
    description: z.string(),
    navDescription: z.string(),
    icon: z.string(),
    heroImage: z.string(),
    heroImageAlt: z.string(),
    heroImageWidth: z.number().int().positive(),
    heroImageHeight: z.number().int().positive(),
    channels: z.array(z.string()).default([]),
    challenges: z.array(z.object({ title: z.string(), description: z.string() })).default([]),
    priorities: z.array(z.object({ title: z.string(), description: z.string() })).default([]),
    workflow: z.array(z.object({ title: z.string(), description: z.string() })).default([]),
    recommendedServices: z.array(z.string()).default([]),
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
    relatedCase: z.string().optional(),
    relatedBlog: z.string().optional(),
  }),
});

export const collections = { blog, caseStudies, servicePages, industries };
