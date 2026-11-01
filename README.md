# Breadopedia

Every bread on earth. The site behind breadopedia.org.

- Static site built with Astro, hosted on Cloudflare Pages.
- Content lives in `content/` as Markdown and YAML; see `src/content.config.ts` for the rules every entry must pass.
- Edit through the CMS at `/admin` — no code needed. Login setup lives in `auth-worker/README.md`.

## Folders

| Folder | Holds |
| --- | --- |
| `content/breads/` | one Markdown file per bread |
| `content/articles/` | Articles |
| `content/taxonomy.yaml` | the nested bread tree |
| `content/countries/` | one Markdown file per country page |
| `content/affiliates.yaml` | recommended products |
| `public/media/<entry>/` | image files, one folder per entry; each image's credit sits inside its entry |
| `public/admin/` | the CMS (Decap) and its form configuration |
| `auth-worker/` | the GitHub login relay for the CMS, deployed as its own Worker |
