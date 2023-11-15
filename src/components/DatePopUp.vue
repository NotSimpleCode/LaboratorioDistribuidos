<template>
    <div>
        <button id="report-input" @click="showDatePopup"><i class="bi bi-file-earmark-person-fill"></i> Reporte</button>
        <div v-if="isDatePopupVisible" class="popup-modal">
            <div class="popup">
                <h1>Fecha de datos que desea ver:</h1>
                <input type="date" v-model="selectedDate" min="13/11/2023" />
                <button id="submit-date-btn" @click="submitDate">Enviar</button>
                <button id="close-btn" @click="closePopup">Cerrar</button>
            </div>
            <Message v-if="messageStore.showMessage" />
        </div>
    </div>
</template>
  
<script setup>

import { ref } from 'vue';
import { useMessageStore } from '../store/MessageStore';
import { useUserStore } from '../store/UserStore'
import Message from './MessageWindow.vue';

const userStore = useUserStore()
const messageStore = useMessageStore()

const selectedDate = ref('');
const isDatePopupVisible = ref(false);

const showDatePopup = () => {
    isDatePopupVisible.value = true;
}

const submitDate = async () => {
    const response = await userStore.fetchUsersByDate(selectedDate.value.toString())
    closePopup()
    messageStore.showingMessage()
    messageStore.setMessageType('success')
    messageStore.setMessageTittle("Envio de Reporte")
    messageStore.setMessageContent('El reporte de usuarios por fecha se envio correctamente')

}

const closePopup = () => {
    isDatePopupVisible.value = false;
}

</script>

<style scoped>
.popup-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    /* Fondo oscurecido */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}

.popup {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    place-items: center;
}

h1 {
    grid-column: -1/1;
}

input[type="date"] {
    width: 140px;
    height: 40px;
    grid-row: 2/3;
    grid-column: 1/-1;
}

#report-input,
#submit-date-btn,
#close-btn {
    display: block;
    margin: 10px 20px;
    padding: 10px 20px;
    background: var(--third-color);
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

#report-input:hover,
#submit-date-btn:hover,
#close-btn:hover {
    background: #0073e6;
}
</style>
