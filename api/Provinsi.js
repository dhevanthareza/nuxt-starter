import BaseAPI from './base'

export default class Provinsi extends BaseAPI {
  datatable(page, limit, search = '') {
    return this.$axios.$get('/management/provinsi/datatable', {
      params: {
        limit,
        page,
        search
      }
    })
  }

  get(id) {
    return this.$axios.$get(`/management/provinsi/${id}`)
  }

  getAll() {
    return this.$axios.$get(`/management/provinsi/`)
  }

  create(payload) {
    return this.$axios.$post(`/management/provinsi/`, payload)
  }

  update(id, payload) {
    return this.$axios.$put(`/management/provinsi/${id}`, payload)
  }

  delete(id) {
    return this.$axios.delete(`/management/provinsi/${id}`)
  }
}
