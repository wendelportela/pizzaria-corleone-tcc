import Cabecalho from '../../components/user/cabecalho'
import './index.scss'
import Voltar from '../../assets/img/seta-esquerda.png'
import ProdutoCompra from '../../components/user/produtocompra'
import { useState } from 'react'
import Sugestao from '../../components/user/sugestao-produtu'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

import { API_URL } from '../../config/constants'
import { toast } from 'react-toastify'
import MyAccount from '../../components/perfil/myAccount'
import Cards from 'react-credit-cards';
import { confirmAlert } from 'react-confirm-alert'

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // raio da Terra em quilômetros
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
};

export default function Finalizarcadastrado() {

  const navigate = useNavigate()

  const [cep, setCep] = useState('') // input do CEP --
  const [label2, setLabel2] = useState(true)
  const [numero, setNumero] = useState('') // numero da casa --
  const [frete, setFrete] = useState(0)

  useEffect(() => {
    if (cep.length == 9) {
      setDestinationCep(cep)
    }
  }, [cep])

  // funcao que calcula o frete 
  /////////////////////////////
  const [originCep, setOriginCep] = useState("05614-140");
  const [destinationCep, setDestinationCep] = useState('');
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const originResponse = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${originCep}`);
        const destinationResponse = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${destinationCep}`);
  
        if (originResponse.data.length > 0 && destinationResponse.data.length > 0) {
          const originCoords = {
            lat: parseFloat(originResponse.data[0].lat),
            lon: parseFloat(originResponse.data[0].lon),
          };
  
          const destinationCoords = {
            lat: parseFloat(destinationResponse.data[0].lat),
            lon: parseFloat(destinationResponse.data[0].lon),
          };
  
          const calculatedDistance = calculateDistance(
            originCoords.lat,
            originCoords.lon,
            destinationCoords.lat,
            destinationCoords.lon
          );
  
          // Obtemos os dois primeiros dígitos
          const firstTwoDigits = calculatedDistance.toFixed(2);
  
          // Formata a distância
          // const formattedDistance = `${firstTwoDigits} km`;
  
          const formattedDistance = firstTwoDigits ;
          setDistance(formattedDistance);
        } else {
          toast.error('Erro: Coordenadas não encontradas.');
        }
  
      } catch (error) {
        toast.error('Erro ao obter coordenadas:', error.message);
      }
    };
  
    if (originCep !== '' && destinationCep !== '') {
      fetchData();
    }
  }, [originCep, destinationCep]);
  

  ///////////////////////////////////////////////

  async function calculoFrete() {
    try {
      // let freti = distance * tabelaTotal.length *2
      let tabelaTotalvezesesdois =  tabelaTotal.length* 0.02
      let freti = distance * tabelaTotalvezesesdois

      setFrete(freti)

      let compra = {
        "total_compra": 0,
        "frete": 0,
      }

      compra.total_compra = compra + freti
      alert(distance)


      let usuario = localStorage.getItem('usuario-logado');
      usuario = JSON.parse(usuario)

      const response = await axios.put(`${API_URL}/corleone/altera/pedido/${usuario.id}`, compra)
    } catch (err) {
      toast.error(err.message)
    }
  }



  const [label, setLabel] = useState(false);
  const [proximo, setProximo] = useState(false)
  const [depois, setDepois] = useState(true)
  const [produtos, setProdutos] = useState([]);
  const [precos, setPrecos] = useState([])
  const [total, setTotal] = useState(0)
  const [subtotal, seSubtTotal] = useState(0)
  const [idpedidoproduto, setIdpedidoproduto] = useState(0)

  const [produtosugestao, setProdutosugestao] = useState([])

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(3);
  const [pages, setPages] = useState([]);
  const [digitadoCupom, setDigitadoCupom] = useState('')

  const [desconto, setDesconto] = useState(0)

  const [tabelaTotal, setTabelaTotal] = useState([])

  async function cupom() {
    try {
      const response = await axios.get(API_URL + '/cupom/' + digitadoCupom);

      if (response.data.length > 0) {
        const desconto = (total * response.data[0].ds_valor) / 100;
        setDesconto(desconto)
        setDigitadoCupom('')
      }
    } catch (error) {
      console.error('Erro ao verificar o cupom:', error);
    }
  }





  useEffect(() => {
    setPages([]);
    let novoArray = [];
    for (let cont = 1; cont <= Math.ceil(produtosugestao.length / itensPorPagina); cont++) {
      novoArray.push(cont);
    }
    setPages([...novoArray]);
  }, [produtos, itensPorPagina, produtosugestao])




  const altPag = (num) => {
    if (num === 'ant') {
      if (paginaAtual > 1) {
        setPaginaAtual(paginaAtual - 1);
      }
    } else if (num === 'pro') {
      if (paginaAtual < pages.length) {
        setPaginaAtual(paginaAtual + 1);
      }
    } else {
      setPaginaAtual(num);
    }
  };


  const cartoesAtuais = produtosugestao.slice((paginaAtual - 1) * itensPorPagina, paginaAtual * itensPorPagina);



  useEffect(() => {

    let usuario = localStorage.getItem('usuario-logado');
    usuario = JSON.parse(usuario)

    async function listar() {

      const response = await axios.get(API_URL + '/corleone/usuario/carrinho/listar/'+usuario.id);
      const resp = await axios.get(`${API_URL}/corleone/pedido/cliente/${usuario.id}`);
      setTabelaTotal(resp.data)

      setProdutos(response.data)

      //  lista de sugestao   \\
      const lisatagem = await axios.get(API_URL + '/produto')
      setProdutosugestao(lisatagem.data);

      const mappedPrices = produtos.map((item) => parseFloat(item.preco));


      const total = mappedPrices.reduce((acc, preco) => acc + preco, 0);

      setTotal(total);

      setPrecos(mappedPrices);

      try {

        let compra = {
          "ds_status":false,
          "desconto": 0,
          "produtos": [],
          "subtotal": 0,
          "total": 0,
          "frete": frete,
          "ds_qtd": 0 
        };

        let totalProdutosqtd = 0;

        const mappedPrices = produtos.map((item) => {
          const preco = parseFloat(item.preco);
          const quantidade = Array.isArray(item.quantidade) ? item.quantidade : [item.quantidade];

          const quantidadeTotalProduto = quantidade.reduce((acm, pro) => acm + pro, 0);
          totalProdutosqtd += quantidadeTotalProduto;


          if (!isNaN(preco) && quantidade.every((qtd) => !isNaN(qtd))) {
            compra.produtos.push({
              id_produto: item.id_produto,
              nome:item.nm_produto,
              quantidade: quantidadeTotalProduto
            });
            return preco * quantidadeTotalProduto;
          } else {
            return 0;
          }
        });
         
        if( final == true )
        compra.ds_status = true;

        const totall = mappedPrices.reduce((acm, preco) => acm + preco, 0);
        // console.log('Total de produtos (quantidade):', totalProdutosqtd);
        // console.log('Total geral:', total);
        let descontonovo = 0
        if (desconto > 0) {
          compra.desconto = descontonovo
          descontonovo = desconto
        }
        compra.ds_qtd = totalProdutosqtd; // Atualizando quantidade_total
        compra.subtotal = totall;

        compra.total = (totall + frete).toFixed(2);


        const response = await axios.put(`${API_URL}/corleone/altera/pedido/${idpedidoproduto}`, compra);



      }
      catch (err) {
        toast.error(err.message)

      }
    };
    listar();

  }, [produtos]);



  useEffect(() => {
    let novoIdPedidoProduto = null;

    if (tabelaTotal.length > 0) {
      novoIdPedidoProduto = tabelaTotal[0].id_pedido_produto;
      setIdpedidoproduto(novoIdPedidoProduto);
    }
  }, [tabelaTotal]);

  // inserir o pedido 

  async function Pedido() {
    let usuario = localStorage.getItem('usuario-logado');
    usuario = JSON.parse(usuario)
    try {
      alert(idpedidoproduto)
      let pedido = {
        "cliente": usuario.id,
        "cartao":idCartao,
        "pedido_produto":idpedidoproduto,
        "situacao":"entregue"
        }
        const r  = await axios.post(`${API_URL}/pedido`,pedido)
       
  

    } catch (err) {
      toast.error(err.message)
    }


  }

  async function removerCarrinho() {
    try {
        await Promise.all(produtos.map(async (cont) => {
            let id = cont.id_carrinho;
            let user = {
                disponivel: false,
                qtd: 1,
                idcarrinho: id
            };

            let response = await axios.put(`${API_URL}/corleone/usuario/carrinho/editar`, user);

            console.log(cont);
            console.log("tentativa" + response.data);
        }));
    } catch (error) {
        toast.error(error.message);
    }
}



  const SuccessIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M16 8l-4 4-4-4" />
    </svg>
  );

  const confirmaCompra = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="custom">
          <h1>Compra realizada com sucesso</h1>
          <div>
            <button               onClick={() => {
                // Usando o método window.location.href para redirecionar
                window.location.href = 'http://129.148.42.252:3013/cardapio'; removerCarrinho();setFinal(true);
              }}>Fechar</button>
            <button
              onClick={() => {
                // Usando o método window.location.href para redirecionar
                window.location.href = 'http://129.148.42.252:3013/minhaconta'; removerCarrinho();setFinal(true);
              }}
            >
              Acompanhar compra
            </button>
          </div>
        </div>
      ),
    });
  };


  const [idCartao, setIdCartao] = useState(undefined);
  const [cardDetails, setCardDetails] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });

  const [id, setiD] = useState(0);
  const [edt, setEdt] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [pagController, setPagController] = useState(true);

  const handleInputFocus = (e) => {
    setCardDetails({ ...cardDetails, focus: e.target.name });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let usuario = localStorage.getItem('usuario-logado');
        usuario = JSON.parse(usuario);
        setiD(usuario.id);

        // ... (restante do código relacionado ao cliente)
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let request = await axios.get(`${API_URL}/cliente/cartao?request=${id}`);
        request = request.data;

        if (request.idCartao) {
          setIdCartao(request.idCartao);
        } else {
          setIdCartao(undefined);
        }

        if (request) {
          let dados = {
            cvc: request.cvv || '',
            expiry: request.validade || '',
            focus: '',
            name: request.nome || '',
            number: request.num || '',
          };
          setCardDetails(dados);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const alterarUser = async () => {
    try {
      // ... (restante do código relacionado à alteração do usuário)
      cartaoCliente();
      try {
        verificarCampos(cardDetails)

        let infoCartao = {
          num: cardDetails.number,
          nome: cardDetails.name,
          validade: cardDetails.expiry,
          cvv: cardDetails.cvc,
          id: id,
          cartao: idCartao
        }

        let response = await axios.post(API_URL + '/cliente/cartao', infoCartao)

      } catch (error) {

      }

      setEdt(!edt);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cartaoCliente = async () => {
    try {
      verificarCampos(cardDetails)

      let infoCartao = {
        num: cardDetails.number,
        nome: cardDetails.name,
        validade: cardDetails.expiry,
        cvv: cardDetails.cvc,
        id: id,
        cartao: idCartao
      }

      let response = await axios.post(API_URL + '/cliente/cartao', infoCartao)

    } catch (error) {

    }
  };

  const DeletarCartao = async () => {
    try {
      let response = await axios.delete(`${API_URL}/cliente/cartao?id=${idCartao}`)

      setIdCartao(undefined)

      setCardDetails({
        cvc: "",
        expiry: "",
        focus: "",
        name: "",
        number: "",
      })
    } catch (error) {

    }
  };

  const verificarCampos = (cardDetails) => {
    if (!cardDetails.cvc || !cardDetails.expiry || !cardDetails.name || !cardDetails.number) {
      return 'Campo(s) faltando';
    } else {
      return cardDetails;
    }
  };


  const showConfirmationDialog = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="custom-confirm-dialog">
          <h1>Alteração de Dados</h1>
          <p>Ao selecionar "Sim", você confirmar as alterações feitas nos campos.</p>
          <div>
            <button onClick={() => {
              alterarUser()
              onClose();
            }}>Sim</button>
            <button onClick={() => {
              onClose();
            }}>Não</button>
          </div>
        </div>
      ),
    });
  };

  const formatCEP = (inputValue) => {
    const numericValue = inputValue.replace(/\D/g, '');
    const formattedCEP = numericValue.replace(/(\d{5})(\d{3})/, '$1-$2');
    return formattedCEP;
  };


const [ final , setFinal] = useState(false)


  const showConfirmationDialogCartao = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="custom-confirm-dialog">
          <h1>Deletar Cartão de sua Conta</h1>
          <p>Ao selecionar "Sim", você confirmara e deletara seu cartão ativo.</p>
          <div>
            <button onClick={() => {
              DeletarCartao();
              onClose();
            }}>Sim</button>
            <button onClick={() => {
              onClose();
            }}>Não</button>
          </div>
        </div>
      ),
    });
  };

  


  return (

    <div>
      <div className='barra-lateral-voltar' onClick={() => navigate(-1)} >
        <img src={Voltar} />
        Voltar
      </div>
      <h1></h1>
      <div className='body'  >
        <div>
          <div>
            {proximo
              ?
              <>
                {depois
                  ? <>
                    <div className='cartao'>
                      <div className='cartaoSide'>
                        <Cards
                          cvc={cardDetails.cvc}
                          expiry={cardDetails.expiry}
                          focused={cardDetails.focus}
                          name={cardDetails.name}
                          number={cardDetails.number}
                        />
                        <div>
                          <form className='formsCartao'>
                            <input
                              type="number"
                              name="number"
                              placeholder="Número"
                              onChange={handleInputChange}
                              onFocus={handleInputFocus}
                              value={cardDetails.number}
                              maxLength={16}
                              className="no-spinners"
                              disabled={!edt}
                            />
                            <input
                              type="text"
                              name="name"
                              placeholder="Nome"
                              onChange={handleInputChange}
                              onFocus={handleInputFocus}
                              value={cardDetails.name}
                              disabled={!edt}
                            />
                            <div className='expiraCartao'>
                              <input
                                type="text"
                                name="expiry"
                                placeholder="MM/AA Expiração"
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                value={cardDetails.expiry}
                                disabled={!edt}
                              />
                              <input
                                type="tel"
                                name="cvc"
                                placeholder="CVC"
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                value={cardDetails.cvc}
                                maxLength={3}
                                disabled={!edt}
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className='duplada'> {(pagController == false && idCartao) ? <button className='butaum' onClick={showConfirmationDialogCartao}>Deletar Cartão</button> : null}
                        {edt ?
                          <button className='butaum' onClick={showConfirmationDialog}>Salvar</button>
                          : <button className='butaum' onClick={() => setEdt(!edt)}>Editar</button>
                        }

                        <button onClick={() => { setDepois(false); }} >  Continuar  </button>
                      </div>

                    </div>
                  </>

                  :
                  <>
                    <div className='endereco'>
                      <h1>Confirmar Endereço</h1>
                      <div>
                        <div className='butaoo'>
                          {cep.length > 0 &&
                            <label>CEP</label>
                          }
                          <input
                            placeholder='CEP'
                            value={cep}
                            onChange={(e) => { setCep(formatCEP(e.target.value)); }}
                            onClick={() => { setLabel2(true) }}
                          />
                        </div>

                        <div className='butaoo'>
                          {numero.length > 0 &&
                            <label>N°</label>
                          }
                          <input
                            placeholder='N°'
                            value={numero}
                            type='text'
                            onChange={(e) => { setNumero(e.target.value); }}
                          />
                        </div>
                        {frete > 0

                          ? <> <button onClick={() => { confirmaCompra(); Pedido(); }}> Comprar </button></>
                          : <> <button onClick={() => { calculoFrete() }}> Calcular </button> </>

                        }




                      </div>

                    </div>

                  </>
                }

              </>
              :
              <>
                <h2> Meu Carrinho</h2>
                {produtos.map((item) => {

                  return (
                    <ProdutoCompra produto={{
                      nome: item.produto, preco: item.preco, imagem: item.imagem, qtd: item.quantidade, id: item.id_carrinho
                    }} />
                  );
                })}
              </>

            }



          </div>




          <div className='pagination'>
            <div className='paginacao'>
              <h3>Antes de ir, escolha mais um item para combinar com o pedido</h3>
              {paginaAtual > 1 ? (
                <button className='proximo' onClick={() => altPag('ant')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="19" viewBox="0 0 25 19" fill="none">
                    <path
                      d="M1.5 9.5H23M23 9.5L13.561 1.5M23 9.5L13.561 17.5"
                      stroke="#53220D"
                      stroke-width="2"
                      stroke-linecap="round"
                      transform="rotate(180, 12.5, 9.5)"
                    />
                  </svg>
                  <p>Anterior</p>
                </button>
              ) : (
                <button className='negado'>
                  <p>Anterior</p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="19" viewBox="0 0 25 19" fill="none">
                    <path
                      d="M1.5 9.5H23M23 9.5L13.561 1.5M23 9.5L13.561 17.5"
                      stroke="#8d8d8d"
                      stroke-width="2"
                      stroke-linecap="round"
                      transform="rotate(180, 12.5, 9.5)"
                    />
                  </svg>
                </button>
              )}



              {paginaAtual < pages.length ? (
                <button className='proximo' onClick={() => altPag('pro')}>
                  <p>Próximo</p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="19" viewBox="0 0 25 19" fill="none">
                    <path
                      d="M1.5 9.5H23M23 9.5L13.561 1.5M23 9.5L13.561 17.5"
                      stroke="#53220D"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              ) : (
                <button className='negado'>
                  <p>Próximo</p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="19" viewBox="0 0 25 19" fill="none">
                    <path
                      d="M1.5 9.5H23M23 9.5L13.561 1.5M23 9.5L13.561 17.5"
                      stroke="#8d8d8d"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className='sugestao-itens'>
              {cartoesAtuais.map(item => (
                <Sugestao produto={{ nome: item.nome, imagem: item.imagem, media: item.media, preco: item.preço, id: item.ID }} />  
              ))}
            </div>


          </div>




        </div>

        <div className='ld-esquerdo'>

          <h2>Resumo do Pedido </h2>

          <div>
            <div>
              {tabelaTotal.map((item) => (
                <p>{item.ds_qtd > 1 ? `Produtos ( ${item.ds_qtd} )` : `Produto ( ${item.ds_qtd} )`} </p>

              ))
              }
              <p> R$ {total.toFixed(2)}</p>
            </div>

            <div>
              <p> Descontos </p>
              <p> - R$ {tabelaTotal.map((item) => item.desconto)}


              </p>
            </div>
          </div>

          <div className='ld-esquerdo-fl'>
            <h4>
              Subtotal
            </h4>

            <h4>
              R$ {tabelaTotal.map((item) => item.ds_subtotal)}
            </h4>

          </div>

          <div className='ld-esquerdo-fl'>
            <p> Frete </p>   <p>{frete == 0 ? "a calcular" : "R$"+frete}</p>
          </div>

          <div className='ld-esquerdo-fl'>
            <h3>Total   </h3>
            <h3>R$ {tabelaTotal.map((item) => (item.ds_total
            ))} </h3>
          </div>

          <button onClick={() => { setProximo(true) }}> Comprar </button>
          <div>
            <div className='butao'>
              {digitadoCupom.length > 0 &&
                <label>Cupom</label>
              }
              <input placeholder='Cupom'
                value={digitadoCupom}
                onChange={(e) => { setDigitadoCupom(e.target.value); }}
                onClick={() => { setLabel(true) }} />
            </div>

          </div>

          <button onClick={cupom} className='claro'>Aplicar</button>
        </div>
      </div>



    </div>
  )
}