import 'dotenv/config';

import  express  from 'express';
import  cors     from 'cors'


                   // import endpoints

// endpoints adm {

import tipo       from './admin/controller/tipoprodutocontroller.js'
import restricao  from'./admin/controller/restricaocontroller.js'
import produto    from './admin/controller/produtocontroller.js'
import usuario    from './admin/controller/usuariocontroler.js'
import sugestao   from './admin/controller/sugestao.js'
import cupom      from './admin/controller/cupom.js'
import vendas     from './admin/controller/vendas.js'
import Pedido     from './admin/controller/pedido.js'
//  }
 

// edpoints usuario {
import avaliacao  from './user/controller/avaliacao.js'
import media      from './user/controller/media.js';
import favoritos  from './user/controller/favorito.js'
import comentario from './user/controller/comentarioController.js'
import endereco   from './user/controller/enderecoController.js'
import cliente    from './user/controller/clienteController.js'
import carrinho   from './user/controller/carrinho.js'
import cartao     from './user/controller/pagamentoController.js'
import produtoUs  from './user/controller/produtoController.js'
import compra     from './user/controller/compra.js' 
// }


const server = express()
server.use(cors())
server.use(express.json())

server.use('/storage/produto', express.static('storage/produto'));


server.use(tipo)
server.use(comentario)
server.use(endereco)
server.use(cliente)
server.use(restricao)
server.use(produto)
server.use(usuario)
server.use(avaliacao)
server.use(media)
server.use(favoritos)
server.use(carrinho)
server.use(cartao)
server.use(sugestao)
server.use(produtoUs)
server.use(cupom)

server.use(compra)
server.use(vendas)
server.use(Pedido)


server.listen ( process.env.PORT , () =>{
    console.log(`A API esta online na porta ${process.env.PORT}`)
})