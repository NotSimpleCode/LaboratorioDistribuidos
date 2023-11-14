import RolesCrudService from './RolesCrudService';
import axios from 'axios';

class RoleService extends RolesCrudService {
    constructor() {
        super('roles');
    }

    async postRole(data, token) {
        try {
            const response = axios.post(this.url, data,
                {
                    headers: {
                        'Authorization': `${token}`
                    }
                })
            return (await response).data
        } catch (error) {
            console.log("Error al crear rol", error);
            throw error
        }
    }

    async fetchRoleById(roleId, token) {
        try {
            const response = await axios.get(this.url + `/${roleId}`,
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

    async patchRole(roleId, data, token) {
        try {
            const response = await axios.patch(this.url + `/${roleId}`, data,
                {
                    headers: {
                        'Authorization': `${token}`
                    }
                })
            return response.data
        } catch (error) {
            console.error(`Error al actualizar ${this.entity}`, error);
            throw error;
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
}

export default new RoleService();
