<template>
  <div>
    <header-comp title="Input Data Role"></header-comp>
    <v-container>
      <v-form ref="formRole">
        <v-row class="px-5">
          <v-col cols="12" sm="6">
            <v-text-field
              label="Kode Role"
              :rules="[rules.required]"
              placeholder=" "
              v-model="RoleData.code"
              outlined
            ></v-text-field>
            <v-text-field
              label="Nama Role"
              :rules="[rules.required]"
              placeholder=" "
              v-model="RoleData.name"
              outlined
            ></v-text-field>
            <v-text-field
              label="Level"
              :rules="[rules.required]"
              placeholder=" "
              v-model="RoleData.level"
              type="number"
              outlined
            ></v-text-field>
            <!-- <v-text-field
              label="Email"
              :rules="[rules.required]"
              placeholder=" "
              v-model="RoleData.email"
              outlined
            ></v-text-field>
            <v-text-field
              label="Nomor Telepon"
              :rules="[rules.required]"
              placeholder=" "
              v-model="RoleData.phone"
              outlined
            ></v-text-field> -->
          </v-col>
          <!-- <v-col cols="12" sm="6">
            <v-text-field v-model="RoleData.password" label="Password" :rules="RoleData.id ? []: [rules.required]" placeholder=" " outlined></v-text-field>
            <v-autocomplete
              v-model="RoleData.RoleId"
              :items="roles"
              item-text="name"
              item-value="id"
              outlined=""
              label="Pilih Role"
            ></v-autocomplete>
          </v-col> -->
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
  props: ['RoleData'],
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
      const isValid = this.$refs.formRole.validate()
      if (isValid) {
        if (this.RoleData.id) {
          this.update(this.RoleData.id)
        } else {
          this.create()
        }
      }
    },
    async create() {
      this.loading = true
      const result = await this.$api.Role.create(this.RoleData)
      this.loading = false
      this.$emit('done')
    },
    async update(id) {
      this.loading = true
      const payload = this.RoleData
      delete payload.id
      const result = await this.$api.Role.update(id, payload)
      this.loading = false
      this.$emit('done')
    },
  }
}
</script>