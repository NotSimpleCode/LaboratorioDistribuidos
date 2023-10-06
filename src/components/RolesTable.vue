<!-- <template>
    <section id="table-container">

    </section>
</template>

<script setup>
import { ref } from 'vue';
let rows = ref(0)

</script>

<style scoped>
#table-container {
    position: relative;
    right: 10px;
    background-color: var(--primary-color);
    display: inline-block;
}
</style>
*/ -->
<template>
    <div>
        <table class="role-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Fecha de creación</th>
                    <th>Estado</th>
                    <th>Descripción</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="role in roles" :key="role.id">
                    <td>{{ role.id }}</td>
                    <td>{{ role.name }}</td>
                    <td>{{ role.created_date }}</td>
                    <td>{{ role.state }}</td>
                    <td>{{ role.description }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const roles = ref([]);

const fetchRoles = async () => {
    try {
        //const response = await axios.get('http://localhost:3000/api/roles');
        const response = [{ id: 1, name: 'Admin', created_date: '2023-10-06T00:00:00.000Z', state: 'A', description: "Almost a god" }]
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
    width: 100%;
    border-collapse: collapse;
    border-spacing: 10px;
}

.role-table th,
.role-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.role-table th {
    background-color: #f2f2f2;
}

.role-table tr:nth-child(even) {
    background-color: #f2f2f2;
}
</style>
  