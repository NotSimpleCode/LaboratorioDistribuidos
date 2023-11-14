export default class RolesCrudService {

    constructor(entity) {
        this.entity = entity
        this.url = `https://api-roles.onrender.com/api/${this.entity}`;
    }
}
