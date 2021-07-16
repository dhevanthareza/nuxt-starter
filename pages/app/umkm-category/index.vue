<template>
  <index-page
    title="Data Kategori Umkm"
    description="Lihat dan tambah data Kategori Umkm"
  >
    <default-table
      ref="table"
      title="Data Kategori Umkm"
      :headers="headers"
      :get-data="getUmkmCategoryList"
      @click-edit="editItem"
      @click-delete="deleteItem"
      @click-create="createDialog = true"
    />
    <v-dialog
      v-model="createDialog"
      max-width="800"
      @click:outside="UmkmCategoryData = {}"
    >
      <v-card class="px-0 pb-5">
        <create-comp
          v-if="createDialog"
          :umkm-category-data="UmkmCategoryData"
          @done="doneAndRefresh"
        />
      </v-card>
    </v-dialog>
  </index-page>
</template>
<script>
import createComp from './create-comp'
import DefaultTable from '~/components/common/DefaultTable.vue'
import IndexPage from '~/components/common/IndexPage.vue'
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
      UmkmCategoryData: {}
    }
  },
  created() {
    this.getUmkmCategoryList()
  },
  methods: {
    editItem(item) {
      this.UmkmCategoryData = { ...item }
      this.createDialog = true
    },
    deleteItem(item) {
      this.$deleteSwal().then(async (result) => {
        if (result.value) {
          await this.$api.UmkmCategory.delete(item.id)
          this.$refs.table.fetchItems()
          this.$swal.fire('Hapus berhasil!', 'data telah di hapus', 'success')
        }
      })
    },
    getUmkmCategoryList(page, perPage, search) {
      return this.$api.UmkmCategory.datatable(page, perPage, search)
    },
    doneAndRefresh() {
      this.createDialog = false
      this.UmkmCategoryData = {}
      this.$refs.table.fetchItems()
    }
  }
}
</script>
