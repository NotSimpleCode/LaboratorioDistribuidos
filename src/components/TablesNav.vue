<template>
    <nav class="menu">
        <div class="menu-item" @click="toggleMenu('users')">
            <i class="bi bi-people-fill"></i>
            <p :class="{ active: tableStore.activeMenu === 'users' }">Usuarios</p>
        </div>
        <div class="submenu" :class="{ 'expanded': isActiveMenu('users') }">
            <p :class="{ active: tableStore.activeSubMenu == 'users' }" @click="activateSubMenu('users')">Ver
                Lista</p>
            <p :class="{ active: tableStore.activeSubMenu === 'registrar' }">Registrar</p>
        </div>
        <div class="menu-item" @click="toggleMenu('roles')">
            <i class="bi bi-person-arms-up"></i>
            <p :class="{ active: tableStore.activeMenu === 'roles' }">Roles</p>
        </div>
        <div class="submenu" :class="{ 'expanded': isActiveMenu('roles') }">
            <p :class="{ active: tableStore.activeSubMenu === 'roles' }" @click="activateSubMenu('roles')">Ver Lista
            </p>
            <p :class="{ active: tableStore.activeSubMenu === 'registrar' }">Registrar</p>
        </div>
    </nav>
</template>
  
<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useTableStore } from '../store/TableStore';
const tableStore = useTableStore()

const toggleMenu = (menu) => {
    tableStore.toggleMenu(menu);
};

const isActiveMenu = (menu) => {
    return tableStore.isActiveMenu(menu);
};

const activateSubMenu = (subMenu) => {
    tableStore.setActiveSubMenu(subMenu)
}

function handleDocumentClick(event) {
    const target = event.target;
    const isInsideMenu = target.closest('.menu-item');
    const isInside = target.closest('.submenu');
    if (!isInsideMenu && !isInside) {
        tableStore.closeMenu();
    }
}

onMounted(() => {
    document.addEventListener('click', handleDocumentClick);
});

onUnmounted(() => {
    document.removeEventListener('click', handleDocumentClick);
});
</script>
  
<style scoped>
.menu {
    background-color: var(--secondary-color);
    color: var(--primary-color);
    user-select: none;
    max-height: 100%;
}

.menu-item {
    cursor: pointer;
    padding: 10px;

}

.menu-item p {
    display: inline-block;
    transition: background-color 0.3s ease;
    font-size: 1.3rem;
    user-select: none;
    padding: 10px;
}

.submenu {
    width: 90%;
    margin-left: 10%;
    color: var(--white-color);
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
    max-height: 0;
}

.submenu.expanded {
    max-height: 100px;
    cursor: pointer;
}

.submenu p {
    background-color: var(--darker-primary);
    font-size: 1.2rem;
    padding: 6px 25px;
    transition: background-color 0.3s ease;
    border-top-left-radius: 5px;

}

.menu-item:hover {
    background-color: var(--third-color);
}

.submenu p:hover,
.submenu p.active {
    background-color: var(--background-color);
    color: var(--black-color);
    margin-left: 10px;
    margin-bottom: 2px;
    width: 100%;
    border: 1px solid var(--darker-primary);
    /* Aplicar sombra en la parte superior e inferior */
    box-shadow: 0px 5px 5px -6px rgba(0, 0, 0, 0.5), 0px -5px 5px -6px rgba(0, 0, 0, 0.5);

}
</style>
  