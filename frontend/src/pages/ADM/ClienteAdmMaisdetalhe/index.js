import { useState } from 'react';
import CompAtalhosAdm from '../../../components/compAtalhosAdm'
import './index.scss'
import { useNavigate, useParams } from 'react-router-dom'
import axios, { Axios } from 'axios';
import { useEffect } from 'react';

import { API_URL } from '../../../config/constants';

export default function ClienteMaisdetalhe() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [selecao, setSelecao] = useState('');
    const [cliente, setCliente] = useState([])
    const [favoritos, setFavoritos] = useState([]);
    const [carrinho, setCarrinho] = useState([])
    const [cartao, setcartao] = useState([])

    async function Listarcliente() {
        const r = await axios.get(API_URL + '/clientes')
        setCliente(r.data)

    }

    async function fetchClienteDetails() {
        try {
            const response = await axios.get(`${API_URL}/clientes/${id}`);
            setCliente(response.data);
        } catch (error) {
            console.error('Erro ao buscar detalhes do cliente', error);
        }
    }
    useEffect(() => {
        // Use localStorage para verificar se o usuário está logado
        if (!localStorage.getItem('adm-logado')) {
            navigate('/associado');
        }
    }, []);


    async function fetchFavoritosCliente() {
        try {
            const response = await axios.get(`${API_URL}/cadafavorito/cliente/${id}`);
            setFavoritos(response.data);
        } catch (error) {
            console.error('Erro ao buscar favoritos do cliente', error);
        }
    }

    async function fetchCarrinhoCliente(id) {
        try {
            const response = await axios.get(`${API_URL}/corleone/usuario/carrinho/listar/${id}`);
            setCarrinho(response.data);
        } catch (error) {
            console.error('Erro ao buscar detalhes do carrinho do cliente', error);
        }
    }

    async function cartaocliente(id) {
        try {
            const response = await axios.get(`${API_URL}/cartao/listar/${id}`);
            setcartao(response.data);
        } catch (error) {
            console.log('erro no cartão', error)

        }
    }


    useEffect(() => {
        fetchCarrinhoCliente(id);
        cartaocliente(id)
    }, [id]);

    useEffect(() => {
        fetchClienteDetails();
        fetchFavoritosCliente();
    }, [id]);



    useEffect(() => {
        fetchCarrinhoCliente(id);
        fetchClienteDetails();
        fetchFavoritosCliente();
        cartaocliente(id);
    }, [id]);




    useEffect(() => {

        async function fetchClienteDetails() {
            try {
                const response = await axios.get(`${API_URL}/clientes/${id}`);
                setCliente(response.data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do cliente', error);
            }
        }

        fetchClienteDetails();
    }, [id]);

    function entrarFavoritos(id) {
        navigate(`/cadafavorito/cliente/${id}`)
        console.log(id)
    }


    const handleSelecaoChange = (event) => {
        const valorSelecionado = event.target.value;
        if (valorSelecionado === 'carrinho') {
            navigate(`/corleone/usuario/carrinho/listar/${id}`);
        } else if (valorSelecionado === 'favoritos') {
            navigate(`/cadafavorito/cliente/${id}`);
        } else if (valorSelecionado === 'pagamento') {
            navigate(`/cartao/listar/${id}`);
          }
    };

    return (
        <div className='pagina-mais--detalhes'>
            <CompAtalhosAdm />
            <div className='container--mais'>

            <div className='tiitulo'>
                    <h1>Clientes</h1>
                </div>

                <div className='subbtitulo'>
                    <h1>Detalhe do cliente</h1>
                </div>




                <div className='conteudo-mais'>

                    <div className='parte-dos-filtros'>




                        <div className="parte-filtros-carrinho">
                            <label htmlFor="carrinho"></label>
                            <select id="carrinho" onChange={handleSelecaoChange} value={selecao}>
                                <optgroup label="Escolha:">
                                    <option>Ordenar</option>
                                    <option value="carrinho">Carrinho</option>
                                    <option value="favoritos">Favoritos</option>
                                    <option value="pagamento">Cartão</option>


                                </optgroup>
                            </select>
                        </div>

                    </div>

                    <table className='tabela-mais-detalhes'>
                        <thead>
                            <tr >

                                <th ></th>
                                <th>Nome</th>
                                <th className="comp-linha-detalhes"></th>
                                <th>Email</th>
                                <th className="comp-linha-detalhes"></th>
                                <th>Nascimento</th>
                                <th className="comp-linha-detalhes"></th>
                                <th>Telefone</th>
                                <th className="comp-linha-detalhes"></th>
                                <th>Cpf</th>
                                <th className="comp-linha-detalhes"></th>
                                <th>Estado</th>
                                <th className="comp-linha-detalhes"></th>
                                <th>Cidade</th>
                                <th className="comp-linha-detalhes"></th>
                                <th>Bairro</th>
                                <th className="comp-linha-detalhes"></th>
                                <th>Numero</th>
                                <th className="comp-linha-detalhes"></th>
                                <th>Rua</th>
                                <th className="comp-linha-detalhes"></th>
                                <th>Cep</th>

                            </tr>
                        </thead>


                        <tbody>
                            {cliente && cliente.map((item) => (
                                <tr key={item.idcliente}>

                                    <td></td>
                                    <td>{item.cliente}</td>
                                    <td className="comp-linha-detalhes"></td>
                                    <td>{item.email}</td>
                                    <td className="comp-linha-detalhes"></td>
                                    <td>{item.nascimento}</td>
                                    <td className="comp-linha-detalhes"></td>
                                    <td>{item.telefone}</td>
                                    <td className="comp-linha-detalhes"></td>
                                    <td>{item.cpf}</td>
                                    <td className="comp-linha-detalhes"></td>
                                    <td>{item.estado}</td>
                                    <td className="comp-linha-detalhes"></td>
                                    <td>{item.cidade}</td>
                                    <td className="comp-linha-detalhes"></td>
                                    <td>{item.bairro}</td>
                                    <td className="comp-linha-detalhes"></td>
                                    <td>{item.numero}</td>
                                    <td className="comp-linha-detalhes"></td>
                                    <td>{item.rua}</td>
                                    <td className="comp-linha-detalhes"></td>
                                    <td>{item.cep}</td>
                                </tr>
                            ))}
                        </tbody>


                    </table>










                </div>
</div>
       

        </div>
    )
}