# Breadopedia

Every bread on earth. The site behind breadopedia.org.

- Static site built with Astro, hosted on Cloudflare Pages.
- Content lives in `content/` as Markdown and YAML; see `src/content.config.ts` for the rules every entry must pass.
- Edit through the CMS at `/admin` (coming in step 5) — no code needed.

## Folders

| Folder | Holds |
| --- | --- |
| `content/breads/` | one Markdown file per bread |
| `content/articles/` | Articles |
| `content/taxonomy.yaml` | the nested bread tree |
| `content/countries/` | one Markdown file per country page |
| `content/media.yaml` | image registry; every image belongs to one entry |
| `content/affiliates.yaml` | recommended products |
| `public/media/<entry>/` | image files, one folder per entry |
