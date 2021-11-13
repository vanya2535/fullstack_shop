<template>
  <component
    :is="dynamicIcon"
    :width="width"
    :height="height"
    class="svg-icon"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'SvgIcon',

  props: {
    name: {
      type: String,
      required: true
    },

    width: {
      type: [Number, String],
      default: 24
    },

    height: {
      type: [Number, String],
      default: 24
    }
  },

  computed: {
    dynamicIcon() {
      console.log(`../../assets/sprite/${this.name}.svg`)
      return require(`../../assets/sprite/${this.name}.svg`)
    }
  }
}
</script>
