import { Router } from "express";
import {orm} from "../db.js"

const router = Router();


router.get('/users', async (req, res) => {
    const usuarios = await orm.usuarios.findMany({
        include: {
            tipo_documentos: true
        }
    })
    if(users==null)
        return res.status(204).json({error:"No content"})
    res.json(users)
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
    return res.status(200).json({message:"deleted successfully"})
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
    return res.status(200).json({message:"update successfully"})
});

router.post('/users', async (req, res) => {
    try {
        const newUser = await orm.users.create({
            data: req.body
        })
    } catch (error) {
        return res.status(400).json({error:"User already exists"})
    }
    
    return res.status(201).json({message:"User created successfully"})
});

router.patch('/users/:document', async (req, res) => {
    const { name } = req.body; 
    const nameUser = await orm.users.update({
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


export default router;