<template>
  <div>
    <header-comp title="Input Data Kecamatan"></header-comp>
    <v-container>
      <v-form ref="formKecamatan">
        <v-row class="px-5">
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="KecamatanData.name"
              label="Nama"
              :rules="[rules.required]"
              placeholder=" "
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-autocomplete
              v-model="KecamatanData.itemId"
              :items="items"
              item-text="name"
              item-value="id"
              outlined=""
              label="Pilih Items"
            ></v-autocomplete>
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
  props: ['KecamatanData'],
  data() {
    return {
      loading: false,
      rules: {
        required: (value) => !!value || 'Wajib diisi.'
      },
      items: []
    }
  },
  methods: {
    save() {
      const isValid = this.$refs.formKecamatan.validate()
      if (isValid) {
        if (this.KecamatanData.id) {
          this.update(this.KecamatanData.id)
        } else {
          this.create()
        }
      }
    },
    async create() {
      try {
        this.loading = true
        await this.$api.Kecamatan.create(this.KecamatanData)
        this.loading = false
        this.$emit('done')
      } catch (err) {
        this.loading = false
      }
    },
    async update(id) {
      try {
        this.loading = true
        const payload = this.KecamatanData
        delete payload.id
        await this.$api.Kecamatan.update(id, payload)
        this.loading = false
        this.$emit('done')
      } catch (err) {
        this.loading = false
      }
    }
  }
}
</script>
