<template>
    <div class="user-table">
        <div class="user-header row">
            <div class="user-cell">N° Doc</div>
            <div class="user-cell">Tipo Doc</div>
            <div class="user-cell">Nombre</div>
            <div class="user-cell">Apellido</div>
            <div class="user-cell">Celular</div>
            <div class="user-cell">Fecha de Registro</div>
            <div class="user-cell">Estado</div>
            <div class="user-cell">Dirección</div>
            <div class="user-cell">Fecha de Nacimiento</div>
            <div class="user-cell">Rol</div>
        </div>
        <div v-for="user in users" :key="user.documento_usuario" class="user-row row">
            <div :class="{ 'user-cell': true, 'user-cell-empty': !user.documento_usuario }">{{ user.documento_usuario ||
                noDataValue }}</div>
            <div :class="{ 'user-cell': true, 'user-cell-empty': !user.tipo_documentos }">{{ user.tipo_documentos ?
                user.tipo_documentos.tipo_documento : noDataValue }}</div>
            <div :class="{ 'user-cell': true, 'user-cell-empty': !user.nombre_usuario }" :title="user.nombre_usuario">{{
                user.nombre_usuario ||
                noDataValue
            }}
            </div>
            <div :class="{ 'user-cell': true, 'user-cell-empty': !user.apellido_usuario }" :title="user.apellido_usuario">{{
                user.apellido_usuario ||
                noDataValue
            }}</div>
            <div :class="{ 'user-cell': true, 'user-cell-empty': !user.celular_usuario }" :title="user.celular_usuario">{{
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
            <div :class="{ 'user-cell': true, 'user-cell-empty': !user.fecha_nacimiento_usuario }">{{
                getDate(user.fecha_nacimiento_usuario) }}</div>

            <!-- <div class="user-cell">{{ user.roles.map(role => role.id_rol.nombre_rol).join(', ') }}</div> -->
        </div>
    </div>
</template>
  
<script setup>

import UserService from '../services/UserService'
import { ref, onMounted } from 'vue';
// import axios from 'axios'; 

const users = ref([{}])
const noDataValue = 'Vacío';

const getDate = (time) => {
    if (time != null) {
        return time.split("T")[0];
    }
    return noDataValue;
}

const fetchUsers = async () => {
    users.value = await UserService.fetchAll()
    console.log(users)
};

onMounted(() => {
    fetchUsers();
});
</script>
  
<style scoped>
.user-table {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.1fr auto;
    border-radius: 5px;
    margin: 0px 10px;
    gap: 8px;
}

.user-table {
    max-height: 63vh;
    overflow-y: auto;
}

.row {
    display: grid;
    grid-template-columns: .5fr 1fr 1fr 1fr 1fr 1fr .5fr 1fr 1fr 1fr;
    border-radius: 5px;
    background-color: var(--primary-color);
    padding: 10px;
    align-items: center;
    text-align: center;
}

.user-header {
    color: var(--black-color);
    font-weight: bold;
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
    background-color: var(--background-color);
}
</style>