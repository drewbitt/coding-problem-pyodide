<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/new">New</router-link>
    </div>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
@import "node_modules/bulmaswatch/pulse/variables";
@import "node_modules/bulma/sass/utilities/_all";
@import "node_modules/bulma/bulma.sass";
@import "node_modules/bulmaswatch/pulse/overrides";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
