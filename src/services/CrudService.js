import axios from 'axios'
export default class CrudService {

    constructor(entity) {
        this.entity = entity
        this.url = `http://localhost:3000/api/${this.entity}`;
    }

    async fetchAll(token) {
        try {
            const response = await axios.get(this.url,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
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
                        'Authorization': `Bearer ${token}`
                    }
                })
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
                        'Authorization': `Bearer ${token}`
                    }
                })
            return response.data
        } catch (error) {
            console.error(`Error al obtener ${this.entity}`, error);
            throw error;
        }
    }

    async fetchCount(token) {
        console.log(token);
        try {
            const response = await axios.get(this.url + '/count',
                {
                    headers: {
                        'Content-Type': 'Application/json',
                        'Accept': 'Application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
            return response.data
        } catch (error) {
            console.error(`Error al obtener ${this.entity}`, error);
            throw error;
        }
    }
}
