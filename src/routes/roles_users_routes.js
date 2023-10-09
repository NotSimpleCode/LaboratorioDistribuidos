import { Router } from "express";
import {orm} from "../db.js"

const router = Router();

router.get('/connection', async (req, res) => {
    const conexion = await orm.users_Roles.findMany()
    res.json(conexion)
});

router.get('/connection/:id', async (req, res) => {
    const conexionFound = await orm.users_Roles.findFirst({
        where:{
            id: parseInt(req.params.id)
        }
    })
    if(!conexionFound)
        return res.status(400).json({error:"Connection not found"})
    res.json(conexionFound)
});

router.delete('/connection/:id', async (req, res) => {
    const rolDelete = await orm.roles.delete({
        where:{
            id: parseInt(req.params.id)
        }
    })
    if(!rolDelete)
        return res.status(400).json({error:"Connection not found"})
    return res.json(rolDelete)
});

router.put('/connection/:id', async (req, res) => {
    const connectionUpdate = await orm.users_Roles.update({
        where:{
            id: parseInt(req.params.id)
        },
        data: req.body
    })
    if(!connectionUpdate)
        return res.status(400).json({error:"Connection not found"})
    return res.json(connectionUpdate)
});



router.post('/connection', async (req, res) => {
    const newConnection = await orm.users_Roles.create({
        data: req.body
    })
    res.json(newConnection);
});


export default router;