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
            return authStore.onlineUser.token
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
            this.fetchPage()
            return this.users.find(user => user.documento_usuario === userId);
        },
        async updateImg(userId, img, token) {
            await UploadService.updateImg(userId, img, token)
            this.fetchPage()
        },
        async fetchUserById(userId) {
            return await UserService.fetchUserById(userId, this.getToken())
        },
        //Funciones de actualización
        async patchName(userId, newName) {
            return await UserService.patchName(userId, newName, this.getToken())
        },
        async patchLastName(userId, newLastName) {
            return await UserService.patchLastName(userId, newLastName, this.getToken())
        },
        async patchCellphone(userId, newCellphone) {
            return await UserService.patchCellphone(userId, newCellphone, this.getToken())
        },
        async patchStatus(userId, newStatus) {
            return await UserService.patchStatus(userId, newStatus, this.getToken())
        },
        async patchEmail(userId, newEmail) {
            return await UserService.patchEmail(userId, newEmail, this.getToken())
        },
        async patchBirthDate(userId, newBirthDate) {
            return await UserService.patchBirthDate(userId, newBirthDate, this.getToken())
        },
        async patchRegisterDate(userId, newRegisterDate) {
            return await UserService.patchLastName(userId, newRegisterDate, this.getToken())
        },
        async patchUser(userId, data) {
            return await UserService.patchUser(userId, data, this.getToken())
        },
        async fetchTotalUsers() {
            this.totalUsers = await UserService.fetchCount(this.getToken())
        },
        calculateTotalPages() {
            this.totalPages = Math.ceil(this.totalUsers / this.usersPerPage);
        },

    }

})


