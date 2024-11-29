<script setup lang="ts">
import {defineAsyncComponent, shallowRef, watch} from 'vue';

interface Props {
  name: string,
  width?: number,
  height?: number,
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  width: 24,
  height: 24
})

const icon = shallowRef(defineAsyncComponent(() => import(`@assets/svg/${props.name}.svg`)))


watch(
    () => props.name,
    (newName) => {
      icon.value = defineAsyncComponent(() => import(`@assets/svg/${newName}.svg`))
    }
)
</script>

<template>
  <component
      :is="icon"
      class="fill-current"
      :width="width"
      :height="height"
  />
</template>

<style scoped lang="scss">
.fill-current {
  stroke: #9c9c9c;
  transition: fill .3s;
}
</style>
