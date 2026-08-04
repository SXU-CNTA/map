<script setup lang="ts">
import ItemCard from '@/components/ItemCard.vue'
import rawProjectData from '@/data/projects.json'
import rawEventData from '@/data/events.json'
import allPages from 'virtual:pages.json'
import type { Project } from '@/data/project'
import type { Event } from '@/data/event'
import PageListEntry from '@/components/PageListEntry.vue'
import AutoDarkImage from '@/components/AutoDarkImage.vue'

import CntaLogo from '../assets/cnta-logo.png?no-inline'
import GithubMark from '../assets/github-mark.svg?no-inline'
import GithubMarkWhite from '../assets/github-mark-white.svg?no-inline'
import WechatIcon from '../assets/wechat.svg?no-inline'
import WechatIconWhite from '../assets/wechat-white.svg?no-inline'
import GzhQr from '../assets/gzh.png?no-inline'
import { ChevronRightIcon, EnvelopeIcon } from '@heroicons/vue/24/solid'
import { useTitle } from '@vueuse/core'
import { useRoute } from '@/router/router'
import { onMounted, useSSRContext, useTemplateRef, ref } from 'vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { SiteConfiguration, RouteTitleRecord, CampusNetworkCheckUrl } from '@/site'
import type { PageData } from '@/data/pagedata'

const projects = rawProjectData as Project[]
const events = rawEventData as Event[]
const eventItems = events.map((event) => {
  return { ...event, startDate: new Date(event.startDate), endDate: new Date(event.endDate) }
})
const categories: { title: string; route: string; pages: PageData[] }[] = []

Object.keys(RouteTitleRecord).forEach((category) => {
  categories.push({
    title: SiteConfiguration.getRouteCategoryTitle(category),
    route: `/${category}/`,
    pages: allPages
      .filter((page) => page.category === category)
      .sort((a, b) => Date.parse(b.time) - Date.parse(a.time)),
  })
})

const scrollViewRef = useTemplateRef('scrollViewRef')
const mobileScrollViewRef = useTemplateRef('mobileScrollViewRef')
const route = useRoute(() =>
  Math.max(scrollViewRef.value?.scrollTop ?? 0, mobileScrollViewRef.value?.scrollTop ?? 0),
)
useTitle('山西大学计算机与网络技术协会')

const colorClasses = {
  red: 'text-red-400 border-red-400',
  green: 'text-green-400 border-green-400',
  gray: 'text-gray-400 border-gray-400',
}

const nowDate = ref(new Date())
const campusNetwork = ref(CampusNetworkCheckUrl !== '')
const showWechatQr = ref(false)

onMounted(() => {
  scrollViewRef.value?.scrollTo({ top: route.scrollTop, behavior: 'instant' })
  mobileScrollViewRef.value?.scrollTo({ top: route.scrollTop, behavior: 'instant' })

  if (CampusNetworkCheckUrl) {
    fetch(CampusNetworkCheckUrl, {
      mode: 'no-cors',
      signal: AbortSignal.timeout(1000),
    })
      .then(() => {
        campusNetwork.value = true
      })
      .catch(() => {
        campusNetwork.value = false
      })
  }

  nowDate.value = new Date()
})

if (import.meta.env.SSR) {
  const ctx = useSSRContext()
  if (ctx) {
    if (!ctx.meta) {
      ctx.meta = {}
    }
    ctx.meta.description =
      '计算机与网络技术协会（CNTA），成立于2015年，是隶属于现代教育技术学院的明星技术型学生社团，协助校区网络维护和维修。协会设有志愿队和技术部，开展专业知识学习和竞赛活动，注重将知识与实践相结合。管理校级志愿队，组织数字助老和电脑义诊等志愿活动，培养数字素养与技能。协会定期举办讲座、比赛观摩等活动，为成员提供学习和实践的平台。'
    ctx.meta.keywords = [
      'cnta',
      '山西大学',
      '计算机与网络技术协会',
      '电脑义诊',
      '数字助老',
      '校园网络',
      '开源',
    ]
  }
}
</script>

<template>
  <main p-l-6 lg:p-l-12>
    <div
      w-full
      h-screen
      box-border
      class="h-100dvh!"
      sm:grid
      sm:grid-cols-2
      lg:grid-cols-3
      max-w-1680px
      m-x-auto
      gap-6
      lg:gap-12
      overflow-auto
      ref="mobileScrollViewRef"
    >
      <div flex="~ items-center justify-center col" m-t-24 box-border sm:m-t-0 p-r-6 sm:p-r-0>
        <AutoDarkImage h-48 :src="CntaLogo" alt="CNTA 标识" />
        <h1 m-t-8 m-b-0 text-center>山西大学<br />计算机与网络技术协会</h1>
        <span m-t-1 text-lg>导航与新闻站</span>
        <div flex="~ items-center gap-6" m-t-8>
          <a href="https://github.com/sxu-cnta" h-7>
            <AutoDarkImage :src="GithubMark" :src-dark="GithubMarkWhite" h-full alt="Github 标识" />
          </a>
          <a href="mailto:cnta@sxu-cnta.cn" h-7 dark:text-white text-black>
            <EnvelopeIcon class="h-7" />
          </a>
          <div class="group relative cursor-pointer" flex="~ items-center" h-7 @click="showWechatQr = !showWechatQr">
            <AutoDarkImage :src="WechatIcon" :src-dark="WechatIconWhite" h-full alt="微信公众号二维码" />
            <div
              class="invisible absolute left-1/2 top-full z-50 mt-4 h-44 w-44 max-w-[80vw] -translate-x-1/2 translate-y-1 rounded-lg border border-gray-200 bg-white p-2 opacity-0 shadow-lg transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 dark:border-truegray-600"
              :class="showWechatQr ? '!visible !translate-y-0 !opacity-100' : ''"
              @click.stop
            >
              <img
                :src="GzhQr"
                class="h-full w-full max-w-none rounded object-contain"
                alt="山西大学计算机与网络技术协会公众号二维码"
              />
            </div>
          </div>
        </div>
      </div>
      <div lg:col-span-2 overflow-auto p-y-12 p-r-6 lg:p-r-12 ref="scrollViewRef">
        <h2>链接</h2>
        <div grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2>
          <ItemCard
            v-for="item in projects"
            :key="item.title"
            :item="item"
            :tag="item.internal && !campusNetwork ? '仅校园网' : ''"
            :tagClass="colorClasses['red']"
          />
        </div>

        <div v-if="eventItems.length">
          <h2>活动</h2>
          <div grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2>
            <ItemCard
              v-for="item in eventItems"
              :key="item.title"
              :item="item"
              :tag="
                nowDate < item.startDate ? '未开始' : nowDate < item.endDate ? '进行中' : '已结束'
              "
              :tagClass="
                nowDate < item.startDate
                  ? colorClasses['gray']
                  : nowDate < item.endDate
                    ? colorClasses['green']
                    : colorClasses['red']
              "
            />
          </div>
        </div>

        <div m-t-8 v-for="category in categories" :key="category.title">
          <div flex="~ items-center">
            <h2 m-0 flex-grow-1>{{ category.title }}</h2>
            <a
              class="text-unset! hover:bg-gray/10 p-l-2 p-y-1 rounded-md"
              decoration-none
              flex="~ items-center"
              :href="category.route"
            >
              <span>所有{{ category.title }}</span>
              <ChevronRightIcon class="h-5" />
            </a>
          </div>

          <div m-t-4>
            <PageListEntry
              v-for="page in category.pages.slice(0, 3)"
              :key="page.title"
              :page-entry="page"
            />
          </div>
        </div>
        <FooterComponent m-t-12 />
      </div>
    </div>
  </main>
</template>

<style lang="css" scoped></style>
