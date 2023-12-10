import { useEffect, useState } from 'react'

import './index.scss'
import CompAtalhosAdm from '../../../components/compAtalhosAdm';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal'
import axios from 'axios'
import React from 'react';



import { API_URL } from '../../../config/constants';

Modal.setAppElement('#root')

export default function ListarPedido() {

    useEffect(() => {
        // Use localStorage para verificar se o usuário está logado
        if (!localStorage.getItem('adm-logado')) {
            navigate('/associado');
        }
    }, []);

    const navigate = useNavigate()

    function MaisDetalhes(id) {
        navigate(`/detalhes/pedido/${id}`)
    }




    ///<button className="modal-button" type="submit">Aplicar Filtros</button>
    const [buscarid, setBuscarid] = useState('')
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [pedidos, setPedidos] = useState([])
    let timeoutId;


    //////////////////////////////filtros
    const [AaoZ, setAaoZ] = useState(false)
    const [data, setData] = useState('')
    const [entregue, setEntregue] = useState(false)
    const [cancelado, setCancelado] = useState(false)
    /////////////////////////////////



    //console.log(AaoZ)
    //console.log(data)
    //console.log(entregue)


    useEffect(() => {
        
            
        
            ListarPedidos()
        
    }, [])

    useEffect(() => {
        // Função que será executada após o atraso
        const fetchData = async () => {
            try {
                if (!isNaN(buscarid)) {
                    const rId = await axios.get(`${API_URL}/pedido/id/${buscarid}`);
                    const uniquePedidos = [...new Set(rId.data.map(item => item.idpedido))];
                    setPedidos(uniquePedidos.map(idpedido => rId.data.find(item => item.idpedido === idpedido)));
                } else {
                    const rNome = await axios.get(`${API_URL}/pedido/nome/${buscarid}`);
                    const uniquePedidos = [...new Set(rNome.data.map(item => item.idpedido))];
                    setPedidos(uniquePedidos.map(idpedido => rNome.data.find(item => item.idpedido === idpedido)));
                }    
            } catch (error) {
            }
            
        };

        // Limpar o timeout anterior antes de configurar um novo
        clearTimeout(timeoutId);

        // Configurar um novo timeout
        timeoutId = setTimeout(fetchData, 300); // Ajuste o valor do atraso conforme necessário
    }, [buscarid]);



    async function ListarPedidos() {
        const r = await axios.get(API_URL + '/pedido')

        const uniquePedidos = [...new Set(r.data.map(item => item.idpedido))];
        console.log(uniquePedidos)
        setPedidos(uniquePedidos.map(idpedido => r.data.find(item => item.idpedido === idpedido)));
    }



    async function ListarporNomeOuId() {

        if (!isNaN(buscarid)) {
            const rId = await axios.get(`${API_URL}/pedido/id/${buscarid}`)
            const uniquePedidos = [...new Set(rId.data.map(item => item.idpedido))];
            setPedidos(uniquePedidos.map(idpedido => rId.data.find(item => item.idpedido === idpedido)));
        } else {
            const rNome = await axios.get(`${API_URL}/pedido/nome/${buscarid}`)
            const uniquePedidos = [...new Set(rNome.data.map(item => item.idpedido))];
            setPedidos(uniquePedidos.map(idpedido => rNome.data.find(item => item.idpedido === idpedido)));
        }
    }


    function openModal() {
        setModalIsOpen(true);
    }


    function closeModal() {
        setModalIsOpen(false);
    }




    async function TodasFuncoes() {
        if (AaoZ === true) {
            const r = await axios.get(`http://localhost:5013/pedido/ordem`)
            const uniquePedidos = [...new Set(r.data.map(item => item.idpedido))];
            setPedidos(uniquePedidos.map(idpedido => r.data.find(item => item.idpedido === idpedido)));
        }

        if (data) {
            const r = await axios.get(`http://localhost:5013/pedido/data/${data}`)
            const uniquePedidos = [...new Set(r.data.map(item => item.idpedido))];
            setPedidos(uniquePedidos.map(idpedido => r.data.find(item => item.idpedido === idpedido)));
        }

        if (entregue === true && cancelado == false) {
            const r = await axios.get(`http://localhost:5013/pedido/status/entregue`)
            const uniquePedidos = [...new Set(r.data.map(item => item.idpedido))];
            setPedidos(uniquePedidos.map(idpedido => r.data.find(item => item.idpedido === idpedido)));
        }

        if (cancelado == true && entregue == false) {
            const r = await axios.get(`http://localhost:5013/pedido/status/cancelado`)
            const uniquePedidos = [...new Set(r.data.map(item => item.idpedido))];
            setPedidos(uniquePedidos.map(idpedido => r.data.find(item => item.idpedido === idpedido)));
        }



        setModalIsOpen(false)

    }






    return (

        <div className='contatiner-um'>
            <CompAtalhosAdm />

            <div className='container-dois'>
                <div className='titulo-pedidos'>
                    <h1>Pedidos</h1>
                </div>

                <div className='lista-subtitulo'>
                    <h1>Lista de Pedidos</h1>
                </div>

                <div className='container-tres'>

                    <div className='cont-quatro'>
                     
                        <div className='filtro'>
                            <div className='filtro' onClick={openModal}>
                                <div className="filtro-image"></div>
                                <h2>Todos os filtros</h2>
                            </div>


                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                className="custom-modal"
                            >

                                <h2 className="modal-title">Filtros</h2>
                                <form className='conteudo-filtros'>

                                    <label className='modal-label-pedidos1'>
                                        <p>ordernar por</p>

                                        <div className='modal-first-conteudo'>
                                            <div className='payment-input-pedidos1'>
                                                <input type='checkbox'
                                                    checked={AaoZ}
                                                    onChange={() => setAaoZ(!AaoZ)}
                                                />
                                            </div>
                                            <h4>A ao Z</h4>
                                        </div>

                                    </label>

                                    <div className='divisao-filtros'></div>

                                    


                                    <label className="modal-label-2">
                                        <p>Data</p>
                                        <input
                                            className="modal-input"
                                            type="date"
                                            onChange={(e) => setData(e.target.value)}
                                        />
                                    </label>

                                    <div className='divisao-filtros'></div>

                                    <label className='modal-label-pedidos2'>
                                        <p>Status</p>

                                        <div className='modal-second-conteudo'>
                                            <div className='payment-input-pedidos2'>
                                                <input className='inputt'
                                                    type='checkbox'
                                                    checked={entregue}
                                                    onChange={() => setEntregue(!entregue)}
                                                />
                                            </div>
                                            <h6>Entregue</h6>
                                        </div>

                                        <div className='modal-second-conteudo'>
                                            <div className='payment-input-pedidos2'>
                                                <input type='checkbox'
                                                    checked={cancelado}
                                                    onChange={() => setCancelado(!cancelado)}
                                                />
                                            </div>
                                            <h6>Cancelado</h6>
                                        </div>


                                    </label>

                                </form>

                                <div className='modal-button-filtros'>
                                    <button onClick={TodasFuncoes} className="modal-button" type="submit">Aplicar Filtros</button>
                                </div>
                            </Modal>
                        </div>


                        

                    </div>



                    <div className="linha-pedido"></div>

                    <table className="tabela-listarProduto">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Pagamento</th>
                                <th>Produto</th>
                                <th>Data</th>
                                <th>Status</th>
                            </tr>
                        </thead>


                        <tr className='linha-separadora'></tr>

                        <tbody>

                            {pedidos.map(item => (
                                item.produtos &&
                                    item.situacao === 'Entregue' &&
                                    item.data ? (
                                    <tr className="linha-separadora" key={item.idpedido}>
                                        <td>#{item.idpedido}</td>
                                        <td>{item.nome}</td>
                                        <td>Cartão de crédito(inserir)</td>
                                        <td>{item.produtos}</td>
                                        <td>{item.data.substr(0, 10)}</td>
                                        <td>
                                            <div className='status-entregue'></div>
                                        </td>
                                        <td className='preto' onClick={() => { MaisDetalhes(item.idpedido) }}>mais detalhes...</td>
                                    </tr>
                                ) : null
                            ))}


                        </tbody>
                    </table>

                </div>



            </div>

        </div >



    )
}