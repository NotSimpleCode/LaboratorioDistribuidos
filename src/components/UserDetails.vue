<template>
    <div class="person-details" v-if="show && personLoaded">
        <div class="details-content">
            <h2>Modificar/Ver Datos de Persona</h2>
            <div class="image-upload">
                <label for="fileInput" class="image-preview user-photo" @click.prevent="openFileInput" :style="imageStyle">
                    <div class=" overlay">
                        <span>Cargar imagen</span>
                    </div>
                </label>
                <input type="file" id="fileInput" accept="image/*" @change="handleFileUpload" style="display: none" />
            </div>
            <div v-if="person" class="user-content">
                <form @submit.prevent="updatePerson">
                    <div class="person-detail" id="doc-update">
                        <label>Tipo de documento:</label>
                        <select v-model="updatedPerson.tipo_documento_usuario" :disabled="!isUserAdmin()"
                            :style="adminStyle()" id="doc-update-select">
                            <option v-for="docType in utilityStore.docTypes" :key="docType.id_tipo_documento"
                                :value="docType.id_tipo_documento">
                                {{ docType.tipo_documento }}
                            </option>
                        </select>
                    </div>
                    <div class="person-detail">
                        <label>Número Documento:</label>
                        <input type="text" :placeholder="person.documento_usuario" disabled :style="adminStyle()" />
                    </div>
                    <div class="person-detail">
                        <label>Nombre(s):</label>
                        <input type="text" id="miInput" :placeholder="person.nombre_usuario" :disabled="!isUserAdmin()"
                            :style="adminStyle()" v-model="updatedPerson.nombre_usuario" />
                    </div>
                    <div class="person-detail">
                        <label>Apellido(s):</label>
                        <input type="text" :placeholder="person.apellido_usuario" :disabled="!isUserAdmin()"
                            :style="adminStyle()" v-model="updatedPerson.apellido_usuario" />
                    </div>
                    <div class="person-detail">
                        <label>Celular:</label>
                        <input type="text" :placeholder="person.celular_usuario" :disabled="!isUserAdmin()"
                            :style="adminStyle()" v-model="updatedPerson.celular_usuario" />
                    </div>
                    <div class="person-detail">
                        <label>Estado:</label>
                        <input type="text" :placeholder="person.estado_usuario" :disabled="!isUserAdmin()"
                            :style="adminStyle()" v-model="updatedPerson.estado_usuario" />
                    </div>
                    <div class="person-detail">
                        <label>Correo Electrónico:</label>
                        <input type="email" :placeholder="person.direccion_usuario" :disabled="!isUserAdmin()"
                            :style="adminStyle()" v-model="updatedPerson.direccion_usuario" />
                    </div>
                    <div class="person-detail">
                        <label>Fecha de nacimiento:</label>
                        <input v-if="!isEditingDate" class="birthdate-text" type="text" :disabled="!isUserAdmin()"
                            :style="adminStyle()" @click="isEditingDate = true" :value="formattedDate" />
                        <input v-else class="birthdate-date" type="date" :disabled="!isUserAdmin()" :style="adminStyle()"
                            v-model="updatedPerson.fecha_nacimiento_usuario" :min="utilityStore.calculateDate(100)"
                            :max="utilityStore.calculateDate(14)" />
                    </div>
                    <div class="person-detail">
                        <label>Fecha de registro:</label>
                        <input type="text" :placeholder="utilityStore.formatDate(person.fecha_registro_usuario)" disabled
                            :style="adminStyle()" />
                    </div>
                    <input class="update-btn btn" v-if="isUserAdmin()" type="submit" value="Actualizar"
                        :disabled="!isUserModified()" />
                    <input class="reset-btn btn" v-if="isUserAdmin()" type="reset" value="Reestablecer"
                        :disabled="!isUserModified()" />
                </form>
                <input class="close-btn btn" type="button" value="Volver" @click="closeDetails">
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, computed, watchEffect, onMounted, onBeforeMount, onUnmounted } from 'vue';
import { useUserStore } from '../store/UserStore';
import { useAuthStore } from '../store/AuthStore';
import DocTypeService from '../services/DocTypeService';
import { useUtilityStore } from '../store/UtilityStore'

const userStore = useUserStore();
const authStore = useAuthStore();
const utilityStore = useUtilityStore()

const emits = defineEmits(['close']);
const selectedImage = ref(null)
const imageUrl = ref()
const defaultImg = ref('src/assets/user.svg')
const personLoaded = ref(false);
const person = ref()
const isEditingDate = ref(false)
const formattedDate = ref()

const props = defineProps({
    personId: Number,
    show: Boolean,
});

const loadPersonDetails = async () => {
    if (!personLoaded.value) {
        person.value = userStore.getUserDetails(props.personId);
        personLoaded.value = true;
    }
};

const updatedPerson = ref({
    tipo_documento_usuario: null,
    nombre_usuario: null,
    apellido_usuario: null,
    celular_usuario: null,
    estado_usuario: null,
    direccion_usuario: null,
    fecha_nacimiento_usuario: null,
})

const updatePerson = async () => {
    updatedPerson.value.fecha_nacimiento_usuario = utilityStore.formatISO(updatedPerson.value.fecha_nacimiento_usuario)
    const response = await userStore.patchUser(props.personId, updatedPerson.value)
    await userStore.fetchPage()
    closeDetails()
}

const adminStyle = () => {
    return { border: isUserAdmin() ? '1px solid lightgray' : 'none' }
}

const updateImg = async () => {
    await userStore.updateImg(person.value.documento_usuario, selectedImage.value, authStore.token)
    authStore.reloadOnlinePerson()
}

const imageStyle = computed(() => ({
    backgroundImage: person.value.foto_usuario ? `url(${person.value.foto_usuario})` : `url(${defaultImg.value})`,
}));

const closeDetails = () => {
    authStore.reloadOnlinePerson()
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

function isUserAdmin() {
    const isAdmin = authStore.onlineUser.rol.includes('administrador')
    return isAdmin
}

function isUserModified() {
    if (updatedPerson.value.tipo_documento_usuario !== person.value.tipo_documento_usuario) {
        return true;
    }
    if (updatedPerson.value.fecha_nacimiento_usuario !== person.value.fecha_nacimiento_usuario) {
        return true;
    }

    for (var key in updatedPerson.value) {
        if ((key !== 'tipo_documento_usuario') && (key !== 'fecha_nacimiento_usuario') && (updatedPerson.value[key] !== null && updatedPerson.value[key] !== "")) {
            return true;
        }
    }
    return false;
}

const fetchDocTypes = async () => {
    utilityStore.docTypes = await DocTypeService.fetchAllDocs()
}

function handleDocumentClick(event) {
    const target = event.target
    const isText = target.closest('.birthdate-text')
    if (!isText) {
        isEditingDate.value = false
    }
}

function updateFormattedDate() {
    formattedDate.value = utilityStore.formatDate(updatedPerson.value.fecha_nacimiento_usuario)
}

watchEffect(() => {
    if (!props.show) {
        closeDetails();
    }
    updateFormattedDate()

});

onMounted(() => {
    loadPersonDetails()
    updatedPerson.value.tipo_documento_usuario = person.value.tipo_documento_usuario
    updatedPerson.value.fecha_nacimiento_usuario = person.value.fecha_nacimiento_usuario
})

onBeforeMount(() => {
    fetchDocTypes()
})

onUnmounted(() => {
    document.removeEventListener('click', handleDocumentClick);
});
</script>
  
<style scoped>
.person-details {
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

#doc-update-select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 5px;
    font-weight: bold;
}

.person-detail {
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1.5fr;
    grid-template-rows: repeat(1, 1fr);
    align-items: center;
    padding-top: 10px;
}

.birthdate-text {
    font-weight: bold;
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
  