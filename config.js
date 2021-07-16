const config = {
  development: {
    gateway: null
  },
  local: {
    gateway: 'http://localhost:8080'
  },
  production: {
    gateway: null
  },
  color: {
    primary: '#00AA00',
    secondary: '#6861CE',
    // accent: colors.teal.accent4,
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
}
export default config
