import { Router } from "express";
import { alterarfavorito, favorito, favoritoRanked, inserirfavorito, listarfavoritos, verificafavorito, listarFavoritosDeUmCliente } from "../repository/favorito.js";

const endpoits = Router();

// mais informações em analise

const validarCampos = (req, resp, favorito) => {
  if (!favorito.cliente) {
    resp.status(400).send({ erro: "É necessário preencher todos os campos. Campo Cliente vazio" });
  } else if (!favorito.produto) {
    resp.status(400).send({ erro: "É necessário preencher todos os campos. Campo produto vazio" });
  } else if (favorito.favorito === undefined) {
    resp.status(400).send({ erro: "É necessário preencher todos os campos. Campo favorito vazio" });
  } else {
    return true;
  }
  return false;
};



endpoits.post('/corleone/produtos/favoritos', async (req, resp) => {
  try {
     
      const favorito = req.body

      if (validarCampos(req, resp, favorito)) {
      const resposta = await inserirfavorito(favorito);
      resp.send(resposta);
    }
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }

});




endpoits.get('/corleone/produtos/favoritos/usuario/:id', async (req, resp) => {
  try {

    const { id } = req.params
    const resposta = await listarfavoritos(id);
    resp.send(resposta)

  } catch (err) {

    resp.status(400).send({ erro: err.message });
  }
});




endpoits.get('/corleone/produtos/favoritos/listar', async (req, resp) => {
  try {

    const resposta = await favorito();
    resp.send(resposta)

  } catch (err) {

    resp.status(400).send({ erro: err.message });
  }
});


endpoits.get('/corleone/produtos/favoritos/listar/ranked', async (req, resp) => {
  try {

    const resposta = await favoritoRanked();
    resp.send(resposta)

  } catch (err) { 
    resp.status(400).send({ erro: err.message });
  }
});




endpoits.put('/corleone/produtos/alterar/favoritos', async (req, resp) => {
  try {

    const favorito = req.body
    const erro = []

    if (!favorito.id) {
      erro.push('É necessário preencher todos os campos. Campo ID vazio');
    }
    if (favorito.favorito === undefined) {
      erro.push('É necessário preencher todos os campos. Campo favorito vazio');
    }

    if (erro.length > 0) {
      resp.status(400).send({ erro });
    } 

    else {
        const resposta = await alterarfavorito(favorito)

        if (resposta === true) {
            resp.status(200).send({ resposta: 'alterado com sucesso' });
        } else {
            resp.status(400).send({ erro: 'ocorreu um erro' });
        }
    }

  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});



endpoits.get('/corleone/produtos/favoritos/verificar', async (req, resp) => {
  try {

    const {produto, cliente} = req.query

    const resposta = await verificafavorito(produto, cliente)

    if (resposta.length === 0) {
      throw new Error('Esse usuário não possui esta pizza cadastrada como favorita')
    }
     else {
      resp.send(resposta);
    }

  } catch (err) {
    resp.status(400).send({ err: err.message });
  }
});


// mais informações em analise
endpoits.get('/corleone/produtos/favoritos/verificar/:id/produto/:nomeProduto', async (req, resp) => {
  try {
    const { id, nomeProduto } = req.params;

    const resposta = await listarFavoritosDeUmCliente(id, nomeProduto);

    if (resposta.length === 0) {
      throw new Error('Este usuário não possui este produto cadastrado como favorito');
    } else {
      resp.send(resposta);
    }

  } catch (err) {
    resp.status(400).send({ err: err.message });
  }
});



export default endpoits;
