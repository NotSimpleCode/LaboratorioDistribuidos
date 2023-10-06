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
        <table class="user-table">
            <thead>
                <tr>
                    <th>Número de Documento</th>
                    <th>Tipo de Documento</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Celular</th>
                    <th>Fecha de Registro</th>
                    <th>Estado</th>
                    <th>Dirección</th>
                    <th>Fecha de Nacimiento</th>
                    <th>Rol</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="usuario in usuarios" :key="usuario.document">
                    <td>{{ usuario.document }}</td>
                    <td>{{ usuario.types_document.type_document }}</td>
                    <td>{{ usuario.name }}</td>
                    <td>{{ usuario.last_name }}</td>
                    <td>{{ usuario.number_phone }}</td>
                    <td>{{ usuario.registration_date }}</td>
                    <td>{{ usuario.state }}</td>
                    <td>{{ usuario.address }}</td>
                    <td>{{ usuario.birth_date }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const usuarios = ref([]);

const fetchUsuarios = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/users');
        usuarios.value = response.data;
        console.log(usuarios)
    } catch (error) {
        console.error('Error al obtener usuarios y roles:', error);
    }
};

onMounted(() => {
    fetchUsuarios();
});
</script>
  
<style scoped>
.user-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 10px;
}

.user-table th,
.user-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.user-table th {
    background-color: #f2f2f2;
}

.user-table tr:nth-child(even) {
    background-color: #f2f2f2;
}
</style>
  