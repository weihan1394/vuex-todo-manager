import axios from 'axios';

const state = {
  todos: [],
  count: 0,
};

const getters = {
  // eslint-disable-next-line no-shadow
  allTodos: state => state.todos,
};

const actions = {
  // wont call the mutation directly
  async fetchTodos({ commit }) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

    // pass response.data to mutations
    commit('setTodos', response.data);
  },
  async addTodo({ commit }, title) {
    const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
      title, completed: false,
    });

    // console.log(response);
    commit('newTodo', response.data);
  },
  async deleteToDo({ commit }, id) {
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    console.log(response);
    commit('removeTodo', id);
  },
  // eslint-disable-next-line no-unused-vars
  async filterTodos({ commit }, e) {
    // get selected number
    // eslint-disable-next-line radix
    const limit = parseInt(
      e.target.options[e.target.selectedIndex].innerText,
    );
    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
    console.log(response);
    commit('setTodos', response.data);
  },
  async updateTodo({ commit }, updateTodo) {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updateTodo.id}`, updateTodo);

    console.log(response.data);
    commit('updateTodo', response.data);
  },
};

const mutations = {
  // eslint-disable-next-line no-return-assign, no-shadow
  setTodos: (state, todos) => (state.todos = todos),
  // eslint-disable-next-line no-return-assign, no-shadow
  newTodo: (state, todo) => state.todos.unshift(todo),
  // eslint-disable-next-line no-return-assign, no-shadow
  removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
  // eslint-disable-next-line no-shadow
  updateTodo: (state, updateTodo) => {
    // search for the index of the todos
    const index = state.todos.findIndex(todo => todo.id === updateTodo.id);
    if (index !== -1) {
      // splice is to replace the todos
      state.todos.splice(index, 1, updateTodo);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
