import { config } from "dotenv"; // variables de entorno

config(); //Que se puedan utilizar esos valores

export default{ //exportar variables de entorno
    host: process.env.host || "",
    database: process.env.database ||"",
    user: process.env.user ||"",
    password: process.env.password ||""
};
