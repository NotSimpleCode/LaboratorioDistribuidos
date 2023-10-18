import axios from 'axios'
export default class CrudService {

    constructor(entity) {
        this.entity = entity
        this.url = `http://localhost:3000/api/${this.entity}`;
    }

    async fetchAll() {
        try {
            const response = await axios.get(this.url);
            return response.data
        } catch (error) {
            console.error(`Error al obtener ${this.entity}`, error);
            throw error;
        }
    }

    async fetchPage(page) {
        try {
            const response = await axios.get(this.url + `?pagina=${page}`)
            return response.data
        } catch (error) {
            console.error(`Error al obtener ${this.entity}`, error);
            throw error;
        }
    }

    async fetchCount() {
        try {
            const response = await axios.get(this.url + '/count')
            return response.data
        } catch (error) {
            console.error(`Error al obtener ${this.entity}`, error);
            throw error;
        }
    }
}
