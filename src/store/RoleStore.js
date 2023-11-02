import { defineStore } from "pinia";
import RoleService from "../services/RoleService";
import { useAuthStore } from "./AuthStore";

export const useRoleStore = defineStore('roles', {
    state: () => ({
        connections: [],
        filteredConnections: [],
        currentPage: 1,
        connPerPage: 20,
        totalPages: 1,
        totalConn: 2,
    }),
    actions: {
        async onInit() {
            await this.fetchTotalConnections();
            this.calculateTotalPages();
        },
        getToken() {
            const authStore = useAuthStore()
            return authStore.onlineUser.token
        },

        async fetchRoles() {
            this.roles = await RoleService.fetchAll(this.getToken());
            this.filteredRoles = this.roles
        },
        filterRoles(searchTerm) {
            // Filtra los roles en función del término de búsqueda
            this.filteredRoles = this.roles.filter((rol) => {
                const rolName = rol.nombre_rol.toLowerCase();
                return rolName.includes(searchTerm);
            });
        },
        async fetchAll() {
            this.connections = await RoleService.fetchAll(this.getToken());
            this.filteredConnections = this.connections
        },
        async fetchTotalConnections() {
            this.totalConn = await RoleService.fetchCount(this.getToken())
        },
        calculateTotalPages() {
            this.totalPages = Math.ceil(this.totalConn / this.connPerPage);
        }
    }
})