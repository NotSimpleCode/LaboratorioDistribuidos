<template>
    <section class="search-container">
        <h1 class="table-title">{{ actualTable }}</h1>
        <div class="search-bar">
            <input class="search" type="text" placeholder="Buscar..." v-model="searchTerm" @input="performSearch" />
            <input id="tableSearch" class="search-button" type="button" value="">
        </div>
        <div class="options">

        </div>
    </section>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useTableStore } from '../store/Table'

const tableStore = useTableStore()
const actualTable = ref(null)
const searchTerm = tableStore.searchTerm

const performSearch = () => {
    tableStore.updateSearchTerm(searchTerm)
}

const getTableTitle = () => {
    switch (tableStore.activeSubMenu) {
        case 'users':
            actualTable.value = 'Usuarios'
            break
        case 'roles':
            actualTable.value = 'Roles'
            break
    }
}

watchEffect(() => {
    getTableTitle()
})

</script>

<style scoped>
.search-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr 2fr;
    background-color: var(--primary-color);
    margin: 10px;
    min-height: 14vh;
    padding-left: 20px;
    padding-top: 10px;
    border-radius: 5px;
}

.table-title {
    color: var(--secondary-color);
    grid-row: 1;
    grid-column: 1/-1;
    font-size: 1.5rem;
}

.search-bar {
    grid-row: 2/3;
    grid-column: 1/2;
    max-width: 250px;
    position: relative;
    height: 30px;
    align-self: center;
}

.search {
    border-style: none;
    color: var(--secondary-color);
    box-shadow: 0px 0px 5px rgba(34, 34, 59, 0.4);
    height: 30px;
    max-width: 100%;
    padding-left: 17px;
    padding-right: 50px;
    border-radius: 15px;

}

.search::placeholder {
    color: rgb(175, 175, 175);
    font-style: italic;
}

.search:focus {
    outline: none;
}

.search-button {
    border-style: none;
    position: absolute;
    cursor: pointer;
    background-image: url('../assets/search.svg');
    background-size: cover;
    width: 25px;
    height: 25px;
    top: 2px;
    right: 0;
    background-color: transparent;

}

.options {
    grid-row: 2/3;
    grid-column: 2/3;
}
</style>