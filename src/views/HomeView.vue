<script setup lang="ts">
import TheProgressBar from "../components/TheProgressBar.vue";
import {ref} from "vue";
import VButton from "@components/ui/VButton.vue";


const testValue = ref(0)
function incProgress(){
  testValue.value = testValue.value + 15
}
function descProgress(){
  testValue.value = testValue.value - 15
}

const progressStatus = ref('default')
function setDefault(){
  progressStatus.value = 'default'
}

function setCompleted(){
  progressStatus.value = 'success'
}

function setError(){
  progressStatus.value = 'error'
}

function setInProgress(){
  progressStatus.value = 'progress'
}

const chartType = ref('default')
function changeType(){
  if (chartType.value === 'default') {
    chartType.value = 'bar'
  } else {
    chartType.value = 'default'
  }
}
</script>

<template>
  <div class="home-view">
    <div class="actions">
      <VButton @click="incProgress">+15</VButton>
      <VButton @click="descProgress">-15</VButton>
      <VButton @click="setCompleted">Статус: success</VButton>
      <VButton @click="setDefault">Статус: default</VButton>
      <VButton @click="setError">Статус: error</VButton>
      <VButton @click="setInProgress">Статус: progress</VButton>
      <VButton @click="changeType">Сменить тип</VButton>
    </div>
    <div class="wrapper wrapper--wide">
      <TheProgressBar
          :progress-val="testValue"
          :status="progressStatus"
          :type="chartType"
      />
    </div>
    <div class="wrapper wrapper--tall">
      <TheProgressBar
          :progress-val="testValue"
          :status="progressStatus"
          :type="chartType"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-view {
  display:flex;
  gap: spacing(4);
}

.actions {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  gap: spacing(2);
}
.wrapper {
  padding: 20px;
  border:1px solid grey;
  display: flex;
  flex-wrap: wrap;

  &--wide {
    min-width: 150px;
    max-width:600px;
    width:100%;
    max-height: 450px;
  }

  &--tall {
    min-width: 150px;
    max-width:300px;
    width: 100%;
    height: 600px;
  }
}

</style>
