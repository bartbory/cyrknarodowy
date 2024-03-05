// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/supabase",
    "nuxt-gtag",
    "@vite-pwa/nuxt",
    "@pinia/nuxt",
    "@nuxt/image",
  ],
  css: ["~/assets/css/main.css"],
  gtag: {
    id: "G-R66G4PS0TZ",
  },
  typescript: {
    typeCheck: false,
  },
  supabase: {
    redirectOptions: {
      login: "/account/login",
      callback: "/confirm",
      exclude: [
        "/",
        "/home",
        "/votings/*",
        "/referendum/*",
        "/referendum",
        "/account/register",
      ],
      cookieRedirect: false,
    },
  },
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Cyrk Narodowy",
      short_name: "CyrkNarodowy",
      theme_color: "#ffffff",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 3600,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
  },
});
