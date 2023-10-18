import CrudService from './CrudService';

class RoleService extends CrudService {
    constructor() {
        super('roles');
    }
}

export default new RoleService();
