export default class AuthService {
  static check() {
    if (localStorage.auth) {
      return true
    } else {
      return false
    }
  }

  static logout() {
    localStorage.removeItem('auth')
    window.location.href = '/auth'
  }
}
