import CrudService from './CrudService';

class UserService extends CrudService {
    constructor() {
        super('roles');
    }
}

export default new UserService();
