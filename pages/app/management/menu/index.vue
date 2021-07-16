<template>
  <div>
    <header-comp
      title="Data Menu"
      description="Lihat dan tambah data Menu"
    ></header-comp>
    <v-card shaped class="mx-5 pa-5 upper-margin">
      <v-row
        class="mx-1 hidden-xs-only"
        align="center"
        align-content="center"
        justify="space-between"
      >
        <div>
          <v-text-field
            v-model="search"
            label="Cari data Menu"
            outlined
            class="mt-7"
            max-width="250"
            dense
            rounded
          ></v-text-field>
        </div>
        <add-btn color="primary" rounded @click="createDialog = true">
          Tambah Data Menu
        </add-btn>
      </v-row>
      <v-col class="hidden-sm-and-up mx-1">
        <v-btn
          color="primary"
          block
          class="mb-2"
          rounded
          @click="createDialog = true"
          >Tambah Data Menu</v-btn
        >
        <div>
          <v-text-field
            v-model="search"
            label="Cari data Menu"
            outlined
            max-width="250"
            dense
            rounded
          ></v-text-field>
        </div>
      </v-col>
      <v-data-table
        :options.sync="tableOptions"
        :server-items-length="totalitems"
        :headers="headers"
        :loading="tableLoading"
        :items="MenuList"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn
            depressed
            color="warning"
            small
            class="mr-2"
            @click="editItem(item)"
            >edit</v-btn
          >
          <v-btn depressed color="error" small @click="deleteItem(item)"
            >hapus</v-btn
          >
        </template>
      </v-data-table>
      <v-dialog
        v-model="createDialog"
        max-width="800"
        @click:outside="MenuData = {}"
      >
        <v-card class="px-0 pb-5">
          <create-comp
            v-if="createDialog"
            :menu-data="MenuData"
            @done="doneAndRefresh"
          />
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>
<script>
import createComp from './create-comp'
import headerComp from '~/components/header'
import AddBtn from '~/components/common/AddBtn'
export default {
  components: { headerComp, createComp, AddBtn },
  data() {
    return {
      headers: [
        {
          text: 'Kode',
          value: 'code',
          sortable: false
        },
        {
          text: 'Nama',
          value: 'name',
          sortable: false
        },
        {
          text: 'Path',
          value: 'path',
          sortable: false
        },
        {
          text: 'Order',
          value: 'order',
          sortable: false
        },
        {
          text: 'Parent Menu',
          value: 'Parent.name',
          sortable: false
        },
        {
          text: 'Deskripsi',
          value: 'description',
          sortable: false
        },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      MenuList: [],
      search: '',
      tableOptions: {},
      totalitems: 0,
      tableLoading: false,
      createDialog: false,
      MenuData: {}
    }
  },
  watch: {
    tableOptions: {
      deep: true,
      handler() {
        this.getMenuList()
      }
    },
    search() {
      this.getMenuList()
    }
  },
  methods: {
    editItem(item) {
      this.MenuData = item
      this.createDialog = true
    },
    deleteItem(item) {
      this.$deleteSwal().then(async (result) => {
        if (result.value) {
          await this.$api.Menu.delete(item.id)
          this.getMenuList()
          this.$swal.fire('Hapus berhasil!', 'data telah di hapus', 'success')
        }
      })
    },
    async getMenuList() {
      this.tableLoading = true
      const response = await this.$api.Menu.datatable(
        this.tableOptions.page,
        this.tableOptions.itemsPerPage,
        this.search
      )
      this.MenuList = response.data.rows
      this.totalitems = response.data.count
      this.tableLoading = false
    },
    doneAndRefresh() {
      this.createDialog = false
      this.MenuData = {}
      this.getMenuList()
    }
  },
  // created() {
  //   this.getMenuList()
  // }
}
</script>
