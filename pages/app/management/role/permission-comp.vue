<template>
  <div>
    <header-comp title="Tambah Permission"></header-comp>
    <v-container>
      <v-form ref="formMenu">
        <v-row class="px-5">
          <v-col cols="12" sm="6">
            <v-autocomplete
              v-model="currentMenuId"
              :items="menus"
              item-text="name"
              item-value="id"
              outlined
              label="Pilih Menu"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="6">
            <v-autocomplete
              v-model="PermissionId"
              :items="permissions"
              item-text="name"
              item-value="id"
              outlined
              label="Pilih Items"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row class="px-5" justify="end">
          <v-btn :loading="loading" @click="create" color="primary" rounded
            >Simpan</v-btn
          >
        </v-row>
      </v-form>
      <v-row>
        <div>
          <v-text-field
            class="ml-3"
            dense
            label="Cari Data"
            v-model="search"
            outlined
            rounded
          ></v-text-field>
        </div>
      </v-row>
      <v-data-table
        :search="search"
        :headers="headers"
        :loading="tableLoading"
        :items="rolePermissions"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn depressed color="error" small @click="deleteItem(item)"
            >hapus</v-btn
          >
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>
<script>
import headerComp from '~/components/header'
export default {
  props: ['RoleData'],
  components: {
    headerComp
  },
  data() {
    return {
      loading: false,
      rules: {
        required: (value) => !!value || 'Wajib diisi.'
      },
      headers: [
        {
          text: 'Menu',
          value: 'Menu.name',
          sortable: false
        },
        {
          text: 'Permission',
          value: 'name',
          sortable: false
        },
        {
          text: 'Deskripsi',
          value: 'description',
          sortable: false
        },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      menus: [],
      permissions: [],
      rolePermissions: [],
      tableLoading: false,
      currentMenuId: null,
      PermissionId: null,
      search: ''
    }
  },
  watch: {
    currentMenuId() {
      this.getPermissionList()
    }
  },
  methods: {
    async create() {
      try {
        this.loading = true
        await this.$api.Role.addPermission(
          this.RoleData.id,
          this.PermissionId,
          this.currentMenuId
        )
        this.loading = false
        this.currentMenuId = null
        this.PermissionId = null
        this.getRolePermission()
      } catch (err) {
        console.log(err)
        this.loading = false
      }
    },
    deleteItem(item) {
      console.log(item)
      this.$deleteSwal().then(async (result) => {
        if (result.value) {
          await this.$api.Role.deletePermission(this.RoleData.id, item.id)
          this.getRolePermission()
          this.$swal.fire('Hapus berhasil!', 'data telah di hapus', 'success')
        }
      })
    },
    async getPermissionList() {
      const result = await this.$api.Permission.getMenuPermission(
        this.currentMenuId
      )
      this.permissions = result.data
      this.permissions.unshift({ id: 0, name: 'Semua' })
    },
    async getMenuList() {
      const menu = await this.$api.Menu.getAll()
      this.menus = menu.data
    },
    async getRolePermission() {
      const permissions = await this.$api.Role.permission(this.RoleData.id)
      this.rolePermissions = permissions.data.Permission
    }
  },
  created() {
    this.getMenuList()
    this.getRolePermission()
  }
}
</script>
