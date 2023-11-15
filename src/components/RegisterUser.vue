<template>
    <div class="container">
        <form @submit.prevent="changeRegister" v-if="!isDataFill && !authStore.showUserRegister" class="register-form">
            <h1>Registro de Usuario</h1>
            <input type="text" v-model="newUser.nombre_usuario" placeholder="Nombre *" :class="{ 'invalid': !isValidName }"
                @input="validateName(newUser.nombre_usuario)" required />
            <input type="text" v-model="newUser.apellido_usuario" placeholder="Apellido *"
                :class="{ 'invalid': !isValidLastname }" @input="validateLastName(newUser.apellido_usuario)" required />
            <select v-model="newUser.tipo_documento_usuario">
                <option v-for="doc in utilityStore.docTypes" :key="doc.id_tipo_documento" :value="doc.id_tipo_documento">
                    {{ doc.tipo_documento }}
                </option>
            </select>
            <input type="text" v-model="newUser.documento_usuario" placeholder="Documento de usuario *"
                :class="{ 'invalid': !isValidDocument }" @input="validateDocument(newUser.documento_usuario)" required />
            <input type="text" v-model="newUser.celular_usuario" placeholder="Celular *"
                :class="{ 'invalid': !isValidCellphone }" @input="validateCellphone(newUser.celular_usuario)" required />
            <input type="email" v-model="newUser.direccion_usuario" placeholder="Correo *" required />
            <input type="date" v-model="newUser.fecha_nacimiento_usuario" placeholder="Fecha de Nacimiento *"
                :min="utilityStore.calculateDate(utilityStore.maxAge)"
                :max="utilityStore.calculateDate(utilityStore.minAge)" required />
            <input type="submit" :disabled="!isPersonalDataComplete()" class="next-register-btn" value="Registrar" />
            <input v-if="authStore.isUserAdmin()" type="button" value="Cancelar" @click="backToInfo()" class="back-link">
            <p v-else class="back-link">¿Ya tienes una cuenta? <a @click="authStore.toggleForm()">Iniciar sesión</a></p>
        </form>
        <div v-else class="register-credentials-form">
            <h1>Registro de Usuario</h1>
            <div class="image-upload">
                <label for="fileInput" class="image-preview" @click.prevent="openFileInput"
                    :style="{ backgroundImage: `url(${imageUrl})` }">
                    <div class="overlay">
                        <span>Cargar imagen</span>
                    </div>
                </label>
                <input type="file" id="fileInput" accept="image/*" @change="handleFileUpload" style="display: none" />
            </div>
            <input v-if="authStore.isUserAdmin()" id="userid-input" class="user-id-admin" type="text"
                v-model="newUser.documento_usuario" placeholder="ID de Persona *" required />
            <select id="role-select" v-if="authStore.isUserAdmin()" v-model="connection.id_rol">
                <option v-for="role in filteredRoles()" :key="role.id_rol" :value="role.id_rol">
                    {{ role.nombre_rol }}
                </option>
            </select>
            <input id="nickname-input" :class="authStore.isUserAdmin() ? 'user-name-register-admin' : 'user-name-register'"
                type="text" v-model="connection.nick_usuario" placeholder="Nombre de usuario *" required />

            <div :id="authStore.isUserAdmin() ? 'password-container-admin' : 'password-container'"><input
                    class="password-input" :type="isPasswordVisible ? 'text' : 'password'"
                    v-model="connection.password_usuario" placeholder="Contraseña *" required><i
                    :class="isPasswordVisible ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'" @click="showPassword"></i>
            </div>
            <input type="button" @click="registerConnection" :disabled="!isDataComplete()"
                class="register-btn register-credentials-btn" value="Registrar" />
            <input type="button" @click="authStore.toggleForm" class="register-btn" value="Cancelar" />
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../store/AuthStore';
import { useUtilityStore } from '../store/UtilityStore';
import { useUserStore } from '../store/UserStore';
import { useRoleStore } from '../store/RoleStore'
import router from '../router';

const authStore = useAuthStore()
const utilityStore = useUtilityStore()
const userStore = useUserStore()
const roleStore = useRoleStore()

const isDataFill = ref(false)
const imageUrl = ref('https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png')
const selectedImage = ref(null)
const isPasswordVisible = ref(false)
const newUser = ref({})
const connection = ref({})

const isValidName = ref(true)
const isValidLastname = ref(true)
const isValidDocument = ref(true)
const isValidCellphone = ref(true)

newUser.value = {
    documento_usuario: null,
    tipo_documento_usuario: 1,
    nombre_usuario: null,
    apellido_usuario: null,
    celular_usuario: null,
    fecha_registro_usuario: null,
    estado_usuario: 'A',
    direccion_usuario: null,
    fecha_nacimiento_usuario: null,
    foto_usuario: null,
}

connection.value = {
    id_usuario: null,
    id_rol: 3,
    nick_usuario: null,
    password_usuario: null,
}

const isPersonalDataComplete = () => {
    const requiredFields = [
        'nombre_usuario',
        'apellido_usuario',
        'documento_usuario',
        'celular_usuario',
        'direccion_usuario',
        'fecha_nacimiento_usuario',
    ];
    return requiredFields.every(field => !!newUser.value[field]);
}

const isDataComplete = () => {
    const requiredFields = [
        'nick_usuario',
        'password_usuario'
    ];

    return requiredFields.every(field => !!connection.value[field]);
}

const userExist = async (userNickname) => {
    return await authStore.existsNickname(userNickname)
}

const registerPerson = async () => {
    newUser.value.fecha_registro_usuario = new Date().toISOString()
    newUser.value.fecha_nacimiento_usuario = new Date(newUser.value.fecha_nacimiento_usuario).toISOString()
    newUser.value.documento_usuario = parseInt(newUser.value.documento_usuario)
    await authStore.registerUser(newUser.value)
}

const registerConnection = async () => {
    const exist = await userExist(connection.value.nick_usuario)
    if (!exist) {
        connection.value.id_usuario = parseInt(newUser.value.documento_usuario, 10)
        if (isUserAdmin()) {
            await authStore.registerConnectionAdmin(connection.value)
        } else {
            await authStore.registerConnection(connection.value)
        }
    } else {
        alert("El usuario ya existe")
    }
    await updateImg()
    authStore.toggleForm()
}

const backToInfo = () => {
    router.push({ name: 'information' });
}

const changeRegister = async () => {
    await registerPerson()
    if (!isUserAdmin()) {
        isDataFill.value = !isDataFill.value
    } else {
        router.push({ name: 'information' });
    }
}

const validateName = (name) => {
    isValidName.value = utilityStore.validateTextField(name)
}

const validateLastName = (lastname) => {
    isValidLastname.value = utilityStore.validateTextField(lastname)
}

const validateCellphone = (cell) => {
    isValidCellphone.value = utilityStore.validateNumberField(cell)
}

const validateDocument = (document) => {
    const doc = newUser.value.tipo_documento_usuario
    if (doc === 1) {
        isValidDocument.value = utilityStore.validateCCField(document)
        return
    } else if (doc === 2 || doc === 3) {
        isValidDocument.value = utilityStore.validateNumberField(document)
        return
    } else {
        isValidDocument.value = utilityStore.validateOTDocument(document)
    }
}

const filteredRoles = () => {
    if (authStore.isSuperAdmin()) {
        return roleStore.roles;
    } else {
        return roleStore.roles.filter(role => !role.nombre_rol.includes('Admin'));
    }
}

const isUserAdmin = () => {
    return authStore.isUserAdmin || authStore.isSuperAdmin
}

const showPassword = () => {
    isPasswordVisible.value = !isPasswordVisible.value
}

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

const updateImg = async () => {
    await userStore.updateImg(newUser.value.documento_usuario, selectedImage.value)
}


</script>
  
<style scoped>
.register-form,
.register-credentials-form {
    background: rgba(255, 255, 255, 0.2);
    padding: 20px;
    border-radius: 5px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    height: 70%;
    text-align: center;
    position: absolute;
    display: grid;
    grid-template-rows: .5fr 1fr 1fr 1fr 1fr .5fr .5fr;
    grid-template-columns: 1fr 1fr;
    right: 140px;
    width: 450px;
}

.register-credentials-form {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: .5fr 1fr 1fr 1fr .5fr .5fr;
}

h1 {
    font-size: 1.5rem;
}

h1,
.next-register-btn,
.back-link {
    grid-column: 1/-1;

}

.register-btn {
    grid-column: 1/-1;
}

input,
select {
    color: var(--secondary-color);
    font-weight: 500;
    display: block;
    margin: 10px auto;
    width: 80%;
    padding: 0px 5px;
    border-style: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    background-color: transparent;
}

input[type="date"],
select {
    color: var(--primary-color);
}

select>option {
    background-color: var(--secondary-color);
}

section>option:hover {
    background-color: var(--third-color);
}

input:focus:not(input[type="button"]),
select:focus {
    outline: none;
    border-bottom: 2px solid rgba(255, 255, 255, 1);
}

input:focus:not(input[type="button"]).invalid {
    border-bottom: 2px solid rgba(255, 0, 0, 0.8);
}

input::placeholder {
    color: rgba(255, 255, 255, 0.6);
    font-style: italic;
}

input[type="button"],
input[type="submit"] {
    display: block;
    margin: 10px auto;
    padding: 10px 20px;
    background: var(--third-color);
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

input[type="button"]:hover,
input[type="submit"]:hover {
    background: #0073e6;
}

input:disabled {
    background-color: lightgray;
    color: gray;
    cursor: not-allowed;
}

input:disabled:hover {
    background-color: lightgray;
    color: gray;
    cursor: not-allowed;
}

a {
    color: var(--primary-color);
    text-decoration: underline;
    cursor: pointer;
}

a:hover {
    color: var(--secondary-color);
}

.invalid {
    font-style: italic;
    border-bottom: 2px solid rgba(255, 0, 0, 1);
}

.register-credentials-btn {
    grid-column: 1/-1;
}


.image-upload {
    grid-column: 1/-1;
    text-align: center;
    background-color: transparent;
    justify-self: center;
    width: 120px;
    height: 120px;

}

.user-id-admin {
    font-size: larger;
}

.user-name-register-admin {
    font-size: larger;

}

.user-name-register {
    grid-column: 1/-1;
    font-size: larger;
}


#password-container-admin {
    grid-column: 2/-1;
    grid-row: 4/5;
    padding-top: 30px;
    margin: 0px;
    position: relative;
}

#password-container {
    grid-column: 1/-1;
    padding: 0px;
    margin: 0px;
    position: relative;
}

.password-input {
    font-size: larger;
    padding-bottom: 8px;
}

#password-container-admin>i {
    color: var(--primary-color);
    position: absolute;
    right: 30px;
    top: 40px;
    cursor: pointer;
}

#password-container>i {
    color: var(--primary-color);
    position: absolute;
    right: 50px;
    top: 4px;
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
</style>
  