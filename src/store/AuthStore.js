import { defineStore } from 'pinia';
import UserService from '../services/UserService';
import LoginService from '../services/LoginService'
import ConnectionService from '../services/ConnectionService'
import router from '../router'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        showLogin: true,
        onlineUser: { nick: null, rol: null, foto: null, token: null },
        password: null,
    }),

    actions: {
        async updateOnlineUser(nickname, token) {
            const user = await ConnectionService.fetchByUserNickname(nickname, token)
            this.onlineUser = {
                nick: user.nick_usuario,
                rol: user.roles.nombre_rol,
                foto: user.usuarios.foto_usuario,
                token: token
            }
        },

        toggleForm() {
            this.showLogin = !this.showLogin;
        },

        async login() {
            try {
                const response = await LoginService.login({ nombre_usuario: this.onlineUser.nick, password_usuario: this.password });
                if (response.status) {
                    await this.updateOnlineUser(this.onlineUser.nick, response.token)
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
            const response = await ConnectionService.postRegisterConnection(connection, this.onlineUser.token)
            console.log("registrado conn ", response)

        },
        logout() {
            this.onlineUser = { nick: null, rol: null, foto: null, token: null }
            this.password = null
        },
        async reloadOnlineUser() {
            await this.updateOnlineUser(this.onlineUser.nick, this.onlineUser.token)
        }
    },
    persist: {
        storage: sessionStorage,
        paths: ['onlineUser']
    }

});