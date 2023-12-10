import React from 'react';
import Check from '../../../assets/images/icons/check.svg';
import './index.scss';

export default function Cardhistorico(props) {
  console.log(props.pedido.produtos);

  return (
    <div className='card-historico'>
      <div className='card-secao-01'>
        <p>{new Date(props.pedido.data).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}</p>
        <h5> Comprar novamente</h5>
      </div>

      <div className='card-secao-02'>
        <h4> #{props.pedido.id}</h4>
        <h4>{renderizarProdutos(props.pedido.produtos)}</h4>
      </div>

      <div className='card-secao-03'>
        <img src={Check} alt="Check Icon" />
        <p>{props.pedido.situacao}</p>
      </div>
    </div>
  );
}

function renderizarProdutos(produtos) {
  if (produtos.length === 0) {
    return 'Nenhum produto';
  }

  // Extrair o nome de cada produto e juntar com vírgula
  const nomesDosProdutos = produtos.map(produto => produto.id_produto);
  return nomesDosProdutos.join(', ');
}
