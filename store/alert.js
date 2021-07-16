const alert = {
  state: () => {
    return {
      show: false,
      message: '',
      type: 'success'
    }
  },
  mutations: {
    showMessage(state, payload) {
      state.show = true
      state.message = payload.message
      state.type = payload.type
    },
    hideMessage(state) {
      state.show = false
      // state.message = ''
      // state.type = 'success'
    }
  },
  actions: {
    showMessage({ commit }, payload) {
      commit('showMessage', payload)
      setTimeout(function() {
        commit('hideMessage')
      }, 2000)
    }
  }
}
export default alert
