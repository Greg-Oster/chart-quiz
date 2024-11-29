<script setup lang="ts">
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

defineOptions({
  inheritAttrs: false,
});
const props = withDefaults(defineProps<{
  modelValue: string | number,
  type: string
}>(), {
  modelValue: '',
  type: 'text'
})

const emit = defineEmits(['update:modelValue'] )
const updateValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
};
const updateColor = (value: string) => {
  emit('update:modelValue', (value))
};
</script>

<template>
  <div v-if="type==='color'">
    <color-picker
        isWidget
        :pureColor="modelValue"
        @pureColorChange="updateColor"
    />
  </div>
  <div
      v-else
      class="input-wrapper">
    <input
        :type="type"
        class="input"
        v-bind="$attrs"
        :value="modelValue"
        placeholder=""
        @input="updateValue"
        :class="{
          'has-label': $slots.label,
        }"
    />
    <label class="label">
      <slot name="label" />
    </label>
  </div>

</template>

<style scoped lang="scss">
  .input-wrapper {
    position: relative;
  }

  .input {
    box-sizing: border-box;
    width: 100%;
    background: $color-light-bg;
    border: 1px solid $color-border;
    font-size: 16px;
    padding: spacing(2) spacing(4);
    outline: 0;
    border-radius: $border-radius-base;

    &.has-label {
      padding-top: spacing(6);

      &::placeholder {
        color: transparent;
      }
    }
  }

  .input:focus ~ .label,
  .input:not(:placeholder-shown) ~ .label {
    opacity: 0.65;
    transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
  }

  .label {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    padding: spacing(4) 22px;
    pointer-events: none;
    transform-origin: 0 0;
    transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
  }
</style>
