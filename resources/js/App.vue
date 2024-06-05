<template>
    <div>
      <h1>Hello, Vite with Vue!</h1>
      <login></login>
      <register></register>
    </div>
  </template>
  
  <script>
  import Login from './components/Login.vue';
  import Register from './components/Register.vue';
  
  export default {
    components: {
      Login,
      Register,
    },
  };
  </script>