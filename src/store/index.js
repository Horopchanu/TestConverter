import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    valutes: {},
    isShowed: false,
  },
  getters: {
    GET_VALUTES(state) {
      return state.valutes;
    },
    GET_ISSHOWED(state) {
      return state.isShowed;
    },
  },
  mutations: {
    SET_VALUTES(state, payload) {
      state.valutes = payload;
    },

    SET_ISSHOWED(state) {
      state.isShowed = true;
    },
  },
  actions: {
    async getValutesApi({ commit }) {
      return await axios
        .get("https://www.cbr-xml-daily.ru/daily_json.js")
        .then((response) => {
          commit("SET_VALUTES", response.data.Valute);

          commit("SET_ISSHOWED");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  modules: {},
});
