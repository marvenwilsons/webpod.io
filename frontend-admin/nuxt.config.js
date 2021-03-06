import colors from 'vuetify/es5/util/colors'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '',
    title: 'Admin',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Lobster&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Rochester&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap",
      },
      { 
        rel: 'stylesheet', 
        href: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css' 
      },
      { 
        rel: 'stylesheet', 
        href: 'http://fonts.cdnfonts.com/css/monaco' 
      },
      { 
        rel: 'stylesheet', 
        href: 'http://fonts.cdnfonts.com/css/sf-mono' 
      },
      { 
        rel: 'stylesheet', 
        href: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.0/codemirror.min.css' 
      },
      { 
        rel: 'stylesheet', 
        href: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.0/codemirror.min.css' 
      },
      { 
        rel: 'stylesheet', 
        href: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.0/theme/base16-light.min.css' 
      },
      //lobster font
      { 
        rel: 'stylesheet', 
        href: 'https://fonts.googleapis.com/css2?family=Lobster&display=swap' 
      },

      //
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/codemirror@5.65.0/lib/codemirror.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/codemirror@5.65.0/theme/monokai.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/codemirror@5.65.0/theme/mdn-like.css'
      },
      {
        rel: 'stylesheet',
        href: 'http://fonts.cdnfonts.com/css/menlo'
      }
    ],
    script: [
      // {
      //   src: 'https://cdn.socket.io/4.3.2/socket.io.min.js',
      //   integrity: "sha384-KAZ4DtjNhLChOB/hxXuKqhMLYvx3b5MlT55xPEiNmREKRzeEm+RVPlTnAn0ajQNs",
      //   crossorigin: "anonymous"
      // }
      {
        src: 'https://www.instagram.com/static/bundles/es6/EmbedSDK.js/ab12745d93c5.js',
        crossorigin: "anonymous"
      },
      {
        src: 'https://platform.twitter.com/widgets.js',
        crossorigin: "anonymous"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/dq-css/main.css',
    '@/assets/dq-css/normalize.css',
    '@/assets/dq-css/theme/main.css',
    '@/assets/el.css',
    // '@/material-design-icons-iconfont/dist/material-design-icons.csss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/global-vue.js', mode: 'client' },
    { src: '~/plugins/element-ui.js', mode: 'client' },
    { src: '~/plugins/gsap.js', mode: 'client' },
    { src: '~/plugins/directives.js', mode: 'client' },
    { src: '~/plugins/vuetify.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    'portal-vue/nuxt'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],

  elementUI: {
    components: ['Button', 'DatePicker'],
    locale: 'fr',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    fontSize:'11px',
    font: {
      size:'11px'
    },
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  server: {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT
  },
  router: {
    base: `/${process.env.ADMIN_ROUTE}/`
  },

  env: {
    API_URL: process.env.API_URL
  },
  build: {
    plugins: [],
    transpile: ['vue-easytable'],
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  },
  loading: false
}
