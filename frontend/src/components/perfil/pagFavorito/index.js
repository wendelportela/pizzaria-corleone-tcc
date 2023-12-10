import React, { useEffect, useState } from 'react'
import CardFavorito from '../cardfavorito'
import './index.scss'
import carregando from '../../../assets/images/carregando.png'
import axios from 'axios'
import { toast } from 'react-toastify'

import { API_URL } from '../../../config/constants'

export default function PagFavorito() {
    //controlador se vai mostrar os card's ou expressar sua ausência
    const [mostrar, setMostrar] = useState(true)

    //listagem dos produtos favoritos do cliente
    const [produtosFav, setProdutosFav] = useState([])

    useEffect(() => {
        console.log(produtosFav)
    },[produtosFav])


    useEffect(() => {
        try {
            async function BuscarFavoritos() {
                const response = await axios.get(`${API_URL}/corleone/produtos/favoritos/usuario/${usuario.id}`);
                console.log(response.data);
                setProdutosFav(response.data);
            }

            let usuario = localStorage.getItem('usuario-logado');
            usuario = JSON.parse(usuario);

            BuscarFavoritos();
        } catch (err) {
            toast.error('Algo deu errado');
        }
    }, []);




    return (
        <div className="PagFavorito">
            {produtosFav && produtosFav.length > 0 ? (
                produtosFav.map((item) => (
                    <React.Fragment key={item.id_produto}>
                        <CardFavorito
                            produto={{
                                nome: item.produto,
                                preco: item.preco,
                                imagem: item.imagem,
                                idProduct: item.idproduto,
                                idFavorito: item.id_favorito,
                                media: item.media,
                                ingredientes: item.ingredientes,
                                imagem: item.imagem
                            }}
                        />
                    </React.Fragment>
                ))
            ) : (
                <div className='not'>
                    <h1> <img src={carregando} />Nenhum produto marcado como favorito ainda</h1>
                </div>
            )}
        </div>


    )
}
