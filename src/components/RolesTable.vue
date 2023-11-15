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
            <div v-for="role in filteredRoles" :key="role.id_rol" class="role-row row">
                <!-- Filas de datos -->
                <div class="role-cell">{{ role.id_usuario }}</div>
                <i v-if="authStore.isSuperAdmin()" @click.stop="showMessage(role)" class="bi bi-person-x"></i>

                <div v-if="!role.isEditingNick" class="role-cell">
                    {{ role.nick_usuario }}
                    <i v-if="!role.isEditingNick" class="bi bi-pencil-square" id="updateNick-btn"
                        @click="startEditing(role)"></i>
                </div>
                <div v-else>
                    <input type="text" class="role-cell" v-model="updatedNick" id="nick-input" @input="validateNick()">
                    <i v-if="isValidNick" class="bi bi-check-circle-fill" @click="updateNick(role)"></i>
                    <i class="bi bi-x-circle-fill" @click="cancelEditing(role)"></i>
                </div>

                <div class="role-cell">{{ role.roles.nombre_rol }}</div>

                <select v-model="role.estado_cuenta" class='role-cell status-select' @change="updateStatus(role)">
                    <option v-for="status in utilityStore.status" :value="status" :key="status">{{ status }}
                    </option>
                </select>

                <div :class="{ 'role-cell': true, 'role-cell-empty': !role.roles.descripcion_rol }">
                    {{ role.roles.descripcion_rol || noDataValue }}
                </div>
            </div>
            <Message v-if="messageStore.showMessage"
                @accept="deleteConnection(selectedIdUserToDelete, selectedIdRoleToDelete)" />
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
import { useUtilityStore } from '../store/UtilityStore';
import { useAuthStore } from '../store/AuthStore';
import { useMessageStore } from '../store/MessageStore';
import Message from './MessageWindow.vue';

const connectionStore = useConnectionStore()
const utilityStore = useUtilityStore()
const authStore = useAuthStore()
const messageStore = useMessageStore()

const noDataValue = '0';
const searchTerm = ref("")
const selectedIdRoleToDelete = ref(null)
const selectedIdUserToDelete = ref(null)

const actualNick = ref(null)
const updatedNick = ref(null)
const isValidNick = ref(false)

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

function validateNick() {
    isValidNick.value = utilityStore.validateNickName(updatedNick.value) && updatedNick.value !== actualNick.value
}

function startEditing(role) {
    role.isEditingNick = true;
    actualNick.value = role.nick_usuario
    updatedNick.value = role.nick_usuario;
}

const updateNick = async (role) => {
    const exist = await userExist(updatedNick.value)
    if (!exist) {
        const response = await connectionStore.putUserByNickName(actualNick.value, updatedNick.value)
        connectionStore.fetchPage()
    } else {
        alert("Este nombre de usuario ya existe")
    }
    role.isEditingNick = false;
}
function cancelEditing(role) {
    role.isEditingNick = false;
}
async function updateStatus(role) {
    const response = await connectionStore.putUserByNickName(role.nick_usuario, role.estado_cuenta)
}

function showMessage(rol) {
    messageStore.showingMessage()
    messageStore.setMessageType('confirm')
    messageStore.setMessageTittle("Eliminar usuario")
    messageStore.setMessageContent(`Eliminar al ${rol.roles.nombre_rol} ${rol.nick_usuario}`)
    selectedIdUserToDelete.value = rol.id_usuario
    selectedIdRoleToDelete.value = rol.id_rol
}


async function deleteConnection(id_usuario, id_rol) {
    const response = await connectionStore.deleteConnection(id_usuario, id_rol)
    messageStore.showingMessage()
    messageStore.setMessageType('success')
    messageStore.setMessageContent(`Usuario eliminado correctamente`)
    fetchData()
}

const userExist = async (userNickname) => {
    return await authStore.existsNickname(userNickname)
}

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
})
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
    max-height: 45px;
    min-height: 45px;
}


.role-header {
    position: sticky;
    top: 0px;
    color: var(--black-color);
    font-weight: bold;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
    z-index: 10;
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
    height: 50px;
    cursor: pointer;
    position: relative;
}

#nick-input {
    width: 80px;
    padding: 0;
    border: 1px solid lightgray;
    outline: none;
    text-align: center;
}

.bi-pencil-square,
.bi-person-x {
    width: 20px;
    height: 20px;
    color: var(--third-color);
    position: absolute;
    display: none;
}

.bi-person-x {
    color: red;
    left: 2%;
}

.bi-check-circle-fill {
    color: green;
}

.bi-x-circle-fill {
    color: red;
}

.role-row:hover .bi-person-x,
.role-row:hover .bi-pencil-square {
    display: inline-block;
}

.role-row .bi-person-x:hover {
    background-color: red;
    color: white;
}

.role-row .bi-pencil-square:hover {
    background-color: var(--third-color);
    color: white;
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

.status-select {
    width: 80px;
    margin: auto;
}
</style>
