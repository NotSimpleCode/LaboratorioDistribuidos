import { defineStore } from "pinia";

export const useTableStore = defineStore('table', {
    state: () => ({
        activeMenu: null, // Se inicia sin ningun menú desplegado
        activeSubMenu: 'persons',
    }),
    getters: {
        isActiveMenu: (state) => (menu) => state.activeMenu === menu,
        isActiveSubMenu: (state) => (submenu) => state.activeSubMenu === submenu
    },
    actions: {
        toggleMenu(menu) {
            if (this.isActiveMenu(menu)) {
                this.closeMenu();
            } else {
                this.setActiveMenu(menu);
            }
        },

        setActiveMenu(menu) {
            this.activeMenu = menu;
        },

        closeMenu() {
            this.activeMenu = null;
        },

        setActiveSubMenu(submenu) {
            this.activeSubMenu = submenu;
        },

        closeSubMenu() {
            this.activeSubMenu = null;
        },

        updateSearchTerm(term) {
            this.searchTerm = term
        }
    },
})