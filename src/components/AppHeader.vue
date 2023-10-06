<template>
    <header class="app-header">
        <div class="page-icon">
            <img src="../assets/logo.svg" alt="Icono de la página" />
        </div>

        <div class="right-content">
            <div class="search-bar">
                <input class="search" type="text" placeholder="Buscar..." @focus="onSearchFocus" @blur="onSearchBlur" />
                <input class="search_btn" :style="{ backgroundImage: `url(${searchIcon})` }" type="button" @click="buscar">
            </div>

            <div class="user-info">
                <img class="user-avatar" src="../assets/user.svg" alt="imagen generica" />
                <div class="user-details">
                    <p class="user-name">Diego González</p>
                    <p class="user-role">Administrador</p>
                </div>
            </div>
        </div>
    </header>
</template>
  
<script setup>
import { ref } from 'vue';
let isFocused = ref(false)
let searchIcon = ref('../src/assets/search-white.svg')

const onSearchFocus = () => {
    isFocused.value = true;
    searchIcon.value = '../src/assets/search.svg';
}

const onSearchBlur = () => {
    isFocused.value = false;
    searchIcon.value = '../src/assets/search-white.svg';
}

const buscar = () => {

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
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08)
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
    right: 20px;
    max-width: 50%;
}

.search-bar {
    position: relative;
}

.search {
    font-size: 0.95rem;
    width: 200px;
    height: 40px;
    border-style: none;
    background-color: var(--secondary-color);
    padding-left: 15px;
    padding-right: 45px;
    color: var(--white-color);
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgba(34, 34, 59, 0.2);
}

input[type="text"]:focus {
    border: 1px solid lightgray;
    outline: none;
    background-color: var(--white-color);
    color: var(--secondary-color);
}

.search::placeholder {
    color: var(--white-color);
    transition: color 0.5s ease-in-out;
    font-style: italic;
}

input[type="text"]:focus::placeholder {
    color: #848181;
}

.search_btn {
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    top: 20%;
    right: 3%;
    background-color: transparent;
    border-style: none;
    cursor: pointer;
    width: 25px;
    height: 25px;
}

.user-info {
    display: flex;
    font-family: var(--font);
    cursor: pointer;
    margin: 20px;
    padding: 10px;
    max-width: 50%;
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
</style>
  