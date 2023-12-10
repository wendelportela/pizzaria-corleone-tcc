import { Router } from "express";
import { ListarCardapio, CompradosPeloCliente, ListagemProdutosComprados } from "../repository/produtoRepository.js";

let endpoint = Router()

endpoint.get('/produto/consulta/cardapio', async (req, resp) => {
    try {
        let { tp, restricao_1, restricao_2,  nm, orderby } = req.query

        if(restricao_1 === '' || restricao_1 === undefined)
            restricao_1 = '%'
        if(restricao_2 === '' || restricao_2 === undefined)
            restricao_2 = '%'

        if(!nm)
            nm = '%'
        else if(nm !== '')
            nm = '%' + nm + '%' 

        if(tp === '')
            tp = '%'
        if(orderby === '')
            orderby = 'null'

        let response = await ListarCardapio(tp, restricao_1, restricao_2, nm, orderby)

        resp.status(200).send(response)
        
    } catch (error) {
        resp.status(400).send(error.message)  
    }
})

endpoint.get('/comprados/usuario', async (req, resp) => {
    try {
        let idCliente = req.query.id

        let response = await CompradosPeloCliente(idCliente)
    
        resp.send(response.produtos)    
    } catch (err) {
        resp.send()
    }
})

endpoint.get('/compra/listagem', async (req, resp) => {
    try {
        let idProduto = req.query.id

        let response = await ListagemProdutosComprados(idProduto)
    
        resp.send(response)    
    } catch (err) {
        resp.send()
    }
})


export default endpoint