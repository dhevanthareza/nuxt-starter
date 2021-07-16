<template>
  <div>
    <header-comp
      title="Data User"
      description="Lihat dan tambah data user"
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
            label="Cari data user"
            v-model="search"
            outlined
            class="mt-7"
            max-width="250"
            dense
            rounded
          ></v-text-field>
        </div>
        <v-btn color="primary" rounded @click="createDialog = true"
          >Tambah Data User</v-btn
        >
      </v-row>
      <v-col class="hidden-sm-and-up mx-1">
        <v-btn
          color="primary"
          block
          class="mb-2"
          rounded
          @click="createDialog = true"
          >Tambah Data user</v-btn
        >
        <div>
          <v-text-field
            v-model="search"
            label="Cari data user"
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
        :items="users"
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
        @click:outside="userData = {}"
      >
        <v-card class="px-0 pb-5">
          <create-comp
            v-if="createDialog"
            :user-data="userData"
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
export default {
  components: { headerComp, createComp },
  data() {
    return {
      headers: [
        {
          text: 'Nama Lengkap',
          value: 'fullname',
          sortable: false
        },
        { text: 'Email', value: 'email', sortable: false },
        { text: 'Username', value: 'username', sortable: false },
        { text: 'Role', value: 'Role.name', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      users: [],
      search: '',
      tableOptions: {},
      totalitems: 0,
      tableLoading: false,
      createDialog: false,
      userData: {}
    }
  },
  watch: {
    tableOptions: {
      deep: true,
      handler() {
        this.getUserList()
      }
    },
    search() {
      this.getUserList()
    }
  },
  methods: {
    async editItem(item) {
      this.userData = item
      this.createDialog = true
    },
    async deleteItem(item) {
      this.$deleteSwal().then(async (result) => {
        if (result.value) {
          await this.$api.User.delete(item.id)
          this.getUserList()
          this.$swal.fire('Hapus berhasil!', 'data telah di hapus', 'success')
        }
      })
    },
    async getUserList() {
      this.tableLoading = true
      const response = await this.$api.User.datatable(
        this.tableOptions.page,
        this.tableOptions.itemsPerPage,
        this.search
      )
      this.users = response.data.rows
      this.totalitems = response.data.count
      this.tableLoading = false
    },
    doneAndRefresh() {
      this.createDialog = false
      this.userData = {}
      this.getUserList()
    }
  },
  created() {
    this.getUserList()
  }
}
</script>
