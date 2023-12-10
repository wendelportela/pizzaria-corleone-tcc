import './index.scss'

import axios from 'axios'
import React, { useEffect, useState } from 'react';
import CompAtalhosAdm from '../../../components/compAtalhosAdm';
import { useNavigate } from 'react-router-dom';
import storage from 'local-storage';
import { toast, ToastContainer}  from 'react-toastify'
import { API_URL } from '../../../config/constants';


export default function Cadastro() {
    const [nome, setnome] = useState('')
    const [tipoproduto, settipoproduto] = useState(0)
    const [ingredientes, setingrediente] = useState('')
    const [restricao, setrestricao] = useState('')
    const [preco, setpreco] = useState('')
    const [descricao, setdescricao] = useState('')
    const [disponivel, setDisponivel] = useState(false);
    const [imagem, setImagem] = useState();


    const navigate = useNavigate();

    useEffect(() => {
        if(!storage('adm-logado')){
            navigate('/associado')
        }
    }, [])




    function notifySuccess() {
        toast.success('Produto cadastrado com sucesso!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }

  
  async function cadastrarProduto() {
    const formData = new FormData();
    formData.append('capa', imagem);

    try {
     
       const cadastrar = {
        tipo: tipoproduto,
        nome: nome,
        ingredientes: ingredientes,
        preco: preco,
        descricao: descricao,
        disponivel: disponivel,
      };

    

      


      const respCadastro = await axios.post(API_URL + '/produto', cadastrar);
      const productId = respCadastro.data.id;

      //alert(productId)


      const respImagem = await axios.post(`${API_URL}/produto/${productId}/capa`, formData);
      console.log(respImagem)


      


      const restricaoData = {
          produto:productId,
          restricao: restricao
        
      };
      //alert(JSON.stringify(restricaoData));
      
     
      const resprestricao = await axios.post(API_URL + '/restricao', restricaoData);
      
    



      if (respCadastro.status === 200) {
        notifySuccess();

      } else {
        toast.error(`Erro ao cadastrar o produto: ${respCadastro.statusText}, ${resprestricao.statusText}`);
      }

      if (!nome || !tipoproduto || !ingredientes || !restricao || preco <= 0 || !descricao) {
        toast.error('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
    } catch (err) {
      if (err.response) {
        toast.error(`Erro ao cadastrar o produto: ${JSON.stringify(err.response.data)}`);
      } else {
        toast.error(`Erro ao cadastrar o produto: ${err.message}`);
      }
    }
  }


    function escolherImagem() {
        document.getElementById('imagemCapa').click();
    }

    function mostrarImagem() {
        if (imagem) {
            return URL.createObjectURL(imagem);
        }
        return null;
    }

    const selecionarTipo = (e, tipo) => {
        if (e.target.checked) {
            settipoproduto(tipo);
        } else {
            settipoproduto('');
        }
    };

    return (
        <div className='connt'>
            <ToastContainer />

            <CompAtalhosAdm />


            <div className='cont' >


                <div className='tito' >
                    <h1>Cadastro de produtos</h1>
                </div>

                <div className='contt'>


                    
                <div className='img'>
                        <div className='ti-h1' onClick={escolherImagem}>
                            {!imagem && (
                                <>
                                    <h1>Adicionar uma imagem</h1>
                                    <h2>+</h2>
                                </>
                            )}
                            {imagem && <img className='imagem-capa' src={mostrarImagem()} alt='' />}
                            <input type="file" id='imagemCapa' accept="image/*" onChange={e => setImagem(e.target.files[0])} />

                        </div>
                    </div>
                    <div className='dadosdoproduto'>
                        <div className='nome'>
                            <h1>Nome:</h1>
                            <input type='text' placeholder='Escreva..' value={nome} onChange={e => setnome(e.target.value)} />
                        </div>



                        <p className='linha'></p>

                        <div className='b-produto'>
                            <h1>Seu Produto é...</h1>



                            <div className='prod'>
                                <div className='in'>
                                    <input
                                        className="tay"
                                        type="checkbox"
                                        value="Bebida"
                                        checked={tipoproduto === 1}
                                        onChange={(e) => selecionarTipo(e, 1)}
                                    />
                                    <label className='nomeproduto'>Bebida</label>
                                </div>

                                <div className='in'>
                                    <input
                                        className="tay"
                                        type="checkbox"
                                        value="Sobremesa"
                                        checked={tipoproduto === 2}
                                        onChange={(e) => selecionarTipo(e, 2)}
                                    />
                                    <label className='nomeproduto'>Sobremesa</label>
                                </div>

                                <div className='in'>
                                    <input
                                        className="tay"
                                        type="checkbox"
                                        value="Salgado"
                                        checked={tipoproduto === 3}
                                        onChange={(e) => selecionarTipo(e, 3)}
                                    />
                                    <label className='nomeproduto'>Salgado</label>
                                </div>
                            </div>



                            <p className="linha"></p>

                        </div>

                        <div className='ingredientes'>
                            <h1>Ingredientes:</h1>
                            <input type='text' placeholder='Escreva..' value={ingredientes} onChange={e => setingrediente(e.target.value)} />
                        </div>

                        <p className='linha'></p>

                        <div className='preferencia'>
                            <h1>Pessoas com preferencias alimentares/alergias podem comer</h1>
                            <div className='pref-prod'>
                                <div className='in'>
                                    <input
                                        className="tay2"
                                        type="checkbox"
                                        value="Glúten"
                                        onChange={() => setrestricao('Glúten')}
                                    />
                                    <p className='nomeproduto'>Glúten</p>
                                </div>

                                <div className='in'>
                                    <input
                                        className="tay2"
                                        type="checkbox"
                                        value="ovo"
                                        onChange={() => setrestricao('Ovo')}
                                    />
                                    <p className='nomeproduto'>Ovo</p>
                                </div>

                                <div className='in'>
                                    <input
                                        className="tay2"
                                        type="checkbox"
                                        value="Leite e seus derivados"
                                        onChange={() =>  setrestricao('Leite e seus derivados')}
                                    />
                                    <p className='nomeproduto'>Leite e seus derivados</p>
                                </div>
                            </div>

                            <div className='pref-prod'>
                                <div className='in'>
                                    <input
                                        className="tay2"
                                        type="checkbox"
                                        value="Vegetariano"
                                        onChange={() => setrestricao('Vegetariano')}
                                    />
                                    <p className='nomeproduto'>Vegetariano</p>
                                </div>

                                <div className='in'>
                                    <input
                                        className="tay2"
                                        type="checkbox"
                                        value="Vegano"
                                        onChange={() =>setrestricao('Vegano')}
                                    />
                                    <p className='nomeproduto'>Vegano</p>
                                </div>
                            </div>
                        </div>

                        <p className='linha'></p>

                        <div className='valor'>
                            <h1>Qual o preço do seu produto?</h1>
                            <input type='text' placeholder='R$' value={preco} onChange={e => setpreco(e.target.value)} />
                        </div>

                        <p className='linha'></p>

                        <div className='descricao'>
                            <h1>Adicione uma descrição do seu produto</h1>
                            <input type='text' placeholder='Escreva..' value={descricao} onChange={e => setdescricao(e.target.value)} />
                        </div>
                        <div className='disponivel'>
                            <h1>Disponível:</h1>
                            <input
                         type='checkbox'
                               checked={disponivel}
                              onChange={() => setDisponivel(!disponivel)} 
                                 />
                           </div>

                        <div className='fin-botao'>
                            <button onClick={cadastrarProduto}>Finalizar Cadastro</button>
                        </div>

                    </div>

                </div>
            </div>
        </div>


    )
}
