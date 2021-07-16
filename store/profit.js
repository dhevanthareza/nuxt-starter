export const state = () => {
  return {
    profit: 0
  }
}
export const mutations = {
  setProfit(state, payload) {
    state.profit = payload
  }
}
export const actions = {
  async getProfit({ commit }) {
    const res = await this.$api.LabaRugi.all()
    commit('setProfit', res.data.labaBersih)
  }
}
