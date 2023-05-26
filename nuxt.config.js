const fs = require("fs");

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: "%s - planets",
    title: "planets",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "planets" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS
  css: ["~layouts/style.css"],

  // Global JS
  script: [
    "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
    "~assets/js/script.js",
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["~plugins/mixins/user.js", "~plugins/vue-chat-scroll"],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ["@nuxtjs/laravel-echo", "@nuxtjs/vuetify"],

  // echo pusher configuration
  echo: {
    broadcaster: "pusher",
    key: "bf1c49047275628bd29d",
    cluster: "eu",
    forceTLS: false,
    plugins: ["~/plugins/echo.js"],
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    "@nuxtjs/pwa",
    "@nuxtjs/axios",
    "@nuxtjs/firebase",
    "@nuxtjs/auth-next",
    "vue-sweetalert2/nuxt",
  ],

  // Firebase module configuration
  firebase: {
    config: {
      apiKey: "AIzaSyC_13GGIE5ywHDi-yvTZ_izTK8aYZQPdbo",
      authDomain: "planets-bd6fe.firebaseapp.com",
      projectId: "planets-bd6fe",
      storageBucket: "planets-bd6fe.appspot.com",
      messagingSenderId: "1068309836468",
      appId: "1:1068309836468:web:9fd543df6260619550dde1",
    },
    services: {
      messaging: {
        createServiceWorker: true,
        fcmPublicVapidKey:
          "BCSgkQHwf0e64OyjnXrXasa47s0H4zrEZJXOvVB0r7l17B-RZK60dzZKHLGR-wiUPYEobGzKoVTYo-RCijchsTk",
        inject: fs.readFileSync("./service-workers/firebase.js"),
      },
    },
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.baseURL || "http://localhost:8000/api",
  },

  // Auth module configuration (https://auth.nuxtjs.org/guide/setup)
  auth: {
    redirect: {
      home: "/",
      login: "/",
      logout: "/",
      callback: "/",
    },
    strategies: {
      local: {
        token: {
          property: "meta.token",
          type: "Bearer",
          required: true,
          global: true,
          maxAge: 60 * 60 * 24 * 15, // 15 days
        },
        refreshToken: {
          property: "refresh_token",
          data: "refresh_token",
          maxAge: 60 * 60 * 24 * 30, // 1 month
        },
        user: {
          property: "data",
          autoFetch: true,
        },
        endpoints: {
          user: { url: "auth/user", method: "get" },
          login: { url: "auth/login", method: "post" },
          logout: { url: "auth/logout", method: "post" },
          register: { url: "auth/register", method: "post" },
        },
      },
    },
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    rtl: true,
    theme: {
      dark: false,
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
};
