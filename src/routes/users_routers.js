import { Router } from "express";
import {orm} from "../db.js"
import * as auth from '../authToken.js';

const router = Router();

const elementosPorPagin = 10; // Cambia esto según tus necesidades
const paginaPredeterminada = 1; // Página inicial

router.get('/users/count',auth.authenticateToken, async (req, res) => {
    try {
        const number = await orm.usuarios.count({})
        if (number!=0) {
            res.status(200).json(number)
        }else{
            res.status(204).json({ info: "Not content" })
        }
    } catch (error) {
        console.error("Error counting users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



router.get('/users',auth.authenticateToken, async (req, res) => {
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

router.get('/users/id/:id',auth.authenticateToken, async (req, res) => {
    try {
        
        const foundUser = await orm.usuarios.findFirst({
            where: {
                documento_usuario: parseInt(req.params.id)
                
            },
            include: {
                tipo_documentos: true
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


router.get('/users/:value',auth.authenticateToken, async (req, res) => {
    try {
        const val = req.params.value
        const foundUser = await orm.usuarios.findFirst({
            where: {
                OR:[
                    {
                        nombre_usuario:val
                    },
                    {
                        apellido_usuario:val
                    }
                ]
                
            },
            include: {
                tipo_documentos: true
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

router.delete('/users/:id',auth.authenticateToken, async (req, res) => {
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





router.put('/users/:id',auth.authenticateToken, async (req, res) => {
    try {
        const UserUpdate = await orm.usuarios_roles.update({
            where: {
                documento_usuario: parseInt(req.params.id)
            },
            data: req.body
        });

        if (UserUpdate === null) {
            res.status(404).json({ error: "User not found" });
        }else{
            res.json({ info: "User updated successfully" });
        }

    } catch (error) {
        console.error("Error updating User:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/users',auth.authenticateToken, async (req, res) => {
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

router.patch('/users/:document',auth.authenticateToken, async (req, res) => {
    const { name } = req.body; 
    const nameUser = await orm.usuarios.update({
        where: {
            document: parseInt(req.params.document)
        },
        data: {
            name: name 
        }
    })
    if (!nameUser)
        return res.status(404).json({ error: "User not found" })
    return res.status(200).json({message:"Modified successfully"})
});

router.patch('/users/:id',auth.authenticateToken, async (req, res) => {
    const { foto_usuario } = req.body; 
    const fotoUser = await orm.usuarios.update({
        where: {
            documento_usuario: parseInt(req.params.id)
        },
        data: {
            foto_usuario:foto_usuario
        }
    })
    if (!fotoUser)
        return res.status(404).json({ error: "User not found" })
    return res.status(200).json({message:"Picture Modified successfully"})
});



export default router;