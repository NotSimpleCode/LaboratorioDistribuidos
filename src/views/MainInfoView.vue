<template>
    <main id="grid-container">
        <AppHeader class="header">
        </AppHeader>
        <Nav class="navigator" :active-sub-menu="activeSubMenu" @update:active-sub-menu="activateSubMenu"></Nav>
        <SearchOption class="search"></SearchOption>
        <UsersTable class="table" v-if="activeSubMenu === 'verListaUsuarios'"></UsersTable>
        <RolesTable class="table" v-else-if="activeSubMenu === 'verListaRoles'"></RolesTable>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import AppHeader from '../components/AppHeader.vue';
import Nav from '../components/Nav.vue';
import SearchOption from '../components/SearchOptions.vue'
import UsersTable from '../components/UsersTable.vue'
import RolesTable from '../components/RolesTable.vue';

const activeSubMenu = ref('verListaUsuarios');

function activateSubMenu(submenu) {
    activeSubMenu.value = submenu
}

</script>

<style scoped>
#grid-container {
    display: grid;
    grid-template-rows: auto 1fr 4fr;
    grid-template-columns: 1fr 7fr;

}

.header {
    position: relative;
    grid-row: 1;
    grid-column: 1/-1;
}

.navigator {
    grid-row: 2/-1;
    grid-column: 1;
}

.search {
    grid-row: 2/3;
    grid-column: 2/-1;
    position: relative;
}

.table {
    grid-row: 3/-1;
    grid-column: 2/3;
}
</style>