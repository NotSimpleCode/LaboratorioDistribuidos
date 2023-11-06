<template>
    <div class="role-details" v-if="show && roleLoaded">
        <div class="details-content">
            <h2><span v-if="isUserAdmin()">Modificar/</span>Ver Datos de Rol</h2>
            <div v-if="role" class="user-content">
                <form @submit.prevent="updateRole" id="roleForm">
                    <div class="role-detail">
                        <label>Id Rol:</label>
                        <input type="text" :value="role.id_rol" :style="adminStyle()" disabled />
                    </div>
                    <div class="role-detail">
                        <label>Rol:</label>
                        <input type="text" id="miInput" :disabled="!isUserAdmin()" :style="adminStyle()"
                            v-model="updatedRole.nombre_rol" :class="{ 'invalid': !isNameValid }"
                            @input="validateName(updatedRole.nombre_rol)" />
                    </div>
                    <div class="role-detail">
                        <label>Estado:</label>
                        <input type="text" :disabled="!isUserAdmin()" :style="adminStyle()" v-model="updatedRole.estado_rol"
                            :class="{ 'invalid': !isValidStatus }" @input="validateStatus(updatedRole.estado_rol)" />
                    </div>
                    <div class="role-detail">
                        <label>Personas con Rol:</label>
                        <input type="text" :style="adminStyle()" :value="updatedRole.numero_personas_roles" disabled />
                    </div>
                    <div class="role-detail">
                        <label>Fecha de Creación:</label>
                        <input type="text" :placeholder="utilityStore.formatDate(role.fecha_creacion_rol)" disabled />
                    </div>
                    <div class="role-detail">
                        <label>Descripción:</label>
                        <input type="text" id="description-input" :disabled="!isUserAdmin()" :style="adminStyle()"
                            v-model="updatedRole.descripcion_rol" :class="{ 'invalid': !isDescriptionValid }"
                            @input="validateDescription(updatedRole.descripcion_rol)" />
                    </div>
                </form>
            </div>
            <input class="update-btn btn" v-if="isUserAdmin()" type="submit" form="roleForm" value="Actualizar"
                :disabled="!isDataValid()" />
            <input class="close-btn btn" type="button" :value="isUserAdmin() ? 'Cancelar' : 'Volver'" @click="closeDetails">
        </div>
    </div>
</template>
  
<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '../store/AuthStore';
import { useUtilityStore } from '../store/UtilityStore'
import { useRoleStore } from '../store/RoleStore'

const roleStore = useRoleStore();
const authStore = useAuthStore();
const utilityStore = useUtilityStore()

const emits = defineEmits(['close']);
const roleLoaded = ref(false);
const role = ref()
const isEditingDate = ref(false)

const isNameValid = ref(true)
const isDescriptionValid = ref(true)
const isValidStatus = ref(true)

const props = defineProps({
    roleId: Number,
    show: Boolean,
});

const updatedRole = ref({
    id_rol: null,
    nombre_rol: null,
    estado_rol: null,
    numero_personas_roles: null,
    fecha_creacion_rol: null,
    descripcion_rol: null,
})

const loadRoleDetails = async () => {
    if (!roleLoaded.value) {
        role.value = await roleStore.getRoleById(props.roleId);
        updatedRole.value = JSON.parse(JSON.stringify(role.value));

        // updatedUser.value.id_usuario = user.value.id_usuario
        // updatedUser.value.fecha_nacimiento_usuario = user.value.fecha_nacimiento_usuario
        roleLoaded.value = true;
    }
};

const updateRole = async () => {
    const data = {
        nombre_rol: updatedRole.value.nombre_rol,
        estado_rol: updatedRole.value.estado_rol,
        descripcion_rol: updatedRole.value.descripcion_rol
    }
    const response = await roleStore.updateRole(props.roleId, data)
    console.log(response.message)
    closeDetails()
    await roleStore.fetchRoles()
}

const adminStyle = () => {
    return { border: isUserAdmin() ? '1px solid lightgray' : 'none' }
}

const closeDetails = () => {
    authStore.reloadOnlinePerson()
    emits('close');
};

function isUserAdmin() {
    const isAdmin = authStore.onlineUser.rol.includes('administrador')
    const isOnlineUser = authStore.onlineUser.personId === props.roleId
    return isAdmin || isOnlineUser
}

//validar que los campos cambiados sean validos
function isDataValid() {
    return (isUserModified() && isNameValid.value && isValidStatus.value && isDescriptionValid.value)
}

//Validar que hayan cambios en los campos
function isUserModified() {
    console.log(role.value.nombre_rol)
    if (updatedRole.value.nombre_rol != role.value.nombre_rol) {
        return true;
    }
    if (updatedRole.value.estado_rol !== role.value.estado_rol) {
        return true;
    }
    if (updatedRole.value.descripcion_rol !== role.value.descripcion_rol) {
        return true
    }
    return false

}

const validateName = (name) => {
    isNameValid.value = utilityStore.validateTextField(name)
}

const validateDescription = (description) => {
    isDescriptionValid.value = utilityStore.validateTextField(description)
}

const validateStatus = (status) => {
    isValidStatus.value = utilityStore.validateStatus(status)
}

function handleDocumentClick(event) {
    const target = event.target
    const isText = target.closest('.birthdate-text')
    if (!isText) {
        isEditingDate.value = false
    }
}

watchEffect(() => {
    if (!props.show) {
        closeDetails();
    }

});

onMounted(() => {
    loadRoleDetails()
})

onUnmounted(() => {
    document.removeEventListener('click', handleDocumentClick);
});
</script>
  
<style scoped>
.role-details {
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
    height: 65%;
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: .3fr 2fr .3fr .3fr;
}

h2 {
    grid-column: 1/-1;
    text-align: center;
}

#doc-update-select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 5px;
    font-weight: bold;
}

.role-detail {
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

.invalid {
    font-style: italic;
    background-color: rgba(255, 0, 0, 0.5);
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
}

.description-input {
    height: 30px;
}
</style>
  