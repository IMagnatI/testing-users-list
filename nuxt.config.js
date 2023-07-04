import EN from './translations/EN/en'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Test App',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.svg' }],
    bodyAttrs: {
      style: 'background: #f5f7f9',
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '~/static/styles/global.css', lang: 'css' },
    { src: 'vue-select/dist/vue-select.css', lang: 'css' },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: './plugins/toastnotifications.ts', mode: 'client' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/sentry',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/i18n',
    'portal-vue/nuxt',
    [
      'nuxt-lazy-load',
      {
        // Default image must be in the static folder
        defaultImage: '/images/loader_balls.gif',

        // To remove class set value to false
        loadingClass: 'isLoading',
        loadedClass: 'isLoaded',
        appendClass: 'lazyLoad',

        observerConfig: {
          rootMargin: '100px',
        },
      },
    ],
  ],

  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: EN,
      },

      numberFormats: {
        'en-US': {
          currency: {
            style: 'currency',
            currency: 'USD',
            notation: 'standard',
          },
          decimal: {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
          percent: {
            style: 'percent',
            useGrouping: false,
          },
        },
        'pl-PL': {
          currency: {
            style: 'currency',
            currency: 'PLN',
            notation: 'standard',
          },
          decimal: {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
          percent: {
            style: 'percent',
            useGrouping: false,
          },
        },
        'eu-EUR': {
          currency: {
            style: 'currency',
            currency: 'EUR',
            notation: 'standard',
          },
          decimal: {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
          percent: {
            style: 'percent',
            useGrouping: false,
          },
        },
      },

      dateTimeFormats: {
        en: {
          short: {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          },
          long: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
          },
        },
        pl: {
          yearOnly: {
            year: 'numeric',
          },
          dayAndMonthOnly: {
            day: 'numeric',
            month: 'long',
          },
          short: {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          },
          long: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
          },
        },
      },
    },
  },

  axios: {
    proxy: true,
  },

  proxy: {
    '/api/': 'https://reqres.in/',
  },

  fs: 'empty',

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      scss: 'postcss-scss',
    },
    transpile: ['vuex-module-decorators'],
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/errors/404.vue'),
      })
    },
  },
  serverMiddleware: [],
}
