<template>
  <div>
    <header-comp title="Input Data Menu"></header-comp>
    <v-container>
      <v-form ref="formMenu">
        <v-row class="px-5">
          <v-col cols="12" sm="6">
            <v-text-field
              label="Kode"
              :rules="[rules.required]"
              placeholder=" "
              v-model="MenuData.code"
              outlined
            ></v-text-field>
            <v-text-field
              label="Nama"
              :rules="[rules.required]"
              placeholder=" "
              v-model="MenuData.name"
              outlined
            ></v-text-field>
            <v-text-field
              label="Path"
              placeholder=" "
              prefix="/app"
              v-model="MenuData.path"
              outlined
            ></v-text-field>
            <v-text-field
              label="icon"
              placeholder=" "
              prefix=""
              v-model="MenuData.icon"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Order"
              :rules="[rules.required]"
              placeholder=" "
              v-model="MenuData.order"
              outlined
            ></v-text-field>
            <v-text-field
              label="Deskripsi"
              :rules="[rules.required]"
              placeholder=" "
              v-model="MenuData.description"
              outlined
            ></v-text-field>
            <v-autocomplete
              v-model="MenuData.ParentId"
              :items="parents"
              item-text="name"
              item-value="id"
              outlined
              autocomplete="off"
              label="Pilih Items"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row class="px-5" justify="end">
          <v-btn :loading="loading" @click="save" color="primary" rounded>Simpan</v-btn>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>
<script>
import headerComp from '~/components/header'
export default {
  props: ['MenuData'],
  components: {
    headerComp
  },
  data() {
    return {
      loading: false,
      rules: {
        required: (value) => !!value || 'Wajib diisi.'
      },
      parents: []
    }
  },
  methods: {
    save() {
      const isValid = this.$refs.formMenu.validate()
      if (isValid) {
        if (this.MenuData.id) {
          this.update(this.MenuData.id)
        } else {
          this.create()
        }
      }
    },
    async create() {
      try {
        this.loading = true
        const result = await this.$api.Menu.create(this.MenuData)
        this.loading = false
        this.$emit('done')
      } catch (err) {
        this.loading = false
      }
    },
    async update(id) {
      try {
        this.loading = true
        const payload = this.MenuData
        delete payload.id
        const result = await this.$api.Menu.update(id, payload)
        this.loading = false
        this.$emit('done')
      } catch (err) {
        this.loading = false
      }
    },
    async getParentList() {
      const result = await this.$api.Menu.parentList()
      this.parents = result.data
    }
  },
  created() {
    this.getParentList()
  }
}
</script>