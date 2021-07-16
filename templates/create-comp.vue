<template>
  <div>
    <header-comp title="Input Data titleName"></header-comp>
    <v-container>
      <v-form ref="formModuleName">
        <v-row class="px-5">
          <v-col cols="12" sm="6">
            <!-- <v-text-field
              v-model="ModuleNameData.name"
              label="Nama"
              :rules="[rules.required]"
              placeholder=" "
              outlined
            ></v-text-field>-->
          </v-col>
          <!-- <v-col cols="12" sm="6">
            <v-autocomplete
              v-model="ModuleNameData.itemId"
              :items="items"
              item-text="name"
              item-value="id"
              outlined=""
              label="Pilih Items"
            ></v-autocomplete>
          </v-col>-->
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
  props: ['ModuleNameData'],
  components: {
    headerComp
  },
  data() {
    return {
      loading: false,
      rules: {
        required: (value) => !!value || 'Wajib diisi.'
      }
      // items: []
    }
  },
  methods: {
    save() {
      const isValid = this.$refs.formModuleName.validate()
      if (isValid) {
        if (this.ModuleNameData.id) {
          this.update(this.ModuleNameData.id)
        } else {
          this.create()
        }
      }
    },
    async create() {
      try {
        this.loading = true
        const result = await this.$api.ModuleName.create(this.ModuleNameData)
        this.loading = false
        this.$emit('done')
      } catch (err) {
        this.loading = false
      }
    },
    async update(id) {
      try {
        this.loading = true
        const payload = this.ModuleNameData
        delete payload.id
        const result = await this.$api.ModuleName.update(id, payload)
        this.loading = false
        this.$emit('done')
      } catch (err) {
        this.loading = false
      }
    }
  }
}
</script>