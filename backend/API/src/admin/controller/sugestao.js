import { Router } from "express";
import { excluirSugestao, sugestoesBebida, sugestoesPizza, sugestoesSobremesa } from "../repository/sugestao.js";


const endpoints = Router()

endpoints.get ( '/corleone/sugestao/pizza/:id' , async (req,resp)=>{
    try {
        const {id} = req.params;
        const resposta = await sugestoesPizza(id)

        resp.send(resposta)
    } catch (errr) {
        resp.status(400).send({erro:errr.message})
    }
})

endpoints.get ( '/corleone/sugestao/bebida/:id' , async (req,resp)=>{
    try {
        const {id}= req.params;
        const resposta = await sugestoesBebida(id)

        resp.send(resposta)
    } catch (errr) {
        resp.status(400).send({erro:errr.message})
    }
})

endpoints.get ( '/corleone/sugestao/sobremesa/:id' , async (req,resp)=>{
    try {
        const {id} = req.params;
        const resposta = await sugestoesSobremesa(id)

        resp.send(resposta)
    } catch (errr) {
        resp.status(400).send({erro:errr.message})
    }
})


endpoints.delete('/corleone/sugestao/deletar/:id', async (req, resp) => {
    try {
      const { id } = req.params
  
  
      const r = await excluirSugestao(id)
  
      if (r === 0) {
        resp.status(404).send('sugestao desse produto não encontrado')
      }
  
      else {
        resp.status(200).send("sugestao desse produto excluido com sucesso")
      }
    } catch (err) {
      resp.status(500).send(err.message)
    }
  
  })

export default endpoints