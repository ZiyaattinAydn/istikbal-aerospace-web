import { bindings, defineConfig, defineWorker } from "cf/config";

// This is the isolated CMS staging Worker, not the production website.
// Keep its name aligned with the existing Cloudflare Workers project.
export default defineConfig({
  worker: defineWorker({
    name: "istikbal-cms-staging",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-15",
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
      // Explicit staging bindings: cf deploy reconciles dashboard variables.
      // Keep the project URL and publishable key scoped to this CMS project.
      CMS_ALLOWED_EMAILS: bindings.text("ziyaattin.aydin35@gmail.com"),
      CMS_ENABLED: bindings.text("true"),
      CMS_PUBLIC_READS: bindings.text("false"),
      SUPABASE_URL: bindings.text("https://uftnykormtwlzolwbhfb.supabase.co"),
      // Never commit the publishable key's value or a service-role key.
      SUPABASE_PUBLISHABLE_KEY: bindings.secret(),
    },
  }),
});
