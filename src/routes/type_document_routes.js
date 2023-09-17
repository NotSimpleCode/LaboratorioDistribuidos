import { Router } from "express";
import {orm} from "../db.js"

const router = Router();

router.get('/typesDocument', async (req, res) => {
    const type_document = await orm.type_document.findMany({
        include: {
            user: true
        }
    })
    res.json(type_document)
});

router.get('/typesDocument/:id', async (req, res) => {
    const typeDocumentFound = await orm.type_document.findFirst({
        where:{
            id: parseInt(req.params.id)
        },
        include: {
            users: true
        }
    })
    if(!typeDocumentFound)
        return res.status(404).json({error:"Type document not found"})
    res.json(typeDocumentFound)
});

router.delete('/typesDocument/:id', async (req, res) => {
    const typeDocumentDelete = await orm.type_document.delete({
        where:{
            id: parseInt(req.params.id)
        }
    })
    if(!typeDocumentDelete)
        return res.status(404).json({error:"Type document not found"})
    return res.json(typeDocumentDelete)
});

router.put('/typesDocument/:id', async (req, res) => {
    const typeDocumentUpdate = await orm.type_document.update({
        where:{
            id: parseInt(req.params.id)
        },
        data: req.body
    })
    if(!typeDocumentUpdate)
        return res.status(404).json({error:"Type document not found"})
    return res.json(typeDocumentUpdate)
});

router.post('/typesDocument', async (req, res) => {
    const newTypeDocument = await orm.type_document.create({
        data: req.body
    })
    res.json(newTypeDocument);
});


export default router;