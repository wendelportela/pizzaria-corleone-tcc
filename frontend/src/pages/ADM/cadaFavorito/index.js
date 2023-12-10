import './index.scss'
import CompAtalhosAdm from "../../../components/compAtalhosAdm"
import Lupa from '../../../assets/images/pictures/lupa 1.png'
import Carrinho from '../../../assets/img/carrinho.png'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import React from 'react'
import axios from 'axios'
import Coracao from '../../../assets/img/Union (1).png'

import { API_URL } from '../../../config/constants'



export default function CadaFavorito() {
    const navigate = useNavigate();

    const [favorito, Setfavorito] = useState()
    const [tdsFavoritos, setTdsFavoritos] = useState([])
    const [nome, setNome] = useState('')
    const [selecao, setSelecao] = useState('');
    const [buscarNome, setBuscarnome] = useState('')
    const { id } = useParams();


    const api = axios.create({
        baseURL: API_URL
    })

    useEffect(() => {
        // Use localStorage para verificar se o usuário está logado
        if (!localStorage.getItem('adm-logado')) {
            navigate('/associado');
        }
    }, []);
    

    useEffect(() => {

        if (buscarNome.length > 0) {
            ListarnomeFavoritos()
        }

        else {
            ListarFavoritos()

        }
        mostrarFavoritosPorNome()
    }, [buscarNome])


    async function ListarFavoritos() {
        const r = await axios.get(`${API_URL}/corleone/produtos/favoritos/usuario/${id}`)
        setTdsFavoritos(r.data)
    }

    async function mostrarFavoritosPorNome(id, buscarNome) {
        try {
            // Modifique a chamada da API para incluir o ID do usuário e o nome do produto
            const response = await axios.get(`${API_URL}/corleone/produtos/favoritos/verificar/${id}/produto/${buscarNome}`);

            // Atualize o estado com a resposta da API
            setTdsFavoritos(response.data);
        } catch (error) {
            console.error("Erro ao buscar favoritos:", error);
        }
    }

    // ...

    useEffect(() => {
        if (buscarNome.length > 0) {
            mostrarFavoritosPorNome(id, buscarNome);
        } else {
            ListarFavoritos(); // Chame a função padrão para listar todos os favoritos
        }
        mostrarFavoritosPorNome();
    }, [buscarNome]);

    const handleVoltar = () => {
       
        navigate(`/clienteadmmaisdetalhe/${id}`);
      };




    async function ListarnomeFavoritos() {
        const r = await axios.get(API_URL + '/corleone/produto/' + buscarNome)
        setTdsFavoritos(r.data)

    }
    const handleSelecaoChange = (event) => {
        const valorSelecionado = event.target.value;
        if (valorSelecionado === 'carrinho') {
            navigate(`/corleone/usuario/carrinho/listar/${id}`);
        } else if (valorSelecionado === 'favoritos') {
            navigate(`/cadafavorito/cliente/${id}`);
        } else if (valorSelecionado === 'pagamento') {
            navigate(`/cartao/listar/${id}`);
        }
    };


    return (
        <div className='pagina-cada-favoritos'>
            <CompAtalhosAdm />

            <div className='container-cada-favoritos'>

                <div className='cabecalho-cada-favoritos'>
                    <h1>Clientes</h1>
                </div>

                <div className='subtitulo-cada-favoritos'>
                    <h1>Favoritos</h1>

                    <div onClick={handleVoltar}>
                       
                       <p className='p'>voltar</p>
                   </div>
                </div>




                <div className='conteudo-cada-favoritos'>

                    <div className='principal-cada-favorito'>

                        <div className='favorito-buscar'>

                            <div className="buscar">
                                <div ><img src={Lupa} /></div>
                                <input type="text" placeholder="busque por nome do produto" value={buscarNome} onChange={e => setBuscarnome(e.target.value)} /*onKeyDown={handleKeyPress}*/ />
                            </div>

                            <div className="parte-filtros-carrinho">
                                <label htmlFor="carrinho"></label>
                                <select id="carrinho" onChange={handleSelecaoChange} value={selecao}>
                                    <optgroup label="Ordenar">
                                        <option value="favoritos">Favoritos</option>
                                        <option value="carrinho">Carrinho</option>
                                        <option value="pagamento">Cartão</option>
                                    </optgroup>
                                </select>
                            </div>

                        </div>

                        {tdsFavoritos.length > 0 && (
                            <div className='titulo-cada-favorito'>
                                <h1>Produtos favoritados pelo cliente {tdsFavoritos[0].cliente}</h1>
                            </div>
                        )}


                        <div className='linha'></div>


                        <table className='tabela-cada-favoritos'>

                            <thead>

                            </thead>

                            <tbody>


                                {tdsFavoritos.map(item =>
                                    <tr className="cada-linha">
                                        <td className='imagem-fav'><img src={`${api.getUri()}/${item.imagem}`} /></td>
                                        <td>{item.produto}</td>
                                    </tr>
                                )}

                            </tbody>
                        </table>

                    </div>






                </div>


            </div>





        </div>
    )
}