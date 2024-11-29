<script setup lang="ts">
const emit = defineEmits(['click'])
const props = withDefaults(defineProps<{
  icon?: string,
  size?: "sm" | "md",
}>(), {
  size: 'md',
})
</script>

<template>
  <button
      @click="emit('click')"
      :class="[
        'button',
        'button--' + props.size,
        {'button--no-text': !$slots.default}
      ]"

  >
    <VIcon
        v-if="icon"
        :name="icon"
        class="button__icon"
    />
    <span class="button__text">
      <slot></slot>
    </span>
  </button>
</template>

<style scoped lang="scss">
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 18px;
    font-size: 1em;
    font-weight: 400;
    font-family: inherit;
    background-color: $color-primary;
    color: $color-white;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: $color-primary-hover;
    }

    &--no-text {
      background-color: transparent;
      padding: 0;

      &:hover {
        background-color: transparent;
      }
    }
  }
</style>
