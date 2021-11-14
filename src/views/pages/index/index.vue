<template>
  <div class="index">
    <header class="index__header">
      <Logo width="261" />
      <p>We always care customers</p>
    </header>
    <main class="index__main">
      <h6 class="index__description">
        Wherever you’re going, it is important that you get there in style!
      </h6>
    </main>
    <footer class="index__footer block justify-center">
      <EnterButton @click="enterButtonClick" />
    </footer>
    <EnterModal v-model="isEnterModalVisible" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EnterButton from '@/components/index/UI/EnterButton.vue'
import EnterModal from '@/components/index/EnterModal.vue'
import Logo from '@/assets/img/logo.svg'

export default {
  name: 'Index',
  components: { EnterButton, EnterModal, Logo },

  data: () => ({
    isEnterModalVisible: false
  }),

  computed: {
    ...mapGetters('user', ['IS_LOGGED'])
  },

  methods: {
    enterButtonClick() {
      if (this.IS_LOGGED) {
        this.$router.push({ name: 'Main' })
      } else {
        this.isEnterModalVisible = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  padding-top: 64px;
  height: 100%;
  background: url('../../../assets/img/index-background.jpg') no-repeat center
    fixed#e3dc86;
  background-size: cover;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $primary;
  }

  &__main {
    margin-top: calc(100vh - 284px - 78px - 64px - 86px);
    padding: 20px;
    box-shadow: 0 4px 4px $shadow;
    text-align: center;
    background: $background-primary;
  }

  &__description {
    margin: 0 auto;
    width: 253px;
    text-shadow: 0 4px 4px $shadow;
    color: $yellow;
  }

  &__footer {
    margin-top: 162px;
    text-align: center;
  }
}
</style>
