import { defineStore } from 'pinia';
import UserService from '../services/UserService';
import LoginService from '../services/LoginService'
import ConnectionService from '../services/ConnectionService'
import router from '../router'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        showLogin: true,
        token: null,
        nickname: null,
        password: null
    }),

    actions: {
        setRegTime() {
            return new Date().toISOString();
        },
        toggleForm() {
            this.showLogin = !this.showLogin;
        },

        async login() {
            try {
                const response = await LoginService.login({ nombre_usuario: this.nickname, password_usuario: this.password });
                if (response.status) {
                    console.log(response.token);
                    this.token = response.token;
                    router.push({ name: 'information' });
                } else {
                    this.token = null;
                }
            } catch (error) {
                alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
            }
        },


        async registerUser(newUser) {
            const response = await UserService.postData(newUser)
            const data = await response.json()
        },
        async registerConnection(connection) {
            const response = await ConnectionService.postData(connection)
            const data = await response.json()
        }
    },
});
