import './index.scss'
import '../../assets/config/fonts-config.scss'

import Seta from '../../assets/images/icons/seta_icon.svg'
import Lupa from '../../assets/images/icons/lupa.png'
import carregando from '../../assets/images/carregando.png'

import Transition from '../transition/transition'

import Cabecalho from '../../components/user/cabecalho'
import CardProduct from '../../components/user/cardProduct'
import CardProduto from '../../components/user/card-produto'
import Rodape from '../../components/user/rodape'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify'

import { API_URL } from '../../config/constants'

export default function Cardapio() {

    const location = useLocation();
    const filtroUrl = new URLSearchParams(location.search).get('filtro');


    const [produto, setProduto] = useState([]);

    const [cadastroAtv, setCadastroAtv] = useState(false);

    const [mostrar, setMostrar] = useState(true);

    //CONTROLADOR FILTRO LATERAL
    const [qtdAtv, setQtdAtv] = useState(0);
    const [vegano, setVegano] = useState(false);
    const [intoleranteOvo, setIntoleranteOvo] = useState(false);
    const [intoleranteGluten, setIntoleranteGluten] = useState(false);
    const [intoleranteLactose, setIntoleranteLactose] = useState(false);

    //FILTRO PESQUISA NOME
    const [pesquisa, setPesquisa] = useState('')

    //ORDENAR POR
    const [orderBy, setOrderBy] = useState(null)

    //CONTROLADOR FILTRO SUPERIOR
    const [pizzasAtv, setPizzasAtv] = useState(true)
    const [bebidasAtv, setBebidasAtv] = useState(false)
    const [sobremesaAtv, setSobremesaAtv] = useState(false)
    const [vegetarianaAtv, setVegetarianasAtv] = useState(false)

    //paginação
    const [paginaAtual, setPaginaAtual] = useState(1)
    const [itensPorPagina, setItensPorPagina] = useState(6)
    const [pages, setPages] = useState([])

    //USER id
    const [idUsuario, setIdUsuario] = useState(0);

    // api url 
    const api = axios.create({
        baseURL: API_URL
    })

    //comprados do cliente
    const [compras, setCompras] = useState([])


    useEffect(() => {
       setPaginaAtual(1);
    },[vegano, intoleranteOvo, intoleranteGluten, intoleranteLactose])

    useEffect(() => {
        async function fetchData() {
            try {
                let response = await axios.get(API_URL + `/comprados/usuario?id=${idUsuario}`)
                response = response.data
                console.log(response)
                setCompras(response)
                
            } catch (err) {
            }
        }
        fetchData()
    }, [idUsuario])

    useEffect(() => {
        setPages([])
        let novoArray = []
        for (let cont = 1; cont <= Math.ceil(produto.length / itensPorPagina); cont++) {
            novoArray.push(cont);
        }
        setPages([...novoArray])
    }, [produto])

    useEffect(() => {
        buscar()
    }, [pesquisa, vegano, intoleranteGluten, intoleranteOvo, intoleranteLactose, pizzasAtv, sobremesaAtv, bebidasAtv, vegetarianaAtv, orderBy])

    useEffect(() => {
        if (produto.length > 0) {
            setMostrar(true)
        }
        else if (produto.length == 0) {
            setMostrar(false)
        }
    }, [produto])

    useEffect(() => {
        let usuario = localStorage.getItem('usuario-logado');
        if (usuario != null) {
            usuario = JSON.parse(usuario);
            setIdUsuario(usuario.id);
        }
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        controladorFiltroSuperior(filtroUrl)
    }, [filtroUrl])

    const ultimoCartao = paginaAtual * itensPorPagina
    const primeiroCartao = ultimoCartao - itensPorPagina
    const cartoesAtuais = produto.slice(primeiroCartao, ultimoCartao)

    function controladorFiltroSuperior(value) {
        if (value === 'p') {
            setPizzasAtv(true)
            setBebidasAtv(false)
            setSobremesaAtv(false)
            setVegetarianasAtv(false)
        }
        else if (value === 'b') {
            setPizzasAtv(false)
            setBebidasAtv(true)
            setSobremesaAtv(false)
            setVegetarianasAtv(false)
        }
        else if (value === 's') {
            setPizzasAtv(false)
            setBebidasAtv(false)
            setSobremesaAtv(true)
            setVegetarianasAtv(false)
        }
        else if (value === 'v') {
            setPizzasAtv(false)
            setBebidasAtv(false)
            setSobremesaAtv(false)
            setVegetarianasAtv(true)
        }
    }


    async function buscar() {
        console.log(orderBy)
        let tipoComida = '';

        if (pizzasAtv) {
            tipoComida = 'salgado';
        }
        else if (vegetarianaAtv) {
            tipoComida = 'vegetariano';
        }
        else if (bebidasAtv) {
            tipoComida = 'bebida';
        }
        else if (sobremesaAtv) {
            tipoComida = 'sobremesa';
        }

        const restricoesAtivas = [];

        if (vegano)
            restricoesAtivas.push('vegano');
        if (intoleranteOvo)
            restricoesAtivas.push('ovo');
        if (intoleranteGluten)
            restricoesAtivas.push('gluten');
        if (intoleranteLactose)
            restricoesAtivas.push('leite');

        let restricao_1 = restricoesAtivas[0]
        let restricao_2 = restricoesAtivas[1]

        restricao_1 = restricao_1 ? restricao_1 : '%'
        restricao_2 = restricao_2 ? restricao_2 : '%'

        // Execute a chamada à API
        let response = await axios.get(`${API_URL}/produto/consulta/cardapio?tp=${tipoComida}&restricao_1=${restricao_1}&restricao_2=${restricao_2}&nm=${pesquisa ? pesquisa : '%'}&orderby=${orderBy}`);

        response = response.data

        setProduto(response)
    }

    const altPag = (num) => {
        if (num == 'ant') {
            setPaginaAtual(paginaAtual - 1)
            window.scrollTo({
                top: 400,
                behavior: 'smooth',
            })
        }
        else if (num == 'pro') {
            setPaginaAtual(paginaAtual + 1)
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        else {
            setPaginaAtual(num)
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    const sideFilter = (value) => {
        if (value === 'v') {
            vegano ? setQtdAtv(qtdAtv - 1) : setQtdAtv(qtdAtv + 1)
            setVegano(!vegano)
        }
        else if (value === 'l') {
            intoleranteLactose ? setQtdAtv(qtdAtv - 1) : setQtdAtv(qtdAtv + 1)
            setIntoleranteLactose(!intoleranteLactose)
        }
        else if (value === 'o') {
            intoleranteOvo ? setQtdAtv(qtdAtv - 1) : setQtdAtv(qtdAtv + 1)
            setIntoleranteOvo(!intoleranteOvo)
        }
        else if (value === 'g') {
            intoleranteGluten ? setQtdAtv(qtdAtv - 1) : setQtdAtv(qtdAtv + 1)
            setIntoleranteGluten(!intoleranteGluten)
        }
    }

    const favorito = async () => {
        try {

        } catch (err) {
            if (idUsuario == 0) {
                setCadastroAtv(true)
                toast.error('Impossivel favoritar produto, favor se cadastrar ou realizar login no nosso site');
            }
        }
    }

    function ttt(novoValor) {
        setCadastroAtv(novoValor);
    }

    return (
        <Transition>
            <main className='cardapio'>
                <Cabecalho cadastro={cadastroAtv} funcao={ttt} />
                <div className='cima'>
                    <div className={`fpizza ${pizzasAtv ? 'prop' : 'notSelect'}`} onClick={() => controladorFiltroSuperior('p')}>
                        <h1>Pizzas</h1>
                    </div>
                    <div className={`fsobremesas ${sobremesaAtv ? 'prop' : 'notSelect'}`} onClick={() => controladorFiltroSuperior('s')}>
                        <h1>Sobremesas</h1>
                    </div>
                    <div className={`fbebida ${bebidasAtv ? 'prop' : 'notSelect'}`} onClick={() => controladorFiltroSuperior('b')}>
                        <h1>Bebidas</h1>
                    </div>
                    <div className={`fvegetariana ${vegetarianaAtv ? 'prop' : 'notSelect'}`} onClick={() => controladorFiltroSuperior('v')}>
                        <h1>Vegetarianas</h1>
                    </div>
                </div>


                <div className='meio'>
                    <div className='esquerda'>
                        <div className='filtro-nome'>
                            <input placeholder='Digite e aperte enter...' value={pesquisa} onChange={(e) => setPesquisa(e.target.value)}></input>
                            <img alt='lupa' onClick={buscar} src={Lupa} />
                        </div>

                        <div className='ordenado'>
                            <p>Ordenar por: </p>
                            <div>
                                <select onChange={(e) => setOrderBy(e.target.value)}>
                                    <option value='null'>Nenhum parâmetro</option>
                                    <option value="4">Melhores avaliações</option>
                                    <option value="3">Novidades</option>
                                    <option value="1">Opções Familia</option>
                                    <option value="2">Opções Sofisticadas</option>
                                </select>
                            </div>
                        </div>

                        <div className='restricoes'>
                            <div className='restricoesFiltro'>
                                <input type='radio' value={vegano} onClick={() => sideFilter('v')} disabled={qtdAtv === 2 && !vegano} checked={vegano} />
                                <p>Vegano</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="228" height="1" viewBox="0 0 228 1" fill="none">
                                <path d="M0.566895 0.5H226.98" stroke="black" stroke-linecap="round" />
                            </svg>

                            <div className='restricoesFiltro'>
                                <input type='radio' value={intoleranteOvo} onClick={() => sideFilter('o')} disabled={qtdAtv === 2 && !intoleranteOvo} checked={intoleranteOvo} />
                                <p>Intolerante a Ovo</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="228" height="1" viewBox="0 0 228 1" fill="none">
                                <path d="M0.566895 0.5H226.98" stroke="black" stroke-linecap="round" />
                            </svg>

                            <div className='restricoesFiltro'>
                                <input type='radio' value={intoleranteGluten} onClick={() => sideFilter('g')} disabled={qtdAtv === 2 && !intoleranteGluten} checked={intoleranteGluten} />
                                <p>Intolerante a Glúten </p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="228" height="1" viewBox="0 0 228 1" fill="none">
                                <path d="M0.566895 0.5H226.98" stroke="black" stroke-linecap="round" />
                            </svg>

                            <div className='restricoesFiltro'>
                                <input type='radio' value={intoleranteLactose} onClick={() => sideFilter('l')} disabled={qtdAtv === 2 && !intoleranteLactose} checked={intoleranteLactose} />
                                <p>Intolerante a Lactose</p>
                            </div>



                        </div>

                        {compras.length > 0 &&
                            <>
                                <h1>Compre Novamente</h1>

                                {compras.slice(0, 4).map((compra, index) => (
                                    <CardProduct key={index} produto={compra.id_produto} />
                                ))}
                            </>
                        }




                    </div>


                    <div className='direitinha'>
                        <div className='direitaMeio'>
                            {mostrar ? cartoesAtuais.map((item) => (
                                <div>
                                    <CardProduto
                                        produto={{
                                            nome: item.nome,
                                            preco: item.preço,
                                            imagem: item.imagem,
                                            id: item.ID,
                                            media: item.media,
                                            tipo: item.tipo
                                        }}
                                    />
                                </div>

                            )) : <div className='not'>
                                <h1> <img src={carregando} />Produto não encontrado</h1>
                            </div>}

                        </div>

                        <div className='pagination'>
                            {mostrar ? (
                                <div className='paginacao'>
                                    {paginaAtual > 1 ? (
                                        <button className='proximo' onClick={() => altPag('ant')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="19" viewBox="0 0 25 19" fill="none">
                                                <path d="M1.5 9.5H23M23 9.5L13.561 1.5M23 9.5L13.561 17.5" stroke="#53220D" stroke-width="2" stroke-linecap="round" transform="rotate(180, 12.5, 9.5)" />
                                            </svg>
                                            <p>Anterior</p>
                                        </button>
                                    ) : (
                                        <button className='negado'>
                                            <p>Anterior</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="19" viewBox="0 0 25 19" fill="none">
                                                <path d="M1.5 9.5H23M23 9.5L13.561 1.5M23 9.5L13.561 17.5" stroke="#8d8d8d" stroke-width="2" stroke-linecap="round" transform="rotate(180, 12.5, 9.5)" />
                                            </svg>
                                        </button>
                                    )}

                                    <div className='bolotas'>
                                        {pages.map(item => (
                                            <div className={item === paginaAtual ? 'marrom' : 'circulo'} key={item} onClick={() => altPag(item)}>
                                                {item}
                                            </div>
                                        ))}
                                    </div>

                                    {paginaAtual < pages.length ? (
                                        <button className='proximo' onClick={() => altPag('pro')}>
                                            <p>Próximo</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="19" viewBox="0 0 25 19" fill="none">
                                                <path d="M1.5 9.5H23M23 9.5L13.561 1.5M23 9.5L13.561 17.5" stroke="#53220D" stroke-width="2" stroke-linecap="round" />
                                            </svg>
                                        </button>
                                    ) : (
                                        <button className='negado'>
                                            <p>Próximo</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="19" viewBox="0 0 25 19" fill="none">
                                                <path d="M1.5 9.5H23M23 9.5L13.561 1.5M23 9.5L13.561 17.5" stroke="#8d8d8d" stroke-width="2" stroke-linecap="round" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
                <Rodape />
            </main>
        </Transition>
    )
}