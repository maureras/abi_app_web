<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div>
          <label for="name">Name</label>
          <input type="text" v-model="name">
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" v-model="email">
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" v-model="password">
        </div>
        <div>
          <label for="password_confirmation">Confirm Password</label>
          <input type="password" v-model="password_confirmation">
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      };
    },
    methods: {
      async register() {
        try {
          await axios.post('/register', {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation
          });
          // Redirigir o cambiar el estado de autenticación aquí
        } catch (error) {
          console.error('Registration failed', error);
        }
      }
    }
  };
  </script>