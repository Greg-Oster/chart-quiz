<script setup lang="ts">
import ThePieChart from "../components/ThePieChart.vue";
import VControlPanel from "../components/widgets/control-panel/VControlPanel.vue";
import { usePieChart } from "@/stores/usePieChart.ts";
import { storeToRefs } from "pinia";

const pieChartStore = usePieChart();
const { currentChart } = storeToRefs(pieChartStore)

</script>

<template>
  <div class="pie-chart-view">
    <h1 class="pie-chart__title">{{ currentChart.title }}</h1>
    <div class="pie-chart__content">
      <VControlPanel :data="currentChart.dataset"/>
      <ThePieChart :data="pieChartStore.parsedData"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pie-chart {
  &__title {
    padding-bottom: spacing(6);
    margin-bottom: spacing(8);
    border-bottom: 1px solid $color-border;
  }

  &__content {
    display: flex;
    gap: spacing(12);

    @media screen and (max-width: 760px) {
      flex-direction: column;
    }
  }
}
</style>
