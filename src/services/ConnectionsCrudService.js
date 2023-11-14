export default class ConnectionCrudService {

    constructor(entity) {
        this.entity = entity
        this.url = `https://api-connection-ai12.onrender.com/api/${this.entity}`;
    }

}
