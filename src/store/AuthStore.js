import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        showLogin: true,
        name: '',
        email: '',
        password: '',
    }),

    actions: {
        toggleForm() {
            this.showLogin = !this.showLogin;
        },

        login() {
            // Lógica de inicio de sesión
        },

        register() {
            // Lógica de registro
        },
    },
});
