import ConnectionsCrudService from './ConnectionsCrudService';
import axios from 'axios'
class ConnectionService extends ConnectionsCrudService {
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

    async postRegisterConnection(data) {
        try {
            const response = await axios.post(this.url + '/post', data)
            alert("Conexión agregada exitosamente!!")
            return response.data
        } catch (error) {
            console.error(`Error al enviar ${this.entity}`, error);
            throw error
        }
    }

    async postRegisterConnectionAdmin(data, token) {
        try {
            const response = await axios.post(this.url, data,
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
    async fetchAll(token) {
        try {
            const response = await axios.get(this.url,
                {
                    headers: {
                        'Authorization': `${token}`
                    }
                });
            return response.data
        } catch (error) {
            console.error(`Error al obtener ${this.entity}`, error);
            throw error;
        }
    }

    async postData(data, token) {
        try {
            const response = await axios.post(this.url, data,
                {
                    headers: {
                        'Authorization': `${token}`
                    }
                })
            alert("Usuario agregado exitosamente!!")
            return response.data
        } catch (error) {
            console.error(`Error al enviar ${this.entity}`, error);
            throw error
        }
    }

    async fetchPage(page, token) {
        try {
            const response = await axios.get(this.url + `?pagina=${page}`,
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

    async fetchCount(token) {
        try {
            const response = await axios.get(this.url + '/count',
                {
                    headers: {
                        'Content-Type': 'Application/json',
                        'Accept': 'Application/json',
                        'Authorization': `${token}`
                    }
                })
            return response.data
        } catch (error) {
            console.error(`Error al obtener ${this.entity}`, error);
            throw error;
        }
    }

    async putByUserNickname(userNickname, newValue, token) {
        try {
            const response = await axios.put(this.url + `/${userNickname}`, newValue,
                {
                    headers: {
                        'Authorization': `${token}`
                    }
                })
            return response.data
        } catch (error) {
            console.error(`Error al actualizar ${this.entity}`, error);
            throw error
        }
    }

    async deleteConnection(userId, idRol, token) {
        try {
            const response = await axios.delete(this.url + `/${userId}/${idRol}`,
                {
                    headers: {
                        'Authorization': `${token}`
                    }
                })
            return response.data
        } catch (error) {
            console.log("Error al eliminar", error);
            throw error
        }
    }

}

export default new ConnectionService();
