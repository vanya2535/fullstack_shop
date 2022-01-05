<template>
  <div class="footer">
    <nav class="navbar">
      <div
        v-if="ROLE === 'SELLER'"
        class="navbar__section navbar__section_l"
        :class="{
          navbar__section_selected: isSelected('Lots')
        }"
        @click="$router.push({ name: 'Lots' })"
      >
        <h6 class="navbar__value">Lots</h6>
      </div>

      <div
        v-if="ROLE === 'USER'"
        class="navbar__section navbar__section_l"
        :class="{ navbar__section_selected: isSelected('Orders') }"
        @click="$router.push({ name: 'Orders' })"
      >
        <h6 class="navbar__value">Add lot</h6>
      </div>

      <div
        class="navbar__section navbar__section"
        :class="{ navbar__section_selected: isSelected('Main') }"
        @click="$router.push({ name: 'Main' })"
      >
        <h6 class="navbar__value">main</h6>
      </div>

      <div
        class="navbar__section navbar__section_r"
        :class="{
          navbar__section_selected: isSelected('Profile')
        }"
        @click="$router.push({ name: 'Profile' })"
      >
        <h6 class="navbar__value">profile</h6>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FooterNavbar',

  computed: {
    ...mapGetters('user', ['ROLE'])
  },

  methods: {
    isSelected(section) {
      return this.$route.name.includes(section)
    }
  }
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
    width: 120px;
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

      &:hover {
        background: $primary !important;
      }
    }

    &:hover {
      background: $border;
    }
  }

  &__value {
    line-height: 38px;
    text-transform: uppercase;
  }
}
</style>
