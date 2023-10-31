import CrudService from "./CrudService";
import axios from 'axios'
class DocTypeService extends CrudService {
    constructor() {
        super('typesDocument')
    }

    async fetchAllDocs() {
        try {
            const response = await axios.get(this.url);
            return response.data
        } catch (error) {
            console.error(`Error al obtener ${this.entity}`);
            throw error;
        }
    }
}

export default new DocTypeService();