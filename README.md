# Proyecto PEA Laravel - Vue
## Instalación del software

- Creamos el proyecto en laravel con el nombre de autenticar
```ms-dos
composer create-project --prefer-dist laravel/laravel autentificar
```

- Instalar Laravel Breeze - configurar la autenticación
```ms-dos
composer require laravel/breeze --dev
```

- Configurar la autenticación en tu aplicación de Laravel
```ms-dos
php artisan breeze:install
```
- [+] blade
- [+] dark support mode (No)
- [+] PHPUnit

-Se instala node.js
```ms-dos
npm install
```

- Instala la versión más reciente de Vue.js
```ms-dos
npm install vue@latest
```

- Instala Vite en el proyecto
```msd-dos
npm install vite
```

- Instalar el plugin oficial de Vue para Vite en el proyecto
```msd-dos
npm install @vitejs/plugin-vue
```
## Configuraciones
### Base de datos

Configura tu archivo .env para que se conecte a la base de datos autenticar
```ms-dos
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=autenticar
DB_USERNAME=root
DB_PASSWORD=
```

- Crea un nuevo archivo de migración para gestionar la creación de una tabla llamada user
```ms-dos
php artisan make:migration create_users_table
```

- Agregamos la función en el archivo de migración:
```php
public function up()
{
    Schema::create('users', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('email')->unique();
        $table->timestamp('email_verified_at')->nullable();
        $table->string('password');
        $table->rememberToken();
        $table->timestamps();
    });
}
```

- Ejecutamos el comando de migración
```ms-dos
php artisan migrate
```

- Configurar Vite
	En el archivo de la raíz, vite.config.js, escribir el siguiente código:	
```js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './resources/js'),
    },
  },
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    },
  },
});
```

- Actualiza tu package.json para incluir scripts para Vite:
```js
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  }
}
```

- Actualizar el archivo app.js en resources/js - agregamos el siguiente codigo
```js
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```

- Crea un archivo App.vue en resources/js:
```js
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
```

- Configurar Blade para Incluir los Archivos de Vite - Editar resources/views/welcome.blade.php

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vite with Vue</title>
    @vite('resources/js/app.js')
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

Configurar Blade para Incluir los Archivos de Vite - Editar resources/views/dashboard.blade.php
```html
<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    {{ __("You're logged in!") }}
                    
                    <!-- Botón de logout con estilos -->
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf <!-- Agrega el token CSRF -->
                        <button type="submit" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
                            Logout
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
```

- Crear componentes de Vue.js en resources/js/components
	- Login.vue
```php
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
</script>
```

- Register.vue

```php
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
```

### Integrar Frontend y Backend

- Configurar Axios para comunicarse con las rutas de autenticación resources/js/app.js

```js
import { createApp } from 'vue';
import axios from 'axios';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

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
```


### Iniciar aplicacion

- Para iniciar el servidor Frontend Vue.js
```ms-dos
npm run dev
```

- Iniciar un servidor web de desarrollo
```ms-dos
php artisan serve
```

### Rutas
Registro:
```link
http://localhost:8000/register
```

![[Pasted image 20240605163930.png]]

Login:
```link
http://localhost:8000/login
```

![[Pasted image 20240605164011.png]]

Profile:
```link
http://localhost:8000/profile
```
![[Pasted image 20240605164104.png]]

