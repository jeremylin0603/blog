import { defineUserConfig, defaultTheme } from 'vuepress'
import sidebarConfig from './sidebar'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import path from 'path'
import * as url from 'url'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export default defineUserConfig({
  base: '/blog/',

  head: [['link', { rel: 'icon', href: '/favicon.png' }]],

  lang: 'zh-CN',
  title: "Jeremy's 2nd Brain",

  theme: defaultTheme({
    home: '/',
    // repo: ''
    lastUpdated: true,
    navbar: [
      {
        text: 'About',
        link: '/about/'
      },
      {
        text: 'Profile',
        link: '/about/profile.md'
      },
      {
        text: 'Javascript',
        link: '/code-memo/js-we-dont-know/index.md'
      }
    ],
    sidebarDepth: 1,
    sidebar: sidebarConfig
  }),

  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components')
    })
  ]
})
