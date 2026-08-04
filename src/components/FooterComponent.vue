<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer text-center flex="~ col items-center" text-sm text-gray-400 dark:text-truegray-600>
    <div flex="~ items-center gap-2">
      <a text-unset href="/about/">关于我们</a>
      <a text-unset href="https://github.com/sxu-cnta" target="_blank">GitHub</a>
      <a text-unset href="mailto:cnta@sxu-cnta.cn">邮件联系</a>
    </div>
    <span>© 2015 - {{ year }}, 山西大学计算机与网络技术协会</span>
  </footer>
</template>
