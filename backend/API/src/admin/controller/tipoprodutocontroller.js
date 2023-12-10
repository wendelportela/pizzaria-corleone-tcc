import  { Router } from "express";
import { alterartipo, inserirtipoproduto, listartipo, verificar } from "../repository/tipoprodutorepository.js";

const endpoints = Router()

endpoints.post( '/tipo' , async (req , resp) =>{

    try {
        
      const  {tipo} = req.body

      if( !tipo){
       resp.status(400).send({erro:'é necessario prencher todos os campos'})
      }
      
      else{
        const existente = await verificar({tipo})

        if( existente ){
          resp.status(400).send({erro: 'Tipo de produto ja encontrado'})
        }
        else{
          const resposta = await inserirtipoproduto(tipo)
          resp.send(resposta)
        }
       
      }
      
    }

    catch (err) {
        resp.status(400).send({erro: err.message})
    }

})




endpoints.get( '/listar/tipo' , async (req,resp) =>{

  try {
    
    const resposta = await listartipo()
    resp.send(resposta)

  } 
  
    catch (err) {
    resp.status(400).send({erro:err.message})
  }
})

endpoints.put ('/tipo/alterar/:id', async (req,resp) =>{

  try {

      const {tipo} = req.body
      const {id} = req.params

    
    if( !tipo){
        resp.status(400).send({erro:' é necessario prencher todos os campos'})
     }

     else{
          if( existente ){
            resp.status(400).send({erro: 'Tipo de produto ja encontrado'})
          }

          else{
            const resposta = await alterartipo(id , tipo)
            resp.send(resposta)
          }
      }

     }
    

  catch (err) {
    resp.status(400).send({erro:err.message})
  }

})

export default endpoints