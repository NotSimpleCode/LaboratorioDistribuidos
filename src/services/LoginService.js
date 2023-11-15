import ConnectionsCrudService from './ConnectionsCrudService';
import axios from 'axios';

class LoginService extends ConnectionsCrudService {
    constructor() {
        super('login');
    }

    async login(credentials) {
        try {
            const response = await axios.post(this.url, credentials);
            return response.data
        } catch (error) {
            if (error.response.status === 401) {
                alert('Usuario o contraseña incorrectos');
            } else if (error.response.status === 403) {
                alert('La cuenta está inactiva, comuniquese con el administrador');
            } else {
                console.error('Error al hacer login:', error);
            }

        }
    }

}
export default new LoginService();
