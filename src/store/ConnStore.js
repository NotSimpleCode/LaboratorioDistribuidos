import { defineStore } from "pinia";
import ConnectionService from "../services/ConnectionService";
import { useAuthStore } from '../store/AuthStore'

export const useConnectionStore = defineStore('conn', {
    state: () => ({
        connections: [],
        filteredConnections: [],
        currentPage: 1,
        connPerPage: 20,
        totalPages: 1,
        totalConn: 2,
    }),
    actions: {
        getToken() {
            const authStore = useAuthStore()
            return authStore.token
        },
        async onInit() {
            await this.fetchTotalConnections();
            this.calculateTotalPages();
        },
        async fetchAll() {
            this.connections = await ConnectionService.fetchAll(this.getToken());
            this.filteredConnections = this.connections
        },
        filterRoles(searchTerm) {
            this.filteredConnections = this.connections.filter((rol) => {
                const rolName = rol.nick_usuario.toLowerCase();
                return rolName.includes(searchTerm);
            });
        },
        async fetchPage() {
            this.connections = await ConnectionService.fetchPage(this.currentPage, this.getToken());
        },
        async fetchByUserId(userId) {
            return await ConnectionService.fetchByUserId(userId)
        },
        async fetchByUserNickname(nickname) {
            return await ConnectionService.fetchByUserNickname(nickname)
        },
        async fetchTotalConnections() {
            this.totalConn = await ConnectionService.fetchCount(this.getToken())
        },
        calculateTotalPages() {
            this.totalPages = Math.ceil(this.totalConn / this.connPerPage);
        }
    }
})