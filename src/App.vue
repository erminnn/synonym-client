<template>
  <div class="container">
    <div>
      <Header />
    </div>
    <div class="content">
      <MainPage />
    </div>
    <div>
      <Footer />
    </div>
  </div>
</template>

<script>
import MainPage from "./components/MainPage.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    MainPage,
    Header,
    Footer,
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 100vh;
  background-color: #f7f7f7;
}
.content {
  flex-grow: 1;
  overflow: auto;
}
</style>
