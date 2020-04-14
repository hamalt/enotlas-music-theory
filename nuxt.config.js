export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/scss/style.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  // plugins: ['@/plugins/vexflow.js'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    ['nuxt-buefy', {
      css: false,
    }],
    'nuxt-webfontloader'
  ],
  webfontloader: {
    google: {
      families: ['Noto+Sans+JP']
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: [
      // "@nuxtjs/style-resources",
      // "@nuxtjs/axios",
      // "nuxt-svg-loader",
      // "lodash/debounce",
      // "loadash",
      // "lodash/find",
      // "wp-nuxt",
      // "util/object-reduce",
      // "wpapi",
      // "vue-infinite-loading"
      // "vue-disqus"
    ],
    babel: {
      presets: [
        [
          "@nuxt/babel-preset-app",
          {
            targets: {
              ie: "11"
            },
            useBuiltIns: "usage",
            corejs: {
              version: 2
            }
          }
        ]
      ],
      plugins: [
        // "@babel/plugin-proposal-object-rest-spread"
        "@babel/plugin-transform-shorthand-properties"
      ],
      sourceType: "unambiguous"
    },
    extend(config, ctx) {}
  }
}
