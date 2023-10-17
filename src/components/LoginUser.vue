<template>
    <div class="container">
        <div class="form">
            <h1>Iniciar sesión</h1>
            <input type="email" v-model="email" placeholder="Nombre de usuario">
            <div class="password-container"><input class="password-input" :type="isPasswordVisible ? 'text' : 'password'"
                    v-model="password" placeholder="Contraseña"><i
                    :class="isPasswordVisible ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'" @click="showPassword"></i></div>
            <input class="login-btn" type="button" @click="login" value="Iniciar sesión">
            <p>¿No tienes una cuenta? <a @click="authStore.toggleForm()">Regístrate</a></p>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../store/AuthStore';

const authStore = useAuthStore()
const email = ref('');
const password = ref('');
const isPasswordVisible = ref(false)

const showPassword = () => {
    isPasswordVisible.value = !isPasswordVisible.value
}

const login = () => {
    // to do
};

</script>
  
<style scoped>
h1 {
    font-size: 1.5rem;
}

.form {
    background: rgba(255, 255, 255, 0.2);
    padding: 20px;
    border-radius: 5px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    width: 400px;
    height: 65%;
    text-align: center;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    right: 120px;
}

input {
    color: var(--secondary-color);
    font-size: larger;
    font-weight: 500;
    display: block;
    margin: 10px auto;
    width: 80%;
    padding: 5px;
    border-style: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    background-color: transparent;
}

input:focus:not(.login-btn) {
    outline: none;
    border-bottom: 2px solid rgba(255, 255, 255, 1);
}

input::placeholder {
    color: rgba(255, 255, 255, 0.6);
    font-style: italic;
}

.password-input {
    display: inline-block;
    margin: 0px;
}

.password-container {
    position: relative;
    box-sizing: content-box;
}

div>i {
    color: var(--primary-color);
    position: absolute;
    right: 40px;
    bottom: 8px;
    cursor: pointer;
    border-radius: 50%;
}

.login-btn {
    display: block;
    margin: 10px auto;
    padding: 10px 20px;
    background: var(--third-color);
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}


.login-btn:hover {
    background: #0073e6;

}

a {
    color: var(--primary-color);
    text-decoration: underline;
    cursor: pointer;
}

a:hover {
    color: var(--secondary-color);
}
</style>
  