import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'


async function fetchJsonFromCurrentSite(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch and parse the JSON file:', error);
    throw error; // 重新抛出错误，以便调用者可以处理
  }
}

export default defineUserConfig({
  lang: 'zh-CN',

  title: 'Dotnet Notes',
  description: 'Dotnet Notes Site',

  theme: defaultTheme({
    logo: '/images/DotNetLanguage.png',

    // 右上角菜单
    navbar: [
      {
        text: "主页",
        link: "/"
      },
      {
        text: "开始使用",
        link: "/get-started"
      },
      {
        text: "Github",
        link: "https://github.com/cyoukon/vuepress-starter"
      }
    ],
    sidebar: await fetchJsonFromCurrentSite("http://localhost:8080/sidebar.json")
  }),

  bundler: viteBundler(),
})