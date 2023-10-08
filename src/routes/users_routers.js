import { Router } from "express";
import {orm} from "../db.js"

const router = Router();


router.get('/users', async (req, res) => {
    const usuarios = await orm.usuarios.findMany({
        include: {
            tipo_documentos: true
        }
    })
    res.json(usuarios)
});

router.get('/users/:document', async (req, res) => {
    const userFound = await orm.usuarios.findFirst({
        where:{
            document: parseInt(req.params.document)
        },
        include: {
            tipo_documentos: true
        }
    })
    if(!userFound)
        return res.status(404).json({error:"User not found"})
    res.json(userFound)
});

router.delete('/users/:document', async (req, res) => {
    const deleteUser = await orm.usuarios.delete({
        where:{
            document: parseInt(req.params.document)
        }
    })
    if(!deleteUser)
        return res.status(404).json({error:"User not found"})
    return res.json(deleteUser)
});

router.put('/users/:document', async (req, res) => {
    const userUpdate = await orm.usuarios.update({
        where:{
            document: parseInt(req.params.document)
        },
        data: req.body
    })
    if(!userUpdate)
        return res.status(404).json({error:"User not found"})
    return res.json(userUpdate)
});

router.post('/users', async (req, res) => {
    const newUser = await orm.usuarios.create({
        data: req.body
    })
    res.json(newUser);
});

export default router;