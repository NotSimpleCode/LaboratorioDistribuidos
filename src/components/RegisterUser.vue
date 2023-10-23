<template>
    <div class="container">
        <div v-if="!isDataFill" class="register-form">
            <h1>Registro de Usuario</h1>
            <input type="text" v-model="newUser.nombre_usuario" placeholder="Nombre *" required />
            <input type="text" v-model="newUser.apellido_usuario" placeholder="Apellido *" required />
            <input type="text" v-model="newUser.documento_usuario" placeholder="Documento de usuario *" required />
            <select v-model="newUser.tipo_documento_usuario">
                <option v-for="doc in documentType" :key="doc.id_tipo_documento" :value="doc.id_tipo_documento">
                    {{ doc.tipo_documento }}
                </option>
            </select>
            <input type="text" v-model="newUser.celular_usuario" placeholder="Celular *" required />
            <input type="text" v-model="newUser.direccion_usuario" placeholder="Dirección *" required />
            <input type="date" v-model="newUser.fecha_nacimiento_usuario" placeholder="Fecha de Nacimiento *" required />
            <input type="button" @click="changeRegister" :disabled="!isPersonalDataComplete()" class="next-register-btn"
                value="Siguiente" />
            <p>¿Ya tienes una cuenta? <a @click="authStore.toggleForm()">Iniciar sesión</a></p>
        </div>
        <div v-else class="register-credentials-form">
            <h1>Registro de Usuario</h1>
            <div class="image-upload">
                <label for="fileInput" class="image-preview" @click.prevent="openFileInput">
                    <div class="overlay">
                        <span>Cargar imagen</span>
                    </div>
                </label>
                <input type="file" id="fileInput" accept="image/*" @change="handleFileUpload" style="display: none" />
            </div>
            <input class="user-name-register" type="text" v-model="connection.nick_usuario"
                placeholder="Nombre de usuario *" required />
            <div class="password-container"><input class="password-input" :type="isPasswordVisible ? 'text' : 'password'"
                    v-model="connection.password_usuario" placeholder="Contraseña *" required><i
                    :class="isPasswordVisible ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'" @click="showPassword"></i>
            </div>
            <input type="button" @click="register" :disabled="!isDataComplete()"
                class="register-btn register-credentials-btn" value="Registrarse" />
            <input type="button" @click="changeRegister" class="register-btn back-btn" value="Volver" />
            <input type="button" @click="authStore.toggleForm" class="register-btn" value="Cancelar" />
        </div>
    </div>
</template>
  
<script setup>
import { ref, onBeforeMount } from 'vue';
import DocTypeService from '../services/DocTypeService';
import { useAuthStore } from '../store/AuthStore';

const authStore = useAuthStore()
const isDataFill = ref(false)
const imageUrl = ref(null)
const isPasswordVisible = ref(false)
// const userName = ref('');
// const userLastname = ref('');
// const userDocument = ref('');
const documentType = ref();
// const userCellphone = ref('');
// const userAddress = ref('');
// const userBirthdate = ref('');
// const userAccountName = ref('')
// const password = ref('')
console.log(new Date().toISOString());
const newUser = ref({})
const connection = ref({})

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


const register = async () => {
    if (await authStore.existsNickname(connection.value.nick_usuario)) {
        alert("Este nombre de usuario ya existe")
    } else {
        newUser.value.fecha_registro_usuario = new Date().toISOString()
        newUser.value.fecha_nacimiento_usuario = new Date(newUser.value.fecha_nacimiento_usuario).toISOString()
        newUser.value.documento_usuario = parseInt(newUser.value.documento_usuario)
        connection.value.id_usuario = newUser.value.documento_usuario
        await registerUser();
        await registerConnection();
    }
    changeRegister()
}

const registerUser = async () => {
    await authStore.registerUser(newUser.value)
}

const registerConnection = async () => {
    await authStore.registerConnection(connection.value)
}


const changeRegister = () => {
    isDataFill.value = !isDataFill.value
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
        newUser.value.photo = file
        imageUrl.value = URL.createObjectURL(file);
    }
}

const fetchAllDocTypes = async () => {
    documentType.value = await DocTypeService.fetchAllDocs()
}

onBeforeMount(() => {
    fetchAllDocTypes()
})

</script>
  
<style scoped>
.register-form,
.register-credentials-form {
    background: rgba(255, 255, 255, 0.2);
    padding: 20px;
    border-radius: 5px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    height: 65%;
    text-align: center;
    position: absolute;
    display: grid;
    grid-template-rows: .5fr 1fr 1fr 1fr 1fr .5fr .5fr;
    grid-template-columns: 1fr 1fr;
    right: 120px;
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
p {
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

input::placeholder {
    color: rgba(255, 255, 255, 0.6);
    font-style: italic;
}

input[type="button"] {
    display: block;
    margin: 10px auto;
    padding: 10px 20px;
    background: var(--third-color);
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

input[type="button"]:hover {
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

.register-credentials-btn {
    grid-column: 1/2;
}

.back-btn {
    grid-column: 2/3;
}

.image-upload {
    grid-column: 1/-1;
    text-align: center;
    background-color: transparent;
    justify-self: center;
    width: 120px;
    height: 120px;

}

.user-name-register {
    grid-column: 1/-1;
    font-size: larger;
}

.password-container {
    grid-column: 1/-1;
    padding: 0px;
    margin: 0px;
    position: relative;
}

.password-input {
    font-size: larger;
    padding-bottom: 8px;
}

.password-container>i {
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
    background-image: url('../assets/user.svg');
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
  