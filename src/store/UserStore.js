import { defineStore } from "pinia";
import UserService from '../services/UserService'
import { useAuthStore } from '../store/AuthStore'
import UploadService from '../services/UploadService'

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
        getToken() {
            const authStore = useAuthStore()
            return authStore.token
        },

        async onInit() {
            if (this.getToken()) {
                await this.fetchTotalUsers();
                this.calculateTotalPages()
            }
        },
        async fetchUsers() {
            this.users = await UserService.fetchAll(this.getToken());
            this.filteredUsers = this.users
        },
        filterUsers(searchTerm) {
            this.filteredUsers = this.users.filter((user) => {
                const fullName = `${user.nombre_usuario} ${user.apellido_usuario}`.toLowerCase();
                return fullName.includes(searchTerm);
            });
        },
        async fetchPage() {
            this.users = await UserService.fetchPage(this.currentPage, this.getToken());
        },
        getUserDetails(userId) {
            return this.users.find(user => user.documento_usuario === userId);
        },

        updateImg(userId, img, token) {
            UploadService.updateImg(userId, img, token)
        },

        async fetchTotalUsers() {
            this.totalUsers = await UserService.fetchCount(this.getToken())
        },
        calculateTotalPages() {
            this.totalPages = Math.ceil(this.totalUsers / this.usersPerPage);
        }
    }

})


