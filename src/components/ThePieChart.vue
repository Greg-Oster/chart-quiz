<script setup lang="ts">
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

defineProps<{
  data: Object,
}>()


const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      align: 'center'
    }
  }
}

</script>

<template>
  <div class="pie-chart">
    <Pie :data="data" :options="options" />
  </div>
</template>

<style scoped lang="scss">
.pie-chart {
  width: 100%;
}
</style>
