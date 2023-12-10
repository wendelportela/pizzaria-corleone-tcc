import './index.scss'
import '../../assets/config/fonts-config.scss'
import { useEffect, useState, useRef } from "react"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import storage from 'local-storage';
import LoadingBar from 'react-top-loading-bar';

import { API_URL } from '../../config/constants';

export default function TelaAssociado() {

  const [nome, setnome] = useState('')
  const [email, setemail] = useState('')
  const [senha, setsenha] = useState('')
  const [cnpj, setcpnj] = useState('')

  const[carregando, setCarregando] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if(storage('adm-logado')) {
      navigate('/cadastroproduto')
    }
  }, [])

  
  const ref = useRef()

  async function entrar() {



    try {

      ref.current.continuousStart();
      setCarregando(true)

      let associadoo = {
        nome: nome,
        email: email,
        senha: senha,
        cnpj: cnpj
      }

      const response = await axios.put(API_URL + '/usuarioadm/login', associadoo)
      storage('adm-logado', associadoo)
      if (response.status === 200) {
      

        setTimeout(() => {

        navigate('/dashboard')

      }, 2500) }
    }
    catch (error) {
      ref.current.complete();
      setCarregando(false);
  
      if (error.response) {
          // Se a resposta da API contiver um erro
          toast.error(error.response.data.erro, { containerId: 'pagina-vendas' });
      } else {
          // Se houver um erro diferente, como uma falha de rede
          toast.error(error.message, { containerId: 'pagina-vendas' });
      }
  }
  }



  return (
    <div className="login-associado">
       <LoadingBar color='#53220D' ref={ref}/>
       <ToastContainer containerId="pagina-associado" />
      <div className='direitaaaaa'>
        <h2>Entrar na Conta Associada</h2>



        <div className='inputssss'>
          <div>
            <input type='text' placeholder='Nome completo' value={nome} onChange={e => setnome(e.target.value)} />
          </div>

          <div>
            <input type='text' placeholder='E-mail' value={email} onChange={e => setemail(e.target.value)} />
          </div>

          <div>
            <input type='text' placeholder='Senha' value={senha} onChange={e => setsenha(e.target.value)} />
          </div>

          <div>
            <input type='text' placeholder='CNPJ' value={cnpj} onChange={e => setcpnj(e.target.value)} />
          </div>
        </div>

        <div className='final'>
          <button onClick={() => entrar()} disabled={carregando}>Entrar</button>
          <p>Ao criar uma conta, você concorda com nossos<br /> <a href=''>Termos de Uso</a> e <a href=''>Políticas de Privacidade</a></p>
        </div>

      </div>

      <div className='containeer'>
        <div className='esquerda'>


          <div className='bemvindo'>
            <h1>Bem-vindo<br /> <strong>Associado!</strong> </h1>

            <p>Gerencie suas operações agora mesmo. </p>

            <a href='/'>Clicou errado?</a>

            <Link to='/' style={{ textDecoration: 'none', outline: 'none' }}>
              <button className='voltar'>Voltar</button>
            </Link>
          </div>

        </div>




      </div>
    </div>
  );
}
