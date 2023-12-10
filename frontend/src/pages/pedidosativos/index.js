import './index.scss'
import '../../assets/config/fonts-config.scss'
import pizza from '../../images/pizza.png';
import Vinho from '../../images/vinho.png'
import sobre from '../../images/sobremesa.png'
import relogio from '../../images/relogio.png'
import localizacao from '../../images/localizacao.png'
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_URL } from '../../config/constants';
import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router-dom';

import { PedidoAtv } from '../../components/LottieAnimations/notFound';

export default function PedidosAtivos() {

const [listaPedido,setListaPedido] = useState([])
const [ produtos , setProdutos] = useState([])
useEffect(() => {
    async function fetchData() {
      try {
        // Obter a lista de pedidos
        const responsePedidos = await axios.get(`${API_URL}/pedido/rastreamento`);
        setListaPedido(responsePedidos.data);

        // Obter detalhes dos produtos para cada pedido
        const produtosPromises = responsePedidos.data.map(async (pedido) => {
          const produtosDoPedido = await Promise.all(
            pedido.produtos.map(async (produto) => {
              const responseProduto = await axios.get(`${API_URL}/produto/${produto.id_produto}`);
              return responseProduto.data;
            })
          );

          return { ...pedido, produtos: produtosDoPedido };
        });

        const pedidosComProdutos = await Promise.all(produtosPromises);

        // Setar o estado com os pedidos e produtos
        setListaPedido(pedidosComProdutos);
      } catch (error) {
        toast.error(error.message);
      }
    }

    fetchData();
  }, []);
  
    return (
        <div className="container-maior">
            <PedidoAtv />
            <h1>Error 404</h1>
            <p>Pagina em manutenção, favor retornar mais tarde.</p>
        </div>
    )
}