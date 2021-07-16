import API from '~/api'
import config from '~/config'
const environment = process.env.NODE_ENV
export default function({ $axios, store }, inject) {
  const request = $axios.create({
    baseURL: config[environment].gateway
  })
  const errorHandler = (error) => {
    if (!error.response) {
      store.dispatch('alert/showMessage', {
        type: 'error',
        message: 'Tidak bisa terkoneksi dengan API'
      })
      throw new Error('Tidak bisa terkoneksi dengan API')
    }
    const errorMessage = error.response.data.message
    // if (error.response.status === 401) {
    //   localStorage.removeItem('token')
    //   localStorage.removeItem('user')
    //   window.location = '/auth'
    // }
    const alertMessage =
      error.response.data.code === 'VALIDATION_ERROR'
        ? error.response.data.data[0].msg
        : errorMessage
    store.dispatch('alert/showMessage', {
      type: 'error',
      message: alertMessage
    })
    throw new Error(errorMessage)
  }

  const successHandler = (response) => {
    return response
  }
  const requestHandler = (request) => {
    request.headers.Authorization = localStorage['auth._token.local']
    return request
  }
  request.interceptors.request.use((request) => requestHandler(request))
  request.interceptors.response.use(
    (response) => successHandler(response),
    (error) => errorHandler(error)
  )
  inject('api', new API(request))
  inject('axios', request)
}
