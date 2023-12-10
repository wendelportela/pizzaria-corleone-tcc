import { Router } from "express";
import { inseriravaliacao, listaravaliaco } from "../repository/avaliacao.js";


const endpoints = Router()


endpoints.post ( '/avaliacao' , async (req,resp)=>{

    try {
       
        const avaliacao = req.body
        const resposta  = await inseriravaliacao(avaliacao)  
        
        resp.send(resposta)
    } 
    catch (err) {
        resp.status(400).send({erro:err.message})
    }

} )


endpoints.get ( '/avaliacao' , async (req,resp)=>{
     
    try {
        const resposta = await listaravaliaco()
        resp.send(resposta)
    }
        catch (err) {
        resp.status(400).send({erro:err.message})
    }
})

export default  endpoints