import BaseAPI from './base'

export default class Kecamatan extends BaseAPI {
  datatable(page, limit, search = '') {
    return this.$axios.$get('/management/kecamatan/datatable', {
      params: {
        limit,
        page,
        search
      }
    })
  }

  get(id) {
    return this.$axios.$get(`/management/kecamatan/${id}`)
  }

  getAll(kotaId) {
    return this.$axios.$get(`/management/kecamatan`, { params: { kotaId } })
  }

  create(payload) {
    return this.$axios.$post(`/management/kecamatan/`, payload)
  }

  update(id, payload) {
    return this.$axios.$put(`/management/kecamatan/${id}`, payload)
  }

  delete(id) {
    return this.$axios.delete(`/management/kecamatan/${id}`)
  }
}
