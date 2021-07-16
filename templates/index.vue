<template>
  <index-page
    title="Data titleName"
    description="Lihat dan tambah data titleName"
  >
    <default-table
      ref="table"
      title="Data titleName"
      :headers="headers"
      :get-data="getModuleNameList"
      @click-edit="editItem"
      @click-delete="deleteItem"
      @click-create="createDialog = true"
    />
    <v-dialog
      v-model="createDialog"
      @click:outside="ModuleNameData = {}"
      max-width="800"
    >
      <v-card class="px-0 pb-5">
        <create-comp
          v-if="createDialog"
          :ModuleNameData="ModuleNameData"
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
      ModuleNameData: {}
    }
  },
  methods: {
    editItem(item) {
      this.ModuleNameData = { ...item }
      this.createDialog = true
    },
    deleteItem(item) {
      this.$deleteSwal().then(async (result) => {
        if (result.value) {
          await this.$api.ModuleName.delete(item.id)
          this.$refs.table.fetchItems()
          this.$swal.fire('Hapus berhasil!', 'data telah di hapus', 'success')
        }
      })
    },
    getModuleNameList(page, perPage, search) {
      return this.$api.ModuleName.datatable(page, perPage, search)
    },
    doneAndRefresh() {
      this.createDialog = false
      this.ModuleNameData = {}
      this.$refs.table.fetchItems()
    }
  },
  created() {
    this.getModuleNameList()
  }
}
</script>
