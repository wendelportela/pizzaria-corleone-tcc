import { useState } from 'react'
import * as Components from './Components';
// import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

import { GoogleLogin } from '@react-oauth/google';

import { jwtDecode } from "jwt-decode";

import './index.scss'
import '../../../assets/config/fonts-config.scss'
import Modal from 'react-modal'
import Mais from '../../../assets/images/icons/more_icon.svg'
import Sino from '../../../assets/images/icons/order_on_icon.svg'
import Adm from '../../../assets/images/icons/adm_icon.svg'
import Cardapio from '../../../assets/images/icons/cardapio_icon.svg'
import CarrinhoIcon from '../../../assets/images/icons/shopping-cart_icon.svg';
import Conta from '../../../assets/images/icons/conta.svg'
import Carrinho from '../carrinho'
import SetaEsquerda from '../../../assets/img/seta-preta 1.png';
import Informacoes from '../../infoproduto/informacoes';
import storage from 'local-storage';

import { API_URL } from '../../../config/constants';


export default function Cabecalho(props) {
  const [isLogged, setIsLogged] = useState(false)
  const [sideBar, setSideBar] = useState(false)

  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [openCadastroModal, setOpenCadastroModal] = useState(true)

  const [signIn, toggle] = useState(true);

  const navigate = useNavigate()

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('')
  const [bairro, setBairro] = useState('');
  const [rua, setRua] = useState('');
  const [num, setNum] = useState('');
  const [cep, setCep] = useState('');
  const [formattedCep, setFormattedCep] = useState('');
  const [endereco, setEndereco] = useState({})
  const [cpf, setCpf] = useState('');

  // const [captcha, setCaptcha] = useState(true)

  const [cadastro, setCadastro] = useState(true);

  const [emailLogin, setEmailLogin] = useState('')
  const [senhaLogin, setSenhaLogin] = useState('')

  const [idUsuario, setIdUsuario] = useState(0);


  const [listarr, setListarr] = useState([]);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);




  useEffect(() => {
    let usuario = localStorage.getItem('usuario-logado');

    async function listar() {

      const response = await axios.get(API_URL+'/corleone/usuario/carrinho/listar/' + usuario.id);
      setListarr(response.data)

    }

    if (usuario != null) {
      usuario = JSON.parse(usuario);

      setIsLogged(true);
      setIdUsuario(usuario.id);

      listar()
    }
  }, [listarr]);

  useEffect(() => {
    let usuario = localStorage.getItem('contiuacao-cadastro');
    if (usuario != null) {
      usuario = JSON.parse(usuario);
      setNome(usuario.nome)
      setEmail(usuario.email)
      setSenha(usuario.senha)
      setOpenCadastroModal(!openCadastroModal)
    }
  }, [])

  useEffect(() => {
    if (props.cadastro == true) {
      setOpenLoginModal(true)
    }
  }, [props.cadastro]);

  // Função para lidar com a mudança no campo de dia
  function handleDiaChange(e) {
    let novoDia = e.target.value;
    // Remove caracteres não numéricos, incluindo o primeiro caractere
    novoDia = novoDia.replace(/\D/g, '');
    // Verifica se é um número e se está no intervalo válido
    if (/^\d+$/.test(novoDia)) {
      const diaNum = parseInt(novoDia, 10);
      if (diaNum >= 1 && diaNum <= 31) {
        setDia(novoDia);
      }
    } else {
      setDia(novoDia);
    }
  }

  function handleMesChange(e) {
    let novoMes = e.target.value;
    novoMes = novoMes.replace(/\D/g, '');
    if (/^\d+$/.test(novoMes)) {
      const mesNum = parseInt(novoMes, 10);
      if (mesNum >= 1 && mesNum <= 12) {
        setMes(novoMes);
      }
    } else {
      setMes(novoMes);
    }
  }






  function formatarTelefone(telefone) {
    // Remove todos os caracteres não numéricos
    telefone = telefone.replace(/\D/g, '');

    // Adiciona parênteses, espaço e hífen ao telefone
    telefone = telefone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');

    return telefone;
  }

  // Função para lidar com a mudança no campo de telefone
  function handleTelefoneChange(e) {
    const novoTelefone = formatarTelefone(e.target.value);
    setTelefone(novoTelefone);
  }

  function formatarCPF(cpf) {
    // Remove todos os caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    // Adiciona pontos e traço ao CPF
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    return cpf;
  }

  // Função para lidar com a mudança no campo de CPF
  function handleCPFChange(e) {
    const novoCPF = formatarCPF(e.target.value);
    setCpf(novoCPF);
  }



  function handleCEPChange(e) {
    const novoCep = e.target.value.replace(/\D/g, '');

    if (novoCep.length <= 8) {
      if (novoCep.length === 8) {
        buscarCEP(novoCep);
        const cepFormatado = `${novoCep.substring(0, 5)}-${novoCep.substring(5)}`;
        setFormattedCep(cepFormatado);
      } else {
        setFormattedCep(novoCep);
      }

      setCep(novoCep);
    }
  }

  function capitalizeFirstLetterWithoutNumbers(string) {
    const stringWithoutNumbers = string.replace(/[0-9]/g, '');
    return stringWithoutNumbers.charAt(0).toUpperCase() + stringWithoutNumbers.slice(1);
  }

  function handleNomeChange(e) {
    const novoNome = capitalizeFirstLetterWithoutNumbers(e.target.value);
    setNome(novoNome);
  }



  const inversao = () => {
    if (email.indexOf('@') === -1) {
      toast.error('Digite um email válido');
    }
    else if (!nome) {
      toast.warn('Digite o seu nome', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else if (!email) {
      toast.warn('Digite o seu email', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else if (!senha) {
      toast.warn('Digite a sua senha', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    // else if (!captcha) {
    //   toast.warn('Clique no botão "Não sou um robô"', {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // }
    else if (!nome.includes(" ")) {
      toast.warn('Seu nome precisar conter ao menos um sobrenome', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else {
      setOpenCadastroModal(!openCadastroModal)
      // setCaptcha(false)
      let local = {
        nome: nome,
        email: email,
        senha: senha
      }
      storage('contiuacao-cadastro', local)
    }
  }


  const login = async () => {
    try {
      // if (!captcha) {
      //   toast.warn('Clique no botão "Não sou um robô"', {
      //     position: "top-right",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //   });
      // }

        const logi =
        {
          email: emailLogin,
          senha: senhaLogin
        }

        let response = await axios.post(API_URL+`/cliente/login`, logi)
        storage('usuario-logado', response.data)
        setIdUsuario(response.data.id)
        setIsLogged(true)
        setOpenLoginModal(false)

        toast.success("Login realizado com sucesso", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      
    } catch (err) {
      toast.error(err.response.data.erro);
    }

  }

  const loginGoogle = async (credentialResponseDecoded) => {
    try {
      let response = await axios.post(`${API_URL}/cliente/login/google?email=${credentialResponseDecoded.email}`)
      storage('usuario-logado', response.data)
      setIdUsuario(response.data.id)
      setIsLogged(true)
      setOpenLoginModal(false)

    }
    catch (err) {
    toast.error(err.response.data.erro);
  }

}

const addCliente = async () => {


  try {
    if (ano > 2023) {
      toast.error('Ano invalido')
    }
    else {
      let requestEn = {
        estado: estado,
        cidade: cidade,
        bairro: bairro,
        rua: rua,
        numero: num,
        cep: cep,
      };



      let responseEn = await axios.post(API_URL + '/endereco/cadastro', requestEn);

      let nascimento = `${dia}/${mes}/${ano}`;

      let requestCl = {
        endereco: responseEn.data.id,
        cliente: nome,
        email: email,
        telefone: telefone,
        senha: senha,
        cpf: cpf,
        nascimento: nascimento
      }

      let responseCl = await axios.post(API_URL + '/cliente/cadastro', requestCl);

      if (responseCl.status !== 200) {
        toast.error(
          responseCl.data ? responseCl.data.erro : 'Erro desconhecido',
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
        
        setOpenLoginModal(false)
      } else {
        localStorage.removeItem('contiuacao-cadastro');
        setIsLogged(true)
        setOpenLoginModal(false)
        let local = {
          id: responseCl.data.id,
          nome: responseCl.data.cliente,
          email: responseCl.data.email
        }
        storage('usuario-logado', local)
        toast.info("Verifique sua caixa de email", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  } catch (err) {
    console.log(err.response.data)
    toast.error(
      err.response.data ? err.response.data : 'Erro desconhecido',
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
  }
};


const buscarCEP = async (cep) => {
  try {

    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const data = response.data;

    setRua(data.logradouro)
    setBairro(data.bairro)
    setCidade(data.localidade)
    setEstado(data.uf)
    setRua(data.logradouro)
    setBairro(data.bairro)
    setCidade(data.localidade)
    setEstado(data.uf)

  } catch (error) {
    toast.error(('CEP digitado invalido'), {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
  }
}

const CadastrarEndereco = async () => {

  try {

    setEndereco({

      estado: estado,
      cidade: cidade,
      bairro: bairro,
      rua: rua,
      numero: num,
      cep: cep,

    })

    const resp = await axios.post(API_URL + '/endereco/cadastro', endereco)


  } catch (err) {
    toast.error(err.response.data.erro)
  }

}


return (
  <>
    <main className={`cabecalho ${scrolled ? 'padrao' : null}`}>
      <div className='esquerda-cabecalho'>

        <div onClick={() => navigate('/sobrenos')} className='sobre-nos'>
          <img alt='sobre-nos' src={Mais} />
          <p>Sobre nos</p>
        </div>

        <div onClick={() => navigate('/minhaconta')} className='pedidos-ativos'>
          <img alt='pedidos-ativos' src={Sino} />
          <p>Pedidos Ativos</p>
        </div>

        <div onClick={() => navigate('/associado')} className='adm-page'>
          <img alt='adm' src={Adm} />
          <p>Pagina do Associado</p>
        </div>
      </div>

      <div onClick={() => navigate('/')} className='logo-principal'></div>


      <div className='direita-cabecalho'>
        <div onClick={() => navigate('/cardapio')} className='cardapio'>
          <img alt='cardapio' src={Cardapio} />
          <p>Cardapio</p>


        </div>
        <div className='carrinho' onClick={() => setSideBar(!sideBar)}>
          <img alt='Carrinho' src={CarrinhoIcon} />
          {listarr.length > 0 &&
            <div className='itens'>{listarr.length}</div>
          }
          <p className={listarr.length > 0 && 'espacamento'}>Carrinho</p>
        </div>
        <div className='minha-conta'>
          <img alt='minha-conta' src={Conta} />
          {isLogged ?
            <p onClick={() => navigate('/minhaconta')}>Minha Conta</p>
            : <p onClick={() => setOpenLoginModal(!openLoginModal)}>Fazer Login </p>
          }
        </div>


      </div>
    </main>
    <Modal
      isOpen={openLoginModal}
      closeTimeoutMS={500}
      className={openCadastroModal ? 'modal' : 'modalll'}
      overlayClassName={'modal-overlay'}
      onRequestClose={() => setOpenLoginModal(false)}
    >
      {openCadastroModal ?
        <Components.Container>
          <Components.SignUpContainer signinIn={signIn}>
            <Components.Form>
              <Components.Title>Criar Conta</Components.Title>
              <Components.Input type='text' placeholder='Nome' spellCheck='false' value={nome} onChange={handleNomeChange} />
              <Components.Input type='email' placeholder='Email' spellCheck='false' value={email} onChange={(e) => setEmail(e.target.value)} />
              <Components.Input type='password' placeholder='Senha' spellCheck='false' value={senha} onChange={(e) => setSenha(e.target.value)} />
              {/* <ReCAPTCHA
                sitekey="6LdHbGsoAAAAAEuxguADWAR5shW3Jy3ZNQHtVbOQ"
                onChange={() => setCaptcha(true)}
              />*/}
              <Components.Button onClick={() => inversao()}>Criar conta</Components.Button> 
            </Components.Form>
          </Components.SignUpContainer>

          <Components.SignInContainer signinIn={signIn}>
            <Components.Form>
              <Components.Title>Entrar</Components.Title>
              <Components.Input type='email' placeholder='Email' spellCheck='false' value={emailLogin} onChange={(e) => setEmailLogin(e.target.value)} />
              <Components.Input type='password' placeholder='Senha' spellCheck='false' value={senhaLogin} onChange={(e) => setSenhaLogin(e.target.value)} />
              {/* <ReCAPTCHA
                sitekey="6LdHbGsoAAAAAEuxguADWAR5shW3Jy3ZNQHtVbOQ"
                onChange={() => setCaptcha(true)}
              /> */}
              <Components.Anchor href='#'>Esqueceu a senha?</Components.Anchor>
              <Components.Button onClick={login}>Entrar</Components.Button>
            </Components.Form>
          </Components.SignInContainer>

          <Components.OverlayContainer signinIn={signIn}>
            <Components.Overlay signinIn={signIn}>

              <Components.LeftOverlayPanel signinIn={signIn}>
                <Components.Title>Bem-vindo(a)</Components.Title>
                <Components.Paragraph>
                  Entre e aventuresse em nosso cardápio rico e inclusivo
                </Components.Paragraph>
                <div className='mmm'>
                  {/* <a className="social-icon">
                    <svg className="fab fa-google" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" color="#fff" viewBox="0 0 30 30">
                      <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"></path>
                    </svg>
                  </a>
                  <a className="social-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" className="fab fa-facebook-fe" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                      <path d="M32,11h5c0.552,0,1-0.448,1-1V3.263c0-0.524-0.403-0.96-0.925-0.997C35.484,2.153,32.376,2,30.141,2C24,2,20,5.68,20,12.368 V19h-7c-0.552,0-1,0.448-1,1v7c0,0.552,0.448,1,1,1h7v19c0,0.552,0.448,1,1,1h7c0.552,0,1-0.448,1-1V28h7.222 c0.51,0,0.938-0.383,0.994-0.89l0.778-7C38.06,19.518,37.596,19,37,19h-8v-5C29,12.343,30.343,11,32,11z"></path>
                    </svg>
                  </a> */}
                </div>
                <Components.GhostButton onClick={() => toggle(true)}>
                  Entrar
                </Components.GhostButton>
              </Components.LeftOverlayPanel>

              <Components.RightOverlayPanel signinIn={signIn}>
                <Components.Title>Olá Amigo!</Components.Title>
                <Components.Paragraph>
                  Para manter conectado com a gente, por favor, entre com sua conta
                </Components.Paragraph>
                {/* <GoogleLogin
                  onSuccess={credentialResponse => {
                    var credentialResponseDecoded = jwtDecode(credentialResponse.credential)
                    loginGoogle(credentialResponseDecoded)
                  }}
                  onError={() => {
                    toast.error('Erro ao realizar login')
                  }}
                /> */}
                <Components.GhostButton onClick={() => toggle(false)}>
                  Cadastrar-se
                </Components.GhostButton>
              </Components.RightOverlayPanel>

            </Components.Overlay>
          </Components.OverlayContainer>

        </Components.Container>
        : <div className='container'>
          <div className='kitar' onClick={() => setOpenCadastroModal(!openCadastroModal)}>
            <img src={SetaEsquerda} />
            <p>Voltar</p>
          </div>

          <div className='conteudo'>
            <h1>Está quase tudo pronto...</h1>
            <p>Logradouro</p>

            <div className='informacoes'>
              <div className='esquerdaFds'>
                <Components.Input
                  type='text'
                  placeholder='CEP'
                  value={formattedCep}
                  onChange={handleCEPChange}
                />
                <Components.Input type='text' placeholder='Estado' value={estado} onChange={(e) => setEstado(e.target.value)} />
                <Components.Input type='text' placeholder='Cidade' value={cidade} onChange={(e) => setCidade(e.target.value)} />
                <Components.Input type='text' placeholder='Bairro' value={bairro} onChange={(e) => setBairro(e.target.value)} />
                <Components.Input type='text' placeholder='Rua' value={rua} onChange={(e) => setRua(e.target.value)} />
                <Components.Input type='text' placeholder='Número' value={num} onChange={(e) => setNum(e.target.value)} />
              </div>

              <div className='direitaFin'>
                <p className='nmDataNascimento'>Data de Nascimento</p>
                <div className='data-nascimento'>

                  <input
                    id='diminuicao'
                    className='separacao'
                    type='text'
                    placeholder='Dia'
                    value={dia}
                    onChange={handleDiaChange}
                  />

                  <input
                    id='diminuicao'
                    className='separacao'
                    type='text'
                    placeholder='Mês'
                    value={mes}
                    onChange={handleMesChange}
                  />

                  <input
                    id='diminuicao'
                    type='text'
                    placeholder='Ano'
                    value={ano}
                    onChange={(e) => setAno(e.target.value)}
                  />
                </div>
                <Components.Input
                  type='text'
                  placeholder='CPF'
                  className='inputo'
                  value={cpf}
                  onChange={handleCPFChange}
                />
                <Components.Input
                  type='tel'
                  placeholder='Telefone'
                  className='inputo'
                  value={telefone}
                  onChange={handleTelefoneChange}
                />
                <button onClick={addCliente}>Finalizar Cadastro</button>
                <p className='ttt'>Ao criar uma conta, você concorda com nossos<br /> <a href=''>Termos de Uso</a> e <a href=''>Políticas de Privacidade</a></p>
              </div>
            </div>
          </div>
        </div>}
    </Modal>
    {sideBar && <Carrinho onClose={() => setSideBar(false)} />}
    <ToastContainer />
  </>
)
}
