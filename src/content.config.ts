// Content schemas — the build fails on any entry that breaks these rules.
// Mirrors "Breadopedia — Phase 1 Schema (Library)". Countries are pages (content/countries/<code>.md).
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const status = z.enum(['draft', 'review', 'published']);
const url = z.string().url();

const breads = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/breads' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    taxonomy: z.string(),
    origin_country: z.string().length(2),
    origin_point: z.tuple([z.number(), z.number()]),
    also_known_as: z.array(z.string()).default([]),
    status,
    hero_image: z.string(),
    summary: z.string().max(300),
    videos_commercial: z.array(url).default([]),
    videos_home: z.array(url).default([]),
    affiliates: z.array(z.string()).default([]),
    published_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
    sources: z.array(z.string()).default([]),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/articles' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    status,
    hero_image: z.string().optional(),
    summary: z.string().max(300),
    published_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
  }),
});

const taxonomy = defineCollection({
  loader: file('./content/taxonomy.yaml'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    parent: z.string().optional(),
    level: z.number().int().min(1).max(4),
    description: z.string(),
    colour: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  }),
});

const countries = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/countries' }),
  schema: z.object({
    code: z.string().length(2),
    name: z.string(),
    region: z.string(),
    centroid: z.tuple([z.number(), z.number()]),
    hero_image: z.string().optional(),
    summary: z.string().max(300),
    staple_grains: z.array(z.string()).default([]),
    status,
    published_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
  }),
});

const media = defineCollection({
  loader: file('./content/media.yaml'),
  schema: z.object({
    id: z.string(),
    entry: z.string(),
    file: z.string(),
    caption: z.string(),
    licence: z.enum(['CC0', 'CC-BY', 'CC-BY-SA', 'own']),
    author: z.string(),
    source_url: url,
    alt: z.string(),
  }),
});

const affiliates = defineCollection({
  loader: file('./content/affiliates.yaml'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    category: z.enum(['tools', 'flours', 'books', 'ovens']),
    url,
    programme: z.string(),
    note: z.string(),
  }),
});

export const collections = { breads, articles, taxonomy, countries, media, affiliates };
