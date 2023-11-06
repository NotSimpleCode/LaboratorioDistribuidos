<template>
    <div class="container">
        <transition name="fade" mode="out-in">
            <LoginUser v-if="authStore.showLogin"></LoginUser>
            <RegisterUser v-else></RegisterUser>
        </transition>

    </div>
</template>
  
<script setup>
import LoginUser from '../components/LoginUser.vue'
import RegisterUser from '../components/RegisterUser.vue'
import { useAuthStore } from '../store/AuthStore';
import { useUtilityStore } from '../store/UtilityStore';
import { onMounted } from 'vue'

const authStore = useAuthStore()
const utilityStore = useUtilityStore()

onMounted(() => {
    utilityStore.fetchDocTypes()
})

</script>
  
<style scoped>
.container {
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('../assets/login_background.jpg');
    background-position: 0;
    display: flex;
    align-items: center;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
  