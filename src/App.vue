<template>
  <div id="app"
  >
    <router-view />
  </div>
</template>

<script>
import Login33 from "./components/Login33.vue";
export default {
  components: { Login33 },
  name: "App",
};
</script>

<style lang="scss">
@import "./css/font/font.css";


.blog-name {
  font-family: "Apple Chancery", sans-serif;
  font-size: 100px;
  color: black;
  font-family: bt;
  
}
.router-link-active {
  text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #ecf0f3;
   margin: auto;
  height: auto;
   -webkit-box-flex:1;

-moz-box-flex:1;
  
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
