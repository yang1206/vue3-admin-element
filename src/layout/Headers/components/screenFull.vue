<template>
  <div @click="handleFullScreen" id="screenfull">
    <svg-icon :icon-class="icon ? 'exit-fullscreen' : 'fullscreen'"></svg-icon>
  </div>
</template>
<script lang="ts"  setup>
import screenfull from 'screenfull'
import { ref, onMounted, onBeforeUnmount } from 'vue'
const icon = ref(screenfull.isFullscreen)
const handleFullScreen = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle()
  }
}

const changeIcon = () => {
  icon.value = screenfull.isFullscreen
}
onMounted(() => {
  screenfull.on('change', changeIcon)
})
onBeforeUnmount(() => {
  screenfull.off('change', changeIcon)
})
</script>

<style scoped>
#screenfull:active {
  font-size: 26px
}
</style>
