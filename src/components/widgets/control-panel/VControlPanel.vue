<script setup lang="ts">
import VControlPanelItem from "@components/widgets/control-panel/VControlPanelItem.vue";
import AddRecordView from "@/views/modal/AddRecordView.vue";
import EditRecordView from "@/views/modal/EditRecordView.vue";
import useModal from "@/stores/useModal.ts";
import { usePieChart } from "@/stores/usePieChart.ts";

defineProps<{
  data: Object[],
}>()

const modal = useModal();
function handleOpenModal(){
  modal.open(AddRecordView);
}

const pieChartStore = usePieChart();
function handleDelete(id){
  pieChartStore.deleteSectorById(id)
}

function handleEdit(id){
  modal.open(EditRecordView, {id});
}
</script>

<template>
  <div class="control-panel">
    <VControlPanelItem
        class="control-panel__item"
        v-for="item in data"
        :key="item.id"
        :label="item.label"
        :value="item.data"
        :color="item.backgroundColor"
        @deleteSector="handleDelete(item.id)"
        @editSector="handleEdit(item.id)"
    />
    <VButton
        @click="handleOpenModal"
        class="control-panel__btn"
    >
      Добавить
    </VButton>
  </div>
</template>

<style scoped lang="scss">
.control-panel {
  display: flex;
  flex-direction: column;
  gap: spacing(1);

  &__btn {
    margin-top: spacing(6);
  }
}
</style>
