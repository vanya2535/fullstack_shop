<template>
  <div class="index">
    <header class="index__header">
      <Logo width="261" />
      <p>We always care customers</p>
    </header>
    <main class="index__main">
      <img
        :src="
          AVATAR ||
          'https://secure.gravatar.com/avatar/50c30aae0f1878a17788458f7fefbcfe?s=252&d=mm&r=g'
        "
        alt="profile picture"
        class="index__avatar"
      />

      <h5 class="index__username">
        {{ name }}
      </h5>

      <p v-if="USER.role" class="index__role">
        {{ USER.role }}
      </p>

      <UserLinks v-if="USER.links" :links="USER.links" />

      <div class="index__buttons">
        <Button
          style="margin-top: 20px"
          @click="$router.push({ name: 'ProfileEdit' })"
        >
          Edit profile
        </Button>

        <Button style="margin-top: 20px" type="text" @click="logout">
          Logout
        </Button>
      </div>
    </main>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Logo from '@/assets/img/logo.svg'
import UserLinks from '@/components/profile/UserLinks.vue'

export default {
  name: 'Index',

  components: { Logo, UserLinks },

  methods: {
    ...mapMutations('user', ['LOGOUT']),

    logout() {
      this.LOGOUT()
      this.$router.push({ name: 'Index' })
    }
  },

  computed: {
    ...mapGetters('user', ['USER', 'AVATAR']),

    name() {
      return this.USER.firstname && this.USER.lastname
        ? this.USER.firstname + ' ' + this.USER.lastname
        : this.USER.username
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  @include padding;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $primary;
  }

  &__avatar {
    @include border;

    display: block;
    margin: 21px auto;
    border-radius: 12px;
    width: 165px;
    height: 165px;
  }

  &__role {
    text-transform: capitalize;
  }

  &__main {
    text-align: center;
    text-transform: capitalize;
    color: $primary;
  }

  &__buttons {
    display: inline-grid;
  }
}
</style>
