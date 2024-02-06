// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@vite-pwa/nuxt", "@nuxtjs/supabase"],
  css: ["~/assets/css/main.css"],
  typescript: {
    typeCheck: false,
  },
  supabase: {
    redirectOptions: {
      login: "/account/login",
      callback: "/confirm",
      exclude: ["/", "/votings/*", "/account/register"],
      cookieRedirect: false,
    },
  },
});
