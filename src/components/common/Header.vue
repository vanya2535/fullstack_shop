<template>
  <header class="header">
    <Logo width="261" />
    <p>We always care customers</p>
  </header>
</template>

<script>
import Logo from '@/assets/img/logo.svg'

export default {
  name: 'Header',

  components: { Logo }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $primary;
}
</style>
