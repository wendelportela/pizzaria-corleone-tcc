

import   { Router } from "express";
import { 
        alterarcomentario,
        deletarcomentario, 
        inserircometario, 
        listarcomentario  }
 from "../repository/comentarioRepository.js";





const endpoints = Router()


endpoints.post( '/comentario' , async (req , resp ) =>{

    try {
          const  comentario  = req.body;                             
          const resposta = await inserircometario(comentario);

          resp.send(resposta);

        
      } catch (err) {
        resp.status(400).send({ err: err.message });
      }


})



endpoints.get( '/listar/comentario/:id' , async (req,resp) =>{

    try {
      const {id} = req.params
      
      const resposta = await listarcomentario(id)
      resp.send(resposta)
     
    } 
    
      catch (err) {
      resp.status(400).send({erro:err.message})
    }
  })



  
endpoints.put ('/comentario/alterar/:id', async (req,resp) =>{

  try {

      const {id}   = req.params
      const comentario = req.body
    
    if( !comentario){
        resp.status(400).send({erro:' é necessario prencher todos os campos'})
     }
      else {
          const resposta = await alterarcomentario(id , comentario)
          if (resposta==1) {
           resp.status(200).send({message: ' pedido alterado com sucesso'})
       } 
      }

  }

  catch (err) {
    resp.status(400).send({erro:err.message})
  }

})




endpoints.delete( '/comentario/:id' , async( req,resp) =>{
  try {
    
    const {id} = req.params
    const resposta = await deletarcomentario(id)

      if(resposta ===1){
        resp.status(200).send({message:'Comentario deletado com sucesso'})
      }
      else{
        resp.status(400).send({erro:'Não foi possivel localizar o comentario'})
      }
  } 
  
  catch (err) {
    resp.status(400).send({erro:err.message})
  }
})



export default endpoints
