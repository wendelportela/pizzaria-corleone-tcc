

import { Router } from 'express';
import {
  inserirProduto,
  listarProdutos,
  editarproduto,
  excluirProduto,
  alterarImagem,
  listarpornome,
  deletarImagem,
  listarporid,
  listarportipo,
  listarPorRestricao,
  listarImagem,
  Inseririmagem,
  deletarFavoritoProduto,
  deletarCarrinhoProduto,
  contarProdutos
} from '../repository/produtorepository.js';

import multer from 'multer';
import { analise } from './analise.js';
const upload = multer({ dest: 'storage/produto' });

const endpoints = Router();




endpoints.post('/produto', async (req, resp) => {
  try {
    const produto = req.body;

    const verificar = await analise(produto)

    if (verificar.length > 0) {
      resp.status(400).send({ erro: verificar })
    }
    else {
      const resposta = await inserirProduto(produto)
      resp.send(resposta)
    }


  } catch (err) {
    resp.status(500).send({ erro: err.message });
  }

});


endpoints.get('/produto/comentario/:id', async (req, resp) => {
  const { id } = req.params
  const res = await listarcomentario(id)

  resp.send(res)
})

endpoints.get('/produto/:nome', async (req, resp) => {
  try {
    const { nome } = req.params
    const r = await listarpornome(nome)

    resp.send(r)

  } catch (err) {
    resp.status(500).send({
      erro: err.message
    })
  }
})

endpoints.get('/produto/restricoes/:restricao', async (req, resp) => {
  try {
    const { restricao } = req.params

    const resposta = await listarPorRestricao(restricao)

    resp.send(resposta)
  } catch (err) {
    resp.status(400).send({
      erro: err.message
    })
  }
})
endpoints.get('/produto/restricoes', async (req, resp) => {
  try {
    const { restricao, restricao2 } = req.query

    const resposta = await listarPorRestricao(restricao, restricao2)

    resp.send(resposta)
  } catch (err) {
    resp.status(400).send({
      erro: err.message
    })
  }
})

endpoints.get('/produto/tipos/:tipo', async (req, resp) => {
  try {
    const { tipo } = req.params
    const resposta = await listarportipo(tipo)
    resp.send(resposta)

    if (resposta.length == 0) {
      resp.status(404).send('tipo não encontrado')
    }
  } catch (err) {
    resp.status(400).send({
      erro: err.message
    })
  }
})

endpoints.get('/produto/listar/:id', async (req, resp) => {
  try {
    const { id } = req.params
    const r = await listarporid(id)

    resp.send(r)

  } catch (err) {
    resp.status(500).send({
      erro: err.message
    })
  }
})



endpoints.get('/produto', async (req, resp) => {
  try {
    const restricao = req.params;
    const tipoComida = req.body
    const produtos = await listarProdutos(restricao);
    resp.send(produtos);

  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }

});






endpoints.put('/produto/editar/:id', async (req, resp) => {

  try {

    const { id } = req.params
    const produto = req.body

    const resposta = await editarproduto(produto, id)
    if (resposta === 0) {
      resp.status(400).send({ err: "produto não encontrado" })
    }

    else {
      resp.status(200).send({ message: 'produto alterado com sucesso' })
    }
  } catch (err) {
    resp.status(400).send({ erro: err.message })
  }


})





/*endpoints.put( '/produto/editar/campos/:idproduto' , upload.single('capa'), async  (req,resp)=>{

  try {
    const {id} = req.params
    const imagem = req.body; 
    const produto = req.body

    const verificar = await analise(produto , imagem ,id)

    if(verificar.length > 0 ){
      resp.status(400).send({erro:verificar})
    }
    else{
      const resposta = await editarprodutocomleto(produto , id)
      if( resposta === 0){
        resp.status(400).send({err: "produto não encontrado"})
     } 
     else{
     resp.status(200).send({message:'produto alterado com sucesso'})
    }
    }
  } catch (err) {
    resp.status(400).send({})
  }
})*/





endpoints.delete('/produto/:id', async (req, resp) => {
  try {
    const { id } = req.params;
    const resposta = await excluirProduto(id);

    if (resposta === 0) {
      resp.status(404).send({ message: 'Produto não encontrado' });
    } else {
      resp.status(200).send({ message: 'Produto excluído com sucesso' });
    }
  } catch (err) {
    resp.status(500).send({ erro: err.message });
  }
});





endpoints.get('/imagem', async (req, resp) => {
  try {
    const resposta = await listarImagem()

    resp.send(resposta);
  } catch (err) {
    resp.status(400).send({
      erro: err.message
    })
  }
})


endpoints.post('/produto/:id/capa', upload.single('capa'), async (req, resp) => {
  try {
    const { id } = req.params;
    const imagem = req.file.path;
    const resposta = await Inseririmagem(imagem, id);




    if (resposta != 1) {
      console.log('imagem nao pode ser salva')
    }


    resp.status(204).send('imagem cadastrada');
  } catch (err) {
    resp.status(400).send({
      erro: err.message
    });
  }
});


endpoints.put('/produto/:id/imagem', upload.single('capa'), async (req, resp) => {

  try {
    const { id } = req.params;
    const imagem = req.file.path;

    const r = await alterarImagem(id, imagem)



    // if(r != 1) {
    //   throw new Error ('A imagem não pode ser alterada.')
    // }

    resp.status(204).send('imagem cadastrada')
  } catch (err) {
    resp.status(400).send({
      erro: err.message
    });
  }

})


endpoints.delete('/imagem/deletar/:id', async (req, resp) => {
  try {
    const { id } = req.params


    const r = await deletarImagem(id)

    if (r === 0) {
      resp.status(404).send('imagem não encontrada')
    }

    else {
      resp.status(200).send("imagem excluida com sucesso")
    }
  } catch (err) {
    resp.status(500).send(err.message)
  }

})




endpoints.delete('/produto/favoritos/deletar/:id', async (req, resp) => {
  try {
    const { id } = req.params


    const r = await deletarFavoritoProduto(id)

    if (r === 0) {
      resp.status(404).send('favorito desse produto não encontrado')
    }

    else {
      resp.status(200).send("favorito desse produto excluido com sucesso")
    }
  } catch (err) {
    resp.status(500).send(err.message)
  }

})




endpoints.delete('/produto/carrinho/deletar/:id', async (req, resp) => {
  try {
    const { id } = req.params


    const r = await deletarCarrinhoProduto(id)

    if (r === 0) {
      resp.status(404).send('Carrinho desse produto não encontrado')
    }

    else {
      resp.status(200).send("Carrinho desse produto excluido com sucesso")
    }
  } catch (err) {
    resp.status(500).send(err.message)
  }

})

endpoints.get('/produto/contar', async (req, res) => {
  try {
    const totalProdutos = await contarProdutos();
    res.json({ totalProdutos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao contar produtos.' });
  }
});





endpoints.delete('/produto/sugestao/deletar/:id', async (req, resp) => {
  try {
    const { id } = req.params


    const r = await excluirSugestao(id)

    if (r === 0) {
      resp.status(404).send('Carrinho desse produto não encontrado')
    }

    else {
      resp.status(200).send("Carrinho desse produto excluido com sucesso")
    }
  } catch (err) {
    resp.status(500).send(err.message)
  }

})





export default endpoints;

