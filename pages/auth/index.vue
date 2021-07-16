<template>
  <v-app>
    <v-container fill-height>
      <v-row align="center" justify="center">
        <v-col cols="5" class="hidden-sm-and-down">
          <v-row justify="center">
            <img width="78%" src="/images/login-green.svg" />
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <v-row justify="center">
            <component
              @change-auth-comp="changeAuthComp"
              :is="currentAuthComp"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar
      v-model="$store.state.alert.show"
      :color="$store.state.alert.type"
      right
      top
      vertical
    >
      {{ $store.state.alert.message }}
    </v-snackbar>
  </v-app>
</template>
<script>
import loginComp from './login-comp'
import registerComp from './register-comp'
export default {
  components: { loginComp, registerComp },
  data() {
    return {
      currentAuthComp: 'login-comp'
    }
  },
  created() {},
  methods: {
    changeAuthComp(compText) {
      this.currentAuthComp = compText
    }
  }
}
</script>
