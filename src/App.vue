<script>
  import NavBar from "./components/NavBar.vue";
  import Footer from "./components/Footer.vue";
  export default {
  components : {
      NavBar,
      Footer
    }
  }
</script>

<template>
 <div>
     <NavBar />
     <router-view />
     <Footer />
  </div>
</template>