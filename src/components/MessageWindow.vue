<template>
    <div class="message-overlay">
        <div class="message-container">
            <div class="message-header">
                <h2>{{ messageStore.messageTittle }}</h2>
            </div>
            <div class="message-content">
                <p class="message-text">{{ messageStore.messageContent }}</p>
            </div>
            <div class="message-footer">
                <input v-if="messageStore.isConfirmMessage()" type="button" @click="accept" value="Aceptar"
                    class="accept-btn">
                <input type="button" @click="back" value="Volver" class="cancel-btn">
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { onUnmounted } from 'vue';
import { useMessageStore } from '../store/MessageStore'

const messageStore = useMessageStore()

const emits = defineEmits(['accept'])

function accept() {
    emits('accept')
    messageStore.closeMessage()

}
function back() {
    messageStore.closeMessage()
}

onUnmounted(() => {
    messageStore.rejectAction()
});

</script>
<style scoped>
.message-overlay {
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

.message-container {
    background: #fff;
    border-radius: 10px;
    width: 300px;
    height: 150px;
    display: grid;
    grid-template-rows: .5fr 2fr .5fr;
    grid-template-columns: 1fr;
}

.message-header {
    grid-row: 1;
    grid-column: span 2;
    text-align: center;
    font-size: 1.2em;
    margin-bottom: 10px;
    background-color: var(--secondary-color);
    color: var(--white-color)
}

.message-content {
    grid-column: 2/3;
    grid-row: 2/3;
    display: flex;
    align-items: center;
    padding: 0px 20px;
}

.bi-x-octagon-fill {
    color: #dc3545;
    width: 100px;
    height: 50px;
    margin-right: 10px;
}

.message-footer {
    grid-column: span 2;
    text-align: center;
    padding-bottom: 15px;
}

input {
    font-size: .9rem;
    cursor: pointer;
    background: var(--third-color);
    color: white;
    border: none;
    border-radius: 3px;
    padding: 10px 20px;
}

.accept-btn {
    background-color: #28a745;
}

.accept-btn:hover {
    background-color: #289d43;
}

.cancel-btn {
    margin-left: 20px;
    background-color: var(--third-color);
}

.cancel-btn:hover {
    background: #0073e6;
}
</style>