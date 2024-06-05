import { createApp } from 'vue';
import axios from 'axios';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
axios.defaults.baseURL = 'http://tu-dominio.com/api';

const app = createApp({
  data() {
    return {
      authenticated: false
    };
  },
  methods: {
    checkAuth() {
      axios.get('/user')
        .then(response => {
          this.authenticated = !!response.data;
        })
        .catch(() => {
          this.authenticated = false;
        });
    }
  },
  created() {
    this.checkAuth();
  }
});

app.component('login', Login);
app.component('register', Register);
app.mount('#app');