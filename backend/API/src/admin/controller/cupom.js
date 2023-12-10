import { Router } from "express";
import { verificarCupom } from "../repository/cupom.js";




const endpoints = Router()


endpoints.get('/cupom/:cupom' , async (req,resp) =>{
    try {
        const {cupom} = req.params
     
        const resposta  = await verificarCupom(cupom)

        resp.send(resposta)
    } catch (err) {
        resp.status(400).send({error:err.message})
    }
})


export default endpoints