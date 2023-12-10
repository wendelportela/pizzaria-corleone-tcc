import './index.scss'
import '../../../assets/config/fonts-config.scss'
import Whatsapp from '../../../assets/images/icons/whatsapp.svg'
import Facebook from '../../../assets/images/icons/facebook.svg'
import X from '../../../assets/images/icons/x.svg'
import Instagram from '../../../assets/images/icons/instagram.svg'
import Telefone from '../../../assets/images/icons/telefone.svg'
import { useNavigate } from 'react-router-dom'

export default function Rodape() {
    const navigate = useNavigate()

    const linkStyles = {
        textDecoration: 'none',
        color: 'inherit',
        cursor: 'pointer',
    }

    return (
        <main className='rodape'>
            <div>
                <h3 className='titutoContato'>Paginas</h3>
                <p onClick={() => navigate('/cardapio')}>Cardápio</p>
                <p onClick={() => navigate('/sobrenos')}>Sobre Nos</p>
                <p onClick={() => navigate('/associado')}>Página do Associado</p>
            </div>

            <div>
                <h3 className='titutoContato'>Unidades</h3>
                <div>
                    <p>
                        <a
                            href="https://maps.google.com/?q=Av+Giovanni+Gronchi+Vila+Andrade,74"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={linkStyles}
                        >
                            Av Giovanni Gronchi Vila Andrade,74
                        </a>
                    </p>
                    <p>
                        <a
                            href="https://maps.google.com/?q=Rua+Cachoeira+Alta,610"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={linkStyles}
                        >
                            Rua Cachoeira Alta,610
                        </a>
                    </p>
                    <p>
                        <a
                            href="https://maps.google.com/?q=R.+Itapechinga,6-24"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={linkStyles}
                        >
                            R. Itapechinga, 6-24
                        </a>
                    </p>
                </div>
            </div>

            <div>
                <h3 className='titutoContato'>Suporte</h3>
                <p>Fale Conosco</p>
            </div>

            <div>
                <div className='redes-sociais'>
                    <h4>Siga-nos nas redes Sociais</h4>
                    <div>
                        <img alt='whatsapp' src={Whatsapp} className='contato' />
                        <img alt='instagram' src={Instagram} className='contato' />
                        <img alt='facebook' src={Facebook} className='contato' />
                        <img alt='x' src={X} className='contato' />
                    </div>
                </div>

                <div className='contatos'>
                    <h4>Outros Contatos</h4>
                    <div>
                        <img alt='telefone' src={Telefone} className='contato' />
                        <p>+55 11 993673706</p>
                    </div>
                    <div>
                        <img alt='telefone' src={Telefone} className='contato' />
                        <p>+55 11 923063609</p>
                    </div>
                </div>
            </div>

            <div class="scrolling-text-container">
                <div class="scrolling-text">
                    <p>DON CORLEONE'S  PIZZA DON CORLEONE'S PIZZA  DON CORLEONE'S PIZZA  DON CORLEONE'S PIZZA  DON CORLEONE'S PIZZA   DON CORLEONE'S PIZZA</p>
                </div>
            </div>
        </main>
    )
}