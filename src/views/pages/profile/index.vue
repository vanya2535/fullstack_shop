<template>
  <div class="index">
    <header class="index__header">
      <Logo width="261" />
      <p>We always care customers</p>
    </header>
    <main class="index__main">
      <img
        src="https://secure.gravatar.com/avatar/50c30aae0f1878a17788458f7fefbcfe?s=252&d=mm&r=g"
        alt="profile picture"
        class="index__avatar"
      />
      <h5 class="index__username">
        {{ username }}
      </h5>
      <p class="index__role">
        {{ role }}
      </p>
      <Button style="margin-top: 20px" @click="logout">Logout</Button>
    </main>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Logo from '@/assets/img/logo.svg'

export default {
  name: 'Index',

  components: { Logo },

  methods: {
    ...mapMutations('user', ['LOGOUT']),

    logout() {
      this.LOGOUT()
      this.$router.push({ name: 'Index' })
    }
  },

  computed: {
    ...mapState('user', ['username', 'role'])
  }
}
</script>

<style lang="scss" scoped>
.index {
  padding-top: 64px;
  height: 100%;

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
  }

  &__main {
    text-align: center;
    text-transform: capitalize;
    color: $primary;
  }
}
</style>
