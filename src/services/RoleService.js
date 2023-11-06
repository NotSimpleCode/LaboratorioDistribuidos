import CrudService from './CrudService';
import axios from 'axios';

class RoleService extends CrudService {
    constructor() {
        super('roles');
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
            console.error(`Error al obtener ${this.entity}`, error);
            throw error;
        }
    }
}

export default new RoleService();
