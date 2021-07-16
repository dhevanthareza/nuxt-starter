export const state = () => {
  return {
    statistic: [],
    count: 0,
    orderValue: 0
  }
}
export const mutations = {
  setStatistic(state, payload) {
    state.statistic = payload
  },
  setCount(state, payload) {
    state.count = payload
  },
  setOrderValue(state, payload) {
    state.orderValue = payload
  }
}
export const actions = {
  async getCount({ commit }) {
    const res = await this.$api.Order.count()
    commit('setCount', res.data)
  },
  async getStatitic({ commit }) {
    const res = await this.$api.Order.statistic()
    console.log(res.data)
    commit('setStatistic', res.data)
  },
  async getOrderValue({ commit }) {
    const res = await this.$api.Order.totalOrderValue()
    commit('setOrderValue', res.data)
  }
}
