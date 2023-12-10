import './index.scss';
import Banco from '../../../assets/img/banco.png';
import Dinheiro from '../../../assets/img/money.png';
import Caixa from '../../../images/caixa.png';

import { useEffect, useState } from 'react';
import Desligado from '../../../assets/img/on or off.png';
import CompAtalhosAdm from '../../../components/compAtalhosAdm';
import { API_URL } from '../../../config/constants';
import axios from 'axios';
import caixaa from '../../../images/caixaaaa.png';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [PedidosEntregue, setPedidosEntregue] = useState([]);
    const [totalVendas, setTotalVendas] = useState(0);
    const [totalCompra, setTotalCompra] = useState(0);
    const [listaproduto, setListaproduto] = useState([]);
    const [totalProdutos, setTotalProdutos] = useState(0);
    const [totalProdutosAtivos, setTotalProdutosAtivos] = useState(0);
    const [totalvendido, setTotalvendido] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        // Use localStorage para verificar se o usuário está logado
        if (!localStorage.getItem('adm-logado')) {
            navigate('/associado');
        }
    }, []);




    async function PedidossEntregue() {
        try {
            const response = await axios.get(`${API_URL}/pedido/entregue`);
            console.log('Dados recebidos:', response.data);

            setPedidosEntregue(response.data);

            const pedidosConcluidosEntregues = response.data.filter(
                (item) => item.ds_situacao === 'Concluído' || item.ds_situacao === 'Entregue'
            );
            console.log('Pedidos concluídos ou entregues:', pedidosConcluidosEntregues);

            const total = pedidosConcluidosEntregues.reduce((acc, item) => {
                const itemTotal = parseFloat(item.total);
                console.log('Item Total:', itemTotal);
                return acc + (isNaN(itemTotal) ? 0 : itemTotal);
            }, 0);
            console.log('Total de vendas:', total);

            setTotalCompra(total);

            return response.data;
        } catch (error) {
            console.error('Erro ao obter pedidos entregues:', error);
            return [];
        }
    }





    async function contarProdutos() {
        try {
            const response = await axios.get(`${API_URL}/produto`);
            setListaproduto(response.data);
            console.log(listaproduto);
        } catch (error) {
            console.error('Erro ao contar produtos:', error);
        }
    }

    async function contarProdutosDisponiveis() {
        try {
            const response = await axios.get(`${API_URL}/produto`);
            const produtosDisponiveis = response.data.filter((produto) => produto.disponivel === 1);
            setListaproduto(produtosDisponiveis);
            setTotalProdutosAtivos(produtosDisponiveis.length);
            console.log('Produtos disponíveis:', produtosDisponiveis.length);
        } catch (error) {
            console.error('Erro ao contar produtos disponíveis:', error);
        }
    }





    useEffect(() => {
        contarProdutosDisponiveis();
    }, []);


    useEffect(() => {
        async function fetchData() {
            try {
                await contarProdutos();
            } catch (error) {
                console.error('Erro ao obter lista de produtos:', error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        contarProdutos();
    }, []);

    useEffect(() => {
        PedidossEntregue()
            .then((result) => {
                setPedidosEntregue(result);
            })
            .catch((error) => {
                console.error('Erro ao listar pedidos entregues:', error);
            });
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await PedidossEntregue();
                const total = calcularTotalVendas(PedidosEntregue)
                setTotalvendido(total)
                if (data && data.length) {
                    setTotalVendas(data.length);
                }
            } catch (error) {
                console.error('Erro ao obter pedidos entregues:', error);
            }
        }

        fetchData();
    }, [PedidosEntregue]);

    function calcularTotalVendas(pedidos) {
        const total = pedidos.reduce((acc, item) => {
            const itemTotal = parseFloat(item.total);
            return acc + (isNaN(itemTotal) ? 0 : itemTotal);
        }, 0);
        return total;
    }

    return (
        <section className='pagina-dashboard'>
            <CompAtalhosAdm />
            <div className="container-dashboard">
                <div className="topo-dashboard">
                    <h1>Minha Operação</h1>
                </div>

                <div className='grafico-dashboard'>
                    <div className='total-vendas'>
                        <img src={Banco} />
                        <h1>{totalVendas} </h1>
                        <p>Quantidade de vendas realizadas neste dia</p>
                    </div>

                    <div className='custo-vendido'>
                        <img src={Dinheiro} />
                        <h1>vendido {totalvendido}</h1>


                        <p>Valor total vendido neste dia</p>
                    </div>


                    <div className='produtos-cadastrados'>
                        <img src={Caixa} />
                        <h1>{listaproduto.length} produto{listaproduto.length !== 1 ? 's' : ''}</h1>
                        <p>Quantidade de produtos cadastrados</p>
                    </div>



                    <div className='produtos-ativos'>
                        <img src={Desligado} />
                        <h1>{totalProdutosAtivos} produto{totalProdutosAtivos !== 1 ? 's' : ''} ativo{totalProdutosAtivos !== 1 ? 's' : ''}</h1>
                        <p>Quantidade de produtos ativos</p>
                    </div>

                </div>

                <div className='conteudo-dashboard'>
                    <h2>Dashboard</h2>
                    <p>últimas vendas realizadas no dia</p>
                    <table className='tabela-dashboard'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Total</th>
                                <th> Subtoal</th>


                            </tr>
                        </thead>
                        <tr className='cada-valor'></tr>

                        <tbody>
                            {PedidosEntregue && PedidosEntregue.map(item => (
                                <tr className='conteudo-tabela'>
                                    <td className='comp-linha'></td>
                                    <tr className='cada-valor'>
                                        <td>#{item.idpedido}</td>
                                        <td>{item.cliente}</td>
                                        <td>{item.total}</td>
                                        <td>{item.subtotal}</td>

                                    </tr>



                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}