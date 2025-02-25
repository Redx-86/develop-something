<template>
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <h1>resim ekleyeceğim</h1>
        </router-link>
      </div>
  
      <div id="navbarBasicExample" :class="{'is-active': isActive}" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">Home</router-link>
          <router-link to="/about" class="navbar-item">About</router-link>
          <router-link to="/anime" class="navbar-item">Animeler</router-link>
          <router-link to="/admin" class="navbar-item">Admin</router-link>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isActive: false
      };
    }
  };
  </script>
  
  <style scoped>
  .navbar-item {
    font-weight: bold;
  }
  </style>
  