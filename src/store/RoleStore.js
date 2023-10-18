import { defineStore } from "pinia";
import RoleService from "../services/RoleService";
import { useAuthStore } from "./AuthStore";

export const useRoleStore = defineStore('roles', {
    state: () => ({
        roles: [],
        filteredRoles: []
    }),
    actions: {
        getToken() {
            const authStore = useAuthStore()
            return authStore.token
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
    }
})