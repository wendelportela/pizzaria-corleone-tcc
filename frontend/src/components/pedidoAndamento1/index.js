
import './index.scss';
import Margherita from '../../assets/images/pictures/margherita.png';
import MargheritaBurrata from '../../assets/images/pictures/margherita c burrata.png';
import Lixeira from '../../assets/img/lixeira.png';
import Mais from '../../assets/img/mais.png';
import Fechar from '../../assets/images/pictures/x.png';


export default function PedidoAndamento1() {
    return(
        <div className="pagina-pedido-1">
            <div className="container-pedido">
                <div className="pedidos">
                    <div className="pedido-1">
                        <div className='esquerda-pedido'><img src={Margherita} /></div>
                        <div className='direita-pedido'>
                            <div className='kitar'></div>
                            <h1>Pizza Margherita</h1>
                            <p><span>Ingredientes: </span>Tomate, queijo, mozzarela, molho de tomate e <a>manjericao</a></p>
                            <div className='conteudo-pedido'>
                                <h2>R$ 71,00</h2>
                                <div className='alterar'>
                                    <img id='lixeira' src={Lixeira} />
                                    <p>1</p>
                                    <img id='mais' src={Mais} />
                                </div>
                            </div>
                        </div>
                    </div>
                    


                    <div className="pedido-2">
                        <div className='esquerda-pedido'><img src={MargheritaBurrata} /></div>
                        <div className='direita-pedido'>
                            <div className='kitar'></div>
                            <h1>Pizza Margherita c/ Burrata</h1>
                            <p><span>Ingredientes: </span>Ingredientes :Molho de tomate, queijo mozzarella, tomate fatiado, manjericão fresco e uma generosa porção de <a>burrata cremosa.</a></p>
                            <div className='conteudo-pedido'>
                                <h2>R$ 80,00</h2>
                                <div className='alterar'>
                                    <img id='lixeira' src={Lixeira} />
                                    <p>1</p>
                                    <img id='mais' src={Mais} />
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}