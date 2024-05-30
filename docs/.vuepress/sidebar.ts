import type { SidebarConfig } from 'vuepress'
const sidebar: SidebarConfig = [
  {
    text: 'About',
    collapsible: true,
    children: [
      '/about/',
      {
        // 自定義名稱
        text: '關於我',
        link: '/about/profile.md'
      }
    ]
  },
  {
    text: 'Coding Memo',
    collapsible: true,
    children: [
      '/code-memo/markdown.md',
      {
        text: 'Javascript',
        link: '/code-memo/js-we-dont-know',
        collapsible: true,
        children: [
          {
            text: '前言',
            link: '/code-memo/js-we-dont-know/index.md'
          },
          '/code-memo/js-we-dont-know/execution-context.md',
          '/code-memo/js-we-dont-know/scope.md',
          '/code-memo/js-we-dont-know/hoisting.md',
          '/code-memo/js-we-dont-know/thread.md',
          '/code-memo/js-we-dont-know/this.md',
          '/code-memo/js-we-dont-know/truthy-falsy-nullish.md'
        ]
      },
      '/code-memo/nuxt3/note.md',
      '/code-memo/eslint.md',
      '/code-memo/prettier.md',
      '/code-memo/linter-and-formatter.md',
      '/code-memo/vscode.md',
      '/code-memo/opinionated.md',
      '/code-memo/vuepress'
    ]
  },
  {
    text: 'Life Memo',
    collapsible: true,
    children: [
      {
        text: '自我提升',
        collapsible: true,
        children: [
          '/life-memo/improvement/second-brain', //
          '/life-memo/improvement/feynman-technique'
        ]
      }
    ]
  },
  '/topics.md'
]

export default sidebar
