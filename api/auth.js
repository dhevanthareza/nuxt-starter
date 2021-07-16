import BaseAPI from './base'

export default class Auth extends BaseAPI {
  async login(payload) {
    const auth = await this.$axios.$post(`/auth/login`, payload)
    localStorage.auth = auth.data.token
    return auth
  }
}
