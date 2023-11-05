<template>
    <main id="grid-container">
        <AppHeader class="header">
        </AppHeader>
        <TablesNav class="navigator"></TablesNav>
        <UsersTable v-if="tableStore.activeSubMenu === 'persons'"></UsersTable>
        <RolesTable v-else-if="tableStore.activeSubMenu === 'roles'"></RolesTable>
        <OnlyRolesTable v-else-if="tableStore.activeSubMenu === 'only_roles'"></OnlyRolesTable>
    </main>
</template>
<script setup>
import AppHeader from '../components/AppHeader.vue';
import TablesNav from '../components/TablesNav.vue';
import UsersTable from '../components/UsersTable.vue';
import RolesTable from '../components/RolesTable.vue';
import OnlyRolesTable from '../components/OnlyRolesTable.vue';
import { useTableStore } from '../store/TableStore'

const tableStore = useTableStore()

</script>

<style scoped>
#grid-container {
    display: grid;
    grid-template-rows: auto 1fr 4fr;
    grid-template-columns: 1fr 7fr;

}

.header,
.main-search {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08)
}

.header {
    grid-row: 1;
    grid-column: 1/-1;
}

.navigator {
    grid-row: 2/-1;
    grid-column: 1;
}
</style>    