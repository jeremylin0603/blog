import { defineUserConfig, defaultTheme } from 'vuepress'
import sidebarConfig from './sidebar'

export default defineUserConfig({
  base: '/blog/',

  lang: 'zh-CN',
  title: 'Jeremy Blog.',
  description: 'This is my vuepress demo',

  theme: defaultTheme({
    logo: 'https://vuejs.org/images/logo.png',
    home: '/',
    // repo: ''
    lastUpdated: true,
    // navbar: [{ text: '', link: '/route/'}]
    sidebarDepth: 1,
    sidebar: sidebarConfig
  })
})