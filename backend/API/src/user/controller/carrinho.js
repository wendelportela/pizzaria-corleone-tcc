import { Router } from "express";
import { alteraritens, itenscarrinho, listarcarrinho, listarcarrinhoid, verificarcarrinho, buscarNomeDoProduto, listarProdutosDeUmCliente, listarcarrinhoidsem, passarImagemCarrinho } from "../repository/carrinho.js";



const endpoints = Router()

const verificar =( (req,resp,itens) =>{
    if(!itens.produto){
        resp.status(400).send({erro:'É necessario preencher todos os campos .Campo "produto" vazio'})
    }

    else if(!itens.disponivel){
        resp.status(400).send({erro:'É necessario preencher todos os campos .Campo ""disponivel" vazio'})
    }
    else{
        return true
    }
    return false
} )

endpoints.post('/corleone/usuario/carrinho' , async (req,resp) =>{
    try {
           const itens = req.body

        if( verificar(req,resp,itens)){
            const enviar = await itenscarrinho(itens)
           
            resp.send(enviar)
           
        }
    
    } catch (err) {
        resp.status(600).send({erro:err.message})
    }
})


endpoints.put('/corleone/usuario/carrinho/editar' , async (req,resp) =>{
    try {
       
        const erro = []
        const itens = req.body
        const resposta = await alteraritens(itens)
        


        if(!itens.qtd){
            erro.push('É necessario preencher todos os campos .Campo "qtd" vazio')
        }
        else if(!itens.idcarrinho){
            erro.push('É necessario preencher todos os campos .Campo "IDcarrinho" vazio')
        }

        if (erro.length > 0) {
            resp.status(400).send({ erro });
        }
        
        else{
            resp.status(200).send({message:'item alterado com sucesso '})        
           
         }

    }   catch (err) {
        resp.status(400).send({erro:err.message})
    }

})

endpoints.get('/corleone/usuario/carrinho/listar' , async (req,resp) =>{
    try {
      const resposta = await listarcarrinho()
      resp.send(resposta)  

    } catch (err) {
        resp.status(400).send({erro:err.message})
    }
})

endpoints.get('/corleone/usuario/carrinho/listar/:id' , async (req,resp) =>{
    try {
      const {id} = req.params
      const resposta = await listarcarrinhoid(id)
      

      
      resp.send(resposta)  

    } catch (err) {
        resp.status(400).send({erro:err.message})
    }
})




endpoints.get('/corleone/usuario/carrinho/verificar/:cliente/:produto' , async (req,resp) =>{
    try {
      const {cliente,produto} = req.params

      const resposta = await verificarcarrinho(cliente,produto)



      if (resposta == '') {
        resp.send(resposta);
      }
       else {
        
        resp.send(resposta);
      }
  
    } catch (err) {
        resp.status(400).send({erro:err.message})
    }
})

endpoints.get('/corleone/produto/:produto', async (req, resp) => {
    try {
      const { produto } = req.params;
      const resultado = await buscarNomeDoProduto(produto);
      resp.send(resultado)
     
    } catch (err) {
      resp.status(500).send({ erro: err.message });
    }
  });





  endpoints.get('/corleone/usuario/carrinho/verificar/:id/produto/:nome' , async (req,resp) =>{
    try {
      const {id,nome} = req.params

      const resposta = await listarProdutosDeUmCliente(id,nome)


      if (resposta == '') {
        resp.send(resposta);
      }
       else {
        
        resp.send(resposta);
      }
  
    } catch (err) {
        resp.status(400).send({erro:err.message})
    }
})
  


endpoints.get('/corleone/usuario/carrinho/listar/sem/:id' , async (req,resp) =>{
    try {
      const {id} = req.params
      const resposta = await listarcarrinhoidsem(id)

      
      resp.send(resposta)  

    } catch (err) {
        resp.status(400).send({erro:err.message})
    }
})


endpoints.get('/corleone/usuario/carrinho/listar/imagem/:id' , async (req,resp) =>{
    try {
      const {id} = req.params
      const resposta = await passarImagemCarrinho(id)

      
      resp.send(resposta)  

    } catch (err) {
        resp.status(400).send({erro:err.message})
    }
})


export default endpoints