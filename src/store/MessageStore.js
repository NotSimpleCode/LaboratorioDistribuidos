import { defineStore } from 'pinia';

export const useMessageStore = defineStore('message', {
    state: () => ({
        messageType: null,
        messageContent: null,
        messageTittle: null,
        showMessage: false,
        messageTypes: ['success', 'fail', 'confirm'],
        confirmAction: false,
    }),
    actions: {
        setMessageType(type) {
            this.messageType = type
        },
        setMessageTittle(tittle) {
            this.messageTittle = tittle
        },
        setMessageContent(content) {
            this.messageContent = content
        },
        isSuccessMessage() {
            return this.messageType === this.messageTypes[0]
        },
        isFailMessage() {
            return this.messageType === this.messageTypes[1]
        },
        isConfirmMessage() {
            return this.messageType === this.messageTypes[2]
        },
        showingMessage() {
            this.showMessage = true
        },
        closeMessage() {
            this.showMessage = false
        },
        switchShowMessage() {
            this.showMessage = !this.showMessage
        },
        acceptAction() {
            this.confirmAction = true
        },
        rejectAction() {
            this.confirmAction = false
        }
    }
})