import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { useParams } from 'react-router-dom';
import CompAtalhosAdm from '../../../components/compAtalhosAdm';
import { API_URL } from '../../../config/constants';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import './index.scss';

export default function Cartaocliente() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [SelectedCardIndex, setSelectedCardIndex] = ([])
  const [cartao, setCartao] = useState([]);
  const [detalhesCartao, setDetalhesCartao] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    num: '',
  });

  useEffect(() => {
    // Use localStorage para verificar se o usuário está logado
    if (!localStorage.getItem('adm-logado')) {
        navigate('/associado');
    }
}, []);

  useEffect(() => {
    fetchCartao(id);
  }, [id]);

  const handleVoltar = () => {

    navigate(`/clienteadmmaisdetalhe/${id}`);
  };

  async function fetchCartao(id) {
    try {
      const response = await axios.get(`${API_URL}/cliente/cartao/${id}`);
      console.log('Response from API:', response.data);
      setCartao(response.data);
    } catch (error) {
      console.error('Erro ao buscar detalhes do cartão', error);
    }
  }



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetalhesCartao((prevDetalhesCartao) => ({
      ...prevDetalhesCartao,
      [name]: value,
    }));
  };

  const handleCardSelection = (selectedCard, index) => {
    setSelectedCardIndex(index);
    setDetalhesCartao({
      cvc: selectedCard.cvv || '',
      expiry: selectedCard.validade || '',
      name: selectedCard.nome || '',
      number: selectedCard.num || '',
    });
  };

  return (
    <div className="pagina-cartao">
      <CompAtalhosAdm />

      <div className="container-cartao">
        <div className="cabecalho-cartao">
          <h1>Clientes</h1>
        </div>

        <div className="subtitulo-cartao">
          <h1>Cartão</h1>
          <div onClick={handleVoltar}>

            <p className='p'>voltar</p>
          </div>
        </div>

        <div className="cartaoSide">

          {cartao.map((item, index) => (
            <div key={item.idCliente}>
              <Cards
                cvc={item.cvv || ''}
                expiry={item.validade || ''}
                focused=''
                name={item.nome || ''}
                number={item.num || ''}
                onClick={() => handleCardSelection(item, index)} // Chame a função ao clicar no cartão
              />
              <form className="formsCartao">
                <input
                  type="number"
                  name="num"
                  placeholder="Número"
                  value={item.num || ''}
                  onChange={(e) => handleInputChange(e, item.idCliente)}
                />
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  value={item.nome || ''}
                  onChange={(e) => handleInputChange(e, item.idCliente)}
                />
                <div className="expiraCartao">
                  <input
                    type="text"
                    name="validade"
                    placeholder="MM/AA Expiração"
                    value={item.validade || ''}
                    onChange={(e) => handleInputChange(e, item.idCliente)}
                  />
                  <input
                    type="number"
                    name="cvv"
                    placeholder="CVC"
                    value={item.cvv || ''}
                    onChange={(e) => handleInputChange(e, item.idCliente)}
                  />
                </div>
              </form>
            </div>
          ))}
        </div>

      </div>
    </div>

  );
}
