import { Router } from "express";
import {orm} from "../db.js"

const router = Router();

router.get('/typesDocument', async (req, res) => {
    const tipo_documentos = await orm.tipo_documentos.findMany({
        include: {
            user: true
        }
    })
    res.json(tipo_documentos)
});

router.get('/typesDocument/:id', async (req, res) => {
    const typeDocumentFound = await orm.tipo_documentos.findFirst({
        where:{
            id: parseInt(req.params.id)
        },
        include: {
            users: true
        }
    })
    if(!typeDocumentFound)
        return res.status(400).json({error:"Type document not found"})
    res.json(typeDocumentFound)
});

router.delete('/typesDocument/:id', async (req, res) => {
    const typeDocumentDelete = await orm.tipo_documentos.delete({
        where:{
            id: parseInt(req.params.id)
        }
    })
    if(!typeDocumentDelete)
        return res.status(400).json({error:"Type document not found"})
    return res.json(typeDocumentDelete)
});

router.put('/typesDocument/:id', async (req, res) => {
    const typeDocumentUpdate = await orm.tipo_documentos.update({
        where:{
            id: parseInt(req.params.id)
        },
        data: req.body
    })
    if(!typeDocumentUpdate)
        return res.status(400).json({error:"Type document not found"})
    return res.json(typeDocumentUpdate)
});

router.post('/typesDocument', async (req, res) => {
    const newTypeDocument = await orm.tipo_documentos.create({
        data: req.body
    })
    res.json(newTypeDocument);
});


export default router;