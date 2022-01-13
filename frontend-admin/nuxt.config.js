import colors from 'vuetify/es5/util/colors'
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
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
        href: 'https://unpkg.com/codemirror@5.65.0/addon/hint/show-hint.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/codemirror@5.65.0/addon/hint/css-hint.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/codemirror@5.32.0/addon/fold/foldgutter.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/codemirror@5.32.0/addon/lint/lint.css'
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
      {src:'https://unpkg.com/codemirror@5.65.0/lib/codemirror.js'},
   
      // close tags
      {src:'https://unpkg.com/codemirror@5.32.0/addon/edit/closebrackets.js'},
      {src:'https://unpkg.com/codemirror@5.32.0/addon/edit/closetag.js'},
      {src:'https://unpkg.com/codemirror@5.32.0/addon/edit/continuelist.js'},
      {src:'https://unpkg.com/codemirror@5.32.0/addon/edit/matchbrackets.js'},
      {src:'https://unpkg.com/codemirror@5.32.0/addon/edit/matchtags.js'},
      {src:'https://unpkg.com/codemirror@5.32.0/addon/edit/trailingspace.js'},
      // gutter folds
      {src: 'https://unpkg.com/codemirror@5.32.0/addon/fold/brace-fold.js'},
      {src: 'https://unpkg.com/codemirror@5.32.0/addon/fold/comment-fold.js'},
      {src: 'https://unpkg.com/codemirror@5.32.0/addon/fold/foldcode.js'},
      {src: 'https://unpkg.com/codemirror@5.32.0/addon/fold/foldgutter.js'},
      {src: 'https://unpkg.com/codemirror@5.32.0/addon/fold/indent-fold.js'},
      {src: 'https://unpkg.com/codemirror@5.32.0/addon/fold/markdown-fold.js'},
      {src: 'https://unpkg.com/codemirror@5.32.0/addon/fold/xml-fold.js'},
      //lint
      {src: 'https://unpkg.com/codemirror@5.32.0/addon/lint/css-lint.js'},
      {src: 'https://unpkg.com/codemirror@5.32.0/addon/lint/html-lint.js'},
      {src: 'https://unpkg.com/codemirror@5.32.0/addon/lint/javascript-lint.js'},
      {src: 'https://unpkg.com/codemirror@5.32.0/addon/lint/json-lint.js'},
      {src: 'https://unpkg.com/codemirror@5.32.0/addon/lint/lint.js'},
      // auto refresh
      {src: 'https://unpkg.com/codemirror@5.65.0/addon/display/autorefresh.js'},
      // mode
      {src: 'https://unpkg.com/codemirror@5.65.0/mode/css/css.js'},
      {src: 'https://unpkg.com/codemirror@5.65.0/mode/xml/xml.js'},
      {src:'https://unpkg.com/codemirror@5.65.0/mode/javascript/javascript.js'},
      {src:'https://unpkg.com/codemirror@5.65.0/mode/xml/xml.js'},
      // hints
      {src: 'https://unpkg.com/codemirror@5.65.0/addon/hint/xml-hint.js'},
      {src: 'https://unpkg.com/codemirror@5.65.0/addon/hint/css-hint.js'},
      {src: 'https://unpkg.com/codemirror@5.65.0/addon/hint/html-hint.js'},
      {src: 'https://unpkg.com/codemirror@5.65.0/addon/hint/sql-hint.js'},
      {src:'https://unpkg.com/codemirror@5.65.0/addon/hint/javascript-hint.js'},
      {src:'https://unpkg.com/codemirror@5.65.0/addon/hint/show-hint.js'},
      {src:'https://unpkg.com/codemirror@5.65.0/addon/hint/anyword-hint.js'},
      // search
      {src: 'https://www.unpkg.com/codemirror@5.65.0/addon/search/match-highlighter.js'},
      {src: 'https://www.unpkg.com/codemirror@5.65.0/addon/selection/active-line.js'}

    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/dq-css/main.css',
    '@/assets/dq-css/normalize.css',
    '@/assets/dq-css/theme/main.css',
    '@/assets/el.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/global-vue.js', mode: 'client' },
    { src: '~/plugins/element-ui.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // 'nuxt-socket-io',
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
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['javascript', 'python', 'scss'],
        features: ['!gotoSymbol','checkJs'],
      })
    ],
    transpile: ['vue-easytable','monaco-editor-vue','monaco-editor-webpack-plugin'],
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
