import BaseAPI from './base'

export default class ModuleName extends BaseAPI {
  datatable(page, limit, search = '') {
    return this.$axios.$get('/api-url/datatable', {
      params: {
        limit,
        page,
        search
      }
    })
  }

  get(id) {
    return this.$axios.$get(`/api-url/${id}`)
  }

  getAll() {
    return this.$axios.$get(`/api-url/`)
  }

  create(payload) {
    return this.$axios.$post(`/api-url/`, payload)
  }

  update(id, payload) {
    return this.$axios.$put(`/api-url/${id}`, payload)
  }

  delete(id) {
    return this.$axios.delete(`/api-url/${id}`)
  }
}
