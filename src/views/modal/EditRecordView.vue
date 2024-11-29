<script setup lang="ts">
import {computed, reactive} from "vue";
import { usePieChart } from "@/stores/usePieChart.ts";
import { useModal } from "@/stores/useModal.ts";
import {storeToRefs} from "pinia";

const props = defineProps<{
  modalData: Object,
}>()

const pieChartStore = usePieChart();
const { getSectorById } = storeToRefs(pieChartStore)

const sectorValues = computed(() => getSectorById.value(props.modalData.id))
const sectorInfo = reactive({
  label:
      {
        title: "Наименование",
        value: sectorValues.value.label,
        type: 'text',
      },
  data:
      {
        title: "Значение",
        value: sectorValues.value.data,
        type: 'number'
      },
  backgroundColor:
      {
        title: "Цвет",
        value: sectorValues.value.backgroundColor,
        type: 'color'
      }
    },
);

function handleEdit(){
  const result = {
    id: props.modalData.id,
    label: sectorInfo.label.value,
    backgroundColor: sectorInfo.backgroundColor.value,
    data: sectorInfo.data.value
  }

  pieChartStore.editSectorById(props.modalData.id, result)
  const modal = useModal();
  modal.close()
}
</script>

<template>
  <div class="edit-record">
    <h2>Редактирование сектора</h2>
    <VInput
        v-for="item in sectorInfo"
        v-model="item.value"
        :type="item.type"
    >
      <template #label>{{ item.title }}</template>
    </VInput>
    <VButton @click="handleEdit">Редактировать сектор</VButton>
  </div>

</template>

<style scoped lang="scss">
.edit-record {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
