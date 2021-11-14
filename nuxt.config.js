// import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - planets',
    title: 'planets',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "~layouts/style.css",
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "~plugins/mixins/user.js",
    "~plugins/vue-chat-scroll"
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/laravel-echo',
  ],

  echo: {
    broadcaster: 'pusher',
    key: 'bf1c49047275628bd29d',
    cluster: 'eu',
    forceTLS: true,
    plugins: ['~/plugins/echo.js']
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'vue-sweetalert2/nuxt',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    // for development
    // baseURL: "http://localhost:8000/api"

    // fordeployment
    baseURL: "https://planets-server.herokuapp.com/"
  },

  // Auth module configuration (https://auth.nuxtjs.org/guide/setup)
  auth: {
    redirect: {
      home: '/',
      login: '/',
      logout: '/',
      callback: '/',
    },
    strategies: {
      local: {
        token: {
          property: 'meta.token',
          global: true,
          required: true,
          type: 'Bearer',
        },
        user: {
          property: 'data',
          autoFetch: true,
        },
        endpoints: {
          user: { url: 'auth/user', method: 'get' },
          login: { url: 'auth/login', method: 'post' },
          logout: { url: 'auth/logout', method: 'post' },
          register: { url: 'auth/register', method: 'post' },
        }
      }
    }
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    rtl: true,
    theme: {
      dark: false
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
