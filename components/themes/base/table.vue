<template>
  <div class="table-responsive">
    <v-data-table
      :items="isian"
      :headers="fields"
    >
      <template v-slot:item.test1="{ item }">
        <v-simple-checkbox v-model="item.test1" disabled></v-simple-checkbox>
      </template>
      <template v-slot:item.actions="row">
      <v-btn-toggle v-model="toggle_exclusive">
        <v-btn color="primary" x-small>
          action
        </v-btn>
        <v-btn color="secondary" x-small @click="info(row.item, row.index, $event.target)">
          action
        </v-btn>
        <v-btn color="default" x-small @click="info(row.item, row.index, $event.target)">
          action
        </v-btn>
      </v-btn-toggle>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isian: [
        { test1: true, test2: 40, test3: 'testing 1' },
        { test1: true, test2: 23, test3: 'testing 1' },
        { test1: true, test2: 23, test3: 'testing 1' },
        { test1: false, test2: 43, test3: 'testing 1' },
        { test1: true, test2: 22, test3: 'testing 1' }
      ],
      fields: [
        { value: 'test3', text: 'Full name' },
        { value: 'test2', text: 'Quantity', class: 'text-center' },
        {
          value: 'test1',
          text: 'Status'
        },
        { value: 'actions', text: 'Actions' }
      ]
    }
  }
}
</script>
