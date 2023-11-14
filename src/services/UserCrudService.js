export default class UserCrudService {

    constructor(entity) {
        this.entity = entity
        this.url = `https://api-usuarios-8o5p.onrender.com/api/${this.entity}`;
    }

}
