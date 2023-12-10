import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import './index.scss'
import '../../../assets/config/fonts-config.scss'

import Pizza from '../../../assets/img/descricao.png';
import comida from '../../../assets/img/document 1.png'
import Voltar from '../../../assets/img/seta-esquerda.png'
import estrela from '../../../assets/img/star_77949 1.png'
import carrinho from '../../../assets/img/shopping-cart (1) 1.png'
import duplaestrela from '../../../assets/img/image 52.png'
import coracao from '../../../assets/img/Union (1).png'
import estrelabranca from '../../../assets/img/Vector (14).png'


import Recomendacoes from '../recomendacoes/index';
import Cabecalho from '../../user/cabecalho';
import Comentarios from '../comentario/index';
import Modal from '../../user/modal'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../../../config/constants';

export default function Informacoes(props) {

    const [estrela1, setEstrela1] = useState(true)
    const [estrela2, setEstrela2] = useState(true)
    const [estrela3, setEstrela3] = useState(true)
    const [estrela4, setEstrela4] = useState(true)
    const [estrela5, setEstrela5] = useState(true)

    const [produto, setProduto] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);

    // comentario do produto
    const [comentarioo, setComentarioo] = useState([])
    const [qtdComentario, setQtdComentario] = useState(6)

    const [digitado, setDigitado] = useState('')
    const [vizu, setVizu] = useState(true)
    const [resultado, setResultado] = useState(0)

    const [cadastroAtv, setCadastroAtv] = useState(false)

    const { id } = useParams();


    const [verificar, setVerificar] = useState([])

    const [sugestao, setSugestao] = useState([]);
    const [numeroAleatorio, setNumeroAleatorio] = useState(null);
  
    useEffect(() => {
      ListarSugestao();
    }, []); 
  
    async function ListarSugestao() {
      try {
        const novoNumero = Math.floor(Math.random() * 8) + 1;
        console.log(`Número aleatório gerado: ${novoNumero}`);
        setNumeroAleatorio(novoNumero);
  
        const r = await axios.get(`${API_URL}/corleone/sugestao/pizza/${novoNumero}`);
        console.log(r.data);
        setSugestao(r.data);
      } catch (error) {
        console.error('Erro ao listar sugestões:', error);
      }
    }
    

    ///////////////////////////////////////////

    const api = axios.create({
        baseURL: API_URL
    })

    let usuario = JSON.parse(localStorage.getItem('usuario-logado'))

    useEffect(() => {

        async function fetchData() {
            let usuario = JSON.parse(localStorage.getItem('usuario-logado'));

            if (usuario != null) {
                let user = {
                    "cliente": usuario.id,
                    "produto": id
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
                    "produto": id
                }

                let r2 = await axios.get(`${API_URL}/corleone/usuario/carrinho/verificar/${user.cliente}/${user.produto}`)
                let verificar2 = r2.data

                if (verificar2.length === 0) {

                    let user = {
                        "produto": id,
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



    // id cliente
    const [idc, setIdc] = useState(0)



    function alterar() {
        setEstrela1(!estrela1)

    }
    function alterar2() {
        setEstrela2(!estrela2)
        if (estrela2)
            setEstrela1(false)
    }
    function alterar3() {

        setEstrela3(!estrela3)
        if (estrela3)
            setEstrela1(false)
        setEstrela2(false)
    }
    function alterar4() {

        setEstrela4(!estrela4)

        if (estrela) {
            setEstrela1(false)
            setEstrela2(false)
            setEstrela3(false)
        }
    }
    function alterar5() {

        setEstrela5(!estrela5)

        if (estrela5) {
            setEstrela1(false)
            setEstrela2(false)
            setEstrela3(false)
            setEstrela4(false)
        }
    }



    useEffect(() => {
        async function listar() {
            const response = await axios.get(API_URL +'/produto/listar/' + id);
            setProduto(response.data);
        }

        listar();
    }, [id, digitado]);

    useEffect(() => {
        comentario()
    }, [comentarioo, digitado])

    async function comentario() {

        const respo = await axios.get(API_URL+'/listar/comentario/' + id);
        if (respo.data == '') {
            setVizu(false)
        }
        else {
            setComentarioo(respo.data);
            setVizu(true);
        }


    }

    function ttt(novoValor) {
        setCadastroAtv(novoValor);
    }




    async function media(estrelas) {

        try {
            let qtd = 0;

            if (comentarioo.length > 0) {
                qtd = comentarioo.reduce((total, item) => total + item.avaliacao, 0);
            }

            let total = qtd + estrelas;
            let avl = comentarioo.length + 1;

            let media = { media: (total / avl).toFixed(1) }



            if (comentarioo.length > 0) {
                const resp = await axios.put(API_URL+'/media/' + id, media)
                toast.error(resp.data.err)
                console.log('1media:' + media.media)
            }
            else {
                const valor = {
                    id: id,
                    media: media.media,
                };

                const resp = await axios.post(API_URL+'/media', valor);
                toast.error(resp.data.error);
                console.log('2media:' + media)

            }

        } catch (error) {
            console.error(error);
        }
    }




    async function inserircomentario() {
        setCadastroAtv(false)
        try {

            let erro = [];
            const palavras = ['merda', 'porra', 'puta', 'carralho', 'crl', 'cu', 'tmnc', 'vaca', 'buceta', 'mama', 'arrombado', 'descraça'];

            for (let cont of palavras) {
                if (digitado.includes(cont)) {
                    erro.push(cont);
                    break;
                }
            }

            if (erro.length === 0) {
                let estrelas = 0

                if (estrela5 == false) {
                    estrelas = 5
                }
                else {
                    if (estrela4 == false) {
                        estrelas = 4
                    }
                    else {
                        if (estrela3 == false) {
                            estrelas = 3
                        }
                        else {
                            if (estrela2 == false) {
                                estrelas = 2
                            }
                            else {
                                if (estrela1 == false) {
                                    estrelas = 1
                                }
                                else {
                                    estrelas = 6
                                }
                            }
                        }
                    }
                }

                let usuario = localStorage.getItem('usuario-logado');
                usuario = JSON.parse(usuario);


                let comen = {
                    comentario: digitado,
                    id: id,
                    cliente: usuario.id,
                    avaliacao: estrelas
                }


                media(estrelas)

                if (digitado.length > 0) {
                    if (estrelas === 0 || estrelas === 6) {
                        toast.error('É necessario avaliar o comentario ')
                    }
                    else {
                        const resp = await axios.post(API_URL+'/comentario', comen);
                        setDigitado('');
                        setEstrela1(true)
                        setEstrela2(true)
                        setEstrela3(true)
                        setEstrela4(true)
                        setEstrela5(true)
                    }


                }

            } else {
                toast.info("Não permitimos palavras ofensivas no nosso site");
                setDigitado('')

            }
        } catch (error) {
            if (!localStorage.getItem('usuario-logado')) {
                setCadastroAtv(true)
                toast.error('Impossivel comentar, favor se cadastrar ou realizar login no nosso site')

            }
        }


    }



    return (
        <motion.div 
            className='informacoes'
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0 , opacity: 1 }}
            exit={{ x: 100, opacity: 0 }} 
            transition={{ duration: 0.5 }} 
        >
            <Cabecalho cadastro={cadastroAtv} funcao={ttt} />
            <div className='informacoes-titulo'>
                {produto.map((item) => (
                    <h1>{item.nome}</h1>
                ))}
            </div>
            <div className='secao-01-voltar'>
                <img src={Voltar} alt="Voltar" />
                <Link className='link' to='/cardapio'>Voltar</Link>
            </div>

            <div className='secao-01-pizza'>
                <div className='secao-01-superior'>
                    {produto.map((item) => (
                        <img src={`${api.getUri()}/${item.imagem}`} alt="Pizza" />
                    ))}
                    

                    <div className='secao-01-parte-lateral'>
                        <div className='secao-01-parte-lateral-pizza'>

                            {produto.map((item) => (
                                <h1> {item.nome}</h1>
                            ))}
                            {produto.map((item) => (
                                <h2> {item.preço}</h2>
                            ))}

                            <div className='estrela'>
                                {produto.map((item) => (
                                    <h2>{item.media !== null ? item.media : 0}</h2>
                                ))}
                                <img src={estrela} alt="Estrela" />
                            </div>
                        </div>

                        <div className='space'>
                            <div className='button-01' onClick={carrinhoo}>
                                <img src={carrinho} alt="Carrinho" />
                                <p>Adicione ao carrinho</p>
                            </div>
                            <div className='button-02' onClick={() => {
                                window.scrollTo(0, 500);
                            }}>
                                <img src={duplaestrela} alt="Dupla Estrela" />
                                <p>Avalie nosso serviço</p>
                            </div>
                        </div>
                        <h4>Você talvez gostaria</h4>
                        {sugestao.map((item) => 
                                <Recomendacoes recomendacao={{ nome: item.produto, imagem: item.imagem }} />
                        )}
                        
                    </div>
                </div>

                <div className='secao-01-inferior'>
                    <div>
                        <p className='foco'>Descrição</p>
                        {produto.map((item) => (
                            <p>{item.descricao}</p>
                        ))}
                    </div>
                    <div className='lineDivisor' />
                    <div>
                        <p className='foco'>Ingredientes</p>
                        {produto.map((item) => (
                            <p>{item.ingredientes}</p>
                        ))}
                    </div>
                </div>

            </div>
            <div className='secao-informacao-avaliacao'>
                <h1>Avaliações</h1>
                <div className='secao-informacao-avaliacao-input'>
                    <input placeholder='Digite sua mensagem' value={digitado} onChange={(e) => setDigitado(e.target.value)} />
                    <div>
                        <img src={estrela1 ? estrelabranca : estrela} alt="Estrela Branca" onClick={alterar} />
                        <img src={estrela2 ? estrelabranca : estrela} alt="Estrela Branca" onClick={alterar2} />
                        <img src={estrela3 ? estrelabranca : estrela} alt="Estrela Branca" onClick={alterar3} />
                        <img src={estrela4 ? estrelabranca : estrela} alt="Estrela Branca" onClick={alterar4} />
                        <img src={estrela5 ? estrelabranca : estrela} alt="Estrela Branca" onClick={alterar5} />
                    </div>
                    <button onClick={inserircomentario}>Enviar</button>
                </div>
                <div className='secao-informacao-avaliacao-comentario'>
                    {vizu ? (
                        <>
                            {comentarioo
                                .filter((item, index) => index < qtdComentario)
                                .map((item) => (
                                    <Comentarios usuario={{ nome: item.cliente, comentario: item.Comentario, avaliacao: item.avaliacao }} />
                                ))}
                            {comentarioo.length >= qtdComentario ? <button onClick={() => setQtdComentario(qtdComentario + 6)}>Ver Mais</button> : null}
                        </>
                    ) : (
                        <div className='vizu'>
                            <h3>Este produto não possui nenhum comentário. Seja o primeiro a comentar...</h3>
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && <Modal onClose={() => setModalOpen(false)} />}
        </motion.div>
    )
}
