<template>
    <section class="search-container">
        <h1 class="table-title">Usuarios</h1>
        <div class="search-bar">
            <input class="search" type="text" placeholder="Buscar..." v-model="searchTerm" @input="filterUsers" />
            <input id="tableSearch" class="search-button" type="button" value="">
        </div>
        <div class="options">

        </div>
    </section>
    <div class="role-table-page">
        <div class="role-table">
            <div class="role-header row">
                <div class="role-cell">Id usuario</div>
                <div class="role-cell">Nombre de usuario</div>
                <div class="role-cell">Rol</div>
                <div class="role-cell">Estado</div>
                <div class="role-cell">Descripción</div>
            </div>
            <div v-for="role in filteredRoles  " :key="role.id_rol" class="role-row row"> <!-- Filas de datos -->
                <div class="role-cell">{{ role.id_usuario }}</div>
                <div class="role-cell">{{ role.nick_usuario }}
                </div>
                <div class="role-cell">{{ role.roles.nombre_rol }}</div>
                <div :class="{ 'role-cell': true, 'role-cell-empty': !role.roles.estado_rol }">{{ role.roles.estado_rol ||
                    noDataValue
                }}
                </div>
                <div :class="{ 'role-cell': true, 'role-cell-empty': !role.roles.descripcion_rol }">{{
                    role.roles.descripcion_rol ||
                    noDataValue }}
                </div>
            </div>
            <div class="pagination">
                <!-- <label>{{ getActualRange() }}</label> -->
                <div>
                    <button @click="fastBackward()" :disabled="currentPage.valueOf === 1" class="nav-button"><i
                            class="bi bi-chevron-double-left"></i></button>
                    <button @click="previousPage" :disabled="connectionStore.currentPage === 1" class="nav-button"><i
                            class="bi bi-chevron-left"></i></button>
                    <button v-for="  page   in   visiblePages  " :key="page" @click="changePage(page)"
                        :class="{ 'page-button': true, 'current-page': page === connectionStore.currentPage }">
                        {{ page }}
                    </button>
                    <button @click="nextPage" :disabled="connectionStore.currentPage === connectionStore.totalPages"
                        class="nav-button"><i class="bi bi-chevron-right"></i></button>
                    <button @click="fastForward()" :disabled="currentPage.valueOf === 1" class="nav-button"><i
                            class="bi bi-chevron-double-right"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { useConnectionStore } from '../store/ConnStore';

const connectionStore = useConnectionStore()
const noDataValue = 'Vacío';
const searchTerm = ref("")
const currentPage = computed(() => connectionStore.currentPage);
const totalPages = computed(() => connectionStore.totalPages);

const filteredRoles = computed(() => {

    if (searchTerm.value.trim() === '') {
        return connectionStore.connections;
    } else {
        return connectionStore.filteredConnections;
    }
});

const filterUsers = async () => {
    const term = searchTerm.value.trim().toLowerCase();
    if (term === '') {
        connectionStore.fetchAll();
    } else {
        connectionStore.filterRoles(term);
    }
}

const previousPage = () => {
    if (currentPage.value > 1) {
        connectionStore.currentPage--;
        fetchData();
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        connectionStore.currentPage++;
        fetchData();
    }
};

const changePage = async (page) => {
    connectionStore.currentPage = page;
    await connectionStore.fetchPage();
};

const fetchData = async () => {
    await connectionStore.fetchPage();
};

const visiblePages = computed(() => {
    const pageSize = 10; // Número de elementos por página

    const start = Math.floor((currentPage.value - 1) / pageSize) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, totalPages.value);

    const pages = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return pages;
})


// const getActualRange = () => {
//     const start = (currentPage.value * connectionStore.usersPerPage) - connectionStore.usersPerPage + 1;
//     const end = currentPage.value * connectionStore.usersPerPage;
//     return `${start}-${end} de ${connectionStore.totalUsers}`;
// };

const fastBackward = () => {
    if (currentPage.value - 10 <= 1) {
        connectionStore.currentPage = 1
    } else {
        connectionStore.currentPage -= 10
    }
    fetchData()
}
const fastForward = () => {
    if (currentPage.value + 10 >= totalPages.value) {
        connectionStore.currentPage = totalPages.value
    } else {
        connectionStore.currentPage += 10
    }
    fetchData()
}

onBeforeMount(() => {
    connectionStore.onInit()
}),

    fetchData()
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

.role-table-page {
    position: relative;
}

.role-table {
    display: grid;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    margin: 0px 10px;
    gap: 8px;
    height: 67vh;
    overflow-y: auto;
    background-color: 1px solid red;
}

.row {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    border-radius: 5px;
    background-color: var(--primary-color);
    padding: 10px;
    align-items: center;
    text-align: center;
    max-height: 40px;
}


.role-header {
    position: sticky;
    top: 0px;
    color: var(--black-color);
    font-weight: bold;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
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

.pagination {
    text-align: center;
    display: flex;
    justify-content: end;
    padding: 10px 20px;

}

.pagination>label {
    color: var(--darker-primary);
}

.page-button {
    display: inline-block;
    padding: 4px 8px;
    cursor: pointer;
}

.page-button,
.nav-button {
    background-color: var(--primary-color);
    color: var(--secondary-color);
    border-radius: 5px;

    border: 1px solid lightgray;
    margin: 0px 3px;
}

.page-button:hover {
    background-color: var(--third-color);
    color: #fff;
}

.nav-button {
    display: inline-block;
    padding: 4px 8px;
    cursor: pointer;
}

.nav-button:hover {
    background-color: var(--third-color);
    color: #fff;
}

.current-page {
    background-color: rgba(0, 123, 255, 0.7);
    color: var(--primary-color);
}
</style>
