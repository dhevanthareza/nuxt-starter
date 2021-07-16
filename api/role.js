import BaseAPI from './base'

export default class Role extends BaseAPI {
  datatable(page, limit, search = '') {
    return this.$axios.$get('/management/role/datatable', {
      params: {
        limit,
        page,
        search
      }
    })
  }

  get(id) {
    return this.$axios.$get(`/management/role/${id}`)
  }

  permission(id) {
    return this.$axios.$get(`/management/role/${id}/permission`)
  }

  addPermission(id, PermissionId, MenuId) {
    return this.$axios.$post(`/management/role/${id}/permission`, {
      PermissionId,
      MenuId
    })
  }

  deletePermission(id, permissionId) {
    return this.$axios.$delete(
      `/management/role/${id}/permission/${permissionId}`
    )
  }

  getAll() {
    return this.$axios.$get(`/management/role/`)
  }

  create(payload) {
    return this.$axios.$post(`/management/role/`, payload)
  }

  update(id, payload) {
    return this.$axios.$put(`/management/role/${id}`, payload)
  }

  delete(id) {
    return this.$axios.delete(`/management/role/${id}`)
  }
}
