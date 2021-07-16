import config from './config'

export default {
  env: {
    NODE_ENV: process.env.NUXT_ENV || 'production'
  },
  mode: 'spa',
  target: 'static',
  // router: {
  //   mode: "hash"
  // },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        href: 'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap',
        rel: 'stylesheet'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  // loading: '~/components/loading.vue',
  // loading: false,
  /*
   ** Global CSS
   */
  css: ['@/assets/css/style.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/api',
    '~/plugins/swal',
    '~/plugins/date',
    '~/plugins/rupiah'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'data.token'
          },
          logout: false,
          user: {
            url: '/management/user/',
            method: 'get',
            propertyName: 'data'
          }
        }
        // tokenRequired: true,
        // tokenType: 'bearer',
        // globalToken: true,
        // autoFetchUser: true
      }
    },
    redirect: {
      login: '/auth',
      logout: '/auth',
      callback: '/auth',
      home: '/'
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: config.color,
        light: config.color
      }
    }
  },
  server: {
    port: 3000 // default: 3000
    // host: 'localhost' // default: localhost
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
