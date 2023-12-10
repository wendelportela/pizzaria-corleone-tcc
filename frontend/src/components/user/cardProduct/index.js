import './index.scss'
import '../../../assets/config/fonts-config.scss'

import Carrinho from '../../../assets/images/icons/shopping-cart_icon.svg'
import Star from '../../../assets/images/icons/star_icon.svg'
import { API_URL } from '../../../config/constants';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function CardProduct(props) {

    const [produto, setProduto] = useState({})
    const [ verificar   , setVerificar ]  = useState([])
    const [openModalCart, setOpenModalCart] = useState(false)

    const api = axios.create({
        baseURL: API_URL
    })

    useEffect(() => {
        async function fetchData() {
            try {
                let response = await axios.get(API_URL + `/compra/listagem?id=${props.produto}`)
                response = response.data
                setProduto(response)
                //a imagem esta na variavel de estado, produto.imagem
            } catch (err) {

            }
        }
        fetchData()
    }, [])

    useEffect(() => {

        async function fetchData() {
            let usuario = JSON.parse(localStorage.getItem('usuario-logado'));

            if (usuario != null) {
                let user = {
                    "cliente": usuario.id,
                    "produto": props.produto
                }

                let r = await axios.get(API_URL + `/corleone/usuario/carrinho/verificar/${user.cliente}/${user.produto}`)
                setVerificar(r.data);
            }
        };

        fetchData();

    }, [verificar])


    async function carrinho() {

        try {

            if (verificar.length > 0) {
                const item = verificar[0]

                if (item.carrinho == 'disponivel') {

                    let qtd = item.quantidade
                    const idcarrinho = item.id_carrinho

                    let user = {
                        "disponivel": true,
                        "qtd": qtd + 1,
                        "idcarrinho": idcarrinho
                    }
                    let respo = await axios.put(API_URL + '/corleone/usuario/carrinho/editar', user)
                    setOpenModalCart(false)
                }
                else {
                    const idcarrinho = item.id_carrinho

                    let user = {
                        "disponivel": true,
                        "qtd": 1,
                        "idcarrinho": idcarrinho
                    }
                    let respo = await axios.put(API_URL + '/corleone/usuario/carrinho/editar', user)
                    setOpenModalCart(false)
                }
            }



            else {
                let usuario = localStorage.getItem('usuario-logado');
                usuario = JSON.parse(usuario);

                let user = {
                    "cliente": usuario.id,
                    "produto": props.produto
                }

                let r2 = await axios.get(`${API_URL}/corleone/usuario/carrinho/verificar/${user.cliente}/${user.produto}`)
                let verificar2 = r2.data

                if (verificar2.length === 0) {

                    let user = {
                        "produto": props.produto,
                        "cliente": usuario.id,
                        "disponivel": true,
                        "qtd": 1
                    }

                    let resposne = await axios.post(API_URL + '/corleone/usuario/carrinho', user)
                    setOpenModalCart(false)
                }
            }

        } catch (erro) {
            if (!localStorage.getItem('usuario-logado')) {
                toast.error('Impossivel inserir ao carrinho, favor se cadastrar ou realizar login no nosso site')
            }
            else {
                toast.error(erro.message)
            }
        }
    }

    return (
        <main className='card-product'>

            <div className='produto'>
                <img src={`${api.getUri()}/${props.imagem}`} />
            </div>

            <div className='descricao-produto'>

                <div className='descricaoProduto'>
                    <h3>{produto.nome}</h3>
                    {!produto.media 
                     ? null 
                     : 
                     <div className='pretin'>
                        <p>{produto.media}</p>
                        <img alt='estrela' src={Star} />
                    </div>}
                    
                </div>

                <div className='circulo' onClick={() => carrinho()}>
                    <img alt='carrinho' src={Carrinho} />
                </div>


            </div>
        </main>
    )
}