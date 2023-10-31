import CrudService from "./CrudService";
import axios from "axios";

class UserService extends CrudService {
    constructor() {
        super('users')
    }

    async fetchUserById(userId, token) {
        try {
            const response = await axios.get(this.url + `/id/${userId}`,
                {
                    headers: {
                        'Authorization': `${token}`
                    }
                })
            return response.data
        } catch (error) {
            console.error(`Error al obtener ${this.entity}`, error);
            throw error;
        }
    }

    async postRegisterUser(data) {
        try {
            const response = await axios.post('http://localhost:3000/api/users/post', data,
                {
                    headers: {
                        'Content-Type': 'Application/json',
                    },
                })
            alert("Usuario agregado exitosamente!!")
            return response.data
        } catch (error) {
            console.error(`Error al enviar ${this.entity}`, error);
            throw error
        }
    }

    async patchStatus(userId, newStatus, token) {
        const response = await axios.patch(this.url + `/${userId}/status`, { estado_usuario: newStatus },
            {
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': `${token}`
                },
            })
        if (response.error) {
            return response.data.error
        }
        return response.data.message
    }

    async patchUser(userId, updates, token) {
        const response = await axios.patch(this.url + `/${userId}/update`, updates,
            {
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': `${token}`
                },
            })
        if (response.error) {
            return response.data.error
        }
        return response.data.message
    }

}
export default new UserService();