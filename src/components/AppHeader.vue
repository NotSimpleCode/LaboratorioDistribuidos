<template>
    <header class="app-header">
        <div class="page-icon">
            <img src="../assets/logo.svg" alt="Icono de la página" />
        </div>

        <div class="right-content">

            <div class="user-info" @click="toggleMenu">
                <img class="user-avatar" :src="actualImg" alt="imagen de perfil" />
                <div class="user-details">
                    <p class="user-name">{{ authStore.onlineUser.nick }}</p>
                    <p class="user-role">{{ authStore.onlineUser.rol }}</p>
                </div>
                <div class="user-menu" v-if="isMenuVisible">
                    <ul>
                        <li @click="showUserDetails(authStore.onlineUser.personId)">Editar perfil</li>
                        <li @click="logout">Cerrar sesión</li>
                    </ul>
                </div>
                <UserDetails v-if="showDetails" :person-id="selectedUserId" :show="showDetails" @close="closeUserDetails" />
            </div>
        </div>
    </header>
</template>
  
<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '../store/AuthStore'
import router from '../router'
import UserDetails from './UserDetails.vue'

const isMenuVisible = ref(false)
const authStore = useAuthStore()
let isFocused = ref(false)
let searchIcon = ref('../src/assets/search-white.svg')
const actualImg = computed(() => authStore.onlineUser.foto ? authStore.onlineUser.foto : '../src/assets/user.svg')

const showDetails = ref(false);
const selectedUserId = ref(null);

// const onSearchFocus = () => {
//     isFocused.value = true;
//     searchIcon.value = '../src/assets/search.svg';
// }

// const onSearchBlur = () => {
//     isFocused.value = false;
//     searchIcon.value = '../src/assets/search-white.svg';
// }


const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value;
}

const showUserDetails = (userId) => {
    selectedUserId.value = userId;
    showDetails.value = true;
};

const closeUserDetails = () => {
    showDetails.value = false;
};


const logout = () => {
    router.push({ name: "login" })
    authStore.logout()
}


</script>
  
<style scoped>
.app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--primary-color);
    color: var(--black-color);
    padding: 10px 30px;
}

.page-icon img {
    width: 60px;
    height: 60px;
}

.right-content {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: space-between;
    right: 40px;
    max-width: 50%;
}

.user-info {
    display: flex;
    font-family: var(--font);
    cursor: pointer;
    margin: 20px;
    padding: 10px;
    max-width: 100%;
}

.user-info:hover {
    background-color: var(--background-color);
    transition: background-color 0.2s ease-in-out;
}

.user-avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 20px;
}

.user-name {
    font-weight: bold;
    font-size: 0.95rem;
}

.user-role {
    margin-top: 5px;
    font-size: 0.85rem;
    opacity: 0.6;
}

.user-menu {
    position: absolute;
    top: 80%;
    right: 20%;
    display: none;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.user-info:hover .user-menu {
    display: block;
}

.user-menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.user-menu li {
    padding: 10px 20px;
    cursor: pointer;
}

.user-menu li:hover {
    background-color: #f1f1f1;
}
</style>
  