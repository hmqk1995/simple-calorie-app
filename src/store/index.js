import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { TabMenuItem } from '@/const/index';

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
    role: '',
    access_token: '',
    foodEntries: [],
    adminFoodEntries: [],
    dailyThreshold: 2100,
    monthlySpendingLimit: 1000,
    daysAndCaloriesMeetGoal: [],
    monthsExceedingSpendingLimit: [],
    currTab: TabMenuItem.FoodEntries,
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    setRole(state, role) {
      state.role = role;
    },
    setAccessToken(state, token) {
      state.access_token = token;
    },
    setFoodEntries(state, entries) {
      state.foodEntries = entries;
    },
    setAdminFoodEntries(state, entries) {
      state.adminFoodEntries = entries;
    },
    setDaysAndCaloriesMeetGoal(state, daysAndCalories) {
      state.daysAndCaloriesMeetGoal = daysAndCalories;
    },
    setMonthsExceedingSpendingLimit(state, data) {
      state.monthsExceedingSpendingLimit = data;
    },
    setMonthlySpendingLimit(state, limit) {
      state.monthlySpendingLimit = limit;
    },
    setDailyThreshold(state, calorieThreshold) {
      state.dailyThreshold = calorieThreshold;
    },
    setCurrTab(state, tab) {
      state.currTab = tab;
    }
  },
  actions: {
    async setUserInfo({ commit }, {
      _username,
      access_token,
    }) {
      sessionStorage.setItem('username', _username);
      sessionStorage.setItem('access_token', access_token);
      try {
        const {
          username,
          role,
          calorieThreshold,
        } = (await axios.get(`/users/${_username}`)).data;
        commit('setUsername', username);
        commit('setRole', role);
        commit('setAccessToken', access_token);
        commit('setDailyThreshold', calorieThreshold);
        return true;
      } catch(error) {
        return false;
      }
    },
    async validateToken({ dispatch }, {
      username,
      access_token,
    }) {
      if (!username || !access_token) {
        return false;
      }
      return await dispatch('setUserInfo', {
        _username: username,
        access_token
      });
    },
    async login({ dispatch }, {
      username,
      access_secret,
    }) {
      const { data } = await axios.post(`/users/${username}/auth`, {
        access_secret,
      });
      await dispatch('setUserInfo', {
        _username: username,
        access_token: data,
      });
      await dispatch('getFoodEntries');
    },
    async addFoodEntry(context, {
      name,
      date,
      calories,
      price,
      username,
    }) {
      const body = {
        name,
        date,
        calories,
        price,
      }
      if (username) body.username = username;
      await axios.post('/food-enrties', body);
    },
    async getFoodEntries({ commit }) {
      const { data } = await axios.get('/food-enrties');
      commit('setFoodEntries', data);
    },
    async getFoodEntriesForAll({ commit }) {
      const { data } = await axios.get('/food-enrties/all');
      commit('setAdminFoodEntries', data);
    },
    async getDatesMeetThreshold({ state, commit }) {
      const { data } = await axios.get(`/report/thresholds/${state.dailyThreshold}`);
      commit('setDaysAndCaloriesMeetGoal', data);
    },
    async getMonthsMeetSpendingLimit({ state, commit }) {
      const { data } = await axios.get(`/report/spending-limit/${state.monthlySpendingLimit}`);
      commit('setMonthsExceedingSpendingLimit', data);
    },
    async updateFoodEntry(context, { _id, form }) {
      await axios.post(`/food-enrties/${_id}`, {
        form,
      });
    },
    async deleteFoodEntry(context, {_id}) {
      await axios.delete(`/food-enrties/${_id}`);
    },
    async getWeekEntryReport() {
      return await axios.get('/report/entries');
    },
    async getUserAvgCaloriesReport() {
      return await axios.get('/report/users/calories/avg');
    }
  },
});

export default store;