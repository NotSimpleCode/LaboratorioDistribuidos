import CrudService from './CrudService';
import axios from 'axios'
class ConnectionService extends CrudService {
    constructor() {
        super('connection');
    }

    async fetchByUserId(userId, token) {
        try {
            const response = await axios.get(this.url + `/${userId}`,
                {
                    headers: {
                        'Authorization': `${token}`
                    }
                })
            return response.data
        } catch (error) {
            console.error(`Error al obtener ${this.entity}`, error);
            throw error
        }
    }

    async fetchByUserNickname(userNickname, token) {
        try {
            const response = await axios.get(this.url + `/nickname/${userNickname}`,
                {
                    headers: {
                        'Authorization': `${token}`
                    }
                })
            return response.data
        } catch (error) {
            console.error(`Error al obtener ${this.entity}`, error);
            throw error
        }
    }

    async fetchValidationNickname(userNickname) {
        try {
            const response = await axios.get(this.url + `/exists/${userNickname}`)
            return response.data
        } catch (error) {
            console.error(`Error al obtener ${this.entity}`, error);
            throw error
        }
    }

    async postRegisterConnection(data, token) {
        try {
            const response = await axios.post(this.url + '/post', data,
                {
                    headers: {
                        'Authorization': `${token}`
                    }
                })
            alert("Conexión agregada exitosamente!!")
            return response.data
        } catch (error) {
            console.error(`Error al enviar ${this.entity}`, error);
            throw error
        }
    }
}

export default new ConnectionService();
