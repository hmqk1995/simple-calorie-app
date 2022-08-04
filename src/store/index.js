import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

axios.defaults.baseURL = 'http://localhost:8080/api';
axios.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('access_token');
    if (token)
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const store = new Vuex.Store({
  state: {
    username: '',
    access_token: '',
    foodEntries: [],
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    setAccessToken(state, token) {
      state.access_token = token;
    }
  },
  actions: {
    async login({ commit }, username) {
      const { data } = await axios.post(`/users/${username}/auth`);
      sessionStorage.setItem('access_token', data);
      commit('setUsername', username);
      commit('setAccessToken', data);
    },
    async addFoodEntry(context, {
      name,
      date,
      calories,
      price,
    }) {
      await axios.post('/food-enrties', {
        name,
        date,
        calories,
        price,
      });
    }
  },
});

export default store;