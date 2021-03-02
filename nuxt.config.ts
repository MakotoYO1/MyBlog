import serverConfig from './server.config'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'myBlog',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  server:{
    port:serverConfig.port,
    host:serverConfig.host
  },
  serverMiddleware:['@/server/api'],

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'balm-ui/dist/balm-ui.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src:'@/plugins/axios',mode:'server'},
    '@/plugins/ant-design'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build','@nuxtjs/pwa'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  auth:{
    strategies:{
      local:{
        endpoints:{
          login:{
            url: '/api/auth/login',
            method: 'post',
            propertyName:'token'
          },
          logout:{
            url:'/api/auth/logout',
            method:'post'
          },
          user:{
            url:'/api/auth/user',
            method:'get',
            propertyName:'user'
          }
        }
      }
    },
    redirect:{
      login:'/auth/login',
      logut:'/',
      callback:'/auth/login',
      home:'/'
    }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL:`http://127.0.0.1:8000`,
    browserBaseURL: '/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }

  // watch:['@/server/api.ts']
}
