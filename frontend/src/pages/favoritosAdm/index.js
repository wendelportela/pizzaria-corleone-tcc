import './index.scss'
import CompAtalhosAdm from "../../components/compAtalhosAdm"
import Lupa from '../../assets/images/pictures/lupa 1.png'
import Carrinho from '../../assets/img/carrinho.png'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import axios from 'axios'

import { API_URL } from '../../config/constants'

export default function Favoritos() {
    const navigate = useNavigate();

    const [favorito, Setfavorito] = useState()
    const [tdsFavoritos, setTdsFavoritos] = useState([])
    const [selecao, setSelecao] = useState('');

    const api = axios.create({
        baseURL: API_URL
    })

    useEffect(() => {
        ListarFavoritos();

    }, [])

    async function ListarFavoritos() {
        const r = await axios.get(`${API_URL}/corleone/produtos/favoritos/listar/ranked`)
        setTdsFavoritos(r.data)
    }

    const handleSelecaoChange = (event) => {
        const valorSelecionado = event.target.value;
        if (valorSelecionado === 'carrinho') {
            navigate('/ADM/carrinho');
        } else if (valorSelecionado === 'favoritos') {
            navigate('/favoritos');
        }
    };




    return (
        <div className='pagina-favoritos'>
            <CompAtalhosAdm />

            <div className='container-favoritos'>

                <div className='cabecalho-favoritos'>
                    <h1>Clientes</h1>
                </div>

                <div className='subtitulo-favoritos'>
                    <h1>Favoritos</h1>
                </div>




                <div className='conteudo-favoritos'>

                    <div className='principal-favorito'>
                        <div className='favorito-buscar'>

                            <div className="buscar">
                                <div ><img src={Lupa} /></div>
                                <input type="text" placeholder="busque por nome do produto" value={favorito} onChange={e => Setfavorito(e.target.value)} /*onKeyDown={handleKeyPress}*/ />
                            </div>

                            <div className="parte-filtros-carrinho">
                                <label htmlFor="carrinho"></label>
                                <select id="carrinho" onChange={handleSelecaoChange} value={selecao}>
                                    <optgroup label="Ordenar">
                                        <option value="favoritos">Favoritos</option>
                                        <option value="carrinho">Carrinho</option>

                                    </optgroup>
                                </select>
                            </div>



                        </div>



                        <table className='tabela-favoritos'>
                            <thead>
                                <tr>
                                    <th>imagem</th>
                                    <th>Contagem de Favoritos</th>
                                    <th>produto</th>

                                </tr>
                            </thead>

                            <tbody>


                                {tdsFavoritos.map(item =>
                                    <tr className="cada-linha">
                                        <td><img src={`${api.getUri()}/${item.imagem}`} /></td>
                                        <td>{item.qtd_favoritos}</td>
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