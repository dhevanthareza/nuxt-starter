import BaseAPI from './base'

export default class Menu extends BaseAPI {
  datatable(page, limit, search = '') {
    return this.$axios.$get('/management/menu/datatable', {
      params: {
        limit,
        page,
        search
      }
    })
  }

  get(id) {
    return this.$axios.$get(`/management/menu/${id}`)
  }

  getAll() {
    return this.$axios.$get(`/management/menu/`)
  }

  myMenu() {
    return this.$axios.$get(`/management/menu/mine`)
  }

  parentList() {
    return this.$axios.$get(`/management/menu/parent`)
  }

  create(payload) {
    return this.$axios.$post(`/management/menu/`, payload)
  }

  update(id, payload) {
    return this.$axios.$put(`/management/menu/${id}`, payload)
  }

  delete(id) {
    return this.$axios.delete(`/management/menu/${id}`)
  }
}
