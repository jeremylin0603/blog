<script setup lang="ts">
import { reactive, defineProps } from 'vue'
import type { PropType } from 'vue'

enum EAlign {
  center = 'center',
  left = 'left',
  right = 'right'
}

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  isAutoSize: {
    type: Boolean,
    default: false
  },
  w: {
    type: Number,
    default: 300
  },
  h: {
    type: Number,
    default: 300
  },
  align: {
    type: String as PropType<EAlign>,
    default: 'center'
  }
})

const styleVar = reactive({
  '--align': props.align
})
</script>

<template>
  <div :style="styleVar" class="wrapper">
    <img v-if="isAutoSize" :src="props.src" />
    <img v-else :src="props.src" :width="props.w" :height="props.h" />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  text-align: var(--align);
}
</style>
