<script setup lang="ts">
  import { computed } from 'vue'
  import { isExternal as external } from '@/utils/validate'

  const props = defineProps<{
    icon: string
    className?: string
  }>()

  /*
   * 判断当前图标是否为外部图标
   * */
  const isExternal = computed(() => external(props.icon))

  /*
   * 外部图标样式
   * */
  const styleExternalIcon = computed(() => ({
    mask: `url(${props.icon}) center center / contain no-repeat`,
    '-webkit-mask': `url(${props.icon}) center center / contain no-repeat`,
  }))

  /*
   * 内部图标
   * */
  const iconName = computed(() => `#icon-${props.icon}`)
</script>

<template>
  <!--展示外部图标-->
  <div
    v-if="isExternal"
    :class="props.className"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
  ></div>
  <!--展示内部图标-->
  <div v-else>
    <svg class="svg-icon" :class="props.className" aria-hidden="true">
      <use :href="iconName" />
    </svg>
  </div>
</template>

<style scoped lang="scss">
  .svg-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
    vertical-align: -0.15em;
    font-size: 1em;
  }
  .svg-external-icon {
    background-color: currentColor;
    mask-size: cover !important;
    display: inline-block;
  }
</style>
