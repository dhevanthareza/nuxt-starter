<template>
  <div>
    <header-comp title="Input Data User"></header-comp>
    <v-container>
      <v-form ref="formUser">
        <v-row class="px-5">
          <v-col cols="12" sm="6">
            <v-text-field
              label="Nama lengkap"
              :rules="[rules.required]"
              placeholder=" "
              v-model="userData.fullname"
              outlined
            ></v-text-field>
            <v-text-field
              label="Email"
              :rules="[rules.required]"
              placeholder=" "
              v-model="userData.email"
              outlined
            ></v-text-field>
            <v-text-field
              label="NIK"
              :rules="[rules.required]"
              placeholder=" "
              v-model="userData.nik"
              outlined
            ></v-text-field>
            <v-text-field
              label="Nomor Telepon"
              :rules="[rules.required]"
              placeholder=" "
              v-model="userData.phone"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="userData.password" label="Password" :rules="userData.id ? []: [rules.required]" placeholder=" " outlined></v-text-field>
            <v-autocomplete
              v-model="userData.RoleId"
              :items="roles"
              item-text="name"
              item-value="id"
              outlined=""
              label="Pilih Role"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row class="px-5" justify="end">
          <v-btn @click="save" color="primary" rounded>Simpan</v-btn>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>
<script>
import headerComp from '~/components/header'
export default {
  props: ['userData'],
  components: {
    headerComp
  },
  data() {
    return {
      rules: {
        loading: false,
        required: (value) => !!value || 'Wajib diisi.'
      },
      roles: []
    }
  },
  methods: {
    save() {
      const isValid = this.$refs.formUser.validate()
      if (isValid) {
        if (this.userData.id) {
          this.update(this.userData.id)
        } else {
          this.create()
        }
      }
    },
    async create() {
      this.loading = true
      const result = await this.$api.User.create(this.userData)
      this.loading = false
      this.$emit('done')
    },
    async update(id) {
      this.loading = true
      const payload = this.userData
      delete payload.id
      const result = await this.$api.User.update(id, payload)
      this.loading = false
      this.$emit('done')
    },
    async getRoleList() {
      const result = await this.$api.Role.getAll()
      this.roles = result.data.filter((el) => el.code !== 'customer')
    }
  },
  created() {
    this.getRoleList()
  }
}
</script>