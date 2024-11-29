<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  label: string,
  value: number,
  color: string,
}>()

const cSectorColor = computed(() => `background-color: ${props.color}`)

const emit = defineEmits(['deleteSector', 'editSector'] )
function handleDelete(){
  emit('deleteSector')
}
function handleEdit(){
  emit('editSector')
}
</script>

<template>
<div class="control-panel-item">
  <div class="control-panel-item__title">
    <span class="control-panel-item__title-text">
      {{ label }}
    </span>
  </div>
  <div class="control-panel-item__divider"/>
  <div class="control-panel-item__value">
    <span class="control-panel-item__value-text">
      {{ value }}
    </span>
  </div>
  <div class="control-panel-item__divider"></div>
  <div
      class="control-panel-item__color"
      :style="cSectorColor"
  ></div>
  <div class="control-panel-item__action">
    <VButton
        class="control-panel-item__btn control-panel-item__action-edit"
        icon="edit"
        @click="handleEdit"
    ></VButton>
    <VButton
        class="control-panel-item__btn control-panel-item__action-delete"
        icon="delete"
        @click="handleDelete"
    ></VButton>
  </div>

</div>
</template>

<style scoped lang="scss">
.control-panel-item {
  display: flex;
  background-color: $color-grey-bg;
  border-radius:8px;
  align-items: center;
  padding: 18px 20px;

  &__divider {
    width: 2px;
    height: 90%;
    background-color: $color-border;
    border-radius: 1px;
  }

  &__title {
    min-width: 130px;
    padding-right: 10px;
  }

  &__value {
    min-width: 30px;
    padding: 0 25px;
  }

  &__color {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: transparent;
    margin:0 25px;
    flex-shrink: 0;
  }

  &__action {
    display: flex;
    margin-left: auto;
    gap: spacing(4);
  }
}
</style>
