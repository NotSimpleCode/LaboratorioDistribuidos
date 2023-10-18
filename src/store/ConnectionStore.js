import { defineStore } from "pinia";
import ConnectionService from "../services/ConnectionService";

export const useConnectionStore = defineStore('connection', {
    state: () => ({
        connections: [],
        filteredConnections: []
    }),
    actions: {
        async fetchRoles() {
            this.connections = await ConnectionService.fetchAll();
            this.filteredConnections = this.connections
        },
        filterRoles(searchTerm) {
            this.filteredConnections = this.connections.filter((rol) => {
                const rolName = rol.nombre_rol.toLowerCase();
                return rolName.includes(searchTerm);
            });
        },
    }
})