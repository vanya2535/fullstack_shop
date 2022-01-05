<template>
  <svg class="spinner" viewBox="0 0 50 50" :width="size" :height="size">
    <circle
      circle
      class="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      :stroke="colors[stroke]"
      stroke-width="5"
    ></circle>
  </svg>
</template>

<script>
export default {
  name: 'SpinLoading',

  props: {
    size: {
      type: [Number, String],
      default: 14
    },

    stroke: {
      type: String,
      default: 'white'
    }
  },

  data: () => ({
    colors: {
      white: 'fff',
      primary: '#365099'
    }
  })
}
</script>

<style lang="scss" scoped>
.spinner {
  animation: rotate 2s linear infinite;

  & .path {
    // stroke: $white;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }

  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
