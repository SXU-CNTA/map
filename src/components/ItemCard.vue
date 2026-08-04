<script setup lang="ts">
import type { Component } from 'vue'
import { computed } from 'vue'
import type { Item } from '@/data/item'
import {
  ArrowRightIcon,
  WifiIcon,
  ComputerDesktopIcon,
  HeartIcon,
  ShieldCheckIcon,
  ChatBubbleBottomCenterTextIcon,
  BookOpenIcon,
  GlobeAltIcon,
  KeyIcon,
  FolderIcon,
  CloudIcon,
  CodeBracketIcon,
} from '@heroicons/vue/24/outline'
import AutoDarkImage from './AutoDarkImage.vue'

const props = defineProps<{
  item: Item
  tag: string
  tagClass: string
}>()

const iconMap: Record<string, Component> = {
  wifi: WifiIcon,
  desktop: ComputerDesktopIcon,
  heart: HeartIcon,
  shield: ShieldCheckIcon,
  chat: ChatBubbleBottomCenterTextIcon,
  book: BookOpenIcon,
  globe: GlobeAltIcon,
  key: KeyIcon,
  folder: FolderIcon,
  cloud: CloudIcon,
  code: CodeBracketIcon,
}

const IconComponent = computed(() => (props.item.icon ? iconMap[props.item.icon] : undefined))
</script>

<template>
  <a
    :href="item.link"
    :target="item.link.startsWith('/') ? '' : '_blank'"
    rel="noopener noreferrer"
    decoration-none
    rounded-xl
    bg-gray-100
    dark:bg-dark-600
    flex="~ col gap-2"
    w-full
    h-auto
    p-4
    box-border
    border="1 gray-200 dark:dark-100 solid"
    class="group text-unset!"
  >
    <div flex="~ items-center gap-3">
      <div
        v-if="IconComponent || item.image"
        h-10
        w-10
        shrink-0
        rounded-lg
        bg-gray-200
        dark:bg-dark-700
        flex
        justify-center
        items-center
        box-border
        p-2
        border="1 gray-300 dark:dark-200 solid"
      >
        <AutoDarkImage
          v-if="item.image"
          :src="item.image"
          :src-dark="item.imageDark"
          :alt="item.title"
          object-contain
          w-6
          h-6
        />
        <component :is="IconComponent" v-else class="w-5 h-5 text-primary" />
      </div>
      <div min-w-0 flex-1>
        <div flex="~ items-center gap-2" min-w-0>
          <span text-lg font-semibold text-ellipsis overflow-hidden text-nowrap>
            {{ item.title }}
          </span>
          <span
            v-if="tag"
            shrink-0
            text-xs
            px-1.5
            py-0.5
            rounded-md
            border
            border-solid
            :class="tagClass"
          >
            {{ tag }}
          </span>
        </div>
        <p p-0 m-t-1 m-b-0 text-sm text-gray-500 dark:text-truegray-400 line-clamp-2>
          {{ item.description }}
        </p>
      </div>
      <ArrowRightIcon
        class="h-4 w-4 shrink-0 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-1 transition-transform duration-200"
      />
    </div>
  </a>
</template>
