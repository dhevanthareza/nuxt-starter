import BaseAPI from './base'

export default class Kelurahan extends BaseAPI {
  datatable(page, limit, search = '') {
    return this.$axios.$get('/management/kelurahan/datatable', {
      params: {
        limit,
        page,
        search
      }
    })
  }

  get(id) {
    return this.$axios.$get(`/management/kelurahan/${id}`)
  }

  getAll(kecamatanId) {
    return this.$axios.$get(`/management/kelurahan/`, {
      params: { kecamatanId }
    })
  }

  create(payload) {
    return this.$axios.$post(`/management/kelurahan/`, payload)
  }

  update(id, payload) {
    return this.$axios.$put(`/management/kelurahan/${id}`, payload)
  }

  delete(id) {
    return this.$axios.delete(`/management/kelurahan/${id}`)
  }
}
