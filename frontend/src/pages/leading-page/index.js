import './index.scss'
import '../../assets/config/fonts-config.scss'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import Alimentos from '../../assets/images/pictures/image14.svg'
import Relogio from '../../assets/images/pictures/image15.svg'
import Chef from '../../assets/images/pictures/image16.svg'
import Bowl from '../../assets/images/pictures/image17.svg'

import Transition from '../transition/transition';

import { register } from 'swiper/element/bundle'

import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/autoplay'

import { Swiper, SwiperSlide } from 'swiper/react';



import ImgSobre from '../../assets/img/sobreleanding.png';

import Rodape from '../../components/user/rodape'
import Cabecalho from '../../components/user/cabecalho'

import CompSobre from '../../components/compSobre'
import { useEffect, useState } from 'react';
import CardFiltroLeadingPage from '../../components/cardFiltroLeadingPage';
import Whatsapp from '../../components/whatsapp';


export default function Leading() {
    const navigate = useNavigate()

    register();
    const [mostrarBotao, setMostrarBotao] = useState(true);

    const cardapioFiltroAtv = (value) => {
        navigate('/cardapio?filtro=' + value);
    }

    const [perViewSlider, setPerViewSlider] = useState(2)

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 720) {
                setPerViewSlider(1)
            }
            else {
                setPerViewSlider(2)
            }
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }

        return
    }, [])

    return (
        <Transition>
        <main className='leadingPage'>
            <Whatsapp />
            <Cabecalho />
            <div className='introducao'>
                <h2>CORLEONE'S PIZZA</h2>
                <h1>Sabor digno de um Don</h1>
                <button onClick={() => navigate('/cardapio')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="29" viewBox="0 0 35 29" fill="none">
                        <path d="M2.88354 15.6783V18.3798C2.88354 18.6182 3.17562 18.7771 3.37034 18.7771H29.7546C30.0467 18.7771 30.2414 18.5387 30.2414 18.3798V15.6783C30.2414 15.5988 30.2414 15.4399 30.144 15.3604L24.3025 10.4341H8.91979L3.07826 15.3604C3.07826 15.5194 2.88354 15.5988 2.88354 15.6783ZM9.30923 11.3081H23.913L28.6836 15.281H18.1689C18.0715 15.9166 17.39 16.3139 16.8059 16.3139C16.027 16.3139 15.5402 15.9166 15.4428 15.281H4.73336L9.30923 11.3081ZM3.95449 16.0756H14.5666L14.664 16.155C15.1508 16.7112 15.9296 17.1085 16.7085 17.1085C17.4874 17.1085 18.2662 16.7907 18.753 16.155L18.8504 16.0756H29.4625V17.9825H3.95449V16.0756Z" />
                    </svg>
                    <p>Fazer Pedido</p>
                </button>
            </div>

 
            <div className='secaoDoisLeading'>
                <div className='propaganda1'>
                    <div className='sombrinha'>
                        <div>
                            <h2>Sabor Excepcional</h2>
                            <p>Palavras presentes em cada mordidas em nossas pizzas.</p>
                        </div>
                        <button onClick={() => navigate('/cardapio')}>Confira Aqui</button>

                    </div>
                </div>

                <div className='propaganda2'>
                    <div className='sombrinha'>
                        <div>
                            <h2>Qualidade</h2>
                            <p>Trago diretamente da Sicília, Itália. O sabor é indescritível.</p>
                        </div>

                        <button onClick={() => navigate('/cardapio')}>Confira Aqui</button>

                    </div>
                </div>

                <div className='propaganda3'>
                    <div className='sombrinha'>
                        <div>
                            <h2>Tradição</h2>
                            <p>Palavras presentes em cada mordidas em nossas pizzas.</p>
                        </div>

                        <button onClick={() => navigate('/cardapio')}>Confira Aqui</button>

                    </div>
                </div>

                <div className='yesterday'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="30" viewBox="0 0 100 30" fill="none">
                        <path d="M2 15H71" stroke="#53220D" stroke-width="3" stroke-linecap="round" />
                        <circle cx="85" cy="15" r="15" fill="#53220D" />
                        <path d="M83 9.5L90 16L83 21.5" stroke="white" stroke-linecap="round" />
                    </svg>
                    <h2>Ver Mais Aqui</h2>
                </div>
            </div>

            <div className='quebraLeadingPage'>
                <div className='etapa'>
                    <img src={Alimentos} alt='ft'/>
                    <p>Ingredientes frescos e de altíssima qualidade.</p>
                </div>
                <div className='linha'></div>
                <div className='etapa'>
                    <img src={Relogio} alt='ft'/>
                    <p>Paixão em compartilhar a experiência e tradição italiana em encantar com o paladar.</p>
                </div>
                <div className='linha'></div>
                <div className='etapa'>
                    <img src={Chef} alt='ft'/>
                    <p>Levar até sua mesa refeições deliciosas e com rapidez.</p>
                </div>
                <div className='linha'></div>
                <div className='etapa'>
                    <img src={Bowl} alt='ft'/>
                    <p>Atendimento de qualidade para tornar a sua experiência inesquecível.</p>
                </div>
            </div>
            
            <div className="swiper-container">
                <Swiper
                    slidesPerView={perViewSlider}
                    spaceBetween={40}
                    loop={true}  
                    centeredSlides={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    navigation
                    pagination={{ clickable: true, dynamicBullets: true }}
                    centeredSlidesBounds={true}
                >
                    <SwiperSlide onClick={() => cardapioFiltroAtv('s')} className='slider'>
                        <CardFiltroLeadingPage filtro='sobremesa' chefe='Helena Riso' tp='Sobremesas' />
                    </SwiperSlide>
                    <SwiperSlide onClick={() => cardapioFiltroAtv('p')}>
                        <CardFiltroLeadingPage filtro='pizza' chefe='Henrique Fogasa' tp='Pizzas' />
                    </SwiperSlide>
                    <SwiperSlide onClick={() => cardapioFiltroAtv('b')}>
                        <CardFiltroLeadingPage filtro='bebida' chefe='Brunello di Montalcino' tp='Bebida' />
                    </SwiperSlide>
                    <SwiperSlide onClick={() => cardapioFiltroAtv('v')}>
                        <CardFiltroLeadingPage filtro='veg' chefe='Alex Atala' tp='Vegetariana' />
                    </SwiperSlide>
                </Swiper>
            </div>


            


            <div className="comp-sobre-nos">
                <div className="containerrr">
                    <div className='sub-container'>
                        <div className="titulo">
                            <h1>Nossas pizzas são</h1>
                        </div>

                        <div className="conteudo-sobre-nos">
                            <div className="esquerda-sobre-nos">

                                <img src={ImgSobre} alt="imagem" />
                            </div>

                            <div className="direita-sobre-nos">
                                <div><h1>preparadas com dedicação</h1></div>
                                <p>E o cuidado que só uma pizzaria legítima italiana pode oferecer. Desde a massa artesanal, amassada à mão, até o molho de tomate caseiro, cada etapa é executada com maestria para garantir uma experiência gastronômica única na sua vida.</p>
                                <span>Além de nossas pizzas tradicionais, trazemos um toque de inovação, combinando ingredientes locais e inspirações brasileiras. Assim, criamos sabores exclusivos que agradam a todos os paladares. Nosso objetivo é encantar você com a fusão perfeita entre a tradição italiana e a criatividade brasileira."</span>
                                <Link to="/sobrenos" className=' butao'>
                                    <a>Mais sobre nós</a>
                                </Link>
                            </div>
                        </div>
                    </div>


                </div>
            </div>




            <button className='redirecionar' onClick={() => navigate('/cardapio')}>
                Experimente aqui a <strong>Pizza</strong> digna de um <strong>Don</strong>
            </button>
            <Rodape />
        </main >
        </Transition>
    )
}
