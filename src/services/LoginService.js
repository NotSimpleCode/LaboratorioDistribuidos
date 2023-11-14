import ConnectionsCrudService from './ConnectionsCrudService';
import axios from 'axios';

class LoginService extends ConnectionsCrudService {
    constructor() {
        super('login');
    }

    async login(data) {
        try {
            const response = await axios.post(this.url, data)
            return response.data
        } catch (error) {
            console.error(`Error al enviar ${this.entity}`, error);
            throw error
        }
    }
}

export default new LoginService();
