import CompAtalhosAdm from "../../../components/compAtalhosAdm"
import Lupa from '../../../assets/images/pictures/lupa 1.png'
import Setaesquerda from '../../../assets/images/pictures/seta-preta 1.png'
import SetaDireita from '../../../assets/images/pictures/setadireita.png'
import Deletar from '../../../assets/images/pictures/deletar.png'
import Editar from '../../../assets/images/pictures/editar.png'
import Setaprabaixo from '../../../assets/images/pictures/setaprabaixo.png'
import axios from "axios"
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { toast, ToastContainer } from 'react-toastify'
import 'react-confirm-alert/src/react-confirm-alert.css';
import React from "react"
// isntalar --> npm i react-confirm-alert --save       
//para parar o erro

import './index.scss'

import { API_URL } from "../../../config/constants"


export default function ListarProdutosAdm() {

    const [filtro, setFiltro] = useState('');
    const [produtos, setProdutos] = useState([])
    const [restricoes, setRestricoes] = useState([])
    const [tipos, setTipos] = useState([])




    const navigate = useNavigate();

    useEffect(() => {
        // Use localStorage para verificar se o usuário está logado
        if (!localStorage.getItem('adm-logado')) {
            navigate('/associado');
        }
    }, []);

    function notifySuccess() {
        toast.success('Produto removido com sucesso!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }



    function entrarAlterar(id) {
        navigate(`/produto/alterar/${id}`)
    }

    useEffect(() => {

        if (filtro.length > 0) {
            buscarProdutos()
        } else {
            Listando();
        }



    }, [filtro])

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            buscarProdutos();
        }
    }




    //fiz algumas alteracoes no back de produtos, que foi colocar no select produto(listar por nome e listar todos) para aparecer o id da restricao tbm


    //alteração no banco de dados, coloquei ON DELETE CASCADE na tabela restricao
    //alteracoes no backend. alteraçoes no restricao e adicionados algumas coisas no produto



    //BUSCAR OU LISTAR OS PRODUTOS
    async function buscarProdutos() {
        const resposta = await axios.get(API_URL + '/produto/' + filtro)
        setProdutos(resposta.data)
    }

    async function Listando() {
        const r = await axios.get(API_URL + '/produto')

        setProdutos(r.data)
    }

    async function buscarPorTipo() {
        const resposta = await axios.get(`${API_URL}/produto/tipos/${tipos}`)
        setProdutos(resposta.data)
    }

    async function buscarPorRestricao() {
        const resposta = await axios.get(`${API_URL}/produto/restricoes/${restricoes}`)
        setProdutos(resposta.data)
    }



    async function apagarProduto(id) {
        try {
            const r = await axios.get(`${API_URL}/produto`);
            const produto = r.data.find(item => item.ID === id);
            console.log(produto)

            if (!produto || !produto.ID === id) {
                alert('Produto não encontrado.');
                return;
            }

            const imagemid = produto.idimagem
            const restricaoId = produto.idrestricao
            const favoritoId = produto.id_favorito
            const carrinhoId = produto.id_carrinho
            const sugestaoId = produto.idsugestao

            console.log(`imagem: ${imagemid}`);
            console.log(`restricao: ${restricaoId}`);
            console.log(`favorito: ${favoritoId}`);
            console.log(`carrinho: ${carrinhoId}`);

            const deletarProduto = async () => {
                try {
                    if (filtro) {
                        await axios.delete(`${API_URL}/produto/${id}`);
                        notifySuccess();


                    } else {
                        await axios.delete(`${API_URL}/produto/${id}`);
                        notifySuccess();
                        Listando();
                    }

                } catch (err) {
                    console.log(err.response.data.erro);
                }
            };

            const deletarSugestao = async () => {
                try {
                    await axios.delete(`${API_URL}/corleone/sugestao/deletar/${sugestaoId}`)
                    deletarProduto()
                } catch (err) {
                    console.log(err.response.data.erro);
                }
            }

            const deletarImagem = async () => {
                try {
                    await axios.delete(`${API_URL}/imagem/deletar/${imagemid}`);
                    deletarProduto();
                } catch (err) {
                    console.log(err.response.data.erro);
                }
            };

            const deletarRestricao = async () => {
                try {
                    await axios.delete(`${API_URL}/restricao/${restricaoId}`);
                    deletarProduto();
                } catch (err) {
                    console.log(err.response.data.erro);
                }
            };

            const deletarFavorito = async () => {
                try {
                    await axios.delete(`${API_URL}/produto/favoritos/deletar/${id}`);
                    deletarProduto();
                } catch (err) {
                    console.log(err.response.data.erro);
                }
            };

            const deletarCarrinho = async () => {
                try {
                    await axios.delete(`${API_URL}/carrinho/deletar/${carrinhoId}`);
                    deletarProduto();
                } catch (err) {
                    console.log(err.response.data.erro);
                }
            };

            confirmAlert({
                title: 'Produto',
                message: 'Tem certeza que deseja apagar esse produto?',
                buttons: [
                    {
                        label: 'Sim', onClick: () => {
                            if (!filtro) {
                                if (!imagemid && !restricaoId && !favoritoId && !carrinhoId && !sugestaoId) {
                                    deletarProduto();
                                }

                                 else if (!imagemid && !favoritoId && !sugestaoId) {
                                    deletarCarrinho()
                                    deletarRestricao()
                                    deletarProduto()
                                }

                                else if (!imagemid && !carrinhoId && !sugestaoId) {
                                    deletarCarrinho()
                                    deletarRestricao()
                                    deletarProduto()
                                }

                                else if (!imagemid && !favoritoId && !carrinhoId && !sugestaoId) {
                                    deletarCarrinho()
                                    deletarRestricao()
                                    deletarProduto()
                                }

                                
                                 else if (!imagemid && !favoritoId) {
                                    deletarCarrinho()
                                    deletarRestricao()
                                    deletarSugestao()
                                    deletarProduto()
                                }
                                else if (!imagemid && !carrinhoId) {
                                    deletarFavorito()
                                    deletarRestricao()
                                    deletarSugestao()
                                    deletarProduto()
                                }
                                else if (!imagemid && !carrinhoId && !favoritoId) {
                                    deletarRestricao()
                                    deletarSugestao()
                                    deletarProduto()
                                }

                                else if (carrinhoId && !imagemid && !restricaoId && !favoritoId && !sugestaoId) {
                                    deletarCarrinho()
                                    deletarProduto()
                                }
                                else if (carrinhoId && !imagemid && !restricaoId && !favoritoId) {
                                    deletarCarrinho()
                                    deletarSugestao()
                                    deletarProduto()
                                }
                                else if (!imagemid && !restricaoId && !favoritoId && !sugestaoId) {
                                    deletarCarrinho()
                                    deletarProduto()
                                }
                                else if (!imagemid && !restricaoId && !favoritoId) {
                                    deletarCarrinho()
                                    deletarSugestao()
                                    deletarProduto()
                                }
                                else if (!imagemid && !restricaoId && !carrinhoId && !sugestaoId) {
                                    deletarFavorito()
                                    deletarProduto()
                                }
                                else if (!imagemid && !restricaoId && !carrinhoId) {
                                    deletarFavorito()
                                    deletarSugestao()
                                    deletarProduto()
                                }
                                else if (favoritoId && !imagemid && !restricaoId && !carrinhoId && !sugestaoId) {
                                    deletarFavorito()
                                    deletarProduto()
                                }
                                else if (favoritoId && !imagemid && !restricaoId && !carrinhoId) {
                                    deletarFavorito()
                                    deletarSugestao()
                                    deletarProduto()
                                }

                                else if (!restricaoId && !favoritoId && !sugestaoId) {
                                    deletarCarrinho()
                                    deletarImagem();
                                    deletarProduto()
                                }
                                else if (!restricaoId && !favoritoId) {
                                    deletarCarrinho()
                                    deletarImagem();
                                    deletarSugestao()
                                    deletarProduto()
                                }
                                else if (!restricaoId && !carrinhoId && !sugestaoId) {
                                    deletarFavorito()
                                    deletarImagem();
                                    deletarProduto()
                                }
                                else if (!restricaoId && !carrinhoId) {
                                    deletarFavorito()
                                    deletarImagem();
                                    deletarSugestao()
                                    deletarProduto()
                                }
                                else if (!restricaoId && !carrinhoId && !favoritoId && !sugestaoId) {
                                    deletarImagem();
                                    deletarProduto()
                                }
                                else if (!restricaoId && !carrinhoId && !favoritoId) {
                                    deletarImagem();
                                    deletarSugestao()
                                    deletarProduto()
                                }
                                else if (!imagemid && !restricaoId && !favoritoId && !sugestaoId) {
                                    deletarCarrinho()
                                    deletarProduto()
                                }
                                else if (!imagemid && !restricaoId && !favoritoId) {
                                    deletarCarrinho()
                                    deletarSugestao()
                                    deletarProduto()
                                }
                                else if (!favoritoId && !carrinhoId && !sugestaoId) {
                                    deletarRestricao()
                                    deletarImagem();
                                    deletarProduto()
                                }
                                else if (!favoritoId && !carrinhoId) {
                                    deletarRestricao()
                                    deletarImagem();
                                    deletarSugestao()
                                    deletarProduto()
                                }
                                else if (!imagemid && !restricaoId && !sugestaoId) {
                                    deletarFavorito()
                                    deletarCarrinho()
                                    deletarProduto();
                                }
                                else if (!imagemid && !restricaoId) {
                                    deletarFavorito()
                                    deletarCarrinho()
                                    deletarSugestao()
                                    deletarProduto();
                                }
                                else if (!imagemid && !sugestaoId) {
                                    deletarRestricao()
                                    deletarFavorito()
                                    deletarCarrinho()
                                    deletarProduto()
                                }
                                else if (!imagemid) {
                                    deletarRestricao()
                                    deletarFavorito()
                                    deletarCarrinho()
                                    deletarSugestao()
                                    deletarProduto()
                                } 
                                else if (!restricaoId && !sugestaoId) {
                                    deletarImagem();
                                    deletarFavorito()
                                    deletarCarrinho()
                                    deletarProduto()
                                }
                                else if (!restricaoId) {
                                    deletarImagem();
                                    deletarFavorito()
                                    deletarCarrinho()
                                    deletarSugestao()
                                    deletarProduto()
                                }
                                
                                
                            } else if (filtro.length > 0) {
                                if (!imagemid && !restricaoId && !favoritoId && !carrinhoId) {
                                    deletarProduto();
                                }                                  else if (!imagemid && !favoritoId && !sugestaoId) {
                                    deletarCarrinho()
                                    deletarRestricao()
                                    deletarProduto()
                                }

                                else if (!imagemid && !carrinhoId && !sugestaoId) {
                                    deletarCarrinho()
                                    deletarRestricao()
                                    deletarProduto()
                                }

                                else if (!imagemid && !favoritoId && !carrinhoId && !sugestaoId) {
                                    deletarCarrinho()
                                    deletarRestricao()
                                    deletarProduto()
                                }

                                
                                 else if (!imagemid && !favoritoId) {
                                    deletarCarrinho()
                                    deletarRestricao()
                                    deletarSugestao()
                                    deletarProduto()
                                }
                                else if (!imagemid && !carrinhoId) {
                                    deletarFavorito()
                                    deletarRestricao()
                                    deletarSugestao()
                                    deletarProduto()
                                }
                                else if (!imagemid && !carrinhoId && !favoritoId) {
                                    deletarRestricao()
                                    deletarSugestao()
                                    deletarProduto()
                                }

                                else if (carrinhoId && !imagemid && !restricaoId && !favoritoId && !sugestaoId) {
                                    deletarCarrinho()
                                    deletarProduto()
                                }
                                else if (carrinhoId && !imagemid && !restricaoId && !favoritoId) {
                                    deletarCarrinho()
                                    deletarSugestao()
                                    deletarProduto()
                                }
                                else if (!imagemid && !restricaoId && !favoritoId && !sugestaoId) {
                                    deletarCarrinho()
                                    deletarProduto()
                                }
                                else if (!imagemid && !restricaoId && !favoritoId) {
                                    deletarCarrinho()
                                    deletarSugestao()
                                    deletarProduto()
                                }
                                else if (!imagemid && !restricaoId && !carrinhoId && !sugestaoId) {
                                    deletarFavorito()
                                    deletarProduto()
                                }
                                else if (!imagemid && !restricaoId && !carrinhoId) {
                                    deletarFavorito()
                                    deletarSugestao()
                                    deletarProduto()
                                }
                                else if (favoritoId && !imagemid && !restricaoId && !carrinhoId && !sugestaoId) {
                                    deletarFavorito()
                                    deletarProduto()
                                }
                                else if (favoritoId && !imagemid && !restricaoId && !carrinhoId) {
                                    deletarFavorito()
                                    deletarSugestao()
                                    deletarProduto()
                                }

                                else if (!restricaoId && !favoritoId && !sugestaoId) {
                                    deletarCarrinho()
                                    deletarImagem();
                                    deletarProduto()
                                }
                                else if (!restricaoId && !favoritoId) {
                                    deletarCarrinho()
                                    deletarImagem();
                                    deletarSugestao()
                                    deletarProduto()
                                }
                                else if (!restricaoId && !carrinhoId && !sugestaoId) {
                                    deletarFavorito()
                                    deletarImagem();
                                    deletarProduto()
                                }
                                else if (!restricaoId && !carrinhoId) {
                                    deletarFavorito()
                                    deletarImagem();
                                    deletarSugestao()
                                    deletarProduto()
                                }
                                else if (!restricaoId && !carrinhoId && !favoritoId && !sugestaoId) {
                                    deletarImagem();
                                    deletarProduto()
                                }
                                else if (!restricaoId && !carrinhoId && !favoritoId) {
                                    deletarImagem();
                                    deletarSugestao()
                                    deletarProduto()
                                }
                                else if (!imagemid && !restricaoId && !favoritoId && !sugestaoId) {
                                    deletarCarrinho()
                                    deletarProduto()
                                }
                                else if (!imagemid && !restricaoId && !favoritoId) {
                                    deletarCarrinho()
                                    deletarSugestao()
                                    deletarProduto()
                                }
                                else if (!favoritoId && !carrinhoId && !sugestaoId) {
                                    deletarRestricao()
                                    deletarImagem();
                                    deletarProduto()
                                }
                                else if (!favoritoId && !carrinhoId) {
                                    deletarRestricao()
                                    deletarImagem();
                                    deletarSugestao()
                                    deletarProduto()
                                }
                                else if (!imagemid && !restricaoId && !sugestaoId) {
                                    deletarFavorito()
                                    deletarCarrinho()
                                    deletarProduto();
                                }
                                else if (!imagemid && !restricaoId) {
                                    deletarFavorito()
                                    deletarCarrinho()
                                    deletarSugestao()
                                    deletarProduto();
                                }
                                else if (!imagemid && !sugestaoId) {
                                    deletarRestricao()
                                    deletarFavorito()
                                    deletarCarrinho()
                                    deletarProduto()
                                }
                                else if (!imagemid) {
                                    deletarRestricao()
                                    deletarFavorito()
                                    deletarCarrinho()
                                    deletarSugestao()
                                    deletarProduto()
                                } 
                                else if (!restricaoId && !sugestaoId) {
                                    deletarImagem();
                                    deletarFavorito()
                                    deletarCarrinho()
                                    deletarProduto()
                                }
                                else if (!restricaoId) {
                                    deletarImagem();
                                    deletarFavorito()
                                    deletarCarrinho()
                                    deletarSugestao()
                                    deletarProduto()
                                }
                            }
                            else {
                                alert('Os IDs de restrição ou imagem estão nulos.');
                            }
                        }
                    },
                    { label: 'Não' }
                ]
            });
        } catch (err) {
            alert('Erro ao buscar produtos.');
        }
    }



    //FILTRAR OS PRODUTOS CLICANDO NO CHECKBOX


    const handleCheckboxChange = (value, category) => {
        if (category === "restricoes") {
            if (restricoes.includes(value)) {
                setRestricoes(restricoes.filter((item) => item !== value))
            } else {
                setRestricoes([...restricoes, value]);
            }
        } else if (category === "tipos") {
            if (tipos.includes(value)) {
                setTipos(tipos.filter((item) => item !== value));
            } else {
                setTipos([...tipos, value]);
            }
        }
    };

    function buscar() {
        if (tipos.length > 0) {
            buscarPorTipo();
        } else if (restricoes.length > 0) {
            buscarPorRestricao();
        } else {
            Listando();
        }
    }



    //NÃO REPETIR PRODUTOS
    /*
        async function NaoRepetir() {
            const r = await axios.get(`${API_URL}/produto`)
            const resp = r.data
    
    
            const categoriasVistas = {};
            const produtosRepetidos = {};
            const produtosUnicos = [];
    
            resp.forEach((produto) => {
                const { ID } = produto;
    
                if (categoriasVistas[ID]) {
                    
                    if (!produtosRepetidos[ID]) {
                        produtosRepetidos[ID] = ID;
                      }
                } else {
                    
                    categoriasVistas[ID] = true;
                }
            });
    
    
            produtos.forEach((produto) => {
                const { ID } = produto;
                if (!produtosRepetidos[ID] || produtosRepetidos[ID] === ID) {
                  produtosUnicos.push(produto);
                }
              });
    
              console.log(produtosUnicos)
            
              return produtosUnicos;
    
            
    
        }
    
        function mostrarProdutosUnicos(produtos) {
            const categoriasVistas = {};
            const produtosRepetidos = {};
            const produtosUnicos = [];
          
            produtos.forEach((produto) => {
              const { nome, categoria } = produto;
          
              if (categoriasVistas[categoria]) {
                if (!produtosRepetidos[categoria]) {
                  produtosRepetidos[categoria] = nome;
                }
              } else {
                categoriasVistas[categoria] = true;
              }
            })
          
            produtos.forEach((produto) => {
              const { nome, categoria } = produto;
              if (!produtosRepetidos[categoria] || produtosRepetidos[categoria] === nome) {
                produtosUnicos.push(produto);
              }
            });
          
            return produtosUnicos;
          }
          
          */




    return (
        <div className="pagina-alterar-produtos">
            <ToastContainer />

            <CompAtalhosAdm />

            <section className="container-produtos">

                <div className="cabecalho-listar">
                    <h2>Produtos</h2>
                </div>

                <div className="sub-titulo-listar">
                    <h1>Lista de Produtos</h1>
                </div>


                <div className="conteudo">
                    <div className="produtos">
                        <div className="buscar">
                            <div onClick={buscarProdutos}><img src={Lupa} /></div>
                            <input type="text" placeholder="busque por nome do produto" value={filtro} onChange={e => setFiltro(e.target.value)} onKeyDown={handleKeyPress} />
                        </div>



                        <div className="produtos-listados">

                            <table className="tabela-listados">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Produto</th>
                                        <th>Excluir</th>
                                        <th>Alterar</th>
                                    </tr>
                                </thead>
                                <tbody>


                                    {produtos.map(item =>
                                        <tr className="cada-produto">

                                            <tr className="lista-produto">
                                                <td>#{item.ID}</td>
                                                <td>{item.nome}</td>
                                                <td className='deletar' ><img src={Deletar} onClick={() => {
                                                    apagarProduto(item.ID, item.idimagem, item.idrestricao);
                                                }} /></td>
                                                <td className="alterar" ><img src={Editar} onClick={() => {
                                                    console.log("ID do Produto:", item.ID);
                                                    console.log("ID da Restrição:", item.idrestricao);
                                                    console.log("ID da imagem:", item.idimagem);
                                                    entrarAlterar(item.ID, item.idimagem, item.idrestricao)
                                                }} /></td>

                                            </tr>

                                        </tr>
                                    )}

                                </tbody>
                            </table>






                        </div>
                    </div>

                    <div className="filtros-produtos">
                        <div className="ordernar">
                            <h2>Ordernar por:</h2>

                        </div>

                        <div className="bloco-filtro">
                            <div className="tipo">
                                <input type="checkbox"
                                    value="vegano"
                                    checked={restricoes.includes('vegano')}
                                    onChange={() => handleCheckboxChange("vegano", "restricoes")}
                                />
                                <p>Vegano(a)</p>
                            </div>
                            <div className="linha-produtos"></div>
                            <div className="tipo">
                                <input
                                    type="checkbox"
                                    value="Vegetariano"
                                    checked={restricoes.includes("Vegetariano")}
                                    onChange={() => handleCheckboxChange("Vegetariano", "restricoes")}
                                />
                                <p>Vegetariano(a)</p>
                            </div>
                            <div className="linha-produtos"></div>

                            <div className="tipo">
                                <input
                                    type="checkbox"
                                    value="ovo"
                                    checked={restricoes.includes("ovo")}
                                    onChange={() => handleCheckboxChange("ovo", "restricoes")}
                                />
                                <p>Intolerante a Ovo</p>
                            </div>
                            <div className="linha-produtos"></div>

                            <div className="tipo">
                                <input
                                    type="checkbox"
                                    value="gluten"
                                    checked={restricoes.includes("gluten")}
                                    onChange={() => handleCheckboxChange("gluten", "restricoes")}
                                />
                                <p>Intolerante a Glúten</p>
                            </div>
                            <div className="linha-produtos"></div>

                            <div className="tipo">
                                <input
                                    type="checkbox"
                                    value="lactose"
                                    checked={restricoes.includes("lactose")}
                                    onChange={() => handleCheckboxChange("lactose", "restricoes")}
                                />
                                <p>Intolerante a Lactose</p>
                            </div>
                            <div className="linha-produtos"></div>


                            <button onClick={buscar}> BUSCAR</button>
                        </div>
                    </div>


                    <div className="bloquinho"></div>
                </div>

            </section>

        </div>
    )
}