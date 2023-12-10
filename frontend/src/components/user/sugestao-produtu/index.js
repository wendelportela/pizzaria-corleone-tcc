import './index.scss'
import Star from '../../../assets/images/icons/star_icon.svg'
import Margherita from '../../../assets/images/pictures/margherita.png';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { API_URL } from '../../../config/constants';
export default function  Sugestao(props){

    const api = axios.create({
        baseURL: API_URL
    })
    
    const [ verificar   , setVerificar ]  = useState([]) 
    const  id = props.produto.id

    let usuario = JSON.parse(localStorage.getItem('usuario-logado'))
   
useEffect(()=>{

    async function fetchData(){
        let usuario = JSON.parse(localStorage.getItem('usuario-logado'));
        let user = {
            "cliente":usuario.id,
            "produto":id
        }
          
        let r = await axios.get(API_URL + `/corleone/usuario/carrinho/verificar/${user.cliente}/${user.produto}`)
        setVerificar(r.data)  ;
    };
    fetchData();

},[verificar]);
  

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
                           
                    }
                    else{
                        const idcarrinho = item.id_carrinho
        
                        let user  = {
                            "disponivel":true,
                            "qtd": 1,
                            "idcarrinho": idcarrinho
                        }
                        let respo = await axios.put(API_URL + '/corleone/usuario/carrinho/editar',user)
                    
                    }
              }
      
          

         else{
            let user = {
                "cliente":usuario.id,
                "produto":id
            }

            let r2 = await axios.get(API_URL + `/corleone/usuario/carrinho/verificar/${user.cliente}/${user.produto}`)
            let verificar2 = r2.data

                if(verificar2.length === 0 ){

                    let user = {
                        "produto":id,
                        "cliente":usuario.id,
                        "disponivel":true,
                        "qtd":1
                       }

                    let resposne = await axios.post(API_URL + '/corleone/usuario/carrinho',user)
               
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
 };




    return(
       <div className='com-sugestao'>
           
           <img src={`${api.getUri()}/${props.produto.imagem}`} />
           
           
               <p>{props.produto.nome}</p>

          

           <div>
                <h4> R${props.produto.preco}</h4>
                <div>
                        <img src={Star}/>
                        <p>{  props.produto.media !== null ? props.produto.meida : 0}</p>
                </div>
           </div>

           <button onClick={carrinho}> Adicionar</button>
           
       </div>
    )
}