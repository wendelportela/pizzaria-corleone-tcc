import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './assets/config/fonts-config.scss'

/////////////////////PAGINAS USUARIO 

import Leading from './pages/leading-page';
import Cardapio from './pages/cardapio';
import CompSobre from './components/compSobre';
import SobreNos from './pages/sobrenos';
import TelaAssociado from './pages/telaassociado';
import Pagamento from './pages/pagamento';
import Pedidosativos from './pages/pedidosativos';
import Informacoes from './components/infoproduto/informacoes';
import CompAtalhosAdm from './components/compAtalhosAdm';


import MinhaConta from './pages/perfil';
import ComprarPedido from './pages/comprarPedido';
import EnderecoPedido from './pages/enderecopedido';
import Confirmacaopedidos from './pages/confirmacaopedidos';
//////////////////////////////////////////////

///////////////////// PAGINAS ADM


import ListarPedido from './pages/ADM/listarPedido';
import ListarProdutosAdm from './pages/ADM/listarProdutosAdm';
import Cadastrarproduto from './pages/ADM/cadastrarproduto';
import EditarProduto from './pages/ADM/editarProduto';
import MaisDetalhes from './pages/ADM/maisDetalhes';
import ClienteAdm from './pages/ADM/clienteAdm';
import Vendas from './pages/ADM/vendas';
import Dashboard from './pages/ADM/dashboard';
import Finalizarcadastrado from './pages/finalisarcompra';
import ClienteDetalhe from './pages/ADM/clienteDetalhes';
import Carrinhodecompras from './pages/ADM/carrinhodecompras';
import CadaFavorito from './pages/ADM/cadaFavorito';
import ClienteMaisdetalhe from './pages/ADM/ClienteAdmMaisdetalhe';
import Cartaocliente from './pages/ADM/cartaoCliente';
import Favoritos from './pages/favoritosAdm';
import Teste from './pages/teste';

////////////////////////////////////////////////////////////
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AnimatePresence } from 'framer-motion';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="62329504481-7ha8n0mu3oskcf0839rkdp44l7n2uks2.apps.googleusercontent.com">
      <AnimatePresence mode='wait'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Leading />} />
            <Route path='/sobrenos' element={<SobreNos />} />
            <Route path='/cardapio' element={<Cardapio />} />
            <Route path='/associado' element={<TelaAssociado />} />
            <Route path='/comp' element={<CompSobre />} />
            <Route path='/pagamento' element={<Pagamento />} />
            <Route path='/ativos' element={<Pedidosativos />} />
            <Route path='/cadastroproduto' element={<Cadastrarproduto />} />
            <Route path='/informacao/:id' element={<Informacoes />} />
            <Route path='/compatalhos' element={<CompAtalhosAdm />} />
            <Route path='/produtos' element={<ListarProdutosAdm />} />
            <Route path='/pedido1' element={<ComprarPedido />} />
            <Route path='/pedido2' element={<EnderecoPedido />} />
            <Route path='/pedido3' element={<Confirmacaopedidos />} />
            <Route path='/produto/alterar/:id' element={<EditarProduto />} />
            <Route path='/detalhes/pedido/:id' element={<MaisDetalhes />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/listapedido' element={<ListarPedido />} />
            <Route path='/minhaconta' element={<MinhaConta />} />
            <Route path='/cliente' element={<ClienteAdm />} />
            <Route path='/vendas' element={<Vendas />} />
            <Route path='/corleone/usuario/carrinho/listar/:id' element={<Carrinhodecompras />} />
            <Route path='/corleone/usuario/compra' element={<Finalizarcadastrado />} />
            <Route path='/clienteDetalhes' element={<ClienteDetalhe />} />
            <Route path='/favoritos' element={<Favoritos />} />
            <Route path='/cadafavorito/cliente/:id' element={<CadaFavorito />} />
            <Route path='/clienteadmmaisdetalhe/:id' element={<ClienteMaisdetalhe />} />
            <Route path='/cartao/listar/:id' element={<Cartaocliente />} />
          </Routes>
        </BrowserRouter>
      </AnimatePresence>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

