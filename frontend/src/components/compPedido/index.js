
import './index.scss'
import Certo from '../../assets/images/pictures/certo-andamento.png';
import { useState } from 'react';


export default function CompPedido(props) {

    const [mostrar1, setMostrar1] = useState(true)

    return (
    <div className="pagina-andamento">
        <div className="container-andamento">
            <div className="etapa-1">
                <div className="bolinha">
                    <h5>1</h5>
                </div>
                {props.mostrar1 ? (
                <div className='certo'>
                    <img src={Certo} />
                 </div>
                 )
                 : null}

                <p>Comprar</p>
            </div>

            <div className='linha-andamento'></div>

            <div className="etapa-1">
                <div className="bolinha">
                    <h5>2</h5>
                </div>
                {props.mostrar2 ? (
                <div className='certo'>
                    <img src={Certo} />
                 </div>
                 )
                 : null}
                <p>Endereço</p>
            </div>

            <div className='linha-andamento'></div>

            <div className="etapa-2">
                <div className="bolinha">
                    <h5>3</h5>
                </div>
                {props.mostrar3 ? (
                <div className='certo'>
                    <img src={Certo} />
                 </div>
                 )
                 : null}
                <p>Confirmação do pedido</p>
            </div>

            <div className='linha-andamento'></div>

            <div className="etapa-2">
                <div className="bolinha">
                    <h5>4</h5>
                </div>
                {props.mostrar4 ? (
                <div className='certo'>
                    <img src={Certo} />
                 </div>
                 )
                 : null}
                <p>Pedido Confirmado</p>
            </div>




        </div>
    </div>
    );
}