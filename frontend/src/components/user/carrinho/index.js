import './index.scss';
import '../../../assets/config/fonts-config.scss';

import Cozinheiro from '../../../assets/images/pictures/cozinheiro.png';
import CardCarrinho from '../carrinhoCard';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useFetcher } from 'react-router-dom';
import { toast } from 'react-toastify';

import { API_URL } from '../../../config/constants';

export default function Carrinho({ onClose }) {

  const [listarr, setListarr] = useState([]);
  const [mostrar, setMostrar] = useState(false);
  const [verificar, setVerificar] = useState([])
  const [usuario, setUsuario] = useState(null)




  useEffect(() => {

    async function listar() {
      let us = localStorage.getItem('usuario-logado');
      us = JSON.parse(us)
      // console.log(us)
      if (us != null) {
        setUsuario(us)

        const response = await axios.get(API_URL + '/corleone/usuario/carrinho/listar/' + us.id);
        console.log(response.data)
        setListarr(response.data)
        const resp = await axios.get(`${API_URL}/corleone/pedido/cliente/${us.id}`);
        setVerificar(resp.data)

        if (listarr.length < 1) {
          setMostrar(true)
        }
        else {
          setMostrar(false)
        }
      }
      else {
        setMostrar(true)
      }
    }

    listar();
  }, [listarr]);





  async function Adicionar() {
    try {
      let compra = {
        "id_cliente": usuario.id,
        "desconto": 0,
        "produtos": [], // Aqui você manterá os detalhes dos produtos
        "subtotal": 0,
        "total": 0,
        "ds_qtd": 0 ,
        "ds_status":false
      };
  
      let totalProdutosqtd = 0;
  
      const mappedPrices = listarr.map((item) => {
        const preco = parseFloat(item.preco);
        const quantidade = Array.isArray(item.quantidade) ? item.quantidade : [item.quantidade];
  
        totalProdutosqtd += quantidade.reduce((acm, pro) => acm + pro, 0);
  
        if (!isNaN(preco) && quantidade.every((qtd) => !isNaN(qtd))) {
          const quantidadeItem = quantidade.reduce((acm, pro) => acm + pro, 0);
          compra.produtos.push({
            id_produto: item.id_produto,
            nome:item.nm_produto,
            quantidade: quantidadeItem
          });
          return preco * quantidadeItem;
        } else {
          return 0;
        }
      });
  
      // Calcular o subtotal
      const subtotal = mappedPrices.reduce((acm, preco) => acm + preco, 0);
      
      // Calcular o total (considerando desconto, se houver)
      const total = subtotal - compra.desconto;
  
      // Atribuir os valores corretos
      compra.subtotal = subtotal;
      compra.total_compra = total;
  
      // Atribuir a quantidade total
      compra.ds_qtd = totalProdutosqtd;
  
      if (verificar.length > 0) {
        const response = await axios.put(`${API_URL}/corleone/altera/pedido/${usuario.id}`, compra);
      } else {
        try {
          const response = await axios.post(`${API_URL}/corleone/pedido/produto`, compra);
        } catch (err) {
          console.log(err.message);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  }
  


  return (
    <div className='carrinhoSideBar'>
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="17" viewBox="0 0 15 17" fill="none" onClick={onClose}>
        <path d="M1 2.01746L13.3896 15.2992" stroke="#53220D" strokeWidth="2" strokeLinecap="round" />
        <path d="M1.00049 15.2985L13.3901 2.01674" stroke="#53220D" strokeWidth="2" strokeLinecap="round" />
      </svg>

      {mostrar == true &&
        <div className='cozinheiroCentral'>
          <img src={Cozinheiro} alt="Cozinheiro" />
          <h2>Carrinho Vazio</h2>
          <p>Adicione itens ao seu carrinho</p>
        </div>
      }

      {mostrar == false &&
        <div className='carrinhoPro'>
          {listarr.map((item) => (
            <CardCarrinho produto={{ nome: item.produto, preco: item.preco, qtd: item.quantidade, id: item.id_carrinho, imagem: item.imagem}} />
          ))
          }
          <Link to={'/corleone/usuario/compra'} className='button' onClick={Adicionar}>
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="29" viewBox="0 0 35 29" fill="none">
              <path d="M2.88354 15.6783V18.3798C2.88354 18.6182 3.17562 18.7771 3.37034 18.7771H29.7546C30.0467 18.7771 30.2414 18.5387 30.2414 18.3798V15.6783C30.2414 15.5988 30.2414 15.4399 30.144 15.3604L24.3025 10.4341H8.91979L3.07826 15.3604C3.07826 15.5194 2.88354 15.5988 2.88354 15.6783ZM9.30923 11.3081H23.913L28.6836 15.281H18.1689C18.0715 15.9166 17.39 16.3139 16.8059 16.3139C16.027 16.3139 15.5402 15.9166 15.4428 15.281H4.73336L9.30923 11.3081ZM3.95449 16.0756H14.5666L14.664 16.155C15.1508 16.7112 15.9296 17.1085 16.7085 17.1085C17.4874 17.1085 18.2662 16.7907 18.753 16.155L18.8504 16.0756H29.4625V17.9825H3.95449V16.0756Z" />
            </svg>
            <p >Fazer Pedido</p>
          </Link>
        </div>


      }




    </div>
  );
}
