import { defineStore } from "pinia";
import UserService from '../services/UserService'

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
        filteredUsers: [],
        currentPage: 1,
        usersPerPage: 20,
        totalPages: 0,
        totalUsers: 0,
    }),
    actions: {
        async onInit() {
            await this.fetchTotalUsers();
            this.calculateTotalPages()
        },
        async fetchUsers() {
            this.users = await UserService.fetchAll();
            this.filteredUsers = this.users
        },
        filterUsers(searchTerm) {
            this.filteredUsers = this.users.filter((user) => {
                const fullName = `${user.nombre_usuario} ${user.apellido_usuario}`.toLowerCase();
                return fullName.includes(searchTerm);
            });
        },
        async fetchPage() {
            this.users = await UserService.fetchPage(this.currentPage);
        },
        getUserDetails(userId) {
            return this.users.find(user => user.documento_usuario === userId);
        },
        async fetchTotalUsers() {
            this.totalUsers = await UserService.fetchCount()
        },
        calculateTotalPages() {
            this.totalPages = Math.ceil(this.totalUsers / this.usersPerPage);
        }
    }

})


