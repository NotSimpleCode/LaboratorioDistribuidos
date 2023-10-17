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
    <div class="user-table">
        <div class="user-header row">
            <div class="user-cell"></div>
            <div class="user-cell">N° Doc</div>
            <!-- <div class="user-cell">Tipo Doc</div> -->
            <div class="user-cell">Nombre</div>
            <div class="user-cell">Apellido</div>
            <div class="user-cell">Celular</div>
            <div class="user-cell">Fecha de Registro</div>
            <div class="user-cell">Estado</div>
            <div class="user-cell">Dirección</div>
            <!-- <div class="user-cell">Fecha de Nacimiento</div> -->
            <div class="user-cell">Rol</div>
        </div>
        <div v-for="user in filteredUsers " :key="user" class="user-row row"
            @click="showUserDetails(user.documento_usuario)">
            <div class="user-cell user-photo" :style="getUserImageStyle(user.foto_usuario)">
            </div>
            <div :class="{ 'user-cell': true, 'user-cell-empty': !user.documento_usuario }">{{ user.documento_usuario ||
                            noDataValue }}</div>
            <!-- <div :class="{ 'user-cell': true, 'user-cell-empty': !user.tipo_documentos }">{{ user.tipo_documentos ?
                user.tipo_documentos.tipo_documento : noDataValue }}</div> -->
            <div :class="{ 'user-cell': true, 'user-cell-empty': !user.nombre_usuario }" :title="user.nombre_usuario">{{
                            user.nombre_usuario ||
                            noDataValue
                            }}
            </div>
            <div :class="{ 'user-cell': true, 'user-cell-empty': !user.apellido_usuario }" :title="user.apellido_usuario">{{
                            user.apellido_usuario ||
                            noDataValue
                            }}</div>
            <div :class="{ 'user-cell': true, 'user-cell-empty': !user.celular_usuario }" :title="user.celular_usuario">
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
            <div :class="{ 'user-cell': true, 'user-cell-empty': !user.direccion_usuario }" :title="user.direccion_usuario">
                {{ user.direccion_usuario ||
                                noDataValue }}</div>
            <!-- <div :class="{ 'user-cell': true, 'user-cell-empty': !user.fecha_nacimiento_usuario }">{{
                getDate(user.fecha_nacimiento_usuario) }}</div> -->
            <!-- Cambiar por los datos de Roles -->
            <div :class="{ 'user-cell': true }">Empleado</div>
        </div>
        <UserDetails v-if="showDetails" :user-id="selectedUserId" :show="showDetails" @close="closeUserDetails" />
    </div>
</template>
  
<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '../store/UserStore';
import UserDetails from './UserDetails.vue'

const noDataValue = 'Vacío';
const userStore = useUserStore()
const searchTerm = ref("")
const showDetails = ref(false);
const selectedUserId = ref(null);

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
    console.log(userStore.users)

    if (searchTerm.value.trim() === '') {
        return userStore.users;
    } else {
        return userStore.filteredUsers;
    }
});

const filterUsers = async () => {
    const term = searchTerm.value.trim().toLowerCase();

    if (term === '') {
        userStore.fetchUsers();
    } else {
        userStore.filterUsers(term);
    }
};

const getUserImageStyle = (foto_usuario) => {
    const defaultImageUrl = 'url(src/assets/user.svg)';
    const backgroundImage = foto_usuario ? `url(${foto_usuario})` : defaultImageUrl;

    return { 'background-image': backgroundImage };
};

filterUsers()

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

.user-table {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.1fr auto;
    border-radius: 5px;
    margin: 0px 10px;
    gap: 8px;
    max-height: 63vh;
    overflow-y: auto;
}

.row {
    display: grid;
    grid-template-columns: .5fr 1fr 1fr 1fr 1fr 1fr .5fr 1fr 1fr;
    border-radius: 5px;
    background-color: var(--primary-color);
    padding: 5px;
    align-items: center;
    text-align: center;
}

.user-header {
    position: sticky;
    top: 0px;
    color: var(--black-color);
    font-weight: bold;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
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

.user-row>.user-photo {
    margin-left: 20px;
    width: 35px;
    height: 35px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('../assets/user.svg');
}

.user-header>.user-cell {
    -webkit-line-clamp: 3;
}

.user-cell-empty {
    color: gray;
    font-style: italic;
}

.user-row {
    cursor: pointer;
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
</style>