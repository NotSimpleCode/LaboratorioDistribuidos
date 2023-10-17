import { defineStore } from "pinia";
import RoleService from "../services/RoleService";

export const useRoleStore = defineStore('roles', {
    state: () => ({
        roles: [],
        filteredRoles: []
    }),
    actions: {
        async fetchRoles() {
            this.roles = await RoleService.fetchAll();
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