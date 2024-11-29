<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useModal } from "@/stores/useModal.ts";

const modal = useModal();
const { isOpen, view, data } = storeToRefs(modal);

</script>

<template>
  <transition name="fade">
    <div class="modal-container" v-if="isOpen" @click="modal.close()">
      <transition name="slide" appear>
        <div class="modal" @click.stop="">
          <component
              :is="view"
              :modal-data="data">
          </component>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped lang="scss">
  $transition-duration: 0.3s;

  .fade-enter-active {
    animation: fade-in $transition-duration;

    .modal {
      animation: slide-up $transition-duration;
    }
  }

  .fade-leave-active {
    animation: fade-out $transition-duration;

    .modal {
      animation: slide-down $transition-duration;
    }
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes slide-up {
    0% {
      transform: translateY(100%);
    }

    100% {
      transform: translateY(0);
    }
  }

  @keyframes slide-down {
    0% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(100%);
    }
  }

  .modal-container {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 9999;
    background: rgba(0, 0, 0, .32);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    width: calc(100% - 16px);
    max-width: 390px;
    min-height: 100px;
    height: max-content;
    max-height: calc(-16px + 100vh);
    opacity: 1;
    transform: none;
    background-color: $color-light-bg;
    border-radius: 15px;
    padding: 20px;
    position: relative;
  }
</style>
