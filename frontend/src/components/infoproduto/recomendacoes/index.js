import './index.scss'
import estrela from '../../../assets/img/star_77949 1.png'
import carinho from '../../../assets/img/shopping-cart (1) 1.png'
import Modal from '../../user/modal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../config/constants';
import { toast } from 'react-toastify';


export default function Recomendacoes(props) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [sugestao, setSugestao] = useState([])
    const [numeroAleatorio, setNumeroAleatorio] = useState(null);

    const [media, setMedia] = useState(null)

    const [verificar, setVerificar] = useState([])


    const api = axios.create({
        baseURL: API_URL
    })

    useEffect(() => {
        function gerarNumeroAleatorio() {
          let numero = Math.random() * 4 + 1;
      
          if (numero === 5) {
            numero = Math.floor(numero);
          } else {
            numero = numero.toFixed(1);
          }
      
          return numero;
        }
      
        const numeroAleatorio = gerarNumeroAleatorio();
        setMedia(numeroAleatorio);
      }, []);

    useEffect(() => {
        gerarNumeroAleatorio()

        ListarSugestao()
    }, [])






    const gerarNumeroAleatorio = () => {
      const novoNumero = Math.floor(Math.random() * 10) + 1;
      console.log(`numero aleatorio: ${numeroAleatorio}`)
      setNumeroAleatorio(novoNumero);
    };


    async function ListarSugestao() {
        const r = await axios.get(`${API_URL}/corleone/sugestao/pizza/${numeroAleatorio}`)
        setSugestao(r.data)
    }

    let usuario = JSON.parse(localStorage.getItem('usuario-logado'))

    useEffect(() => {

        async function fetchData() {
            let usuario = JSON.parse(localStorage.getItem('usuario-logado'));

            if (usuario != null) {
                let user = {
                    "cliente": usuario.id,
                    "produto": numeroAleatorio
                }
                let r = await axios.get(`${API_URL}/corleone/usuario/carrinho/verificar/${user.cliente}/${user.produto}`)
                setVerificar(r.data);
            }
        };
        fetchData();

    }, [verificar]);


    async function carrinhoo() {

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
                    let respo = await axios.put(API_URL+'/corleone/usuario/carrinho/editar', user)

                }
                else {
                    const idcarrinho = item.id_carrinho

                    let user = {
                        "disponivel": true,
                        "qtd": 1,
                        "idcarrinho": idcarrinho
                    }
                    let respo = await axios.put(API_URL+'/corleone/usuario/carrinho/editar', user)

                }
            }



            else {
                let user = {
                    "cliente": usuario.id,
                    "produto": numeroAleatorio
                }

                let r2 = await axios.get(`${API_URL}/corleone/usuario/carrinho/verificar/${user.cliente}/${user.produto}`)
                let verificar2 = r2.data

                if (verificar2.length === 0) {

                    let user = {
                        "produto": numeroAleatorio,
                        "cliente": usuario.id,
                        "disponivel": true,
                        "qtd": 1
                    }

                    let resposne = await axios.post(API_URL+'/corleone/usuario/carrinho', user)

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
    };


    return (


        <div className='recomendacao '>

            <img className='recomendacao-comida-img' src={`${api.getUri()}/${props.recomendacao?.imagem}`} />

            <div className='recomendacao-lateral' >


                <div>
                    <div>
                        <h3 className='name'>{props.recomendacao.nome}</h3>
                    </div>
                    <div className='estrela'>
                        <h4>{media}</h4>
                        <img src={estrela} />
                    </div>

                </div>

                <div className='circulo-carinho' onClick={() => carrinhoo()}>

                    <img src={carinho} />
                </div>
            </div>

            {isModalOpen && <Modal onClose={() => setModalOpen(false)} />}


        </div>



    )
}