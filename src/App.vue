<template>
  <!--
    
    <nav>
      <router-link to="/">Inicio</router-link> |
    <router-link to="/invoice">Factura</router-link>
  </nav>
    -->
  <router-view />
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #1a1b1c;
  min-height: 100vh;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #7c7c7c;
}

nav a.router-link-exact-active {
  color: #6a54a1;
}
</style>
