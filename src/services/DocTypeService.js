import CrudService from "./CrudService";

class DocTypeService extends CrudService {
    constructor() {
        super('typesDocument')
    }
}

export default new DocTypeService();