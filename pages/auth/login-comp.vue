<template>
  <v-card width="400px" flat>
    <v-container class="pa-5">
      <v-row>
        <v-col>
          <v-row justify="center" align="center">
            <div>
              <img width="80px" src="/images/logo.svg" />
            </div>
            <h2 class="text-center primary--text mr-3">Dasaran - Login</h2>
          </v-row>
          <v-col class="mt-5">
            <v-text-field
              v-model="username"
              outlined
              label="Email"
              placeholder="dhevxxx@gmail.com"
            ></v-text-field>
            <v-text-field
              v-model="password"
              type="password"
              outlined
              label="Password"
              placeholder="******"
            ></v-text-field>
          </v-col>
          <v-row justify="center">
            <v-btn :loading="loading" @click="login" color="primary" rounded
              >login</v-btn
            >
          </v-row>
          <v-row class="mt-5" justify="center">
            <!-- <p>
              Belum memiliki akun?
              <a @click="$emit('change-auth-comp', 'register-comp')" class="primary--text">Daftar</a>
            </p>-->
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      username: null,
      password: null
    }
  },
  methods: {
    async login() {
      this.loading = true
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        })
        this.$router.replace('/app/dashboard')
        this.loading = false
      } catch (err) {
        console.log(err)
        this.loading = false
      }
    }
  }
}
</script>
