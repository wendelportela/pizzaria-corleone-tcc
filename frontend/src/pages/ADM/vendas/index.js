import './index.scss'
import Lupa from '../../../assets/images/pictures/lupa 1.png'
import Deletar from '../../../assets/images/pictures/deletar.png'
import Filtro from '../../../assets/img/filtro vendas.png'
import CompAtalhosAdm from '../../../components/compAtalhosAdm'
import SetaBaixo from '../../../assets/img/setabaixo.png'
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ApexChart from 'react-apexcharts'
import { API_URL } from '../../../config/constants'
import axios from 'axios'


import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
//import { Chart } from "react-google-charts";

Modal.setAppElement('#root');




export default function Vendas() {

    const [PedidosEntregue, setPedidosEntregue] = useState([]);
    const [grafico, setGrafico] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [vendas, setVendas] = useState([])
    const { id } = useParams();
    const [excluido, setExcluido] = useState(false);

    useEffect(() => {
        InformacoesGrafico();
        PedidossEntregue();
    
       
        if (id) {
            ExcluirPedido(id);
        }
    }, [id]);

    
    

    useEffect(() => {
        if (excluido) {
            // Realize ações adicionais após a exclusão
            console.log('Pedido excluído com sucesso!');
            // Se necessário, você pode redefinir o estado excluido para evitar re-execução desnecessária
            setExcluido(false);
        }
    }, [excluido]);
      
    

    //async function buscarProdutos(id) {
    // try {
    //const resposta = await axios.get(`${API_URL}/pedido/id/${id}`);
    //setVendas(resposta.data);
    //} catch (error) {
    // console.error('Erro ao buscar produtos:', error);
    //}
    // }


    // useEffect(() => {
    // buscarProdutos(id);
    //  }, [id]);

    async function pesqData() {
        const r = await axios.get(`${API_URL}/pedido/vendas/data/${selectedDate}`)
        setPedidosEntregue(r.data)

        setModalIsOpen(false)
    }


    async function PedidossEntregue() {
        try {
            const response = await axios.get(`${API_URL}/pedido/entregue/data`);
            console.log('Dados recebidos:', response.data);

            setPedidosEntregue(response.data);

            const pedidosConcluidosEntregues = response.data.filter(
                (item) => item.ds_situacao === 'Concluído' || item.ds_situacao === 'Entregue'
            );
            console.log('Pedidos concluídos ou entregues:', pedidosConcluidosEntregues);
        } catch (error) {
            console.error('Erro ao obter pedidos entregues:', error);
            return [];
        }
    }



    async function ExcluirPedido(id) {
        try {
            const response = await axios.delete(`${API_URL}/pedido/deletar/${id}`);
            
            if (response.status === 200) {
                toast.success('Pedido excluído com sucesso.');
                
               
                setPedidosEntregue(prevPedidos => prevPedidos.filter(item => item.idpedido !== id));
                
              
            } else {
                console.log('Erro ao excluir o pedido:', response.data.erro || 'Status da resposta:', response.status);
    
                if (response.status === 404) {
                    toast.error('Não foi possível excluir o pedido: Pedido não encontrado.');
                }
            }
        } catch (error) {
            console.error('Não foi possível excluir o pedido:', error.message);
        }
    }
    

    async function InformacoesGrafico() {
        try {
            const response = await axios.get(`${API_URL}/vendas/grafico`);
            const dadosAPI = response.data;


            // Verifica se há dados antes de formatar
            if (dadosAPI && dadosAPI.length > 0) {
                const dadosFormatados = dadosAPI.map(item => {
                    // Extrai o mês da data
                    const dia = new Date(item.data).getDate();

                    console.log(dia)
                    console.log(item.total)

                    return {
                        x: dia,
                        y: item.total
                    };
                });

                // Define o estado do gráfico com os dados formatados
                console.log(dadosFormatados)
                setGrafico(dadosFormatados);
            } else {
                console.log('Não há dados disponíveis para o gráfico.');
            }
        } catch (error) {
            console.error('Erro ao obter dados do gráfico:', error);
        }
    }




    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }


    function handleFilterSubmit(event) {
        event.preventDefault();

        console.log('Forma de pagamento selecionada:', selectedPayment);
        console.log('Data selecionada:', selectedDate);
        closeModal();
    }
    /*   const dataBase = [
        ["Mês", "Vendas"],
        ["Janeiro", 10000],
        ["Fevereiro", 15000],
        ["Abril", 45000],
        ["Maio", 15000],
        ["Junho", 45000],
        ["Julho", 30000],
        ["Agosto", 55000],
        ["Setembro", 65000],
        ["Outubro", 25000],
        ["Novembro", 45000],
        ["Dezembro", 50000],
]*/



    const [filtro, setFiltro] = useState('')
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState('');
    const [selectedDate, setSelectedDate] = useState('')

    const series = [{
        name: "Lucro em reais",
        data: grafico.map(item => ({ x: item.x, y: item.y }))
    }];

    let options = {
        chart: {
            height: 500,
            width: 1000,
            type: 'linechart'
        },
        dataLables: {
            enabled: false
        },
        yAxis: [{
            y: 25000,
            borderColor: '#00E396',
            label: {
                borderColor: '#00E396',
                style: {
                    color: '#fff',
                    background: '#00E396',
                },
                text: 'Support',
            },
        }, {
            y: 40000,
            y2: 50000,
            borderColor: '#000',
            fillColor: '#FEB019',
            opacity: 0.2,
            label: {
                borderColor: '#333',
                style: {
                    fontSize: '10px',
                    color: '#333',
                    background: '#FEB019',
                },
                text: 'Y-axis range',
            }
        }],
        hAxis: {
            title: "Tempo",
        },
        vAxis: {
            title: "total de Vendas",
        },
    }


    return (
        <div className='pagina-vendas'>

            <CompAtalhosAdm />
            <div className='container-vendas'>


                <div className='cabecalho-vendas'>
                    <h1>Vendas</h1>
                </div>

                <div className='conteudo-produtos-vendas'>
                <ToastContainer containerId="pagina-vendas" />

                    <div className='conteudo-input'>
                    

                        <div className="parte-dois-filtros">
                            <div onClick={openModal} className="parte-dois-filtros-1">
                                <img src={Filtro} />
                                <h2>Todos os filtros</h2>
                            </div>

                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                contentLabel="Modal de Filtros"
                                className="custom-modal"
                            >
                                <h2 className="modal-title">Filtros</h2>
                                <form className='conteudo-filtros' onSubmit={handleFilterSubmit}>

  


                                    <label className="modal-label-2">
                                        <p>Data</p>

                                        <input
                                            className="modal-input"
                                            type="date"
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                        />
                                    </label>

                                </form>

                                <div className='modal-button-filtros'>
                                    <button onClick={pesqData} className="modal-button" type="submit">Aplicar Filtros</button>
                                </div>
                            </Modal>


                        </div>
                    </div>


                    <h4 className='vendas'>$ Vendas</h4>



                    <table className='tabela-vendas'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Cobrado</th>
                                <th>Subtotal</th>
                                <th>Data</th>

                                <th>Excluir</th>
                            </tr>
                        </thead>

                        <tr className='linha-separadora'></tr>

                        <tbody>
                            {PedidosEntregue && PedidosEntregue.map(item => (
                                <tr className='cada-valor-vendas'>
                                    <td>#{item.idpedido}</td>
                                    <td>{item.total}</td>
                                    <td>{item.subtotal}</td>
                                    <td>{item.data.substr(0, 10)}</td>
                                    <td onClick={() => ExcluirPedido(item.idpedido)}><img src={Deletar} alt="Deletar" /></td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>



                <div className='grafico-vendas'>
                    <div className='titulo-grafico'><h2>Gráficos de venda</h2></div>


                    <ApexChart
                        options={options}
                        series={series}
                        type="line"
                        height={350}

                    />

                </div>

            </div>
        </div>


    )
}
