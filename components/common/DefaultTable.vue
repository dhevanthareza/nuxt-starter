<template>
  <div>
    <v-row
      class="mx-1 hidden-xs-only"
      align="center"
      align-content="center"
      justify="space-between"
    >
      <div>
        <v-text-field
          v-model="search"
          :label="`Cari ${title}`"
          outlined
          class="mt-7"
          max-width="250"
          dense
          rounded
        ></v-text-field>
      </div>
      <v-btn color="primary" rounded @click="handleCreateButtonClick"
        >Tambah {{ title }}</v-btn
      >
    </v-row>
    <v-col class="hidden-sm-and-up mx-1">
      <v-btn
        color="primary"
        block
        class="mb-2"
        rounded
        @click="handleCreateButtonClick"
        >Tambah Data Kecamatan</v-btn
      >
      <div>
        <v-text-field
          v-model="search"
          :label="`Cari ${title}`"
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
      :items="items"
      :items-per-page="itemsPerPage"
      class="elevation-1"
    >
      <template #[`item.actions`]="{ item }">
        <v-btn
          depressed
          color="warning"
          small
          class="mr-2"
          @click="handleEditButtonClick(item)"
          >Edit</v-btn
        >
        <v-btn
          depressed
          color="error"
          small
          @click="handleDeleteButtonClick(item)"
          >Hapus</v-btn
        >
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    getData: {
      type: Function,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      items: [],
      search: '',
      tableOptions: {},
      totalitems: 0,
      tableLoading: false
    }
  },
  watch: {
    'tableOptions.page'() {
      this.fetchItems()
    },
    'tableOptions.itemsPerPage'() {
      this.fetchItems()
    },
    search() {
      this.fetchItems()
    }
  },
  methods: {
    handleCreateButtonClick() {
      this.$emit('click-create')
    },
    handleEditButtonClick(item) {
      this.$emit('click-edit', item)
    },
    handleDeleteButtonClick(item) {
      this.$emit('click-delete', item)
    },
    async fetchItems() {
      try {
        this.tableLoading = true
        const response = await this.getData(
          this.tableOptions.page,
          this.tableOptions.itemsPerPage,
          this.search
        )
        this.items = response.data.rows
        this.totalitems = response.data.count
        this.tableLoading = false
      } catch (err) {
        this.tableLoading = false
      }
    }
  }
}
</script>
