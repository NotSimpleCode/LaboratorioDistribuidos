<template>
    <div class="role-details" v-if="show && roleLoaded">
        <div v-if="!roleStore.isRoleRegister" class="details-content">
            <h2 class="role-details-title"><span v-if="isSuperAdmin()">Modificar/</span>Ver Datos de Rol</h2>
            <div v-if="role" class="user-content">
                <form @submit.prevent="updateRole" id="roleForm">
                    <div class="role-detail">
                        <label>Id Rol:</label>
                        <input type="text" :value="role.id_rol" :style="adminStyle()" disabled />
                    </div>
                    <div class="role-detail">
                        <label>Rol:</label>
                        <input type="text" id="miInput" :disabled="!isSuperAdmin()" :style="adminStyle()"
                            v-model="updatedRole.nombre_rol" :class="{ 'invalid': !isNameValid }"
                            @input="validateName(updatedRole.nombre_rol)" />
                    </div>
                    <div class="role-detail">
                        <label>Estado:</label>
                        <select v-model="updatedRole.estado_rol" id="status-select" :disabled="!isSuperAdmin()"
                            :style="adminStyle()">
                            <option v-for="status in utilityStore.status" :value="status" :key="status">{{ status }}
                            </option>
                        </select>
                        <!-- <input type="text" :disabled="!isUserAdmin()" :style="adminStyle()" v-model="updatedRole.estado_rol"
                            :class="{ 'invalid': !isValidStatus }" @input="validateStatus(updatedRole.estado_rol)" /> -->
                    </div>
                    <div class="role-detail">
                        <label>Personas con Rol:</label>
                        <input type="text" :style="adminStyle()" :value="updatedRole.numero_personas_roles" disabled />
                    </div>
                    <div class="role-detail">
                        <label>Fecha de Creación:</label>
                        <input type="text" :placeholder="utilityStore.formatDate(role.fecha_creacion_rol)"
                            :style="adminStyle()" disabled />
                    </div>
                    <div class="role-detail">
                        <label>Descripción:</label>
                        <input type="text" id="description-input" :disabled="!isSuperAdmin()" :style="adminStyle()"
                            v-model="updatedRole.descripcion_rol" :class="{ 'invalid': !isDescriptionValid }"
                            @input="validateDescription(updatedRole.descripcion_rol)" />
                    </div>
                </form>
            </div>
            <input id="up-btn" class="update-btn btn" v-if="isSuperAdmin()" type="submit" form="roleForm" value="Actualizar"
                :disabled="!isDataValid()" />

            <input class="close-btn btn" type="button" :value="isSuperAdmin() ? 'Cancelar' : 'Volver'"
                @click="closeDetails">
        </div>
        <!-- Formulario para crear rol -->
        <div v-else class="details-content">
            <h2 class="role-details-title">Crear Rol</h2>
            <div class="user-content">
                <form @submit.prevent="createRole" id="createRoleForm">
                    <div class="role-detail">
                        <label>Id Rol:</label>
                        <input type="text" v-model="updatedRole.id_rol" :class="{ 'invalid': !isValidNumber }"
                            @input="validateIdField(updatedRole.id_rol)" />
                    </div>
                    <div class="role-detail">
                        <label>Rol:</label>
                        <input type="text" id="miInput" v-model="updatedRole.nombre_rol"
                            :class="{ 'invalid': !isNameValid }" @input="validateName(updatedRole.nombre_rol)" />
                    </div>
                    <div class="role-detail">
                        <label>Estado:</label>
                        <!-- <input type="text" v-model="updatedRole.estado_rol" :class="{ 'invalid': !isValidStatus }"
                            @input="validateStatus(updatedRole.estado_rol)" /> -->
                        <select v-model="updatedRole.estado_rol" id="status-select">
                            <option v-for="status in utilityStore.status" :value="status" :key="status">{{ status }}
                            </option>
                        </select>
                    </div>
                    <div class="role-detail">
                        <label>Personas con Rol:</label>
                        <input type="text" :value="updatedRole.numero_personas_roles" disabled />
                    </div>
                    <div class="role-detail">
                        <label>Fecha de Creación:</label>
                        <input type="text" disabled>
                    </div>
                    <div class="role-detail">
                        <label>Descripción:</label>
                        <input type="text" id="description-input" v-model="updatedRole.descripcion_rol"
                            :class="{ 'invalid': !isDescriptionValid }"
                            @input="validateDescription(updatedRole.descripcion_rol)" />
                    </div>
                </form>
            </div>
            <input id="up-btn" class="update-btn btn" v-if="isSuperAdmin()" type="submit" form="createRoleForm"
                value="Crear" :disabled="!isValidCreate()" />

            <input class="close-btn btn" type="button" value="Cancelar" @click="closeDetails">
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
const isValidNumber = ref(true)

const isAdmin = () => {
    return authStore.isUserAdmin()
}

const isSuperAdmin = () => {
    return authStore.isSuperAdmin()
}

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
        roleLoaded.value = true;
    }
};

const createRole = async () => {
    updatedRole.value.fecha_creacion_rol = new Date().toISOString()
    updatedRole.value.id_rol = parseInt(updatedRole.value.id_rol)
    const response = await roleStore.postRole(updatedRole.value)
    closeDetails()
    roleStore.fetchRoles()
}

const updateRole = async () => {
    const data = {
        nombre_rol: updatedRole.value.nombre_rol,
        estado_rol: updatedRole.value.estado_rol,
        descripcion_rol: updatedRole.value.descripcion_rol
    }
    console.log(data);
    const response = await roleStore.updateRole(props.roleId, data)
    console.log(response.message)
    closeDetails()
    await roleStore.fetchRoles()
}

const adminStyle = () => {
    return { border: isSuperAdmin() ? '1px solid lightgray' : 'none' }
}

const closeDetails = () => {
    emits('close');
};

//validar que los campos cambiados sean validos
function isDataValid() {
    return (isUserModified() && isNameValid.value && isValidStatus.value && isDescriptionValid.value)
}
function isValidCreate() {
    return (updatedRole.value.id_rol !== null) && (updatedRole.value.nombre_rol !== null) && isNameValid.value && isValidNumber.value
}
//Validar que hayan cambios en los campos
function isUserModified() {
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

const validateIdField = (id) => {
    isValidNumber.value = utilityStore.validateRolId(id)
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
    if (roleStore.isRoleRegister) {
        roleLoaded.value = true
        console.log(updatedRole.value);
    } else {
        loadRoleDetails()
    }
})

onUnmounted(() => {
    roleStore.isRoleRegister = false
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

.role-details-title {
    grid-column: 1/-1;
    text-align: center;
    color: black;
}

#doc-update-select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 5px;
    font-weight: bold;
}

label {
    color: black;
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
    background-color: #ff0800d4;
    border: 1px solid lightgray;
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

#up-btn {
    color: white;

}
</style>
  