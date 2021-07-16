import BaseAPI from './base'

export default class Permission extends BaseAPI {
  datatable(page, limit, search = '') {
    return this.$axios.$get('/management/permission/datatable', {
      params: {
        limit,
        page,
        search
      }
    })
  }

  get(id) {
    return this.$axios.$get(`/management/permission/${id}`)
  }

  getAll() {
    return this.$axios.$get(`/management/permission/`)
  }

  getMenuPermission(menuId) {
    return this.$axios.$get(`management/menu/${menuId}/permission`)
  }

  create(payload) {
    return this.$axios.$post(`/management/permission/`, payload)
  }

  update(id, payload) {
    return this.$axios.$put(`/management/permission/${id}`, payload)
  }

  delete(id) {
    return this.$axios.delete(`/management/permission/${id}`)
  }
}
