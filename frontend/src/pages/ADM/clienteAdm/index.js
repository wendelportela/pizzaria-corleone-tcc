import React, { useEffect, useState } from 'react';
import './index.scss';
import CompAtalhosAdm from '../../../components/compAtalhosAdm';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../../config/constants';

export default function ClienteAdm() {
  const [pesquisa, setPesquisa] = useState('');
  const [rastreamento, setRastreamento] = useState([]);
  const [status, setStatus] = useState('');
  const [idp, setidp] = useState([]);

 

  useEffect(() => {
    async function listar() {
      const r = await axios.get(`${API_URL}/pedido/rastreamento`);
      setRastreamento(r.data);
    }
    listar();
  }, [rastreamento]);


  async function UpdateStatus(novoStatus) {
    try {
      let data = {
        situacao: novoStatus,
        id: idp,
      };
      const r = await axios.put(`${API_URL}/pedido/rastreamento/alterar`, data);
      toast.success(`Pedido ${idp} atualizado para ${novoStatus}`);
    } catch (error) {
      toast.error(error.message);
    }
  }




  return (
    <div className='comp'>
      <CompAtalhosAdm />

      <div className='cont-dois'>
        <div className='titulo-pedidos'>
          <h1>Pedidos</h1>
        </div>

        <div className='lista-subtitulo'>
          <h1>Rastreamento de Pedidos</h1>
        </div>

        <div className='container-tres'>
          {/* ... Seu código de filtro e pesquisa ... */}

          <table className="tabela-cliente">
            <thead>
              <tr>
                <th>Horário do Pedido</th>
                <th>Produto</th>
                <th>CEP</th>
                <th>Total</th>
                <th>Cliente</th>
                <th className='con'>Status</th>
                <th className='pedido'>Andamento do pedido</th>
              </tr>
            </thead>
            <tbody>
              {rastreamento.map(item => (
                <tr className="linha-separadora" key={item.idpedido}>
                  <td>{item.data.substr(11, 5)}</td>
                  <td>{item.produtos.produto}</td>
                  <td>{item.cep}</td>
                  <td>{item.total}</td>
                  <td>{item.cliente}</td>
                  <td className='con'>{item.status}</td>
                  <td className='pedido-em-andamento'>
  {item.status === 'em preparo' && (
    <div className="pedido-andamento">
      <div className="etapa">
        <div onClick={() => { setidp(item.idpedido); UpdateStatus('em preparo'); }} className="bolinha">1</div>
        <div className="linha-cinza"></div>
      </div>
      <div className="etapa">
        <div onClick={() => { setidp(item.idpedido); UpdateStatus('saiu para entrega'); }} className="bolinha-cinza">2</div>
        <div className="linha-cinza"></div>
      </div>
      <div className="etapa">
        <div onClick={() => { setidp(item.idpedido); UpdateStatus('entregue'); }} className="bolinha-cinza">3</div>
      </div>
    </div>
  )}

  {item.status === 'saiu para entrega' && (
    <div className="pedido-andamento">
      <div className="etapa">
        <div onClick={() => { setidp(item.idpedido); UpdateStatus('em preparo'); }} className="bolinha">1</div>
        <div className="linha"></div>
      </div>
      <div className="etapa">
        <div onClick={() => { setidp(item.idpedido); UpdateStatus('saiu para entrega'); }} className="bolinha-cinza">2</div>
        <div className="linha-cinza"></div>
      </div>
      <div className="etapa">
        <div onClick={() => { setidp(item.idpedido); UpdateStatus('entregue'); }} className="bolinha-cinza">3</div>
      </div>
    </div>
  )}

  {item.status === 'entregue' && (
    <div className="pedido-andamento">
      <div className="etapa">
        <div onClick={() => { setidp(item.idpedido); UpdateStatus('em preparo'); }} className="bolinha">1</div>
        <div className="linha"></div>
      </div>
      <div className="etapa">
        <div onClick={() => { setidp(item.idpedido); UpdateStatus('saiu para entrega'); }} className="bolinha">2</div>
        <div className="linha"></div>
      </div>
      <div className="etapa">
        <div onClick={() => { setidp(item.idpedido); UpdateStatus('entregue'); }} className="bolinha">3</div>
      </div>
    </div>
  )}
</td>


                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
