<template>
  <div>
    <header-comp title="Input Data Kategori Umkm"></header-comp>
    <v-container>
      <v-form ref="formUmkmCategory">
        <v-row class="px-5">
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="UmkmCategoryData.name"
              label="Nama"
              :rules="[rules.required]"
              placeholder=" "
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="UmkmCategoryData.description"
              label="Deskripsi"
              :rules="[rules.required]"
              placeholder=" "
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="px-5" justify="end">
          <v-btn :loading="loading" color="primary" rounded @click="save"
            >Simpan</v-btn
          >
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>
<script>
import headerComp from '~/components/header'
export default {
  components: {
    headerComp
  },
  props: ['UmkmCategoryData'],
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
      const isValid = this.$refs.formUmkmCategory.validate()
      if (isValid) {
        if (this.UmkmCategoryData.id) {
          this.update(this.UmkmCategoryData.id)
        } else {
          this.create()
        }
      }
    },
    async create() {
      try {
        this.loading = true
        const result = await this.$api.UmkmCategory.create(
          this.UmkmCategoryData
        )
        this.loading = false
        this.$emit('done')
      } catch (err) {
        this.loading = false
      }
    },
    async update(id) {
      try {
        this.loading = true
        const payload = this.UmkmCategoryData
        delete payload.id
        await this.$api.UmkmCategory.update(id, payload)
        this.loading = false
        this.$emit('done')
      } catch (err) {
        this.loading = false
      }
    }
  }
}
</script>
