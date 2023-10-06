<template>
    <nav class="menu">
        <div class="menu-item" @click="toggleMenu('users')">
            <i class="bi bi-people-fill"></i>
            <p :class="{ active: activeMenu === 'users' }">Usuarios</p>
        </div>
        <div class="submenu" :class="{ 'expanded': expandedMenu === 'users' }">
            <p :class="{ active: activeSubMenu == 'verListaUsuarios' }" @click="activateSubMenu('verListaUsuarios')">Ver
                Lista</p>
            <p :class="{ active: activeSubMenu === 'registrar' }">Registrar</p>
        </div>
        <div class="menu-item" @click="toggleMenu('roles')">
            <i class="bi bi-person-arms-up"></i>
            <p :class="{ active: activeMenu === 'roles' }">Roles</p>
        </div>
        <div class="submenu" :class="{ 'expanded': expandedMenu === 'roles' }">
            <p :class="{ active: activeSubMenu === 'verListaRoles' }" @click="activateSubMenu('verListaRoles')">Ver Lista
            </p>
            <p :class="{ active: activeSubMenu === 'registrar' }">Registrar</p>
        </div>
    </nav>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

let expandedMenu = ref(null);
let activeMenu = ref(null);
//let activeSubMenu = ref(null);

const props = defineProps({
    activeSubMenu: String
})

const emmits = defineEmits(['update:activeSubMenu'])

function toggleMenu(menu) {
    if (expandedMenu.value === menu) {
        collapseMenu();
    } else {
        expandedMenu.value = menu;
    }
}

function collapseMenu() {
    expandedMenu.value = null;
    activeMenu.value = null;
}

// Manejar clics fuera del menú para cerrar el submenú
function handleDocumentClick(event) {
    const target = event.target;
    const isInsideMenu = target.closest('.menu-item');
    const isInside = target.closest('.submenu');
    if (!isInsideMenu && !isInside) {
        collapseMenu();
    }
}

function activateSubMenu(submenu) {
    emmits('update:activeSubMenu', submenu)
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
    min-height: 83vh;
    user-select: none;
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
  