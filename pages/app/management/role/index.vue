<template>
  <div>
    <header-comp
      title="Data Role"
      description="Lihat dan tambah data role"
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
            label="Cari data role"
            v-model="search"
            outlined
            class="mt-7"
            max-width="250"
            dense
            rounded
          ></v-text-field>
        </div>
        <v-btn color="primary" rounded @click="createDialog = true"
          >Tambah Data Role</v-btn
        >
      </v-row>
      <v-col class="hidden-sm-and-up mx-1">
        <v-btn
          color="primary"
          block
          class="mb-2"
          rounded
          @click="createDialog = true"
          >Tambah Data Role</v-btn
        >
        <div>
          <v-text-field
            v-model="search"
            label="Cari data role"
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
        :items="roles"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn
            depressed
            color="secondary"
            small
            class="mr-2"
            @click="permissionItem(item)"
            >permission</v-btn
          >
          <v-btn
            depressed
            color="warning"
            small
            class="mr-2"
            @click="editItem(item)"
            >edit</v-btn
          >
          <!-- <v-btn depressed color="error" small @click="deleteItem(item)">hapus</v-btn> -->
        </template>
      </v-data-table>
      <v-dialog
        @click:outside="RoleData = {}"
        v-model="createDialog"
        max-width="800"
      >
        <v-card class="px-0 pb-5">
          <create-comp
            v-if="createDialog"
            :RoleData="RoleData"
            @done="doneAndRefresh"
          />
        </v-card>
      </v-dialog>
      <v-dialog
        @click:outside="RoleData = {}"
        v-model="permissionDialog"
        max-width="800"
      >
        <v-card class="px-0 pb-5">
          <permission-comp v-if="permissionDialog" :RoleData="RoleData" />
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>
<script>
import headerComp from '~/components/header'
import createComp from './create-comp'
import permissionComp from './permission-comp'
export default {
  components: { headerComp, createComp, permissionComp },
  data() {
    return {
      headers: [
        {
          text: 'Kode',
          value: 'code',
          sortable: false
        },
        {
          text: 'Role',
          value: 'name',
          sortable: false
        },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      roles: [],
      search: '',
      tableOptions: {},
      totalitems: 0,
      tableLoading: false,
      createDialog: false,
      permissionDialog: false,
      RoleData: {}
    }
  },
  watch: {
    tableOptions: {
      deep: true,
      handler() {
        this.getRoleList()
      }
    },
    search() {
      this.getRoleList()
    }
  },
  methods: {
    async permissionItem(item) {
      this.RoleData = item
      this.permissionDialog = true
    },
    async editItem(item) {
      this.RoleData = item
      this.createDialog = true
    },
    async deleteItem(item) {
      this.$deleteSwal().then(async (result) => {
        if (result.value) {
          await this.$api.Role.delete(item.id)
          this.getRoleList()
          this.$swal.fire('Hapus berhasil!', 'data telah di hapus', 'success')
        }
      })
    },
    async getRoleList() {
      this.tableLoading = true
      const response = await this.$api.Role.datatable(
        this.tableOptions.page,
        this.tableOptions.itemsPerPage,
        this.search
      )
      this.roles = response.data.rows
      this.totalitems = response.data.count
      this.tableLoading = false
    },
    doneAndRefresh() {
      this.createDialog = false
      this.RoleData = {}
      this.getRoleList()
    }
  },
  // created() {
  //   this.getRoleList()
  // }
}
</script>
