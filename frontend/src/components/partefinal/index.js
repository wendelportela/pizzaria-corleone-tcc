import './index.scss'
import res from '../../images/rest.jpg'

export default function ParteMarrom(){
    return(
       
        <div className='subbb'>

            <div className='subcontainerr'>
            <div className='tituloo'> 
                <h1>A Corleone Pizzaria</h1>
            </div>

            <div className='sub2'>
             <div className='imagen'>
                <img src={res}/>
             </div>
            <div className='subb'>
                <h1>O Sabor Autêntico da Itália!</h1>

                <div className='titu'>
                    <h2> Quando você escolhe a Corleone Pizzaria, não está apenas saboreando uma pizza excepcional, mas também fazendo parte de nossa história. Somos uma empresa comprometida em proporcionar momentos memoráveis, reunindo famílias e amigos em torno da mesa, celebrando a vida e compartilhando risadas.</h2>
                    <h2> Convidamos você a se juntar a nós nesta jornada gastronômica única. Deixe-nos transportar você para a Itália, mesmo que esteja a milhares de quilômetros de distância. Descubra a magia da culinária italiana, com um toque especial do Brasil, na Corleone Pizzaria.</h2>
                </div>
            </div>
            </div>
            </div>




        </div>
    )
}