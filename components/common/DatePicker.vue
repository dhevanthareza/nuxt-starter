<template>
  <v-menu
    v-model="menu1"
    :close-on-content-click="false"
    max-width="290"
    offset-y
    transition="scale-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="formattedDate"
        readonly
        v-bind="{ ...attrs, ...$attrs }"
        v-on="on"
        @click:clear="date = null"
      ></v-text-field>
    </template>
    <v-date-picker
      no-title
      v-model="date"
      @change="menu1 = false"
    ></v-date-picker>
  </v-menu>
</template>
<script>
import dayjs from 'dayjs'

export default {
  props: ['value'],
  data: () => ({
    date: null,
    menu1: false,
    menu2: false
  }),
  watch: {
    date() {
      this.$emit('input', this.date)
    }
  },
  computed: {
    formattedDate() {
      return this.date ? this.formatDate(this.date) : ''
    }
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format('DD-MM-YYYY')
    }
  },
  created() {
    if (this.value !== null) {
      this.date = this.value
    }
  }
}
</script>
