import RolesCrudService from "./RolesCrudService";
import axios from 'axios'
class DocTypeService extends RolesCrudService {
    constructor() {
        super('typesDocument')
    }

    async fetchAllDocs() {
        try {
            const response = await axios.get(this.url);
            return response.data
        } catch (error) {
            console.error(`Error al obtener ${this.entity}`);
            console.log("Se cargaran los tipos de documento por defecto");
            return [{ 'id_tipo_documento': 1, 'tipo_documento': 'CC' }, { 'id_tipo_documento': 2, 'tipo_documento': 'TI' }, { 'id_tipo_documento': 3, 'tipo_documento': 'CE' }, { 'id_tipo_documento': 4, 'tipo_documento': 'OT' }]
        }
    }
}

export default new DocTypeService();