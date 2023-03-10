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
        text: 'AboutMe',
        link: '/about/'
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
