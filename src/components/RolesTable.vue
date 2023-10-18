<template>
    <section class="search-container">
        <h1 class="table-title">Roles</h1>
        <div class="search-bar">
            <input class="search" type="text" placeholder="Buscar..." v-model="searchTerm" @input="filterRoles" />
            <input id="tableSearch" class="search-button" type="button" value="">
        </div>
        <div class="options">

        </div>
    </section>
    <div class="role-table">
        <div class="role-header row">
            <div class="role-cell">Id</div>
            <div class="role-cell">Nombre</div>
            <div class="role-cell">Fecha de creación</div>
            <div class="role-cell">Estado</div>
            <div class="role-cell">Descripción</div>
        </div>
        <div v-for="role in  filteredRoles" :key="role.id_rol" class="role-row row"> <!-- Filas de datos -->
            <div class="role-cell">{{ role.id_rol }}</div>
            <div :class="{ 'role-cell': true, 'role-cell-empty': !role.nombre_rol }">{{ role.nombre_rol || noDataValue }}
            </div>
            <div :class="{ 'role-cell': true, 'role-cell-empty': !role.fecha_creacion_rol }">{{
                getDate(role.fecha_creacion_rol) ||
                noDataValue }}</div>
            <div :class="{ 'role-cell': true, 'role-cell-empty': !role.estado_rol }">{{ role.estado_rol || noDataValue }}
            </div>
            <div :class="{ 'role-cell': true, 'role-cell-empty': !role.descripcion_rol }">{{ role.descripcion_rol ||
                noDataValue }}
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, computed } from 'vue';
import { useRoleStore } from '../store/RoleStore'

const roleStore = useRoleStore()
const noDataValue = "Vacío"
const searchTerm = ref("")


const getDate = (time) => {
    if (time != null) {
        return time.split("T")[0];
    }
    return noDataValue;
}


const filteredRoles = computed(() => {

    if (searchTerm.value.trim() === '') {
        return roleStore.roles;
    } else {
        return roleStore.filteredRoles;
    }
});

const filterRoles = async () => {
    const term = searchTerm.value.trim().toLowerCase();
    console.log(term);
    if (term === '') {
        roleStore.fetchRoles();
    } else {
        roleStore.filterRoles(term);
    }
}
filterRoles()
</script>
  
<style scoped>
.search-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr 2fr;
    background-color: var(--primary-color);
    margin: 10px;
    min-height: 14vh;
    padding-left: 20px;
    padding-top: 10px;
    border-radius: 5px;
}

.table-title {
    color: var(--secondary-color);
    grid-row: 1;
    grid-column: 1/-1;
    font-size: 1.5rem;
}

.search-bar {
    grid-row: 2/3;
    grid-column: 1/2;
    max-width: 250px;
    position: relative;
    height: 30px;
    align-self: center;
}

.search {
    border-style: none;
    color: var(--secondary-color);
    box-shadow: 0px 0px 5px rgba(34, 34, 59, 0.4);
    height: 30px;
    max-width: 100%;
    padding-left: 17px;
    padding-right: 50px;
    border-radius: 15px;

}

.search::placeholder {
    color: rgb(175, 175, 175);
    font-style: italic;
}

.search:focus {
    outline: none;
}

.search-button {
    border-style: none;
    position: absolute;
    cursor: pointer;
    background-image: url('../assets/search.svg');
    background-size: cover;
    width: 25px;
    height: 25px;
    top: 2px;
    right: 0;
    background-color: transparent;

}

.options {
    grid-row: 2/3;
    grid-column: 2/3;
}

.role-table {
    display: grid;
    position: relative;
    display: flex;
    flex-direction: column;
    grid-template-columns: 1fr;
    grid-template-rows: 0.1fr auto;
    border-radius: 5px;
    margin: 0px 10px;
    gap: 8px;
}

.role-header {
    position: sticky;
    top: 0px;
    color: var(--black-color);
    font-weight: bold;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
}

.role-table {
    max-height: 60vh;
    overflow-y: auto;
}

::-webkit-scrollbar {
    width: 7px;

}

::-webkit-scrollbar-thumb {
    background-color: var(--third-color);
    border-radius: 20px;
    /* Color del thumb */
}

::-webkit-scrollbar-track {
    /* Color de fondo de la barra de desplazamiento */
    background-color: rgba(0, 123, 255, 0.1);
}

.row {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    border-radius: 5px;
    background-color: var(--primary-color);
    padding: 10px;
    align-items: center;
    text-align: left;
}

.role-cell {
    padding: 0px 15px;
    font-size: .9rem;
}


.role-cell-empty {
    color: gray;
    font-style: italic;
}

.role-row {
    cursor: pointer;
    height: 50px;
}

.role-row:hover {
    background-color: rgba(0, 123, 255, 0.05);
    border-left: 3px solid var(--third-color);
}
</style>
