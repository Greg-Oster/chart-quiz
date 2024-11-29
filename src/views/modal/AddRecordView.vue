<script setup lang="ts">
import {computed, reactive} from "vue";
import { usePieChart } from "@/stores/usePieChart.ts";
import { useModal } from "@/stores/useModal.ts";

const modal = useModal();

const pieChartStore = usePieChart();

const sectorInfo = reactive({
  label:
      {
        title: "Наименование",
        value: '',
        type: 'text',
      },
  data:
      {
        title: "Значение",
        value: '',
        type: 'number'
      },
  backgroundColor:
      {
        title: "Цвет",
        value: 'rgb(66, 165, 246)',
        type: 'color'
      }
    },
);

const newSectorId = computed(() => Date.now())
function handleSubmit(){
  const result = {
    id: newSectorId.value,
    label: sectorInfo.label.value,
    backgroundColor: sectorInfo.backgroundColor.value,
    data: sectorInfo.data.value
  }
  pieChartStore.addNewSector(result)
  modal.close()
}
</script>

<template>
  <div class="add-record">
    <h2>Добавление сектора</h2>
    <VInput
        v-for="item in sectorInfo"
        v-model="item.value"
        :type="item.type"
    >
      <template #label>{{ item.title }}</template>
    </VInput>
    <VButton @click="handleSubmit">Добавить сектор</VButton>
  </div>

</template>

<style scoped lang="scss">
.add-record {
  display: flex;
  flex-direction: column;
  gap: spacing(4);
}
</style>
