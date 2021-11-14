<template>
  <div class="">
    <h1>You are registered user!</h1>
    <button @click="LOGOUT">Logout</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Index',

  methods: {
    ...mapMutations('user', ['LOGOUT'])
  }
}
</script>
