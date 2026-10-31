// Shared queries. Only published content reaches the public site.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Bread = CollectionEntry<'breads'>;
export type Country = CollectionEntry<'countries'>;
export type Article = CollectionEntry<'articles'>;

export const publishedBreads = () => getCollection('breads', (e) => e.data.status === 'published');
export const publishedCountries = () => getCollection('countries', (e) => e.data.status === 'published');
export const publishedArticles = () => getCollection('articles', (e) => e.data.status === 'published');

export const byTitle = <T extends { data: { title?: string; name?: string } }>(a: T, b: T) =>
  (a.data.title ?? a.data.name ?? '').localeCompare(b.data.title ?? b.data.name ?? '', 'en');

export const byDateDesc = <T extends { data: { published_at?: Date; updated_at?: Date } }>(a: T, b: T) =>
  (b.data.updated_at ?? b.data.published_at ?? 0).valueOf() - (a.data.updated_at ?? a.data.published_at ?? 0).valueOf();

export const fmtDate = (d?: Date) =>
  d ? d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

/** Media records for one entry, in file order. */
export async function mediaFor(entrySlug: string) {
  const all = await getCollection('media');
  return all.filter((m) => m.data.entry === entrySlug);
}
