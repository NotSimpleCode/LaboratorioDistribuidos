import { defineStore } from 'pinia';
import UserService from '../services/UserService';
import LoginService from '../services/LoginService'
import ConnectionService from '../services/ConnectionService'
import router from '../router'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        showLogin: true,
        token: null,
        onlineUser: { nick: null, rol: null, foto: null },
        password: null,
    }),

    actions: {
        async updateOnlineUser() {
            const user = await ConnectionService.fetchByUserNickname(this.onlineUser.nick, this.token)
            this.onlineUser = {
                nick: user.nick_usuario,
                rol: user.roles.nombre_rol,
                foto: user.usuarios.foto_usuario
            };
            // localStorage.setItem('user', JSON.stringify(this.onlineUser))
        },
        setRegTime() {
            return new Date().toISOString();
        },
        toggleForm() {
            this.showLogin = !this.showLogin;
        },

        async login() {
            try {
                const response = await LoginService.login({ nombre_usuario: this.onlineUser.nick, password_usuario: this.password });
                if (response.status) {
                    this.token = response.token
                    await this.updateOnlineUser()
                    router.push({ name: 'information' });
                }
            } catch (error) {
                alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
            }
        },

        async existsNickname(userNickname) {
            const user = await ConnectionService.fetchValidationNickname(userNickname)
            return user.exists
        },

        async registerUser(newUser) {
            console.log("nuevo ", newUser);
            const response = await UserService.postRegisterUser(newUser)
            console.log("registrado ", response)
        },
        async registerConnection(connection) {
            console.log("nuevo conn", connection);
            const response = await ConnectionService.postRegisterConnection(connection, this.token)
            console.log("registrado conn ", response)

        }
    },
});
