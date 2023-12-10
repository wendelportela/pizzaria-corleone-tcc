import './index.scss'
import '../../assets/config/fonts-config.scss'
import Whats from '../../assets/images/icons/whatsappIcon.svg'

export default function Whatsapp(){

    const handleCardClick = () => {
        const url = 'https://wa.me/+5511998172476?text=Ol%C3%A1%2C%20tenho%20interesse%20na%20Don%20Corleone%20Pizza';
        window.open(url, '_blank');
    };

    return(
        <main className='cardWhats' onClick={handleCardClick}>
            <div className='whatsicon'>
                <img src={Whats} alt='whatsapp icon'/>
            </div>
            <div className='direitaWhats'>
                <h3>Precisa de Ajuda?</h3>
                <p>Considere falar com nossa equipe via Whatsapp. 🍕</p>
            </div>
        </main>
    )
}