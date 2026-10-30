import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://breadopedia.org',
  trailingSlash: 'never',
  build: { format: 'file' },
});
