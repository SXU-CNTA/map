import { Feed } from 'feed'
import { generatePages } from './generator/pages-generator'
import { RouteTitleRecord } from './src/site'
import { writeFileSync } from 'fs'
import chalk from 'chalk'

console.log(chalk.bgYellow.greenBright('Generating feed:'))

const pages = generatePages()
  .filter((page) => page.category && page.category in RouteTitleRecord)
  .sort((a, b) => Date.parse(b.time) - Date.parse(a.time))

const postsFeed = new Feed({
  title: '山西大学计算机与网络技术协会',
  description:
    '计算机与网络技术协会（CNTA），成立于2015年，是隶属于现代教育技术学院的明星技术型学生社团，协助校区网络维护和维修。协会设有志愿队和技术部，开展专业知识学习和竞赛活动，注重将知识与实践相结合。管理校级志愿队，组织数字助老和电脑义诊等志愿活动，培养数字素养与技能。协会定期举办讲座、比赛观摩等活动，为成员提供学习和实践的平台。',
  id: 'https://www.sxu-cnta.cn/',
  link: 'https://www.sxu-cnta.cn/',
  language: 'zh-Hans',
  image: 'https://www.sxu-cnta.cn/favicon.svg',
  favicon: 'https://www.sxu-cnta.cn/favicon.ico',
  copyright: `© 2015 - ${new Date().getFullYear()} 山西大学计算机与网络技术协会`,
  updated: pages.length ? new Date(pages[0].time) : new Date(),
  generator: 'ScantPress',
  feedLinks: {
    atom: 'https://www.sxu-cnta.cn/posts.atom',
  },
  author: {
    name: '山西大学计算机与网络技术协会',
    email: 'cnta@sxu-cnta.cn',
    link: 'https://sxu-cnta.cn/',
  },
})

pages.forEach((page) => {
  postsFeed.addItem({
    title: page.title,
    id: `https://www.sxu-cnta.cn${page.contentUrl}`,
    link: `https://www.sxu-cnta.cn${page.contentUrl}`,
    description: page.meta?.description,
    content: page.excerpt,
    author: page.data?.author
      ? [
          {
            name: page.data.author as string,
          },
        ]
      : [
          {
            name: '山西大学计算机与网络技术协会',
            email: 'cnta@sxu-cnta.cn',
            link: 'https://sxu-cnta.cn/',
          },
        ],
    date: new Date(page.time),
    image: page.meta?.image,
    category: page.category ? [{ name: RouteTitleRecord[page.category] }] : [],
  })
})

writeFileSync('./dist/static/posts.atom', postsFeed.atom1())
console.log(chalk.green('generated:'), 'dist/static/posts.atom')

Object.keys(RouteTitleRecord).forEach((routeBase) => {
  const categoryPages = pages.filter((page) => page.category === routeBase)
  const categoryFeed = new Feed({
    title: `${RouteTitleRecord[routeBase]} | 山西大学计算机与网络技术协会`,
    description:
      '计算机与网络技术协会（CNTA），成立于2015年，是隶属于现代教育技术学院的明星技术型学生社团，协助校区网络维护和维修。协会设有志愿队和技术部，开展专业知识学习和竞赛活动，注重将知识与实践相结合。管理校级志愿队，组织数字助老和电脑义诊等志愿活动，培养数字素养与技能。协会定期举办讲座、比赛观摩等活动，为成员提供学习和实践的平台。',
    id: `https://sxu-cnta.cn/${routeBase}/`,
    link: `https://sxu-cnta.cn/${routeBase}/`,
    language: 'zh-Hans',
    image: 'https://sxu-cnta.cn/favicon.svg',
    favicon: 'https://sxu-cnta.cn/favicon.ico',
    copyright: `© 2015 - ${new Date().getFullYear()} 山西大学计算机与网络技术协会`,
    updated: categoryPages.length ? new Date(categoryPages[0].time) : new Date(),
    generator: 'ScantPress',
    feedLinks: {
      atom: `https://sxu-cnta.cn/${routeBase}/posts.atom`,
    },
    author: {
      name: '山西大学计算机与网络技术协会',
      email: 'cnta@sxu-cnta.cn',
      link: 'https://sxu-cnta.cn/',
    },
  })
  categoryPages.forEach((page) => {
    categoryFeed.addItem({
      title: page.title,
      id: `https://www.sxu-cnta.cn${page.contentUrl}`,
      link: `https://www.sxu-cnta.cn${page.contentUrl}`,
      description: page.meta?.description,
      content: page.excerpt,
      author: page.data?.author
        ? [
            {
              name: page.data.author as string,
            },
          ]
        : [
            {
              name: '山西大学计算机与网络技术协会',
              email: 'cnta@sxu-cnta.cn',
              link: 'https://sxu-cnta.cn/',
            },
          ],
      date: new Date(page.time),
      image: page.meta?.image,
    })
  })
  categoryFeed.addCategory(RouteTitleRecord[routeBase])
  writeFileSync(`./dist/static/${routeBase}/posts.atom`, categoryFeed.atom1())
  console.log(chalk.green('generated:'), `dist/static/${routeBase}/posts.atom`)
})
