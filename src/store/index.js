import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    valutes: {},
  },
  getters: {
    GET_VALUTES(state) {
      return state.valutes;
    },

  },
  mutations: {
    SET_VALUTES(state, payload) {
      state.valutes = payload;
    },

  },
  actions: {
    async getValutesApi({ commit }) {
      return await axios
        .get("https://www.cbr-xml-daily.ru/daily_json.js")
        .then((response) => {
          commit("SET_VALUTES", response.data.Valute);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  modules: {},
});
