import './index.scss'
import SetaEsquerda from '../../../assets/img/seta-esquerda.png'
import CompAtalhosAdm from "../../../components/compAtalhosAdm"
import Lupa from '../../../assets/images/pictures/lupa 1.png'
import Coracao from '../../../assets/img/coracao 2.png'

import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import { API_URL } from '../../../config/constants'





export default function Carrinhodecompras() {
    const navigate = useNavigate()
   

    const { id } = useParams();

    const [tdscarrinhos, setTdscarrinhos] = useState([])
    const [telaAtiva, setTelaAtiva] = useState('favoritos');
    const [buscarNome, setBuscarnome] = useState('')
    const [selecao, setSelecao] = useState('');




    const api = axios.create({
        baseURL: API_URL
    })

    async function ListarCarrinho(idCliente) {
        const r = await axios.get(`${API_URL}/corleone/usuario/carrinho/listar/sem/${idCliente}`);
        setTdscarrinhos(r.data);
    }





    useEffect(() => {
        if (buscarNome.length > 0) {
            ListarnomeCarrinho()
        } else {
            ListarCarrinho(id)
        }
    }, [buscarNome, id])


    console.log(id)

    async function ListarnomeCarrinho() {
        const r = await axios.get(`${API_URL}/corleone/usuario/carrinho/verificar/${id}/produto/${buscarNome}`)
        const resp = r.data
        console.log(resp)
        setTdscarrinhos(r.data)
       

    }

    const handleVoltar = () => {
       
        navigate(`/clienteadmmaisdetalhe/${id}`);
      };



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

    useEffect(() => {
        // Use localStorage para verificar se o usuário está logado
        if (!localStorage.getItem('adm-logado')) {
            navigate('/associado');
        }
    }, []);




    /* const handleKeyPress = (e) => {
         if (e.key === 'Enter') {
             e.preventDefault(); 
             buscarProdutos(); 
           }
       }
 */



    return (
        <section className="pagina-carrinho">
            <CompAtalhosAdm />
            <div className="container-carrinho">
                <div className='cabecalho-carrinho'>
                    <h1>Clientes</h1>
                </div>

                <div className='subtitulo-carrinho'>
                    <h1>Carrinho de Compras</h1>

                    <div onClick={handleVoltar}>
                       
                        <p className='p'>voltar</p>
                    </div>

                    
                </div>


                <div className="conteudo-carrinho">
                    <div className="principal-carrinho">

                        <div className='carrinho-buscar'>
                            <div className="buscar">
                                <div ><img src={Lupa} /></div>
                                <input type="text" placeholder="Busque por nome do produto" value={buscarNome} onChange={e => setBuscarnome(e.target.value)} />




                            </div>

                            <div className="parte-filtros-carrinho">
                                <label htmlFor="carrinho"></label>
                                <select id="carrinho" onChange={handleSelecaoChange} value={selecao}>
                                    <optgroup label="Ordenar">
                                        <option value="carrinho">Carrinho</option>
                                        <option value="favoritos">Favoritos</option>
                                        <option value="pagamento">Cartão</option>
                                    </optgroup>
                                </select>
                            </div>

                        </div>





                        <table className='tabela-carrinho'>
                            <thead>
                                <tr>
                                    <th>imagem</th>
                                    <th>produto</th>
                                    <th>Removido</th>
                                    <th>adicionado</th>
                                </tr>
                            </thead>


                            <tbody>

                                {tdscarrinhos.map(item =>
                                    <tr className="cada-linha" key={item.id_carrinho}>
                                        <td><img src={`${api.getUri()}/${item.imagem}`} alt={item.produto} /></td>
                                        <td>{item.produto}</td>
                                        <td>
                                            {item.carrinho === 'indisponivel' ? (
                                                <div className='removido'></div>
                                            ) : (
                                                <div className='tracinhos'>--</div>
                                            )}
                                        </td>
                                        <td>
                                            {item.carrinho === 'disponivel' ? (
                                                <div className='adicionado'></div>
                                            ) : (
                                                <div className='tracinhos'>--</div>
                                            )}
                                        </td>
                                    </tr>
                                )}



                            </tbody>
                        </table>
                    </div>







                </div>
            </div>








        </section>
    )
}
