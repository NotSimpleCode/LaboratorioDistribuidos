import UserCrudService from "./UserCrudService";
import axios from "axios";

class UserService extends UserCrudService {
    constructor() {
        super('users')
        this.emailURL = 'https://prod-72.eastus.logic.azure.com:443/workflows/888975622fb34bcbb4906a209f8b7235/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ukE32oNbKit1mvD5Bxp0BwHlgGieN6et2GX0bMyC9Ls'
    }

    async fetchUserById(userId, token) {
        try {
            const response = await axios.get(this.url + `/${userId}`,
                {
                    headers: {
                        'Authorization': `${token}`
                    }
                })
            return response.data
        } catch (error) {
            console.error(`Error al obtener ${this.entity}`, error);
            throw error;
        }
    }

    async postRegisterUser(data) {
        try {
            console.log(this.url);
            const response = await axios.post(this.url, data,
                {
                    headers: {
                        'Content-Type': 'Application/json',
                    },
                })
            alert("Usuario agregado exitosamente!!")
            return response.data
        } catch (error) {
            console.error(`Error al enviar ${this.entity}`, error);
            throw error
        }
    }

    async patchStatus(userId, newStatus, token) {
        const response = await axios.patch(this.url + `/${userId}/status`, { estado_usuario: newStatus },
            {
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': `${token}`
                },
            })
        if (response.error) {
            return response.data.error
        }
        return response.data.message
    }

    async patchUser(userId, updates, token) {
        const response = await axios.patch(this.url + `/${userId}/update`, updates,
            {
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': `${token}`
                },
            })
        if (response.error) {
            return response.data.error
        }
        return response.data.message
    }

    async fetchUsersByDate(date) {
        try {
            console.log(date);
            const response = await axios.post(this.emailURL, { 'fecha_report': date })
            return response

        } catch (error) {
            console.error("Error al enviar reporte", error);
        }
    }

    async fetchAll(token) {
        try {
            const response = await axios.get(this.url,
                {
                    headers: {
                        'Authorization': `${token}`
                    }
                });
            return response.data
        } catch (error) {
            console.error(`Error al obtener ${this.entity}`, error);
            throw error;
        }
    }

    async postData(data, token) {
        try {
            const response = await axios.post(this.url, data,
                {
                    headers: {
                        'Authorization': `${token}`
                    }
                })
            alert("Usuario agregado exitosamente!!")
            return response.data
        } catch (error) {
            console.error(`Error al enviar ${this.entity}`, error);
            throw error
        }
    }

    async fetchPage(page, pageSize, token) {
        try {
            const response = await axios.get(this.url + `?pagina=${page}&elementos=${pageSize}`,
                {
                    headers: {
                        'Authorization': `${token}`
                    }
                })
            return response.data
        } catch (error) {
            console.error(`Error al obtener ${this.entity}`, error);
            throw error;
        }
    }

    async fetchCount(token) {
        try {
            const response = await axios.get(this.url + '/count',
                {
                    headers: {
                        'Content-Type': 'Application/json',
                        'Accept': 'Application/json',
                        'Authorization': `${token}`
                    }
                })
            return response.data
        } catch (error) {
            console.error(`Error al obtener ${this.entity}`, error);
            throw error;
        }
    }

    async deleteUser(userId, token) {
        try {
            const response = await axios.delete(this.url + `/${userId}`, {
                headers: {
                    'Authorization': `${token}`
                }
            });

            if (response.status === 200) {
                alert("Usuario eliminado exitosamente!!");
                return response.data;
            } else if (response.status === 404) {
                return { error: "User not found" };
            } else {
                return { error: "Internal server error" };
            }
        } catch (error) {
            console.error(`Error al eliminar ${this.entity}.`, error.message);
            return { error: "Error during deletion" };
        }
    }


}
export default new UserService();