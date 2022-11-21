import Vuex from 'vuex';
import Vue from 'vue';
// eslint-disable-next-line import/extensions
import todos from './modules/todos.js';

// load vuex
Vue.use(Vuex);

// create store
export default new Vuex.Store({
  modules: {
    todos,
  },
});
