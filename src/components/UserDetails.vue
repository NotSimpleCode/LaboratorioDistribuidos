<template>
    <div class="user-details" v-if="show">
        <div class="details-content">
            <h2>Detalles del Usuario</h2>
            <div class="image-upload">
                <label for="fileInput" class="image-preview" @click.prevent="openFileInput" :style=imageStyle>
                    <div class="overlay">
                        <span>Cargar imagen</span>
                    </div>
                </label>
                <input type="file" id="fileInput" accept="image/*" @change="handleFileUpload" style="display: none" />
            </div>
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
            <input class="close-btn" type="button" value="Aceptar" @click="closeDetails">
        </div>
    </div>
</template>
  
<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useUserStore } from '../store/UserStore';
import { useAuthStore } from '../store/AuthStore';

const userStore = useUserStore();
const authStore = useAuthStore()
const emits = defineEmits(['close']);
const selectedImage = ref(null)
const imageUrl = ref('src/assets/user.svg')

const props = defineProps({
    userId: Number, // ID del usuario seleccionado
    show: Boolean, // Si se muestra o no el componente
});

const updateImg = () => {
    userStore.updateImg(user.value.documento_usuario, selectedImage.value, authStore.token)
}

const imageStyle = computed(() => ({
    backgroundImage: user.value.foto_usuario ? `url(${user.value.foto_usuario})` : `url(${imageUrl.value})`,
}));

const user = computed(() => {
    return userStore.getUserDetails(props.userId);
});

const closeDetails = () => {
    updateImg();
    userStore.fetchPage()
    emits('close');
};

function openFileInput() {
    document.getElementById('fileInput').click();
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        selectedImage.value = file
        imageUrl.value = URL.createObjectURL(file);
    }
}


watchEffect(() => {
    selectedImage;
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
    grid-template-columns: 1fr 3fr;
    grid-template-rows: .5fr 3fr .5fr;
}

h2 {
    grid-column: 1/-1;
    text-align: center;
}

.image-container {
    align-self: center;
}

.change-photo {
    margin: 15px;
    cursor: pointer;
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
    height: 140px;
    width: 140px;
    background-size: contain;
    background-repeat: no-repeat;
    align-self: center;
}

.detail-empty {
    font-style: italic;
    color: gray;
}

.close-btn {
    grid-row: -1;
    grid-column: 1/-1;
}

.image-upload {
    text-align: center;
    background-color: transparent;
    width: 140px;
    height: 140px;
}


.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: transparent;
}

.overlay:hover {
    color: white;
    background: rgba(0, 0, 0, 0.5);
}

.overlay span {
    cursor: pointer;
}

.image-preview {
    position: relative;
    display: inline-block;
    cursor: pointer;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border: 2px solid white;
    border-radius: 50%;
    top: 40%;

}
</style>
  