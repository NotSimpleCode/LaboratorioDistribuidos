import { defineStore } from "pinia";
import RoleService from "../services/RoleService";
import { useAuthStore } from "./AuthStore";

export const useRoleStore = defineStore('roles', {
    state: () => ({
        isRoleRegister: false,
        roles: [],
        filteredRoles: [],
    }),
    actions: {
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
        async getRoleById(idRol) {
            return await RoleService.fetchRoleById(idRol, this.getToken())
        },
        async updateRole(roleId, data) {
            return await RoleService.patchRole(roleId, data, this.getToken())
        },
        async postRole(data) {
            return await RoleService.postRole(data, this.getToken())
        }


    }
})