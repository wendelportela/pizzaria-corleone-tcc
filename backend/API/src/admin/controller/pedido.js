import { Router } from "express";
import { Listarpedido, Novopedido, atualizarStatusParte1, atualizarStatusParte2, atualizarStatusParte3, listarDetalhesPorId, listarPelaData, listarPorId, listarPorNome, listarPorOrdemAlfabetica, listarPorStatusCancelado, listarPorStatusEntregue, listarRastreamento, listarPedidosEntregue, listarPedidosEntreguecomData, listarVendasData, deletarPedidoPorId, listarPorStatusEntregueid} from "../repository/pedido.js";




const endpoints = Router()


endpoints.post('/pedido', async (req, resp) => {
    try {
        const pedido = req.body;
        // console.log("foi ? sera:"+ pedido);
        const resposta = await Novopedido(pedido)
        console.log("foi:"+resposta)
        resp.send(resposta)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


endpoints.get('/pedido', async (req, resp) => {
    try {
        const w = await Listarpedido()

        resp.send(w)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



endpoints.get('/pedido/nome/:nome', async (req, resp) => {
    try {
        const {nome} = req.params
        const w = await listarPorNome(nome)
        resp.send(w)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



endpoints.get('/pedido/id/:id', async (req, resp) => {
    try {
        const {id} = req.params
        const w = await listarPorId(id)
        resp.send(w)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



endpoints.get('/pedido/ordem', async (req, resp) => {
    try {
        const w = await listarPorOrdemAlfabetica()
        resp.send(w)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


endpoints.get('/pedido/data/:data', async (req, resp) => {
    try {
        const {data} = req.params
        const w = await listarPelaData(data)
        resp.send(w)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


endpoints.get('/pedido/status/entregue', async (req, resp) => {
    try {
        const w = await listarPorStatusEntregue()
        resp.send(w)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})
endpoints.get('/pedido/status/entregue/:id', async (req, resp) => {
    try {
        const {id} = req.params
        const w = await listarPorStatusEntregueid(id)
        resp.send(w)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/pedido/status/cancelado', async (req, resp) => {
    try {
        const w = await listarPorStatusCancelado()
        resp.send(w)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})




endpoints.get('/pedido/detalhes/id/:id', async (req, resp) => {
    try {
        const {id} = req.params
        const w = await listarDetalhesPorId(id)
        resp.send(w)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})




////////////////////////// a pedido



endpoints.get('/pedido/rastreamento', async (req, resp) => {
    try {
        const w = await listarRastreamento();

        resp.send(w)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

// // Endpoint para em preparo
// endpoints.put('/pedido/rastreamento/empreparo/:id', async (req, resp) => {
//     try {
//         const { id } = req.params;
//         const result = await atualizarStatusParte1(id);

//         if (result === 0) {
//             resp.status(400).send({ err: "Status do pedido não foi alterado" });
//         } else {
//             resp.status(200).send({ message: "Status do pedido alterado" });
//         }
//     } catch (err) {
//         resp.status(400).send({
//             erro: err.message
//         });
//     }
// });

// // Endpoint para saiu para entrega
// endpoints.put('/pedido/rastreamento/saiuparaentrega/:id', async (req, resp) => {
//     try {
//         const { id } = req.params;
//         const result = await atualizarStatusParte2(id);

//         if (result === 0) {
//             resp.status(400).send({ err: "Status do pedido não foi alterado" });
//         } else {
//             resp.status(200).send({ message: "Status do pedido alterado" });
//         }
//     } catch (err) {
//         resp.status(400).send({
//             erro: err.message
//         });
//     }
// });

// Endpoint para entregue


endpoints.put('/pedido/rastreamento/alterar', async (req, resp) => {
    try {
        const id  = req.body;
        const result = await atualizarStatusParte3(id);

        if (result === 0) {
            resp.status(400).send({ err: "Status do pedido não foi alterado" });
        } else {
            resp.status(200).send({ message: "Status do pedido alterado" });
        }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


endpoints.get('/pedido/entregue', async (req, resp) => {
    try {
        const pedidosEntregues = await listarPedidosEntregue();

        resp.send(pedidosEntregues);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.get('/pedido/entregue/data', async (req, resp) => {
    try {
        const pedidosEntregues = await listarPedidosEntreguecomData();

        resp.send(pedidosEntregues);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});




endpoints.get('/pedido/vendas/data/:data', async (req, resp) => {
    try {
        const {data} = req.params
        const w = await listarVendasData(data)
        resp.send(w)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.delete('/pedido/deletar/:id', async (req, resp) => {
    try {
        const id = req.params.id; 
        const result = await deletarPedidoPorId(id);

       
        if (result.affectedRows > 0) {
            resp.status(200).send({
                mensagem: 'Pedido excluído com sucesso.'
            });
        } else {
            resp.status(404).send({
                erro: 'Pedido não encontrado.'
            });
        }
    } catch (err) {
        resp.status(500).send({
            erro: err.message
        });
    }
});





export default endpoints