<!-- 使用方式 -->
<!-- <svg-icon icon-class="category"></svg-icon> -->

<template>
  <svg aria-hidden="true" class="svg-icon">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>

const props = defineProps({
  prefix: { type: String, default: 'icon' },
  iconClass: { type: String, required: true },
  color: { type: String, default: '' }
})

const symbolId = computed(() => `#${props.prefix}-${props.iconClass}`)
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
  fill: currentColor;
}
</style>
