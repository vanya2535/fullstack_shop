<template>
  <div class="footer">
    <nav class="navbar">
      <div
        class="navbar__section navbar__section_l"
        :class="{ navbar__section_selected: $route.name === 'Main' }"
        @click="$router.push({ name: 'Main' })"
      >
        <h6 class="navbar__value">main</h6>
      </div>
      <div
        class="navbar__section navbar__section_r"
        :class="{
          navbar__section_selected: ['Profile', 'ProfileEdit'].includes(
            $route.name
          )
        }"
        @click="$router.push({ name: 'Profile' })"
      >
        <h6 class="navbar__value">profile</h6>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'FooterNavbar'
}
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  top: calc(100vh - 58px);
  z-index: 2;
  display: flex;
  width: 100%;
  background: $white;
}

.navbar {
  margin: 0 auto;
  border-radius: 12px;
  padding-bottom: 20px;
  cursor: pointer;

  &__section {
    display: inline-block;
    width: 100px;
    text-align: center;
    color: $primary;
    background: $white-contrast;

    &_l {
      border-top-left-radius: 12px;
      border-bottom-left-radius: 12px;
    }

    &_r {
      border-top-right-radius: 12px;
      border-bottom-right-radius: 12px;
    }

    &_selected {
      color: $white;
      background: $primary;
    }
  }

  &__value {
    line-height: 38px;
    text-transform: uppercase;
  }
}
</style>
