//import './index.scss'


import axios from 'axios'
import React, { useEffect, useState } from 'react';
import storage, { set } from 'local-storage';
import CompAtalhosAdm from '../../../components/compAtalhosAdm';
import { toast, ToastContainer}  from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useParams } from 'react-router-dom';

import { API_URL } from '../../../config/constants';



export default function EditarProduto() {
    const [nome, setnome] = useState('')
    const [tipo, settipo] = useState(0)
    const [ingredientes, setingrediente] = useState('')
    const [restricao, setrestricao] = useState([])
    const [preco, setpreco] = useState(0)
    const [descricao, setdescricao] = useState('')
    const [disponivel, setDisponivel] = useState(false);
    const [imagem, setImagem] = useState(null);
    const [idrestricao, setIdrestricao] = useState(0)
    const [idImagem, setIdImagem] = useState(0)
    const [idTipo, setIdTipo] = useState(0)



    function notifySuccess() {
        toast.success('Produto editado com sucesso!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
    }


   


    const api = axios.create({
        baseURL: API_URL
    })



    const { id } = useParams()
   // const [rende, setRende] = useState([])

    const [idproduto, setIdproduto] = useState(id)






    useEffect(() => {
        if (id) {
            MostrarInfo();
        }
        alterar()
        alteraridImagem()
        alterarTipo();
    }, [])

    useEffect(() => {
        carregarTipo()
        carregarRestricao()

    },[tipo, restricao])




    async function MostrarInfo() {
        const r = await axios.get(`${API_URL}/produto/listar/${id}`)
        const resp = r.data[0]
        setnome(resp.nome)
        settipo(resp.tipo)
        setingrediente(resp.ingredientes)
        setrestricao(resp.restricao)
        setpreco(resp.preço)
        setdescricao(resp.descricao)
        setDisponivel(resp.disponivel)
        setImagem(resp.imagem)
    }





    function carregarTipo() {
        const checkboxes = document.querySelectorAll('.tay');
    
        checkboxes.forEach((checkbox) => {
            const value = checkbox.value;
            if (tipo === value) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
        });
    }

    function carregarRestricao() {
        const checkboxes = document.querySelectorAll('.tay2');
    
        checkboxes.forEach((checkbox) => {
            const value = checkbox.value;
            if (restricao === value) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
        })
        
    }
    





    async function alterar() {
        const resposta = await axios.get(API_URL + '/produto/listar/' + id)
        const r = resposta.data[0]
        const resp = r.idrestricao
        setIdrestricao(resp)

    }


    async function alteraridImagem() {
        const resposta = await axios.get(API_URL + '/produto/listar/' + id)
        const r = resposta.data[0]
        const resp = r.idimagem
        setIdImagem(resp)
    }


    async function alterarTipo() {
        const resposta = await axios.get(`${API_URL}/produto/listar/${id}`)
        const r = resposta.data[0]
        const resp = r.idtipo
        setIdTipo(resp)
    }






    async function alterarProduto() {

        try {

            if (!imagem) {
                throw new Error('escolha uma imagem')
            }



            const formData = new FormData();
            formData.append('capa', imagem);

            const alterarImg = {
                imagem: imagem
            }

           // alert(idproduto);

            const imagemTorV = await axios.get(API_URL + '/produto/listar/' + idproduto)
            const result = imagemTorV.data[0]
            const r = result.imagem


            if (!r) {
                const r = await axios.post(`${API_URL}/produto/${idproduto}/capa`, formData, {
                    headers: {
                        "Content-type": "multipart/form-data"
                    },
                })
            }

            else {
                const r = await axios.put(`${API_URL}/produto/${idproduto}/imagem`, formData, {
                    headers: {
                        "Content-type": "multipart/form-data"
                    },
                })
            }

/*
*/  



            

            //alert(restricaoAtualizada)




            const alterarRestricao = {
                restricao: restricao
            }

            let variavelnul = null
            let variavelandfilne = undefined

            if (idrestricao === '' || idrestricao === variavelnul || idrestricao === variavelandfilne) {
                let novarestricao = {
                    produto: idproduto,
                    restricao: restricao
                }
                const respo = await axios.post(API_URL + '/restricao', novarestricao)
            }

            else if (restricao.length > 1) {
                toast.error('Apenas uma restrição pode ser cadastrada')
            }
            else {
                const respRestricao = await axios.put(`${API_URL}/restricao/alterar/${idrestricao}`, alterarRestricao)
            }






            const produto = {
                nome: nome,
                tipo: tipo,
                ingredientes: ingredientes,
                preco: preco,
                descricao: descricao,
                disponivel: disponivel
            }

           // alert(JSON.stringify(produto));

            const resposta = await axios.put(`${API_URL}/produto/editar/${idproduto}`, produto)


            if (resposta.status === 200) {
                notifySuccess();
            }

        } catch (err) {
            if (err.response) {
                console.log('Erro de resposta:', err.response.data);
                toast.error(`Erro na tentativa de alterar o produto `);
                //${JSON.stringify(err.response.data)}
            } else {
                console.log('Erro não tratado:', err.message);
                toast.error(`Erro na tentativa de alterar o produto`);
                // ${err.message}
            }
        }

    }






    function BuscarImagem(imagem) {
        console.log(`${api.getUri()}/${imagem}`)
        return `${api.getUri()}/${imagem}`
    }




    function escolherImagem() {
        document.getElementById('imagemcapa').click();
    }



    function mostrarImagem() {
        if (imagem && typeof imagem === 'object') {
            return URL.createObjectURL(imagem);
        } else {
            return BuscarImagem(imagem);
        }
    }
    
    

    return (
        <div className='connt'>
            <ToastContainer />

            <CompAtalhosAdm />


            <div className='cont' >


                <div className='tito' >
                    <h1>Editar Produto</h1>
                </div>

                <div className='contt'>


                    <div className='img' onClick={escolherImagem}>
                        <div className='ti-h1'>




                            {imagem &&
                                <img src={mostrarImagem()} alt='IMAGEM DO PRODUTO' />
                            }



                            <input type="file" id='imagemcapa' onChange={e => setImagem(e.target.files[0])} />

                        </div>
                    </div>

                    <div className='dadosdoproduto'>
                        <div className='nome'>
                            <p>Nome:</p>
                            <input
                                type='text'
                                placeholder='Escreva..'
                                value={nome}
                                onChange={(e) => setnome(e.target.value)}

                            />
                        </div>



                        <p className='linha'> </p>

                        <div className='b-produto'>
                            <h1>Seu Produto é...</h1>



                            <div className='prod'>

                                <div className='in'>
                                    <input
                                        className="tay"
                                        type="checkbox"
                                        value="1"
                                        onChange={(e) => {

                                            if (e.target.checked) {
                                                settipo('Bebida');
                                            } else {
                                                settipo('');
                                            }
                                        }}

                                    />
                                    <p className='nomeproduto'>Bebida</p>
                                </div>



                                <div className='in'>
                                    <input
                                        className="tay"
                                        type="checkbox"
                                        value="2"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                settipo('Sobremesa');
                                            } else {
                                                settipo('');
                                            }
                                        }}



                                    />
                                    <p className='nomeproduto'>Sobremesa</p>
                                </div>




                                <div className='in'>
                                    <input
                                        className="tay"
                                        type="checkbox"
                                        value="3"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                settipo('Salgado');
                                            } else {
                                                settipo('');
                                            }
                                        }}
                                    />
                                    <p className='nomeproduto'>Salgado</p>
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
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            if (Array.isArray(restricao) ) {
                                                if (restricao.includes(value)) {
                                                    setrestricao(restricao.filter(item => item !== value));
                                                } else {
                                                    setrestricao([...restricao, value]);
                                                }
                                            } else {
                                                setrestricao([value]);
                                            }
                                        }}
                                        checked={Array.isArray(restricao) && restricao.includes('Glúten')}
                                    />
                                    <p className='nomeproduto'>Glúten</p>
                                </div>

                                <div className='in'>
                                <input
                                        className="tay2"
                                        type="checkbox"
                                        value="Ovo"
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            if (Array.isArray(restricao) ) {
                                                if (restricao.includes(value)) {
                                                    setrestricao(restricao.filter(item => item !== value));
                                                } else {
                                                    setrestricao([...restricao, value]);
                                                }
                                            } else {
                                                setrestricao([value]);
                                            }
                                        }}
                                        checked={Array.isArray(restricao) && restricao.includes('Ovo')}
                                    />
                                    <p className='nomeproduto'>Ovo</p>
                                </div>


                                <div className='in'>
                                <input
                                        className="tay2"
                                        type="checkbox"
                                        value="Leite e seus derivados"
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            if (Array.isArray(restricao) ) {
                                                if (restricao.includes(value)) {
                                                    setrestricao(restricao.filter(item => item !== value));
                                                } else {
                                                    setrestricao([...restricao, value]);
                                                }
                                            } else {
                                                setrestricao([value]);
                                            }
                                        }}
                                        checked={Array.isArray(restricao) && restricao.includes('Leite e seus derivados')}
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
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            if (Array.isArray(restricao) ) {
                                                if (restricao.includes(value)) {
                                                    setrestricao(restricao.filter(item => item !== value));
                                                } else {
                                                    setrestricao([...restricao, value]);
                                                }
                                            } else {
                                                setrestricao([value]);
                                            }
                                        }}
                                        checked={Array.isArray(restricao) && restricao.includes('Vegetariano')}
                                    />
                                    <p className='nomeproduto'>Vegetariano</p>
                                </div>


                                <div className='in'>
                                <input
                                        className="tay2"
                                        type="checkbox"
                                        value="Vegano"
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            if (Array.isArray(restricao) ) {
                                                if (restricao.includes(value)) {
                                                    setrestricao(restricao.filter(item => item !== value));
                                                } else {
                                                    setrestricao([...restricao, value]);
                                                }
                                            } else {
                                                setrestricao([value]);
                                            }
                                        }}
                                        checked={Array.isArray(restricao) && restricao.includes('Vegano')}
                                    />
                                    <p className='nomeproduto'>Vegano</p>
                                </div>
                             </div>

                        </div>


                        <p className='linha'></p>

                        <div className='valor'>
                            <h1>Qual o preço do seu produto?</h1>
                            <input type='text' placeholder='Escreva..' value={preco} onChange={e => setpreco(e.target.value)} />
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
                            <button onClick={alterarProduto}>Finalizar Cadastro</button>
                        </div>

                    </div>

                </div>
            </div>
        </div>



    )

}
