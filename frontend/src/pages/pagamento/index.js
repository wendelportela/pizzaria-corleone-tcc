import './index.scss'
import alelo from '../../images/Alelo.png'
import american from  '../../images/AmericanExpress.png'
import diners from '../../images/DinersClub.png'
import dinheiro from  '../../images/dinheiro.png'
import elo from '../../images/Elo.png'
import pix from '../../images/pix.png'
import sodexo from '../../images/Sodexo.png'
import ticket from '../../images/TicketRestaurante.png'
import vale from   '../../images/valerefeição.png'
import visa from '../../images/Visa.png'
import Mastercard from '../../images/Mastercard.png'


export default function Pagamento(){
    return(

        <div className='forma-pag'>


            <div className='containerr'>
            

            <div className='titulo'>
            <p className='voltar'> Voltar </p>
                <h1>Escolha a forma de pagamento</h1>
            </div>

            <div className='tudo'>
                

            <div className='primeira'>
               
            </div>

            <div className='segunda'>

            <div className='pag'>
                    <img src={dinheiro} />
                    <p>Dinheiro</p>
                </div>

                <div className='pag'>
                    <img src={pix}/>
                    <p>Pix</p>
                </div>

                <div className='tipocartao'>
                    <h3>Crédito/Debito</h3>
                </div>

                <div className='pag'>
                <img src={Mastercard}/>
                <p>Mastercard</p>
                </div>

                <div className='pag'>
                <img src={visa}/>
                <p>Visa</p>
                </div>

                <div className='pag'>
                <img src={elo}/>
                <p>Elo</p>
                </div>

                <div className='pag'>
                <img src={american}/>
                <p>American Express</p>
                </div>

            </div>

            <div className='terceira'>
              <div className='pag'>
                <img src={diners}/>
                <p>Diners Club</p>
              </div>

            <div className='quarta'>
                <div className='vale'>
                    <h3>Vale refeição</h3>
                </div>

                <div className='pag'>
                <img src={vale}/>
                <p>Vale Refeição</p>
              </div>

              <div className='pag'>
                <img src={sodexo}/>
                <p>Sodexo</p>
              </div>

              <div className='pag'>
                <img src={ticket}/>
                <p>Ticket Restaurante</p>
              </div>

              <div className='pag'>
                <img src={alelo}/>
                <p>Alelo</p>
              </div>
             </div>

              <div className='botao'>
                <button>Finalizar Compra</button>
              </div>




            </div>
        </div>
        </div>
        </div>

    )
}