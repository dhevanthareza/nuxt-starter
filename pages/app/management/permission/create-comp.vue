<template>
  <div>
    <header-comp title="Input Data Permission"></header-comp>
    <v-container>
      <v-form ref="formPermission">
        <v-row class="px-5">
          <v-col cols="12" sm="6">
            <!-- <v-text-field
              label="Nama"
              :rules="[rules.required]"
              placeholder=" "
              v-model="PermissionData.name"
              outlined
            ></v-text-field> -->
          </v-col>
          <!-- <v-col cols="12" sm="6">
            <v-autocomplete
              v-model="PermissionData.itemId"
              :items="items"
              item-text="name"
              item-value="id"
              outlined=""
              label="Pilih Items"
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
  props: ['PermissionData'],
  components: {
    headerComp
  },
  data() {
    return {
      rules: {
        loading: false,
        required: (value) => !!value || 'Wajib diisi.'
      },
      // items: []
    }
  },
  methods: {
    save() {
      const isValid = this.$refs.formPermission.validate()
      if (isValid) {
        if (this.PermissionData.id) {
          this.update(this.PermissionData.id)
        } else {
          this.create()
        }
      }
    },
    async create() {
      this.loading = true
      const result = await this.$api.Permission.create(this.PermissionData)
      this.loading = false
      this.$emit('done')
    },
    async update(id) {
      this.loading = true
      const payload = this.PermissionData
      delete payload.id
      const result = await this.$api.Permission.update(id, payload)
      this.loading = false
      this.$emit('done')
    },
  }
}
</script>