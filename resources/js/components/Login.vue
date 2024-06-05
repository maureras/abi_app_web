<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label for="email">Email</label>
          <input type="email" v-model="email">
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" v-model="password">
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async login() {
        try {
          await axios.post('/login', {
            email: this.email,
            password: this.password
          });
          // Redirigir o cambiar el estado de autenticación aquí
        } catch (error) {
          console.error('Login failed', error);
        }
      }
    }
  };
  </script>c