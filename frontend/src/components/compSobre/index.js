
import './index.scss'
import Restaurante from '../../assets/img/restaurante comp.png';
import Fundo from '../../assets/img/retangulo.png';
import { Link } from 'react-router-dom'
import { useState } from 'react';



export default function CompSobre(props) {


    return(
        <div className="comp-sobre-nos">
            <div className="containerrr">
                <div className='sub-container'>
                    <div className="titulo">
                        <h1>{props.titulo}</h1>
                    </div>

                    <div className="conteudo-sobre-nos">
                        <div className="esquerda-sobre-nos">

                            <img src={props.imagem} alt="imagem" />
                        </div>

                        <div className="direita-sobre-nos">
                            <div><h1>{props.subTitulo}</h1></div>
                            <p>{props.primeiroTexto}</p>
                            <span>{props.segundoTexto}</span>
                            {props.mostrarBotao ? (
                                <Link to="/sobrenos" className=' butao'>
                                <a>{props.butao}</a>
                                </Link> 
                            )
                            : null}                                                                       
                        </div>
                    </div>
                </div>
            
                
            </div>
        </div>
    )
}