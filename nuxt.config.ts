// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt', 'shadcn-nuxt', '@nuxtjs/color-mode', 'nuxt-easy-lightbox'],
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  app: {
    head: {
      title: 'Learn Nuxt',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        { name: 'description', content: 'A simple Nuxt project to learn the framework' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  colorMode:{
    classSuffix: '',
  },
  runtimeConfig: {
    apiSecret: process.env.NUXT_PRIVATE_UNSPLASH_ACCESS_KEY || '',
    appId: process.env.NUXT_APP_ID_UNSPLASH || '',
    
    public: {
      apiUnsplash: process.env.NUXT_PUBLIC_UNSPLASH_API_URL || 'http://localhost:3000',
      apiKey: process.env.NUXT_PUBLIC_UNSPLASH_ACCESS_KEY || '',
      username: process.env.NUXT_UNSPLASH_USERNAME || 'dsav96',
    }
  }
})