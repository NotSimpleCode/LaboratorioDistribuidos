import { Router } from "express";
import {orm} from "../db.js"

const router = Router();


router.get('/users', async (req, res) => {
    const users = await orm.users.findMany({
        include: {
            types_document: true
        }
    })
    res.json(users)
});

router.get('/users/:document', async (req, res) => {
    const userFound = await orm.users.findFirst({
        where:{
            document: parseInt(req.params.document)
        },
        include: {
            types_document: true
        }
    })
    if(!userFound)
        return res.status(404).json({error:"User not found"})
    res.json(userFound)
});

router.delete('/users/:document', async (req, res) => {
    const deleteUser = await orm.users.delete({
        where:{
            document: parseInt(req.params.document)
        }
    })
    if(!deleteUser)
        return res.status(404).json({error:"User not found"})
    return res.json(deleteUser)
});

router.put('/users/:document', async (req, res) => {
    const userUpdate = await orm.users.update({
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
    const newUser = await orm.users.create({
        data: req.body
    })
    res.json(newUser);
});

export default router;