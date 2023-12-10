import './index.scss'
import Lupa from '../../assets/images/pictures/lupa 1.png'
import Deletar from '../../assets/images/pictures/deletar.png'
import Filtro from '../../assets/img/filtro vendas.png'
import CompAtalhosAdm from '../../../components/compAtalhosAdm'
import SetaBaixo from '../../assets/img/setabaixo.png'
import Modal from 'react-modal';

import ApexChart  from 'react-apexcharts'


import React from 'react'
import { useState } from 'react'
//import { Chart } from "react-google-charts";

Modal.setAppElement('#root');


export default function Vendas() {


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
    /*    const dataBase = [
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
        data: [{
            x: "Janeiro",
            y: 10000
        },
        {
            x: "Fevereiro",
            y: 15000
        },
        {
            x: "Abril",
            y: 45000
        },
        {
            x: "Maio",
            y: 15000
        },
        {
            x: "Junho",
            y: 45000
        },
        {
            x: "Julho",
            y: 30000
        },
        {
            x: "Agosto",
            y: 55000
        },
        {
            x: "Setembro",
            y: 65000
        },
        {
            x: "Outubro",
            y: 25000
        },
        {
            x: "Novembro",
            y: 45000
        },
        {
            x: "Dezembro",
            y: 50000
        },
    ]
    }]

    let options = {
        chart: {
            height: 500,
            width: 1000,
            type: 'linechart'
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
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

                    <div className='conteudo-input'>
                        <div className="input-container">
                            <input
                                type='text'
                                placeholder='Busque por id ou nome do cliente'
                                value={filtro}
                                onChange={e => setFiltro(e.target.value)}
                            />
                            <div className="input-image"></div>
                        </div>

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

                                    <label className="modal-label">
                                        <p>Formas de pagamento</p>
                                        <div className='paymentForm'>
                                            <div className='payment-input'><input type='checkbox' /></div>
                                            <h5>Pix</h5>
                                        </div>

                                        <div className='paymentForm'>
                                            <div className='payment-input'><input type='checkbox' /></div>
                                            <h5>Dinheiro</h5>
                                        </div>

                                        <div className='paymentForm'>
                                            <div className='payment-input'><input type='checkbox' /></div>
                                            <h5>Cartão de credito</h5>
                                        </div>
                                    </label>

                                    <div className='divisao-filtros'></div>


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
                                    <button className="modal-button" type="submit">Aplicar Filtros</button>
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
                                <th>Método de pag.</th>
                                <th>Pagamento</th>
                                <th>Data</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>

                        <tr className='linha-separadora'></tr>

                        <tbody>

                            <tr className='cada-valor-vendas'>
                                <td>6</td>
                                <td>R$123,45</td>
                                <td>CARTÃO</td>
                                <td>DÉBITO</td>
                                <td>01/01/2023</td>
                                <td><img src={Deletar} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>



                <div className='grafico-vendas'>
                    <div className='titulo-grafico'><h2>Gráficos de venda</h2></div>
                    <div className='tema-grafico'>
                        <h1>Gráfico</h1>
                        <div><h2>Anual</h2><img src={SetaBaixo} /></div>
                    </div>

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

/*                            <tr className='cada-valor-vendas'>
                                <td>6</td>
                                <td>R$123,45</td>
                                <td>R$123,45</td>
                                <td>--</td>
                                <td>CARTÃO</td>
                                <td>DÉBITO</td>
//                                 <td><img src={Deletar} /></td>
//                             </tr>

//                             <tr className='cada-valor-vendas'>
//                                 <td>6</td>
//                                 <td>R$123,45</td>
//                                 <td>R$123,45</td>
//                                 <td>--</td>
//                                 <td>CARTÃO</td>
//                                 <td>DÉBITO</td>
//                                 <td><img src={Deletar} /></td>
//                             </tr>

//                             <tr className='cada-valor-vendas'>
//                                 <td>6</td>
//                                 <td>R$123,45</td>
//                                 <td>R$123,45</td>
//                                 <td>--</td>
//                                 <td>CARTÃO</td>
//                                 <td>DÉBITO</td>
//                                 <td><img src={Deletar} /></td>
//                             </tr>

//                             <tr className='cada-valor-vendas'>
//                                 <td>6</td>
//                                 <td>R$123,45</td>
//                                 <td>R$123,45</td>
//                                 <td>--</td>
//                                 <td>CARTÃO</td>
//                                 <td>DÉBITO</td>
//                                 <td><img src={Deletar} /></td>
//                             </tr>

//                             <tr className='cada-valor-vendas'>
//                                 <td>6</td>
//                                 <td>R$123,45</td>
//                                 <td>R$123,45</td>
//                                 <td>--</td>
//                                 <td>CARTÃO</td>
//                                 <td>DÉBITO</td>
//                                 <td><img src={Deletar} /></td>
//                             </tr>

//                             <tr className='cada-valor-vendas'>
//                                 <td>6</td>
//                                 <td>R$123,45</td>
//                                 <td>R$123,45</td>
//                                 <td>--</td>
//                                 <td>CARTÃO</td>
//                                 <td>DÉBITO</td>
//                                 <td><img src={Deletar} /></td>
//                             </tr>

//                             <tr className='cada-valor-vendas'>
//                                 <td>6</td>
//                                 <td>R$123,45</td>
//                                 <td>R$123,45</td>
//                                 <td>--</td>
//                                 <td>CARTÃO</td>
//                                 <td>DÉBITO</td>
//                                 <td><img src={Deletar} /></td>
//                             </tr>

//                             <tr className='cada-valor-vendas'>
//                                 <td>6</td>
//                                 <td>R$123,45</td>
//                                 <td>R$123,45</td>
//                                 <td>--</td>
//                                 <td>CARTÃO</td>
//                                 <td>DÉBITO</td>
//                                 <td><img src={Deletar} /></td>
//                             </tr>

//                             <tr className='cada-valor-vendas'>
//                                 <td>6</td>
//                                 <td>R$123,45</td>
//                                 <td>R$123,45</td>
//                                 <td>--</td>
//                                 <td>CARTÃO</td>
//                                 <td>DÉBITO</td>
//                                 <td><img src={Deletar} /></td>
//                             </tr>*/