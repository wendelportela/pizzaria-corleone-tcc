
import { useState } from 'react';
import CompPedido from '../../components/compPedido'
import PedidoAndamento1 from '../../components/pedidoAndamento1';
import './index.scss'

export default function Confirmacaopedidos() {

    const [mostrar1, setMostrar1] = useState(true)
    const [mostrar2, setMostrar2] = useState(true)
    const [mostrar3, setMostrar3] = useState(true)
    
    return(
        <div className="pagina-confirmacao-pedido">
            <div className="container-confirmacao">
                <div className='andamento'>
                    <CompPedido  mostrar1={mostrar1} mostrar2={mostrar2}  mostrar3={mostrar3} />
                </div>
                <div className='pedidos-feitos'>
                    <PedidoAndamento1/>
                </div>
                <div className='final-confirmacao'>
                    <div className='precos'>
                        <div>
                            <h3>Subtotal</h3>
                            <p>151,00</p>
                        </div>

                        <div>
                            <h2>Taxa de entrega</h2>
                            <h4>Grátis</h4>
                        </div>

                        <div>
                            <h3>Total</h3>
                            <p>151,00</p>
                        </div>
                    </div>

                    <div className='botoes'>
                        <button id='cancelar'>Cancelar pedido</button>
                        <button id='fazer'>Fazer pedido</button>
                    </div>
                </div>
            </div>
        </div>
    );
}