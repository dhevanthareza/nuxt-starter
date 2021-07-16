<template>
  <v-card width="400px" flat>
    <v-container class="pa-5">
      <v-row>
        <v-col>
          <h2 class="text-center primary--text">Dasaran</h2>
          <v-col class="mt-5">
            <v-text-field
              outlined
              label="Email"
              placeholder="dhevxxx@gmail.com"
            ></v-text-field>
            <v-text-field
              outlined
              label="Nama sesuai KTP"
              placeholder="Dhevan Anthareza"
            ></v-text-field>
            <v-text-field
              outlined
              label="Nomor KTP"
              placeholder="337410xxx"
            ></v-text-field>
            <v-text-field
              outlined
              label="Nomor Telp"
              placeholder="081226xxx"
            ></v-text-field>
            <v-text-field
              outlined
              label="Password"
              placeholder="******"
            ></v-text-field>
          </v-col>
          <v-row justify="center">
            <v-btn @click="register" color="primary" rounded>Daftar</v-btn>
          </v-row>
          <v-row class="mt-5" justify="center">
            <p>
              Sudah memiliki akun?
              <a
                @click="$emit('change-auth-comp', 'login-comp')"
                class="primary--text"
                >Login</a
              >
            </p>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  methods: {
    register() {
      this.$router.replace('/app')
    }
  }
}
</script>
