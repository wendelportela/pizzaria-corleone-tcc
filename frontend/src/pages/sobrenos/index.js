import '../../assets/config/fonts-config.scss'
import './App.scss';
import CountUp from 'react-countup';

import RestauranteComp from '../../assets/img/restaurante comp.png'
import restaurante from '../../images/restaurante.png'
import pizza from '../../images/fundo.png'
import Cabecalho from '../../components/user/cabecalho';
import Rodape from '../../components/user/rodape';
import CompSobre from '../../components/compSobre'
import { useEffect, useRef, useState } from 'react';
import Top50 from '../../assets/images/pictures/logo-50toppizza.png'
import { useNavigate } from 'react-router-dom';
import Transition from '../transition/transition';
import Whatsapp from '../../components/whatsapp';

export default function SobreNos() {

  const [mostrarBotao, setMostrarBotao] = useState(false);

  const myElement = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // No caso de múltiplos elementos observados, entries é uma lista
      // Neste caso, estamos observando apenas um elemento, então usamos [0] para pegar a primeira entrada
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        // Uma vez que a animação foi disparada, podemos parar de observar
        observer.disconnect();
      }
    });

    observer.observe(myElement.current);

    return () => observer.disconnect();
  }, []);


  const navigate = useNavigate()

  const contratos = 95
  const cidade = 11
  const funcionarios = 400
  const mulheres = 65
  const restaurante = 15
  const clientes = 5500


  return (
    <Transition>
      <div className="App">
        <Cabecalho />
        <Whatsapp/>

        <div className='contaiiner'>
          <p>DON CORLEONE</p>
          <h2>__"Qualquer pessoa pode fazer uma PIZZA, mas sempre será uma pizza qualquer."</h2>
        </div>

        <div className='historias'>
          <h1>__Historias reais, PESSOAS REAIS</h1>
          <div className='cardsHistorias'>
            <div>
              <div className='javier'>
                <p>Sua paixão pela melhoria contínua e sua busca incessante por resultados positivos refletem-se na filosofia que o impulsiona: "Ganhar, ganhar e ganhar", seguindo os passos sábios de Luis Aragonés. </p>
              </div>
              <h2>Javier Coladonaro</h2>
              <p>De Gerente de Produção a <br /><strong>Diretor de Cadeia de Suprimentos.</strong></p>
            </div>

            <div>
              <div className='fabrizio'>
                <p>Sua ascensão meteórica reflete uma mentalidade proativa e a capacidade de transcender fronteiras. Como Gerente de P&D de Produto, ele é reconhecido por liderar equipes na concepção e criação de produtos inovadores que vão além das expectativas. </p>
              </div>
              <h2>Fabrizio Polacco</h2>
              <p>De Pizzaiolo a <br /><strong>Gerente de P&D de Produto</strong></p>
            </div>

            <div>
              <div className='elizabeth'>
                <p>Sua paixão pela melhoria contínua e sua busca incessante por resultados positivos refletem-se na filosofia que o impulsiona: "Ganhar, ganhar e ganhar", seguindo os passos sábios de Luis Aragonés. </p>
              </div>
              <h2>Elizabeth Cabral</h2>
              <p>De Equipe de Restaurante a <br /><strong>Especialista em Aprendizado</strong></p>
            </div>
          </div>

        </div>

        {/* <div className='texto-container'>

        <img src={restaurante} alt="Imagem do Restaurante" className="img-restaurante" />

        <div className='texto'>
          <div className='titulo2'>
            <h1 >Descubra a Essência da Itália no Coração do Brasil!</h1>
          </div>
          <h2 className='subtitulo2'>Na Corleone Pizzaria, mergulhamos fundo na cultura italiana para trazer até você a verdadeira experiência gastronômica da Itália. Nossa paixão pela culinária italiana transborda em cada detalhe, desde os ingredientes autênticos até a preparação artesanal de nossas deliciosas pizzas.</h2>
        </div>

      </div>



      <div className='secao-intermediaria'>
        <h2>Somos uma empresa que nasceu do desejo de compartilhar a riqueza da cultura italiana com o Brasil. Cada pizza que sai de nossa cozinha é uma homenagem à tradição, ao amor pela comida e à convivialidade italiana. Valorizamos a qualidade dos ingredientes e a autenticidade dos sabores, para que você possa se transportar diretamente para as encantadoras ruas de Roma, Nápoles ou Florença</h2>
      </div> */}


        {/* <div className='subtitulo3'>
        <div className='texto3'>
          <h2 >Nossas pizzas são preparadas com a dedicação e o cuidado que só uma pizzaria italiana legítima pode oferecer. Desde a massa artesanal, amassada à mão, até o molho de tomate caseiro, cada etapa é executada com maestria para garantir uma experiência gastronômica única.</h2>
          <h2 >Além de nossas pizzas tradicionais, trazemos um toque de inovação, combinando ingredientes locais e inspirações brasileiras. Assim, criamos sabores exclusivos que agradam a todos os paladares. Nosso objetivo é encantar você com a fusão perfeita entre a tradição italiana e a criatividade brasileira.</h2>
        </div>
        <img src={pizza} />
      </div> */}


        <div className='cardapio-sobrenos'>
          <div className='esquerda-cardapio-sobrenos'>
            <h1>"Terceira melhor cadeia de pizza artesanal do mundo e a primeira brasileira."</h1>
            <p>"De acordo com o top 50 de pizzas de 2022."</p>
            <button onClick={() => navigate('/cardapio')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="29" viewBox="0 0 35 29" fill="none">
                <path d="M2.88354 15.6783V18.3798C2.88354 18.6182 3.17562 18.7771 3.37034 18.7771H29.7546C30.0467 18.7771 30.2414 18.5387 30.2414 18.3798V15.6783C30.2414 15.5988 30.2414 15.4399 30.144 15.3604L24.3025 10.4341H8.91979L3.07826 15.3604C3.07826 15.5194 2.88354 15.5988 2.88354 15.6783ZM9.30923 11.3081H23.913L28.6836 15.281H18.1689C18.0715 15.9166 17.39 16.3139 16.8059 16.3139C16.027 16.3139 15.5402 15.9166 15.4428 15.281H4.73336L9.30923 11.3081ZM3.95449 16.0756H14.5666L14.664 16.155C15.1508 16.7112 15.9296 17.1085 16.7085 17.1085C17.4874 17.1085 18.2662 16.7907 18.753 16.155L18.8504 16.0756H29.4625V17.9825H3.95449V16.0756Z" />
              </svg>
              <p>Descubra agora os sabores da tradição</p>
            </button>
          </div>
          <img src={Top50} alt='top50' className='direita-cardapio-sobrenos' />
        </div>

        <div className='contador'>
          <h1>Nós fazemos pizza, mas <br /> somos bons em matemática.</h1>
          <div className='meio'>
            <div className='numbers'>
              <div ref={myElement}>
                <h1>
                  {isVisible && (
                    <CountUp end={contratos} duration={5} />
                  )}
                  %
                </h1>
                <h2>CONTRATOS SEM PRAZO</h2>
              </div>
              <div ref={myElement}>
                <h1>
                  +
                  {isVisible && (
                    <CountUp end={cidade} duration={5} />
                  )}
                </h1>
                <h2>CIDADES</h2>
              </div>
              <div ref={myElement}>
                <h1>
                  +
                  {isVisible && (
                    <CountUp end={funcionarios} duration={5} />
                  )}
                </h1>
                <h2>FUNCIONÁRIOS</h2>
              </div>
            </div>

            <div className='numbers'>
              <div ref={myElement}>
                <h1>
                  +
                  {isVisible && (
                    <CountUp end={mulheres} duration={5} />
                  )}
                  %</h1>
                <h2>MULHERES CONTRATADAS</h2>
              </div>
              <div ref={myElement}>
                <h1>
                  +
                  {isVisible && (
                    <CountUp end={restaurante} duration={5} />
                  )}
                </h1>
                <h2>RESTAURANTES</h2>
              </div>
              <div ref={myElement}>
                <h1>
                  +
                  {isVisible && (
                    <CountUp end={clientes} duration={5} />
                  )}
                </h1>
                <h2>CLIENTES SATISFEITOS</h2>
              </div>
            </div>
          </div>
        </div>
        <Rodape />
      </div >
    </Transition>
  );
}
