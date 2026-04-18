import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Daniel Blog",
  description: "My DevOps Notes",

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'Go学习', link: '/go' }
    ],

    sidebar: [
      {
        text: '开始',
        items: [
          { text: '介绍', link: '/' },
        ]
      },
      {
        text: 'Go',
        items: [
          { text: '基础', link: '/go' },
        ]
      }
    ]
  }
})
