import Dashboard from '../../assets/images/pictures/dashboard.png'
import Produtos from '../../assets/images/pictures/produtos.png'
import Vendas from '../../assets/images/pictures/vendas.png'
import Pedidos from '../../assets/images/pictures/pedidos.png'
import Sair from '../../assets/img/sair.png'
import Setapracima from '../../assets/img/seta-pra-cima.png'
import Lista from '../../assets/img/lista-de-controle.png'
import Adicionar from '../../assets/img/adicionar.png'
import Clientes from '../../assets/img/cliente.png'




import './index.scss'
import { useNavigate } from 'react-router-dom'
import storage from 'local-storage'
import { useEffect, useState } from 'react'


export default function CompAtalhosAdm() {

    const navigate = useNavigate();
    const [popUpProdutos, setPopUpProdutos] = useState(false)
    const [popUpClientes, setPopUpClientes] = useState(false)
    const [popUpPedidos, setPopUpPedidos] = useState(false)

useEffect(()=> {
 console.log(popUpProdutos)   
})
    function abrirPopupProdutos() {
        setPopUpProdutos(true)
    }

    function fecharPopUpProdutos() {
        setPopUpProdutos(false)
    }


    function abrirPopupClientes() {
        setPopUpClientes(true)
    }

    function fecharPopUpClientes() {
        setPopUpClientes(false)
    }

    function abrirPopupPedidos() {
        setPopUpPedidos(true)
    }

    function fecharPopUpPedidos() {
        setPopUpPedidos(false)
    }

    function sairClick() {
        storage.remove('adm-logado')
        navigate('/associado')
    }




    return (
        <div className="pagina-comp-atalhos">
            <div className="container-atalhos">
                <div onClick={() => {navigate('/dashboard')}} className="dashboard">
                    <img src={Dashboard} />
                    <h2>Dashboard</h2>
                </div>

                <div className="produto-atalhos">
                    <div onClick={abrirPopupProdutos}><img  src={Produtos} />
                    <h2>Produtos</h2>
                    </div>
                    
                    {popUpProdutos && (
                        <div className='pop-up-atalhos'>   
                                <h3 onClick={() => {navigate('/produtos')}}>Listar Produtos</h3>

                                <h4 onClick={() => {navigate('/cadastroproduto')}}>Cadastrar</h4>
                                <div onClick={fecharPopUpProdutos}>
                                    <img  src={Setapracima}/>
                                </div>
                                
                                
                        </div>

                    )}  
                </div>

                <div onClick={() => {navigate('/vendas')}} className="venda">
                    <img src={Vendas} />
                    <h2>Vendas</h2>
                </div>

                <div className="pedido">
                    <div onClick={abrirPopupPedidos}>
                        <img id='pedido' src={Pedidos} />
                        <h2>Pedidos</h2>
                    </div>

                    {popUpPedidos && (
                        <div className='pop-up-atalhos'>   
                                <h3 onClick={() => {navigate('/listapedido')}}>Listar Pedidos</h3>
                                <h4 onClick={() => {navigate('/cliente')}}>Rastreamento</h4>
                                <div onClick={fecharPopUpPedidos}>
                                    <img src={Setapracima}/>
                                </div>
                        </div>

                    )}  
                    
                </div>

                <div className='clientes'>
                    <div onClick={abrirPopupClientes}>
                        <img  id='clientes' src={Clientes} />
                        <h2 >Clientes</h2>
                    </div>
                    

                    {popUpClientes && (
                        <div className='pop-up-atalhos'>   
                                <h3 onClick={() => {navigate('/clienteDetalhes')}}>Detalhes Clientes</h3>

                                
                                <div onClick={fecharPopUpClientes}>
                                    <img src={Setapracima}/>
                                </div>

                                
                                
                        </div>

                    )}  
                </div>


            </div>

            <div onClick={sairClick} className='sair'>
                <img src={Sair} />
                <h2>Sair</h2>
            </div>
        </div>
    )
}