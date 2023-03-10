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
        link: '/about/list.md'
      }
    ]
  },
  {
    text: 'Coding Memo',
    collapsible: true,
    children: [
      '/code-memo/vuepress.md',
      '/code-memo/markdown.md',
      '/code-memo/interview.md',
      '/code-memo/chatgpt.md',
      '/code-memo/prettier.md',
      '/code-memo/vscode.md'
    ]
  },
  {
    text: 'Life Memo',
    collapsible: true,
    children: ['/life-memo/workout.md', '/life-memo/basketball.md']
  },
  '/topics.md'
]

export default sidebar
