import axios from 'axios';

const state = {
  animes: [],
  selectedAnime: null,
};

const getters = {
  getAnimes: (state) => state.animes,
  getSelectedAnime: (state) => state.selectedAnime,
};

const mutations = {
  setAnimes(state, animes) {
    state.animes = animes;
  },
  setSelectedAnime(state, anime) {
    state.selectedAnime = anime;
  },
};
const actions = {
  async fetchAnimes({ commit }) {
    try {
      const response = await axios.get('http://localhost:5000/api/animes');
      commit('setAnimes', response.data);
    } catch (error) {
      console.error('Error fetching anime data:', error);
    }
  },
  toggleDetails({ commit, state }, anime) {
    const selectedAnime = state.selectedAnime === anime ? null : anime;
    commit('setSelectedAnime', selectedAnime);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
