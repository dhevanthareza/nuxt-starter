import BaseAPI from './base'

export default class UmkmCategory extends BaseAPI {
  datatable(page, limit, search = '') {
    return this.$axios.$get('/umkm-category/datatable', {
      params: {
        limit,
        page,
        search
      }
    })
  }

  get(id) {
    return this.$axios.$get(`/umkm-category/${id}`)
  }

  getAll() {
    return this.$axios.$get(`/umkm-category/`)
  }

  create(payload) {
    return this.$axios.$post(`/umkm-category/`, payload)
  }

  update(id, payload) {
    return this.$axios.$put(`/umkm-category/${id}`, payload)
  }

  delete(id) {
    return this.$axios.delete(`/umkm-category/${id}`)
  }
}
