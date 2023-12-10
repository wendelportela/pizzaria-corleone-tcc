import './index.scss'
import '../../../assets/config/fonts-config.scss'
import Modal from 'react-modal'
import CountUp from 'react-countup';

import LinhaAmarela from '../../../assets/images/icons/linha-amarela.svg'
//import Pizza from '../../../assets/images/icons/carrinho-completo.png'
import Coracao from '../../../assets/images/icons/coracao_icon.svg'
import Carrinho from '../../../assets/images/icons/shopping-cart_icon.svg'
import Seta from '../../../assets/images/icons/seta_icon.svg'
import PizzaMargue from '../../../assets/images/pictures/margherita.png'
import Star from '../../../assets/images/icons/star_icon.svg'
import Loja from '../../../assets/images/icons/loja-localizacao.png'
import Add from '../../../assets/images/pictures/add-cart.png'

import { Await, useFetcher, useNavigate } from 'react-router-dom'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cabecalho from '../cabecalho'

import { toast } from 'react-toastify'
import { useEffect } from 'react'

import { API_URL } from '../../../config/constants'

export default function CardProduto(props) {

    const [openModalCart, setOpenModalCart] = useState(false)
    const [ favorito    , setFavorito] = useState(false)
    const [ cadastroAtv , setCadastroAtv] = useState(false)
    const [ sugestoes   , setSugestoes] = useState([])
    const [ sugestoesBe , setSugestoesBe] = useState([])
    const [ sugestoesSo , setSugestoesSo] = useState([])

    const [ verificar   , setVerificar ]  = useState([]) 

    const [nome, setNome] = useState('')

    const navigate = useNavigate()

    // id cliente
    const [idc, setIdc] = useState(0)

    // info produto
    const id = props.produto.id
    const tipo = props.produto.tipo

    // ID FAVORITO
    const [idFav, setIdFav] = useState(0)


        const api = axios.create({
        baseURL: API_URL
    })


    function ttt(novoValor) {
        setCadastroAtv(novoValor);
    }

    



    async function listarsugestao() {

        try {

            const response = await axios.get(API_URL + '/corleone/sugestao/pizza/' + id)
            setSugestoes(response.data);

            const resp = await axios.get(API_URL + '/corleone/sugestao/bebida/' + id)
            setSugestoesBe(resp.data);

            const resposta = await axios.get(API_URL + '/corleone/sugestao/sobremesa/' + id)
            setSugestoesSo(resposta.data)

        } catch (err) {
            toast.error(err.response.data.error)
        }

    }



    useEffect(() => {
        async function fetchData() {
            console.log(id)
            try {
                
                if (usuario && usuario.id !== 0 && usuario.id !== null) {
                    setIdc(usuario.id)
                    let response = await axios.get(`${API_URL}/corleone/produtos/favoritos/verificar?produto=${id}&cliente=${usuario.id}`);
                    console.log(response.data)
                    setIdFav(response.data[0].idfavorito);
                    if (response.data[0].valor === 'false') {
                        setFavorito(false);
                    } else {
                        setFavorito(true);
                    }
                }
            } catch (err) {
            }
        }
    
        fetchData(); 
    }, [id]);
    

    let usuario = JSON.parse(localStorage.getItem('usuario-logado'))
  
useEffect(()=>{

    async function fetchData(){
        let usuario = JSON.parse(localStorage.getItem('usuario-logado'));
        
    if (usuario != null) {
        let user = {
            "cliente":usuario.id,
            "produto":id
        }
          
        let r = await axios.get(API_URL + `/corleone/usuario/carrinho/verificar/${user.cliente}/${user.produto}`)
        setVerificar(r.data)  ;
    }
    };

    fetchData();

},[verificar])
  

    async function carrinho (){

        try {
      
         if(  verificar.length > 0) {
               const item = verificar[0]                 
                  
                if( item.carrinho == 'disponivel'){

                        let  qtd        = item.quantidade
                        const idcarrinho = item.id_carrinho

                        let user  = {
                            "disponivel":true,
                            "qtd": qtd + 1,
                            "idcarrinho": idcarrinho
                        }
                        let respo = await axios.put(API_URL + '/corleone/usuario/carrinho/editar',user)
                        setOpenModalCart(false)        
                    }
                    else{
                        const idcarrinho = item.id_carrinho
        
                        let user  = {
                            "disponivel":true,
                            "qtd": 1,
                            "idcarrinho": idcarrinho
                        }
                        let respo = await axios.put(API_URL + '/corleone/usuario/carrinho/editar',user)
                        setOpenModalCart(false)
                    }
              }
      
          

         else{
            let user = {
                "cliente":usuario.id,
                "produto":id
            }

            let r2 = await axios.get(`${API_URL}/corleone/usuario/carrinho/verificar/${user.cliente}/${user.produto}`)
            let verificar2 = r2.data

                if(verificar2.length === 0 ){

                    let user = {
                        "produto":id,
                        "cliente":usuario.id,
                        "disponivel":true,
                        "qtd":1
                       }

                    let resposne = await axios.post(API_URL + '/corleone/usuario/carrinho',user)
                    setOpenModalCart(false)
                }       
         }
           
        } catch (erro) {
           if (!localStorage.getItem('usuario-logado')) {           
               toast.error('Impossivel inserir ao carrinho, favor se cadastrar ou realizar login no nosso site')     
           }
           else{
               toast.error(erro.message)     
           }
        }  
 }


        const navigation = useNavigate()

        const teste = API_URL + props.produto.imagem


    const favoritar = async () => {
        try {
            let usuario = localStorage.getItem('usuario-logado');
            usuario = JSON.parse(usuario);

            if (idFav === 0) {
                let dados = {
                    cliente: idc,
                    produto: id,
                    favorito: true
                }
         

                const response = await axios.post(API_URL + '/corleone/produtos/favoritos', dados)

                setFavorito(true)
                setIdFav(response.data.id)
            }
            else if (idFav != 0 && !favorito) {
                let dados = {
                    favorito: true,
                    id: idFav
                }

                let response = await axios.put(API_URL + '/corleone/produtos/alterar/favoritos', dados)

                setFavorito(true)

            }
            else {
                let dados = {
                    favorito: false,
                    id: idFav
                }
                let response = await axios.put(API_URL + '/corleone/produtos/alterar/favoritos', dados)
                setFavorito(false)
            }

        } catch (err) {
            toast.error('Algo deu errado')
            if (idc == 0) {
                setCadastroAtv(true)
                toast.error('Impossivel favoritar produto, favor se cadastrar ou realizar login no nosso site');
            }
        }

    }
    
    return (
        <main className='card-produto'>

                <img alt='linha' src={LinhaAmarela} className='linha1' />
                <div className='produto'>

                    {/*<img className='img' src={teste}/>*/}

                <div className='circulo' onClick={() => favoritar()}>
                    {favorito ? <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="path-1-inside-1_22_170" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.4239 1.72615C0.401344 3.7487 0.401343 7.02791 2.4239 9.05047L3.1963 9.82287L3.19503 9.82415L10.5194 17.1485L18.5761 9.09172C20.5987 7.06916 20.5987 3.78995 18.5761 1.76739C16.5536 -0.255162 13.2743 -0.255163 11.2518 1.76739L10.5206 2.49855L9.74822 1.72614C7.72567 -0.296411 4.44646 -0.29641 2.4239 1.72615Z" />
                        </mask>
                        <path className='coracaoDst' fill-rule="evenodd" clip-rule="evenodd" d="M2.4239 1.72615C0.401344 3.7487 0.401343 7.02791 2.4239 9.05047L3.1963 9.82287L3.19503 9.82415L10.5194 17.1485L18.5761 9.09172C20.5987 7.06916 20.5987 3.78995 18.5761 1.76739C16.5536 -0.255162 13.2743 -0.255163 11.2518 1.76739L10.5206 2.49855L9.74822 1.72614C7.72567 -0.296411 4.44646 -0.29641 2.4239 1.72615Z" fill="white" />
                        <path d="M2.4239 9.05047L1.71679 9.75758L1.71679 9.75758L2.4239 9.05047ZM2.4239 1.72615L1.71679 1.01904L2.4239 1.72615ZM3.1963 9.82287L3.90341 10.53L4.61052 9.82287L3.90341 9.11577L3.1963 9.82287ZM3.19503 9.82415L2.48792 9.11704L1.78081 9.82415L2.48792 10.5313L3.19503 9.82415ZM10.5194 17.1485L9.81224 17.8556L10.5194 18.5627L11.2265 17.8556L10.5194 17.1485ZM18.5761 9.09172L17.869 8.38461L17.869 8.38461L18.5761 9.09172ZM18.5761 1.76739L19.2832 1.06029L19.2832 1.06029L18.5761 1.76739ZM11.2518 1.76739L10.5447 1.06029L10.5447 1.06029L11.2518 1.76739ZM10.5206 2.49855L9.81352 3.20566L10.5206 3.91276L11.2277 3.20566L10.5206 2.49855ZM9.74822 1.72614L9.04112 2.43325L9.04112 2.43325L9.74822 1.72614ZM3.13101 8.34336C1.49897 6.71133 1.49897 4.06528 3.13101 2.43325L1.71679 1.01904C-0.696287 3.43212 -0.696288 7.3445 1.71679 9.75758L3.13101 8.34336ZM3.90341 9.11577L3.13101 8.34336L1.71679 9.75758L2.4892 10.53L3.90341 9.11577ZM3.90213 10.5313L3.90341 10.53L2.4892 9.11577L2.48792 9.11704L3.90213 10.5313ZM11.2265 16.4414L3.90213 9.11704L2.48792 10.5313L9.81224 17.8556L11.2265 16.4414ZM17.869 8.38461L9.81224 16.4414L11.2265 17.8556L19.2832 9.79882L17.869 8.38461ZM17.869 2.4745C19.501 4.10653 19.501 6.75258 17.869 8.38461L19.2832 9.79882C21.6963 7.38574 21.6963 3.47337 19.2832 1.06029L17.869 2.4745ZM11.9589 2.4745C13.5909 0.842468 16.237 0.842468 17.869 2.4745L19.2832 1.06029C16.8701 -1.35279 12.9578 -1.35279 10.5447 1.06029L11.9589 2.4745ZM11.2277 3.20566L11.9589 2.4745L10.5447 1.06029L9.81352 1.79144L11.2277 3.20566ZM9.04112 2.43325L9.81352 3.20566L11.2277 1.79144L10.4553 1.01904L9.04112 2.43325ZM3.13101 2.43325C4.76304 0.801221 7.40908 0.80122 9.04112 2.43325L10.4553 1.01904C8.04225 -1.39404 4.12987 -1.39404 1.71679 1.01904L3.13101 2.43325Z" fill="black" mask="url(#path-1-inside-1_22_170)" />
                    </svg>
                        : <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="path-1-inside-1_22_170" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.4239 1.72615C0.401344 3.7487 0.401343 7.02791 2.4239 9.05047L3.1963 9.82287L3.19503 9.82415L10.5194 17.1485L18.5761 9.09172C20.5987 7.06916 20.5987 3.78995 18.5761 1.76739C16.5536 -0.255162 13.2743 -0.255163 11.2518 1.76739L10.5206 2.49855L9.74822 1.72614C7.72567 -0.296411 4.44646 -0.29641 2.4239 1.72615Z" />
                            </mask>
                            <path className='coracaoAtv' fill-rule="evenodd" clip-rule="evenodd" d="M2.4239 1.72615C0.401344 3.7487 0.401343 7.02791 2.4239 9.05047L3.1963 9.82287L3.19503 9.82415L10.5194 17.1485L18.5761 9.09172C20.5987 7.06916 20.5987 3.78995 18.5761 1.76739C16.5536 -0.255162 13.2743 -0.255163 11.2518 1.76739L10.5206 2.49855L9.74822 1.72614C7.72567 -0.296411 4.44646 -0.29641 2.4239 1.72615Z" fill="white" />
                            <path d="M2.4239 9.05047L1.71679 9.75758L1.71679 9.75758L2.4239 9.05047ZM2.4239 1.72615L1.71679 1.01904L2.4239 1.72615ZM3.1963 9.82287L3.90341 10.53L4.61052 9.82287L3.90341 9.11577L3.1963 9.82287ZM3.19503 9.82415L2.48792 9.11704L1.78081 9.82415L2.48792 10.5313L3.19503 9.82415ZM10.5194 17.1485L9.81224 17.8556L10.5194 18.5627L11.2265 17.8556L10.5194 17.1485ZM18.5761 9.09172L17.869 8.38461L17.869 8.38461L18.5761 9.09172ZM18.5761 1.76739L19.2832 1.06029L19.2832 1.06029L18.5761 1.76739ZM11.2518 1.76739L10.5447 1.06029L10.5447 1.06029L11.2518 1.76739ZM10.5206 2.49855L9.81352 3.20566L10.5206 3.91276L11.2277 3.20566L10.5206 2.49855ZM9.74822 1.72614L9.04112 2.43325L9.04112 2.43325L9.74822 1.72614ZM3.13101 8.34336C1.49897 6.71133 1.49897 4.06528 3.13101 2.43325L1.71679 1.01904C-0.696287 3.43212 -0.696288 7.3445 1.71679 9.75758L3.13101 8.34336ZM3.90341 9.11577L3.13101 8.34336L1.71679 9.75758L2.4892 10.53L3.90341 9.11577ZM3.90213 10.5313L3.90341 10.53L2.4892 9.11577L2.48792 9.11704L3.90213 10.5313ZM11.2265 16.4414L3.90213 9.11704L2.48792 10.5313L9.81224 17.8556L11.2265 16.4414ZM17.869 8.38461L9.81224 16.4414L11.2265 17.8556L19.2832 9.79882L17.869 8.38461ZM17.869 2.4745C19.501 4.10653 19.501 6.75258 17.869 8.38461L19.2832 9.79882C21.6963 7.38574 21.6963 3.47337 19.2832 1.06029L17.869 2.4745ZM11.9589 2.4745C13.5909 0.842468 16.237 0.842468 17.869 2.4745L19.2832 1.06029C16.8701 -1.35279 12.9578 -1.35279 10.5447 1.06029L11.9589 2.4745ZM11.2277 3.20566L11.9589 2.4745L10.5447 1.06029L9.81352 1.79144L11.2277 3.20566ZM9.04112 2.43325L9.81352 3.20566L11.2277 1.79144L10.4553 1.01904L9.04112 2.43325ZM3.13101 2.43325C4.76304 0.801221 7.40908 0.80122 9.04112 2.43325L10.4553 1.01904C8.04225 -1.39404 4.12987 -1.39404 1.71679 1.01904L3.13101 2.43325Z" fill="black" mask="url(#path-1-inside-1_22_170)" />
                        </svg>}
                    </div>
                </div>
                <img alt='linha' src={LinhaAmarela} className='linha2' />

                <div className='descricao-produto'>
                    <div className='imagem-pizza-comp' onClick={() => navigate('/informacao/' + props.produto.id)}>
                        <img src={`${api.getUri()}/${props.produto.imagem}`} />
                    </div>
                    <div className='precoNome'>
                        <h3>{props.produto.nome}</h3>
                        <p>R${props.produto.preco}</p>
                    </div>

                <div className='baixo'>
                    <div>
                        <div onClick={() => carrinho()} className='circulo'>
                            <img alt='carrinho' src={Carrinho} />
                        </div>
                        <Link to={`/informacao/${props.produto.id}`} className='mais-detalhes'>
                            <p>Mais Detalhes</p>
                            <img alt='seta' src={Seta} />
                        </Link>
                    </div>
                    <div className='pretin'>
                        <p>{props.produto.media !== null ? <CountUp end={props.produto.media} duration={5} /> : 0}</p>
                        <img alt='estrela' src={Star} />
                    </div>
                </div>


                </div>

           
        </main>
    )
}