<template>
    <div>
        <h1>Roles</h1>
        <ul>
            <li v-for="rol in roles" :key="rol.id_rol">
                <p><strong>Nombre del Rol:</strong> {{ rol.nombre_rol }}</p>
                <p><strong>Fecha de Creación:</strong> {{ rol.fecha_creacion_rol }}</p>
                <p><strong>Estado:</strong> {{ rol.estado_rol }}</p>
                <p><strong>Descripción:</strong> {{ rol.descripcion_rol }}</p>
            </li>
        </ul>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const roles = ref([]);

const fetchRoles = async () => {
    try {
        const response = await axios.get('http://localhost:3000/connection');
        roles.value = response.data;
    } catch (error) {
        console.error('Error al obtener roles:', error);
    }
};

onMounted(() => {
    fetchRoles();
});
</script>
  