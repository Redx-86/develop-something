// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({




    app: {
      head: {
        charset: 'utf-16',
        viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
        title: 'Orkun',
        htmlAttrs: {
          lang: 'tr',
        },
        link: [
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ]
      }
    },
  






  compatibilityDate: '2024-11-01',
  css: ['~/assets/css/main.css'],

  devtools: { enabled: true },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui'
  ]
})
