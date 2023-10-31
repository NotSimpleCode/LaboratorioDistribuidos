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
    <div class="user-table-page">
        <div class="user-table">
            <div class="user-header row">
                <div class="user-cell"></div>
                <div class="user-cell">N° Doc</div>
                <div class="user-cell">Nombre</div>
                <div class="user-cell">Apellido</div>
                <div class="user-cell">Celular</div>
                <div class="user-cell">Fecha de Registro</div>
                <div class="user-cell">Estado</div>
                <div class="user-cell">Correo</div>
            </div>
            <div v-for="user in filteredUsers" :key="user">
                <div class="user-row row" @click="showUserDetails(user.documento_usuario)">
                    <i @click="changeState(user)" class="bi bi-person-x"></i>
                    <div class="user-cell user-photo" :style="getUserImageStyle(user.foto_usuario)">
                    </div>
                    <div :class="{ 'user-cell': true, 'user-cell-empty': !user.documento_usuario }">{{
                        user.documento_usuario ||
                        noDataValue }}</div>
                    <div :class="{ 'user-cell': true, 'user-cell-empty': !user.nombre_usuario }"
                        :title="user.nombre_usuario">{{
                            user.nombre_usuario ||
                            noDataValue
                        }}
                    </div>
                    <div :class="{ 'user-cell': true, 'user-cell-empty': !user.apellido_usuario }"
                        :title="user.apellido_usuario">{{
                            user.apellido_usuario ||
                            noDataValue
                        }}</div>
                    <div :class="{ 'user-cell': true, 'user-cell-empty': !user.celular_usuario }"
                        :title="user.celular_usuario">
                        {{
                            user.celular_usuario ||
                            noDataValue
                        }}</div>
                    <div :class="{ 'user-cell': true, 'user-cell-empty': !user.fecha_registro_usuario }">{{
                        getDate(user.fecha_registro_usuario) }}</div>
                    <div :class="{ 'user-cell': true, 'user-cell-empty': !user.estado_usuario }">{{ user.estado_usuario ||
                        noDataValue
                    }}
                    </div>
                    <div :class="{ 'user-cell': true, 'user-cell-empty': !user.direccion_usuario }"
                        :title="user.direccion_usuario">
                        {{ user.direccion_usuario ||
                            noDataValue }}</div>
                </div>
            </div>
            <UserDetails v-if="showDetails" :user-id="selectedUserId" :show="showDetails" @close="closeUserDetails" />
        </div>
        <div class="pagination">
            <label>{{ getActualRange() }}</label>
            <div>
                <button @click="fastBackward()" :disabled="currentPage.valueOf === 1" class="nav-button"><i
                        class="bi bi-chevron-double-left"></i></button>
                <button @click="previousPage" :disabled="userStore.currentPage === 1" class="nav-button"><i
                        class="bi bi-chevron-left"></i></button>
                <button v-for="page in visiblePages" :key="page" @click="changePage(page)"
                    :class="{ 'page-button': true, 'current-page': page === userStore.currentPage }">
                    {{ page }}
                </button>
                <button @click="nextPage" :disabled="userStore.currentPage === userStore.totalPages" class="nav-button"><i
                        class="bi bi-chevron-right"></i></button>
                <button @click="fastForward()" :disabled="currentPage.valueOf === 1" class="nav-button"><i
                        class="bi bi-chevron-double-right"></i></button>
            </div>

        </div>
    </div>
</template>
  
<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { useUserStore } from '../store/UserStore';
import UserDetails from './UserDetails.vue'

const noDataValue = 'Vacío';
const userStore = useUserStore()
const searchTerm = ref("")
const showDetails = ref(false);
const selectedUserId = ref(null);
const currentPage = computed(() => userStore.currentPage);
const totalPages = computed(() => userStore.totalPages);

const changeState = (user) => {
    console.log(user)
}

const showUserDetails = (userId) => {
    selectedUserId.value = userId;
    showDetails.value = true;
};

const closeUserDetails = () => {
    showDetails.value = false;
};

const getDate = (time) => {
    if (time != null) {
        return time.split("T")[0];
    }
    return noDataValue;
}

const filteredUsers = computed(() => {

    if (searchTerm.value.trim() === '') {
        return userStore.users
    } else {
        return userStore.filteredUsers;
    }
});

const filterUsers = async () => {
    const term = searchTerm.value.trim().toLowerCase();

    if (term === '') {
        userStore.fetchPage();
    } else {
        userStore.filterUsers(term);
    }
};

const getUserImageStyle = (foto_usuario) => {
    const defaultImageUrl = 'url(src/assets/user.svg)';
    const backgroundImage = foto_usuario ? `url(${foto_usuario})` : defaultImageUrl;

    return { 'background-image': backgroundImage };
};

const previousPage = () => {
    if (currentPage.value > 1) {
        userStore.currentPage--;
        fetchData();
    }
};

const nextPage = () => {
    if (currentPage.value < userStore.totalPages) {
        userStore.currentPage++;
        fetchData();
    }
};

const changePage = async (page) => {
    userStore.currentPage = page;
    await userStore.fetchPage();
};

const fetchData = async () => {
    await userStore.fetchPage();
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

const getActualRange = () => {
    const start = (currentPage.value * userStore.usersPerPage) - userStore.usersPerPage + 1;
    const end = currentPage.value * userStore.usersPerPage;
    return `${start}-${end} de ${userStore.totalUsers}`;
};

const fastBackward = () => {
    if (currentPage.value - 10 <= 1) {
        userStore.currentPage = 1
    } else {
        userStore.currentPage -= 10
    }
    fetchData()
}
const fastForward = () => {
    if (currentPage.value + 10 >= totalPages.value) {
        userStore.currentPage = totalPages.value
    } else {
        userStore.currentPage += 10
    }
    fetchData()
}

onBeforeMount(() => {
    userStore.onInit()
    fetchData()
})

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

.user-table-page {
    position: relative;

}

.user-table {
    display: grid;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    margin: 0px 10px;
    gap: 8px;
    height: 67vh;
    overflow-y: auto;
    position: relative;
}

.row {
    display: grid;
    grid-template-columns: .5fr 1fr 1fr 1fr 1fr 1fr .5fr 1fr;
    border-radius: 5px;
    background-color: var(--primary-color);
    padding: 5px;
    align-items: center;
    text-align: center;
    max-height: 40px;
}

.user-header {
    position: sticky;
    top: 0px;
    color: var(--black-color);
    font-weight: bold;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
    z-index: 10;
}

.user-cell {
    padding: 0px 10px;
    font-size: .9rem;
    min-width: 10%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}

.user-row .user-photo {
    margin-left: 20px;
    width: 35px;
    height: 35px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('../assets/user.svg');
}

.user-header .user-cell {
    -webkit-line-clamp: 3;
}

.user-cell-empty {
    color: gray;
    font-style: italic;
}

.user-row {
    cursor: pointer;
    position: relative;
}

.bi-person-x {
    width: 30px;
    height: 20px;
    color: red;
    cursor: pointer;
    position: absolute;
    left: 9%;
    display: none;
    z-index: 20;
}

.user-row:hover .bi-person-x {
    display: inline-block;
}

.user-row .bi-person-x:hover {
    background-color: red;
    color: white;
}

.user-row:hover {
    background-color: rgba(0, 123, 255, 0.05);
    border-left: 3px solid var(--third-color);
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

.pagination {
    text-align: center;
    display: flex;
    justify-content: space-between;
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