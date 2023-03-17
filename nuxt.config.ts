// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxtjs/supabase", "@nuxt/image-edge", "@pinia/nuxt"],
  image: {
    domains: ["https://hipydpadmuujyavkgdtr.supabase.co"],
  },
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
});
