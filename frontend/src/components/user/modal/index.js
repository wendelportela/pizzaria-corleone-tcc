import './index.scss'
import '../../../assets/config/fonts-config.scss'

import Loja from '../../../assets/images/icons/loja-localizacao.png'
import Add from '../../../assets/images/pictures/add-cart.png'

export default function Modal({ onClose }) {


    
    return (
        <main className='sugestoes'>
            <div className='imagem-produto' />
            <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                <path d="M2 1.47386L14.3896 13.1358" stroke="black" stroke-width="2" stroke-linecap="round" />
                <path d="M2.00049 13.1351L14.3901 1.47317" stroke="black" stroke-width="2" stroke-linecap="round" />
            </svg>
            <div className='opcoes'>
                <h1>Pizza Margherita</h1>
                <h2>R$ 72,00</h2>
                <div className='localPartida'>
                    <div className='ruaAvaliacao'>
                        <img className='iconezin' src={Loja} />
                        <p>Avenida Europa - 3090</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="418" height="2" viewBox="0 0 418 2" fill="none">
                        <path d="M1 0.961498H417" stroke="black" stroke-linecap="round" />
                    </svg>
                    <div className='precoEntrega'>
                        <p>20-22 minutos - R$8,20</p>
                    </div>
                </div>

                <div className='opcoesExtra'>
                    <div className='esquerdista'>
                        <h2>Escolha um Vinho</h2>
                        <p>Escolha uma opção</p>
                    </div>
                    <div className='direitaOpcional'>
                        <p>OPCIONAL</p>
                    </div>
                </div>

                <div className='deLadinho'>
                    <div>
                        <input type='radio' />
                        <p>Vinho Bom</p>
                    </div>
                    <div>
                        <input type='radio' />
                        <p>Vinho Bom</p>
                    </div>
                    <div>
                        <input type='radio' />
                        <p>Vinho Bom</p>
                    </div>
                </div>

                <div className='opcoesExtra'>
                    <div className='esquerdista'>
                        <h2>Escolha uma Sobremesa</h2>
                        <p>Escolha uma opção</p>
                    </div>
                    <div className='direitaOpcional'>
                        <p>OPCIONAL</p>
                    </div>
                </div>

                <div className='deLadinho'>
                    <div>
                        <input type='radio' />
                        <p>Sobremesa boa</p>
                    </div>
                    <div>
                        <input type='radio' />
                        <p>Sobremesa boa</p>
                    </div>
                    <div>
                        <input type='radio' />
                        <p>Sobremesa boa</p>
                    </div>
                </div>

                <img src={Add} className='butaumzin' />
            </div>
        </main>
    )
}