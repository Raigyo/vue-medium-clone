import { api } from "../api";
export default {
  namespaced: true,
  state: {
    feed: [], // hold all the article data
    count: 0 // hold the number of articles
  },
  mutations: {
    // commit:  sets the article feed data and count to the states
    setArticles(state, { articles, articlesCount }) {
      state.feed = articles;
      state.count = articlesCount;
    }
  },
  actions: {
    // dispatch:
    // action 1: fetches the global article list data using axios get
    // request and sets it to the feed state using the setArticles mutation
    async getGlobalFeed({ commit }, payload = { page: 1 }) {
      let route = "/articles";
      if (payload) {
        const {
          tag = null,
          author = null,
          favourited = null,
          page = 1
        } = payload;
        route += tag ? `?tag=${tag}&` : "";
        route += author ? `?author=${author}&` : "";
        route += favourited ? `?favourited=${favourited}&` : "";
        route += page ? `?offset=${(page - 1) * 10}&limit=10` : "";
      }
      const response = await api.get(route);
      commit("setArticles", response.data);
    },
    // action 2:
    async getUserFeed({ commit }, payload = { page: 1 }) {
      let route = "/articles/feed";
      if (payload) {
        const { page = 1 } = payload;
        route += page ? `?offset=${(page - 1) * 10}&limit=10` : "";
      }
      const response = await api.get(route);
      commit("setArticles", response.data);
    }
  }
};
