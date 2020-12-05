import { api, setToken, clearToken } from "../api";
export default {
  namespaced: true,
  state: {
    user: null, // object to contain the user information
    profile: null // object to contain the information of other users’ profiles
  },
  getters: {
    username(state) {
      return (state.user && state.user.username) || null;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    // action which has all the login configurations
    loginUser: async function({ commit }, { email, password }) {
      clearToken();
      try {
        const response = await api.post("/users/login", {
          user: {
            email,
            password
          }
        });
        if (response.data.user) {
          setToken(response.data.user.token);
          commit("setUser", response.data.user); // mutation function
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    // action to render out the logged-in users’ username
    getUser: async function({ commit }) {
      const user = await api.get("/user");
      commit("setUser", user);
    },
    logoutUser: async function({ commit }) {
      clearToken();
      commit("setUser", null);
    }
  }
}