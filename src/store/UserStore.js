import { defineStore } from "pinia";
import UserService from '../services/UserService'

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
        filteredUsers: [],
    }),
    actions: {
        async fetchUsers() {
            this.users = await UserService.fetchAll();
            this.filteredUsers = this.users
        },
        filterUsers(searchTerm) {
            // Filtra los usuarios en función del término de búsqueda
            this.filteredUsers = this.users.filter((user) => {
                const fullName = `${user.nombre_usuario} ${user.apellido_usuario}`.toLowerCase();
                return fullName.includes(searchTerm);
            });
        },
        getUserDetails(userId) {
            // Obtener los detalles del usuario por su ID
            return this.users.find(user => user.documento_usuario === userId);
        }
    }
})