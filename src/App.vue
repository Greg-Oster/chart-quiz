<script setup lang="ts">
import VModal from "@components/modal/VModal.vue";
import TheNavbar from "@components/layout/TheNavbar.vue";

</script>

<template>
  <main class="app-main" id="app">
    <TheNavbar/>
    <div class="main-content">
      <RouterView />
    </div>
  </main>
  <VModal />
</template>

<style scoped lang="scss">
.main-content {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 spacing(4);
}
</style>
