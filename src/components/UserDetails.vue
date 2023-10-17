<template>
    <div class="user-details" v-if="show">
        <div class="details-content">
            <h2>Detalles del Usuario</h2>
            <div class="user-photo" :style="getUserImageStyle(user.foto_usuario)"></div>
            <div v-if="user" class="user-content">
                <div class='user-detail'><label>Tipo de documento: </label><strong>{{ user.tipo_documentos.tipo_documento
                }}</strong></div>
                <div class='user-detail'><label>Número de documento: </label><strong> {{ user.documento_usuario }}</strong>
                </div>
                <div class='user-detail'><label>Nombre: </label><strong> {{ user.nombre_usuario }}</strong></div>
                <div class='user-detail'><label>Apellido: </label><strong> {{ user.apellido_usuario }}</strong></div>
                <div class='user-detail'><label>Celular: </label><strong> {{ user.celular_usuario }}</strong></div>
                <div class='user-detail'><label>Estado: </label><strong> {{ user.estado_usuario }}</strong></div>
                <div class='user-detail'><label>Dirección: </label><strong>{{ user.direccion_usuario }}</strong></div>
                <div class='user-detail'><label>Fecha de nacimiento: </label><strong> {{ user.fecha_nacimiento_usuario
                }}</strong></div>
                <div class='user-detail'><label>Fecha de registro: </label><strong> {{ user.fecha_registro_usuario }}
                    </strong></div>
                <!-- <div><strong>Rol:</strong> {{ user.rol}}</div> -->
            </div>
            <input class="close-btn" type="button" value="Cerrar" @click="closeDetails">
        </div>
    </div>
</template>
  
<script setup>
import { computed, watchEffect } from 'vue';
import { useUserStore } from '../store/UserStore';

const userStore = useUserStore();
const emits = defineEmits(['close']);

const props = defineProps({
    userId: Number, // ID del usuario seleccionado
    show: Boolean, // Si se muestra o no el componente
});

const user = computed(() => {
    return userStore.getUserDetails(props.userId);
});

const closeDetails = () => {
    emits('close');
};

const getUserImageStyle = (foto_usuario) => {
    const defaultImageUrl = 'url(src/assets/user.svg)';
    const backgroundImage = foto_usuario ? `url(${foto_usuario})` : defaultImageUrl;

    return { 'background-image': backgroundImage };
};

watchEffect(() => {
    if (!props.show) {
        closeDetails();
    }
});
</script>
  
<style scoped>
.user-details {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.details-content {
    max-width: 60%;
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: .5fr 3fr .5fr;
}

h2 {
    grid-column: 1/-1;
    text-align: center;
}



.user-detail {
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1.5fr;
    grid-template-rows: repeat(1, 1fr);
    align-items: center;
    padding-top: 10px;
}

.user-photo {
    background-color: blue;
    width: 140px;
    height: 140px;
    background-size: contain;
    background-repeat: no-repeat;
    align-self: center;
    cursor: pointer;
}

.detail-empty {
    font-style: italic;
    color: gray;
}

.close-btn {
    grid-row: -1;
    grid-column: 1/-1;
}
</style>
  