<template>
    <div class="user-details" v-if="show && userLoaded">
        <div class="details-content">
            <h2>Detalles del Usuario</h2>
            <div class="image-upload">
                <label for="fileInput" class="image-preview user-photo" @click.prevent="openFileInput" :style="imageStyle">
                    <div class=" overlay">
                        <span>Cargar imagen</span>
                    </div>
                </label>
                <input type="file" id="fileInput" accept="image/*" @change="handleFileUpload" style="display: none" />
            </div>
            <div v-if="user" class="user-content">
                <div class='user-detail'>
                    <label>Tipo de documento: </label>
                    <input type="text" :placeholder="user.tipo_documentos.tipo_documento" :disabled="!isUserAdmin()"
                        :style="adminStyle()" />
                </div>
                <div class="user-detail">
                    <label>Número Documento: </label>
                    <input type="text" :placeholder="user.documento_usuario" disabled />
                </div>
                <div class="user-detail">
                    <label>Nombre(s): </label>
                    <input type="text" :placeholder="user.nombre_usuario" :disabled="!isUserAdmin()" :style="adminStyle()"
                        v-model="updatedUser.nombre_usuario" />
                </div>
                <div class='user-detail'><label>Apellido(s): </label>
                    <input type="text" :placeholder="user.apellido_usuario" :disabled="!isUserAdmin()" :style="adminStyle()"
                        v-model="updatedUser.apellido_usuario" />
                </div>
                <div class='user-detail'><label>Celular: </label>
                    <input type="text" :placeholder="user.celular_usuario" :disabled="!isUserAdmin()" :style="adminStyle()"
                        v-model="updatedUser.celular_usuario" />
                </div>
                <div class='user-detail'><label>Estado: </label><input type="text" :placeholder="user.estado_usuario"
                        :disabled="!isUserAdmin()" :style="adminStyle()" v-model="updatedUser.estado_usuario" />
                </div>
                <div class='user-detail'><label>Correo Electronico: </label>
                    <input type="text" :placeholder="user.direccion_usuario" :disabled="!isUserAdmin()"
                        :style="adminStyle()" v-model="updatedUser.direccion_usuario" />
                </div>
                <div class='user-detail'><label>Fecha de nacimiento: </label>
                    <input type="text" :placeholder="getDate(user.fecha_nacimiento_usuario)" :disabled="!isUserAdmin()"
                        :style="adminStyle()" v-model="updatedUser.fecha_nacimiento_usuario" />
                </div>
                <div class='user-detail'><label>Fecha de registro: </label>
                    <input type="text" :placeholder="getDate(user.fecha_registro_usuario)" disabled />
                </div>
            </div>
            <input class="update-btn btn" v-if="isUserAdmin()" type="button" value="Actualizar" @click="updateUser()"
                :disabled="!isUserModified()">
            <input class="close-btn btn" type="button" value="Volver" @click="closeDetails">
        </div>
    </div>
</template>
  
<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue';
import { useUserStore } from '../store/UserStore';
import { useAuthStore } from '../store/AuthStore';

const userStore = useUserStore();
const authStore = useAuthStore();

const emits = defineEmits(['close']);
const selectedImage = ref(null)
const imageUrl = ref()
const defaultImg = ref('src/assets/user.svg')
const userLoaded = ref(false);
const user = ref()
const updatedUser = ref({
    // tipo_documento_usuario: null,
    nombre_usuario: null,
    apellido_usuario: null,
    celular_usuario: null,
    estado_usuario: null,
    direccion_usuario: null,
    fecha_nacimiento_usuario: null,
})

const props = defineProps({
    userId: Number,
    show: Boolean,
});

const updateUser = async () => {
    const response = await userStore.patchUser(props.userId, updatedUser.value)
    await userStore.fetchPage()
    closeDetails()
}

const loadUserDetails = async () => {
    if (!userLoaded.value) {
        user.value = userStore.getUserDetails(props.userId);
        userLoaded.value = true;
    }
};

const adminStyle = () => {
    return { border: isUserAdmin() ? '1px solid lightgray' : 'none' }
}

const updateImg = async () => {
    await userStore.updateImg(user.value.documento_usuario, selectedImage.value, authStore.token)
    authStore.reloadOnlineUser()
}

const imageStyle = computed(() => ({
    backgroundImage: user.value.foto_usuario ? `url(${user.value.foto_usuario})` : `url(${defaultImg.value})`,
}));

const closeDetails = () => {
    emits('close');
};

function openFileInput() {
    document.getElementById('fileInput').click();
}

async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        selectedImage.value = file
        imageUrl.value = URL.createObjectURL(file);
    }
    await updateImg(imageUrl);
}

const getDate = (time) => {
    if (time != null) {
        return time.split("T")[0];
    }
    return "";
}

function isUserAdmin() {
    const isAdmin = authStore.onlineUser.rol.includes('administrador')
    return isAdmin
}

const isUserModified = () => {
    for (var key in updatedUser.value) {
        if (updatedUser.value[key] !== null && updatedUser.value[key] !== "") {
            return true;
        }
    }
    return false;
}


watchEffect(() => {
    if (!props.show) {
        closeDetails();
    }
});

onMounted(loadUserDetails);

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
    z-index: 50;
}

.details-content {
    height: 80%;
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: .5fr 3fr .5fr .5r;
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

.btn {
    grid-column: 1/-1;
    display: block;
    margin: 5px;
    padding: 10px 20px;
    background: var(--third-color);
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

.btn:hover {
    background: #0073e6;
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
    user-select: none;
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

input:not(input[type="button"]) {
    padding: 5px;
    color: var(--black-color);
}

input::placeholder {
    color: var(--black-color);
    font-weight: bold;
}

input::placeholder:focus {
    border-style: none;

}

.update-btn {
    grid-row: 3/4;
}

.update-btn:disabled {
    background-color: lightgray;
    color: gray;
    cursor: not-allowed;
}

.update-btn:disabled:hover {
    background-color: lightgray;
    color: gray;
    cursor: not-allowed;
}

.close-btn {
    grid-row: 4/5;
}
</style>
  