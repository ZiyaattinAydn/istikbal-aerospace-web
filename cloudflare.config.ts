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
    },
  }),
});
