<template>
  <v-app>
    <v-container fill-height>
      <loading-comp></loading-comp>
    </v-container>
  </v-app>
</template>
<style scoped></style>
<script>
import loadingComp from '~/components/loading.vue'
export default {
  components: {
    loadingComp
  },
  data() {
    return {}
  },
  created() {
    if (this.$auth.loggedIn) {
      this.$router.replace('/app')
    } else {
      this.$router.replace('/auth')
    }
  }
}
</script>
