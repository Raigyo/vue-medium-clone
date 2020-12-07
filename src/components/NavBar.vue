<script>
export default {
  computed: {
    username() {
      return this.$store.getters["users/username"];
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("users/logoutUser");
    }
  }
};
</script>

<template>
  <nav class="navbar navbar-dark bg-inverse">
    <div class="container">
      <a class="navbar-brand" href="index.html">Medium Clone</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Home' }"
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" href="">
            <i class="ion-compose"></i>&nbsp;New Post
          </a>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Settings' }">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </router-link>
        </li>
        <!-- <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Login' }"
            >Sign In</router-link
          >
        </li> -->
        <li v-if="username" class="nav-item">
          <router-link class="nav-link" :to="`/@${username}`">
            {{ username }}
          </router-link>
        </li>
        <li v-else class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Login' }"
            >Sign In</router-link
          >
        </li>
        <!-- We are going to render the logout only when the user is logged -->
        <li v-if="username" class="nav-item" @click="logout">
          <router-link class="nav-link" to="/"> Log Out </router-link>
        </li>
        <li v-if="username == null" class="nav-item">
          <router-link class="nav-link" to="/register"> Register </router-link>
        </li>
      </ul>
    </div>
    <div class="feed-toggle">
      <ul class="nav nav-pills outline-active">
        <li class="nav-item">
          <!-- setFeed method is used to fetch the article feed based on the tabs option -->
          <a
            class="nav-link"
            v-if="username"
            @click="setFeed('user')"
            :class="{ active: activeFeed === 'user' }"
          >
            Your Feed
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            @click="setFeed('global')"
            :class="{ active: activeFeed === 'global' }"
          >
            Global Feed
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
