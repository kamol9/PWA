// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@vite-pwa/nuxt"],
  devtools: { enabled: true },
  pwa: {
    manifest: {
      name: "Invoices",
      short_name: "Invoicesd",
      description: "Invoices for YOU!",
      icons: [
        {
          src: "icons/icon.jpg",
          sizes: "500x500",
          type: "image/png",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
});
