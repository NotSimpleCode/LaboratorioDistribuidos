import { defineStore } from 'pinia';
import UserService from '../services/UserService';
import LoginService from '../services/LoginService'
import ConnectionService from '../services/ConnectionService'
import router from '../router'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        showLogin: true,
        onlineUser: { nick: null, rol: null, foto: null, token: null, personId: null },
        password: null,
    }),

    actions: {
        async updateOnlinePerson(nickname, token) {
            const person = await ConnectionService.fetchByUserNickname(nickname, token)
            this.onlineUser = {
                nick: person.nick_usuario,
                rol: person.roles.nombre_rol,
                foto: person.usuarios.foto_usuario,
                token: token,
                personId: person.usuarios.documento_usuario
            }
        },

        toggleForm() {
            this.showLogin = !this.showLogin;
        },

        async login() {
            try {
                const response = await LoginService.login({ nombre_usuario: this.onlineUser.nick, password_usuario: this.password });
                if (response.status) {
                    await this.updateOnlinePerson(this.onlineUser.nick, response.token)
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
            const response = await UserService.postRegisterUser(newUser)
        },
        async registerConnection(connection) {
            const response = await ConnectionService.postRegisterConnection(connection, this.onlineUser.token)

        },
        logout() {
            this.onlineUser = { nick: null, rol: null, foto: null, token: null, personId: null }
            this.password = null
        },
        async reloadOnlinePerson() {
            await this.updateOnlinePerson(this.onlineUser.nick, this.onlineUser.token)
        }
    },
    persist: {
        storage: sessionStorage,
        paths: ['onlineUser']
    }

});