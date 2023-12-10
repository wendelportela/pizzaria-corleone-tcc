import { Router} from 'express';
import { Grafico, ListarVendas } from '../repository/vendas.js';
const endpoints = Router();

endpoints.get('/vendas', async (req,resp) => {
    try {
        const resposta = await ListarVendas()

        resp.send(resposta)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



endpoints.get('/vendas/grafico', async (req,resp) => {
    try {
        const resposta = await Grafico()

        resp.send(resposta)
     } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



export default endpoints