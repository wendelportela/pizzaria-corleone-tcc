import './index.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'

import carregando from '../../../assets/images/carregando.png'
import Cardhistorico from '../cardhistorico'
import { toast } from 'react-toastify'
import { API_URL } from '../../../config/constants'
export default function Historico() {
    const [historico, setHistorico] = useState([])

    useEffect(() => {
       async function fetchData(){
        let response = await axios.get(API_URL + ``)
       } 
    },[])

const [pedido, setPedido] = useState([])

useEffect(()=>{
listarcompras()
},[])

 async function listarcompras (){
    try {
        let us = localStorage.getItem('usuario-logado');
        us = JSON.parse(us)

        const response = await axios.get(`${API_URL}/pedido/status/entregue/${us.id}`)
        setPedido(response.data)
    } catch (error) {
        toast.error(error.message)
    }

 }

    return (
        <div className='fundo'>
            <h1>Historico de compras : </h1>

            {historico.length > 0 ? 
            <div className='cartoesHistorico'>
                {pedido.map((item)=>(
                    <Cardhistorico pedido={{id:item.idpedido, data:item.data,situacao:item.situacao,produtos:item.produtos}} />
                ))}
            </div>
            : <h1 className='pp'> <img src={carregando}/> Você ainda não efetuou nenhuma compra completamente</h1>}
        </div>
    )
}