<script setup lang="ts">
import {computed, onMounted, onUpdated, ref, useTemplateRef, watch} from "vue";
import {useDebounceFn, useResizeObserver } from '@vueuse/core'
import VIcon from "./ui/VIcon.vue";

interface Props {
  progressVal?: number
  type?: string
  status?: string
}

const props = withDefaults(defineProps<Props>(), {
  progressVal: 0,
  type: 'default',
  status: 'default'
})

const progressBarCircleRef = useTemplateRef<SVGPathElement | SVGCircleElement>('progressbar-progress')
const progressBarRef = useTemplateRef<SVGGElement>('progress-bar')
const vWidth = ref(0)
const vHeight = ref(0)

const isResizing = ref(true) // for preventing animation transition effect on window resizing
const lockTransition = useDebounceFn(() => {
  isResizing.value = false
}, 400)

onMounted(() => {
  vWidth.value = progressBarRef.value?.clientWidth
  vHeight.value = progressBarRef.value?.clientHeight

  useResizeObserver(progressBarRef, (entries) => {
    isResizing.value = true
    const { width, height } = entries[0].contentRect
    vWidth.value = Math.ceil(width)
    vHeight.value = Math.ceil(height)
    lockTransition()
  })
})

const cPathTotalLength = ref(0)
onUpdated(() => {
  cPathTotalLength.value = Math.ceil(progressBarCircleRef.value?.getTotalLength() + 1 || 0)
})


const cSvgViewBox = computed(() => {
  return `0 0 ${vWidth.value} ${vHeight.value}`
})
const cMinimalSize = computed(() => {
  if (vWidth.value > vHeight.value) {
    return vHeight.value
  } else {
    return vWidth.value
  }
})
const strokeWidth = ref(15)
const cCircleRadius = computed(() => {
    return cMinimalSize.value/2 - strokeWidth.value/2
})

// progress calculations
const cProgressVal = computed(() => {
  if (props.status === 'success'){
    return 100
  } else if(props.progressVal > 100){
    return 100
  } else if (props.progressVal < 0){
    return 0
  } else {
    return props.progressVal
  }
})
const cIsZeroValue = computed(() => cProgressVal.value === 0)

const cProgressDasharray = computed(() => {
  const val = cProgressVal.value;
  const dash = Math.ceil((cPathTotalLength.value * val) / 100);
  const gap = Math.ceil(cPathTotalLength.value - dash);
  return dash + " " + gap
})

// get right color
const strokeLinearColor = computed(() => {
  switch(props.status) {
    case 'error':
      return "rgb(255,0,38)";
    case 'progress':
      return "rgb(245,141,27)";
    case 'success':
      return "rgb(37,165,27)";
  }

  let percent = cProgressVal.value
  if (percent === 100) {
    percent = 99
  }
  let r, g, b;

  if (percent < 50) {
    // red to yellow
    g = Math.floor(255 * (percent / 50));
    r = 255;

  } else {
    // green to red
    g = 255;
    r = Math.floor(255 * ((50 - percent % 50) / 50));
  }
  b = 60;

  return "rgb(" + r + "," + g + "," + b + ")";
})

// status changes
const isDefaultStatus = computed(() => props.status === 'default') // for switching between text and status icons
const currentStatusIcon = computed(() => {
  switch (props.status) {
    case 'error':
      return 'error';
    case 'progress':
      return 'progress';
    case 'success':
      return 'success';
    default:
      return 'default-icon';
  }
})

// bar-type calculations
const offset = ref(0.6); // if equal to '1' - show half of the circle
const cPathTrace = computed(() => {
  const yCoord = Math.sqrt((Math.pow(cCircleRadius.value, 2) - Math.pow((cCircleRadius.value * offset.value),2)))
  const startX = (vWidth.value/2 - cCircleRadius.value * offset.value).toFixed(2)
  const endX = (vWidth.value/2 + cCircleRadius.value * offset.value).toFixed(2)
  const yPosition = (vHeight.value/2 + yCoord).toFixed(2)
  return `
    M ${startX}, ${yPosition}
    A ${cCircleRadius.value},${cCircleRadius.value} 0 1 1 ${endX}, ${yPosition}
  `
})

watch(() => props.type, (_) => {
  isResizing.value = true
  lockTransition()
})
</script>

<template>
  <div class="progress-bar" ref="progress-bar">
    <svg
        :class="['progress-bar__svg', {'progress-bar__svg--zero': cIsZeroValue}]"
        ref="progress-bar1"
        xmlns="http://www.w3.org/2000/svg"
        :viewBox="cSvgViewBox"
    >
      <transition-group name="fade">
        <g v-if="type === 'default'">
          <circle
              :class="['progress-bar__trace', {'lock-transition':isResizing}]"
              :r="cCircleRadius"
              :cx="vWidth/2"
              :cy="vHeight/2"
              :stroke-dasharray="cPathTotalLength"
              :stroke-width="strokeWidth"
          ></circle>
          <circle
              :class="['progress-bar__progress', {'lock-transition':isResizing}]"
              :r="cCircleRadius"
              :cx="vWidth/2"
              :cy="vHeight/2"
              :stroke-dasharray="cProgressDasharray"
              :stroke="strokeLinearColor"
              ref="progressbar-progress"
              :stroke-width="strokeWidth"
          ></circle>
        </g>
        <g v-else>
          <path
            :class="['progress-bar__trace', {'lock-transition':isResizing}]"
            :d="cPathTrace"
            :stroke-width="strokeWidth"
          ></path>
          <path
            ref="progressbar-progress"
            :class="['progress-bar__progress', {'lock-transition':isResizing}]"
            :d="cPathTrace"
            :stroke-width="strokeWidth"
            :stroke-dasharray="cProgressDasharray"
            :stroke="strokeLinearColor"
          ></path>
        </g>
      </transition-group>
    </svg>
    <transition-group name="fade">
      <VIcon
          v-if="!isDefaultStatus"
          :key="currentStatusIcon"
          :name="currentStatusIcon"
          :class="['progress-bar__status', `progress-bar__status--${currentStatusIcon}`]"
      />
      <text
          v-if="isDefaultStatus"
          class="progress-bar__text"
      >
        <transition name="fade">
          <tspan
              class="progress-bar__text-span"
              :key="cProgressVal"
          >
            {{cProgressVal}}/100%
          </tspan>
        </transition>
      </text>
    </transition-group>
  </div>
</template>

<style scoped lang="scss">

.progress-bar {
  display: inline-block;
  position: relative;
  width:100%;
  height: 100%;
  overflow: hidden;

  &__svg {
    stroke-linecap: round;
  }

  &__trace,
  &__progress {
    stroke-dashoffset: 1;
    fill: none;

    &:not(.lock-transition){
      transition: stroke .3s ease-out, stroke-dasharray .3s ease-out;
    }
  }

  &__trace {
    stroke: #e9e9e9;
  }

  &__status,
  &__text,
  &__text-span {
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
  }

  &__status {
    &--progress {
      stroke: none;
      fill: #f58d1b;
    }
    &--error {
      stroke: #f51b1b;
      fill: #f51b1b;
    }
    &--success {
      stroke: #25a500;
      fill: none;
    }
  }
}


// transition
$transition-duration: .6s;

.fade-enter-active {
  animation: fade-in $transition-duration;
}

.fade-leave-active {
  animation: fade-out $transition-duration;
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
</style>
