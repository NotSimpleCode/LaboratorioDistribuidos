<template>
    <div class="role-table">
        <div class="role-header row">
            <div class="role-cell">Id</div>
            <div class="role-cell">Nombre</div>
            <div class="role-cell">Fecha de creación</div>
            <div class="role-cell">Estado</div>
            <div class="role-cell">Descripción</div>
        </div>
        <div v-for="role in roles" :key="role.id" class="role-row row"> <!-- Filas de datos -->
            <div class="role-cell">{{ role.id }}</div>
            <div class="role-cell">{{ role.name }}</div>
            <div class="role-cell">{{ role.created_date.split("T")[0] }}</div>
            <div class="role-cell">{{ role.state }}</div>
            <div class="role-cell">{{ role.description }}</div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
//import RoleService from '../services/RoleService';

const roles = ref([]);


const fetchRoles = async () => {
    try {
        //roles.value = await RoleService.fetchAll() 
        const response = [
            { id: 1, name: 'Admin', created_date: '2023-10-06T00:00:00.000Z', state: 'A', description: "Almost a god" },
            { id: 2, name: 'user', created_date: '2023-10-06T00:00:00.000Z', state: 'A', description: "just an user" },
            { id: 3, name: 'user', created_date: '2023-10-06T00:00:00.000Z', state: 'A', description: "just an user" },
            { id: 4, name: 'user', created_date: '2023-10-06T00:00:00.000Z', state: 'A', description: "just an user" },
            { id: 5, name: 'user', created_date: '2023-10-06T00:00:00.000Z', state: 'A', description: "just an user" },
            { id: 6, name: 'user', created_date: '2023-10-06T00:00:00.000Z', state: 'A', description: "just an user" },
            { id: 7, name: 'user', created_date: '2023-10-06T00:00:00.000Z', state: 'A', description: "just an user" },
            { id: 8, name: 'user', created_date: '2023-10-06T00:00:00.000Z', state: 'A', description: "just an user" },
            { id: 9, name: 'user', created_date: '2023-10-06T00:00:00.000Z', state: 'A', description: "just an user" },
            { id: 10, name: 'user', created_date: '2023-10-06T00:00:00.000Z', state: 'A', description: "just an user" },
            { id: 11, name: 'user', created_date: '2023-10-06T00:00:00.000Z', state: 'A', description: "just an user" }, { id: 6, name: 'user', created_date: '2023-10-06T00:00:00.000Z', state: 'A', description: "just an user" },
            { id: 7, name: 'user', created_date: '2023-10-06T00:00:00.000Z', state: 'A', description: "just an user" },
            { id: 8, name: 'user', created_date: '2023-10-06T00:00:00.000Z', state: 'A', description: "just an user" },
            { id: 9, name: 'user', created_date: '2023-10-06T00:00:00.000Z', state: 'A', description: "just an user" },
            { id: 10, name: 'user', created_date: '2023-10-06T00:00:00.000Z', state: 'A', description: "just an user" },
            { id: 11, name: 'user', created_date: '2023-10-06T00:00:00.000Z', state: 'A', description: "just an user" }
        ];
        roles.value = response;
        console.log(roles)
    } catch (error) {
        console.error('Error al obtener roles:', error);
    }
};
onMounted(() => {
    fetchRoles();
});
</script>
  
<style scoped>
.role-table {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.1fr auto;
    border-radius: 5px;
    margin: 0px 10px;
    gap: 8px;
}

.role-header {
    color: var(--black-color);
    font-weight: bold;
}

.role-table {
    max-height: 63vh;
    overflow-y: auto;
}

.row {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    border-radius: 5px;
    background-color: var(--primary-color);
    padding: 10px;
    align-items: center;
    text-align: center;
}

.role-cell {
    padding: 0px 15px;
    font-size: .9rem;
}
</style>
