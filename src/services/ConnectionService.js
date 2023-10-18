import CrudService from './CrudService';

class ConnectionService extends CrudService {
    constructor() {
        super('connection');
    }
}

export default new ConnectionService();
