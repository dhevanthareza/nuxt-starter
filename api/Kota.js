import BaseAPI from './base'

export default class Kota extends BaseAPI {
  datatable(page, limit, search = '') {
    return this.$axios.$get('/management/kota/datatable', {
      params: {
        limit,
        page,
        search
      }
    })
  }

  get(id) {
    return this.$axios.$get(`/management/kota/${id}`)
  }

  getAll(provinsiId) {
    return this.$axios.$get(`/management/kota`, { params: { provinsiId } })
  }

  create(payload) {
    return this.$axios.$post(`/management/kota/`, payload)
  }

  update(id, payload) {
    return this.$axios.$put(`/management/kota/${id}`, payload)
  }

  delete(id) {
    return this.$axios.delete(`/management/kota/${id}`)
  }
}
