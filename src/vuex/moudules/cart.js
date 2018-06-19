const state = {
  stars: 0
}
const mutations = {
  add (state, data) {
    state.stars += data
  }
}
const actions = {
  asyncAdd ({commit}, data) {
    setTimeout(() => {
      commit('add', data.num)
    }, data.time)
  }
}

export default {
  state,
  mutations,
  actions
}
