import BaseAPI from './base'

export default class User extends BaseAPI {
  datatable(page, limit, search = '') {
    return this.$axios.$get('/management/user/datatable', {
      params: {
        limit,
        page,
        search
      }
    })
  }

  get(id) {
    return this.$axios.get(`/management/user/${id}`)
  }

  task(userId, page, limit, search = '') {
    return this.$axios.$get(`/management/user/${userId}/task`, {
      params: {
        limit,
        page,
        search
      }
    })
  }

  getAll() {
    return this.$axios.get(`/management/user/`)
  }

  create(payload) {
    return this.$axios.post(`/management/user/`, payload)
  }

  update(id, payload) {
    return this.$axios.put(`/management/user/${id}`, payload)
  }

  delete(id) {
    return this.$axios.delete(`/management/user/${id}`)
  }
}
