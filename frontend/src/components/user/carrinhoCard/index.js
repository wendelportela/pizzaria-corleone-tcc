import './index.scss'
import '../../../assets/config/fonts-config.scss'

import Star from '../../../assets/images/icons/star_icon.svg'
import Coracao from '../../../assets/images/icons/coracao_icon.svg'
import axios from 'axios'
import { toast } from 'react-toastify'

import { API_URL } from '../../../config/constants'
import { useEffect, useState } from 'react'

export default function CardCarrinho(props) {

    const [media, setMedia] = useState(null)

    useEffect(() => {
        async function fetchData(){
            let response = await axios.get(API_URL + `/media?id=${props.produto.id}`)
            response = response.data
            setMedia(response.media)
        }

        fetchData()
    },[])

    const api = axios.create({
        baseURL: API_URL
    })


    const [carrinho, setCarrinho] = useState([])


    useEffect(() => {
        listarCarrinhoimagem();
    }, [])


    async function listarCarrinhoimagem() {
        const r = await axios.get(`${API_URL}/corleone/usuario/carrinho/listar/imagem/${props.produto.id}`)
        console.log(r.data)
        setCarrinho(r.data)
    }


    
    function deletar(){
        
        let id = props.produto.id
        let qtd = props.produto.qtd
        let user  = {
            "disponivel":false,
            "qtd":1,
            "idcarrinho":id
        }
        

        let respo = axios.put(API_URL+'/corleone/usuario/carrinho/editar',user)
        //alert(respo.data)//
        // window.location.reload()
    }



   async  function alterar (){
    try {
        let  qtd        = props.produto.qtd
        const idcarrinho = props.produto.id

        let user  = {
            "disponivel":true,
            "qtd": qtd + 1,
            "idcarrinho": idcarrinho
        }

        let respo = await axios.put(API_URL + '/corleone/usuario/carrinho/editar',user)

    } catch (err) {
        toast.error(err.message)
    }
        
      
    }

    async  function remover (){

        try {
            let quant = props.produto.qtd

            if( quant > 1 ){
            let  qtd        = props.produto.qtd
            const idcarrinho = props.produto.id
    
            let user  = {
                "disponivel":true,
                "qtd": qtd - 1,
                "idcarrinho": idcarrinho
            }
            let respo = await axios.put(API_URL + '/corleone/usuario/carrinho/editar',user)
             }
            if( quant == 1 || quant < 1){
                let id = props.produto.id
                let qtd = props.produto.qtd

                let user  = {
                    "disponivel":false,
                    "qtd":1,
                    "idcarrinho":id
                }

                let respo = axios.put(API_URL + '/corleone/usuario/carrinho/editar',user)
            }
        
        } catch (err) {
            toast.error(err.message)
        }
    
      
    }


    return (
        <main className='cardCarrinho'>

            <div className='alimento'>
                <img className='alimento' src={`${api.getUri()}/${props.produto.imagem}`} />
            </div>

            <div className='pequenasInformacoes'>

                <div className='descricaoProduto'>
                    <h3>{props.produto.nome}  </h3>
                    <div className='qtd'>
                          <p onClick={ remover}> - </p>
                             {props.produto.qtd}
                           <p onClick={alterar}> + </p> 
                     </div>
                    <svg onClick={deletar} className='svg' xmlns="http://www.w3.org/2000/svg" width="15" height="17" viewBox="0 0 15 17" fill="none" >
                            <path d="M1 2.01746L13.3896 15.2992" stroke="#53220D" strokeWidth="2" strokeLinecap="round" />
                            <path d="M1.00049 15.2985L13.3901 2.01674" stroke="#53220D" strokeWidth="2" strokeLinecap="round" />
                   </svg>
                </div>

               

                <div className='baixoDescricaoProdutos'>
                    {media && 
                    <div className='pretin'>
                        <p>{media}</p>
                        <img alt='estrela' src={Star}/>
                    </div>}
                    <p>R${props.produto.preco}</p>
                </div>


            </div>
        </main>
    )
}