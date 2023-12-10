import { Router } from "express";
import {alterarmedia, inserirmedia, mediaPeloId } from "../repository/media.js";


const endpoints = Router()

endpoints.post ( '/media' , async (req,resp) =>{
    try {
        const media = req.body
        const resposta = await inserirmedia(media)
    

        resp.send(resposta)

    } catch (err) {
        resp.status(400).send({erro:err.message})
    }
})

endpoints.put('/media/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const media = req.body;
      
        const resposta = await alterarmedia(media,id);
        
            resp.send(resposta)
        
      
    } catch (err) {
        resp.status(400).send({ erro: err.message});
    }
});

endpoints.get('/media', async (req, resp) => {
    try {
        const { id } = req.query;
      
        const resposta = await mediaPeloId(id);
        
        resp.send(resposta)
    } catch (err) {
        resp.status(400).send({ erro: err.message});
    }
});


export default endpoints