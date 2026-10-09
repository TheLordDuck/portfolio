// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  i18n: {
    // keep in sync with `languages` in src/i18n/ui.ts
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
  },
});
