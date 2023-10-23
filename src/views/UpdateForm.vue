<template>
    <div class="container">
        <div class="update-user-form">
            <h1>Actualizar Usuario</h1>
            <div class="image-upload">
                <label for="fileInput" class="image-preview" @click.prevent="openFileInput">
                    <div class="overlay">
                        <span>Cargar imagen</span>
                    </div>
                </label>
                <input type="file" id="fileInput" accept="image/*" @change="handleFileUpload" style="display: none" />
            </div>
            <input class="user-name-register" type="text" v-model="newUser.nick_usuario" placeholder="Nombre de usuario *"
                required />
            <div class="password-container">
                <input class="password-input" :type="isPasswordVisible ? 'text' : 'password'"
                    v-model="connection.password_usuario" placeholder="Contraseña *" required>
                <i :class="isPasswordVisible ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'" @click="showPassword"></i>
            </div>
            <!-- Agrega aquí los campos adicionales para actualizar datos como foto_usuario, documento_usuario, etc. -->
            <input type="button" @click="updateUser" :disabled="!isDataComplete()" class="register-btn"
                value="Actualizar" />
        </div>
    </div>
</template>
  
<script setup>
import { ref, onBeforeMount } from 'vue';
import DocTypeService from '../services/DocTypeService';
import { useAuthStore } from '../store/AuthStore';

const authStore = useAuthStore();
const imageUrl = ref(null);
const isPasswordVisible = ref(false);
const newUser = ref({});
const connection = ref({});

newUser.value = {
    foto_usuario: null,
    documento_usuario: null,
    tipo_documento_usuario: 1,
    nombre_usuario: null,
    apellido_usuario: null,
    celular_usuario: null,
    direccion_usuario: null,
    fecha_nacimiento_usuario: null,
    nick_usuario: null,
    password_usuario: null,
};

connection.value = {
    id_usuario: null,
    id_rol: 3, // Ajusta el rol según tus necesidades
    nick_usuario: null,
    password_usuario: null,
};

const isDataComplete = () => {
    const requiredFields = ['nick_usuario', 'password_usuario']; // Agrega los campos requeridos
    return requiredFields.every(field => !!connection.value[field]);
};

const updateUser = async () => {
    // Lógica para actualizar el usuario, por ejemplo, haciendo una solicitud al servidor.
    // Puedes utilizar los valores en newUser y connection para enviar los datos actualizados.
};

function openFileInput() {
    document.getElementById('fileInput').click();
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        newUser.value.foto_usuario = file;
        imageUrl.value = URL.createObjectURL(file);
    }
}

// Carga los datos del usuario para mostrar en el formulario de actualización (si es necesario).

</script>
  