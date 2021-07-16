<template>
  <index-page title="Data Kecamatan" description="">
    <default-table
      title="Data Kecamatan"
      :headers="headers"
      :get-data="getKecamatanList"
      @click-edit="editItem"
      @click-delete="deleteItem"
      @click-create="createDialog = true"
    />
    <v-dialog
      v-model="createDialog"
      max-width="800"
      @click:outside="KecamatanData = {}"
    >
      <v-card class="px-0 pb-5">
        <create-comp
          v-if="createDialog"
          :kecamatan-data="KecamatanData"
          @done="doneAndRefresh"
        />
      </v-card>
    </v-dialog>
  </index-page>
</template>
<script>
import createComp from './create-comp'
import IndexPage from '~/components/common/IndexPage.vue'
import DefaultTable from '~/components/common/DefaultTable.vue'
export default {
  components: { createComp, IndexPage, DefaultTable },
  data() {
    return {
      headers: [
        {
          text: 'Nama',
          value: 'name',
          sortable: false
        },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      createDialog: false,
      KecamatanData: {}
    }
  },
  methods: {
    editItem(item) {
      this.KecamatanData = item
      this.createDialog = true
    },
    deleteItem(item) {
      this.$deleteSwal().then(async (result) => {
        if (result.value) {
          await this.$api.Kecamatan.delete(item.id)
          this.$refs.table.fetchItems()
          this.$swal.fire('Hapus berhasil!', 'data telah di hapus', 'success')
        }
      })
    },
    getKecamatanList(page, perPage, search) {
      return this.$api.Kecamatan.datatable(page, perPage, search)
    },
    doneAndRefresh() {
      this.createDialog = false
      this.KecamatanData = {}
      this.$refs.table.fetchItems()
    }
  }
  // created() {
  //   this.getKecamatanList()
  // }
}
</script>
