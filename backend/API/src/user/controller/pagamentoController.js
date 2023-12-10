import { Router } from "express";
import { validarDadosCartao, listarTodosCartoes, ExcluirCartao, listarCartaoPorId, ListarCartaoCliente, AlterarCartao, CadastrarCartao, ListarCartaoClienteid } from "../repository/pagamentoRepository.js";

const endpoints = Router()


endpoints.get('/cartao/listar', async (req, resp) => {
    try {
        const cartoes = await listarTodosCartoes(); 

        resp.status(200).send(cartoes);
    } catch (error) {
        resp.status(500).send('Erro interno do servidor');
    }
});



endpoints.get('/cartao/listar/:id', async (req, resp) => {
    try {
        const id = req.params.id; 

        const cartao = await listarCartaoPorId(id); 
        if (cartao) {
            resp.status(200).send(cartao); 
        } else {
            resp.status(404).send('Cartão não encontrado'); 
        }
    } catch (error) {
        resp.status(500).send('Erro interno do servidor');
    }
});


endpoints.post('/cliente/cartao', async (req, resp) => {
    try {
        let request = req.body;

        if(request.cartao){
            let requestUpdate = await AlterarCartao(request)
            
            resp.send(requestUpdate)
        }
        else{
            let requestCadastro = await CadastrarCartao(request)
            resp.send(requestCadastro)
        }
    } catch (err) {
        resp.status(500).send(err.message);
    }
})

endpoints.get('/cliente/cartao', async (req, resp) => {
    try {
        let { request } = req.query;
        let verifyError = validarDadosCartao(request)
        
        if(request != null){
            let requestVerify = await ListarCartaoCliente(request)
            resp.send(requestVerify)
        }
        else{
            resp.status(404).send()
        }
    } catch (err) {
        resp.status(500).send(err.message);
    }
})

endpoints.delete('/cliente/cartao', async (req, resp) => {
    try {
        let { id } = req.query;

        let response = await ExcluirCartao(id)

        resp.send(response)

    } catch (err) {
        resp.status(500).send(err.message);
    }
})

endpoints.get('/cliente/cartao/:id', async (req, resp) => {
    try {
        let { id } = req.params; 
        
        let response = await ListarCartaoClienteid(id); 
        
        resp.send(response);
       
    } catch (err) {
        resp.status(500).send(err.message);
    }
});





export default endpoints