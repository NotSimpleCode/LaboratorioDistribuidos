import { Router } from "express";
import {orm} from "../db.js"

const router = Router();

const elementosPorPagin = 10; // Cambia esto según tus necesidades
const paginaPredeterminada = 1; // Página inicial

router.get('/users', async (req, res) => {
    try {
        const { pagina = paginaPredeterminada, elementos = elementosPorPagin } = req.query;
        const paginaActual = parseInt(pagina);
        const elementosPorPagina = parseInt(elementos); // Aquí estaba el error

        // Calcula el índice de inicio y fin para la paginación
        const startIndex = (paginaActual - 1) * elementosPorPagina;

        // Realiza la consulta a la base de datos para obtener los elementos de la página actual
        const users = await orm.usuarios.findMany({
            skip: startIndex,
            take: elementosPorPagina,
            include: {
                tipo_documentos: true
            }
        });

        if (users.length !=0) {
            res.json(users);
        }else{

            // Envía la respuesta con los elementos de la página actual
            res.status(204).json({ info: "Not content" });
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});




router.get('/users/:id', async (req, res) => {
    try {
        const foundUser = await orm.usuarios.findFirst({
            where: {
                documento_usuario: parseInt(req.params.id)
            }
        });

        if (!foundUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(foundUser);
    } catch (error) {
        console.error("Error fetching User:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {

        // Elimina el usuario por su ID_PERSONA y el ID_ROL proporcionado en la ruta
        const deleteResult = await orm.usuarios.delete({
            where: {
                documento_usuario: parseInt(req.params.id)
            }
        });

        if (deleteResult) {
            res.json({ info: "User deleted successfully" });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error deleting User:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});





router.put('/users/:id', async (req, res) => {
    try {
        const UserUpdate = await orm.usuarios_roles.update({
            where: {
                documento_usuario: parseInt(req.params.id)
            },
            data: req.body
        });

        if (UserUpdate === null) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json({ info: "User updated successfully" });
    } catch (error) {
        console.error("Error updating User:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/users', async (req, res) => {
    try {
       
        const newConnection = await orm.usuarios.create({
            data: req.body
        });
        
        res.status(200).json({ info: "User created!" });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(400).json({ error: "User could not be created." });
    }
});

export default router;