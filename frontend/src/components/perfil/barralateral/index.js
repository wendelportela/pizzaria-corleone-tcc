import { useNavigate } from 'react-router-dom';
import './index.scss'
import '../../../assets/config/fonts-config.scss'

import { confirmAlert } from 'react-confirm-alert';

import Coracao from '../../../assets/images/icons/coracao_icon.svg'
import CarrinhoIcon from '../../../assets/images/icons/shopping-cart_icon.svg';
import Conta from '../../../assets/images/icons/conta.svg'
import Voltar from '../../../assets/img/seta-esquerda.png'
import Sair from '../../../assets/images/pictures/exitdoor_87195.svg'
import PedidosAtivos from '../../../assets/images/icons/box.svg'
import { useEffect, useState } from 'react';

export default function Barralateral(props) {
    
    

    useEffect(() => {
        let usuario = localStorage.getItem('usuario-logado');
        usuario = JSON.parse(usuario);
        setUser(usuario)
    }, [])

    //INFOS DO USUÁRIO -- nome, email, id
    const [user, setUser] = useState({})

    const navigate = useNavigate()

    const showConfirmationDialog = () => {
        confirmAlert({
            customUI: ({ onClose }) => (
                <div className="custom-confirm-dialog">
                    <h1>Sair da conta</h1>
                    <p>Você deixará de ter acesso aos nossos serviços e só voltará a ter caso faça login novamente. Você tem certeza de que deseja fazer isso?</p>
                    <div>
                        <button onClick={() => {
                            localStorage.removeItem('usuario-logado');
                            navigate('/')
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

    const controladorExibicao = (l) => {
        props.controlador(l)
    }


    return (
        <div className='barra-lateral'>
            <div className='fundo'>
                <div className='barra-lateral-secao-01'>
                    <div className='barra-lateral-voltar-minhaconta' onClick={() => navigate(-1)} >
                        <img src={Voltar} />
                        Voltar
                    </div>
                    <div className=' barra-lateral-secao-01-circulo'>   </div>

                    <h3>{user.nome}</h3>
                    <p>{user.email}</p>

                </div>

                <div className='barra-lateral-links'>
                    <div className='pedidos-ativos' onClick={() => controladorExibicao('p')}>
                        <img src={PedidosAtivos} />
                        Pedidos ativos
                    </div>

                    <div onClick={() => controladorExibicao('f')}>
                        <img src={Coracao}  />
                        Favoritos
                    </div>

                    <div onClick={() => controladorExibicao('h')}>
                        <img src={CarrinhoIcon} />
                        Historico de compras
                    </div>

                    <div onClick={() => controladorExibicao('d')}>
                        <img src={Conta} />
                        Detalhes da conta
                    </div>

                    <div onClick={showConfirmationDialog}>
                        <img src={Sair} />
                        Sair
                    </div>
                </div>
            </div>
        </div>
    )
}