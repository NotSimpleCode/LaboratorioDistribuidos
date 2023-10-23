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
            console.log(response.data);
            return response.data
        } catch (error) {
            console.error(`Error al obtener ${this.entity}`, error);
            throw error;
        }
    }

    async postRegisterUser(data) {
        console.log(data);
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
}
export default new UserService();