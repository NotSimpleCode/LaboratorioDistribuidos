import { defineStore } from "pinia";
import ConnectionService from "../services/ConnectionService";

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
        async onInit() {
            await this.fetchTotalConnections();
            this.calculateTotalPages();
        },
        async fetchAll() {
            this.connections = await ConnectionService.fetchAll();
            this.filteredConnections = this.connections
        },
        filterRoles(searchTerm) {
            this.filteredConnections = this.connections.filter((rol) => {
                const rolName = rol.nick_usuario.toLowerCase();
                return rolName.includes(searchTerm);
            });
        },
        async fetchPage() {
            this.connections = await ConnectionService.fetchPage(this.currentPage);
        },
        async fetchTotalConnections() {
            this.totalConn = await ConnectionService.fetchCount()
        },
        calculateTotalPages() {
            this.totalPages = Math.ceil(this.totalConn / this.connPerPage);
        }
    }
})