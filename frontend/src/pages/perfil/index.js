import './index.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PedidosAtivos from '../pedidosativos'
import Barralateral from '../../components/perfil/barralateral'
import Historico from '../../components/perfil/historico'
import MyAccount from '../../components/perfil/myAccount'
import PagFavorito from '../../components/perfil/pagFavorito'

import Transition from '../transition/transition'

export default function MinhaConta() {
  // CONTROLADORES MENU DIRETA
  const [pedidosAtv, setPedidosAtv] = useState(false)
  const [favorito, setFavorito] = useState(false)
  const [historico, setHistorico] = useState(false)
  const [detalheConta, setDeltalheConta] = useState(true)

  const navigate = useNavigate()

  const controladorDireitaMenu = (l) => {
    if (l == 'p') {
      setPedidosAtv(true)
      setFavorito(false)
      setHistorico(false)
      setDeltalheConta(false)
    } else if (l == 'f') {
      setPedidosAtv(false)
      setFavorito(true)
      setHistorico(false)
      setDeltalheConta(false)
    } else if (l == 'h') {
      setPedidosAtv(false)
      setFavorito(false)
      setHistorico(true)
      setDeltalheConta(false)
    }
    else if (l == 'd') {
      setPedidosAtv(false)
      setFavorito(false)
      setHistorico(false)
      setDeltalheConta(true)
    }
  }
  return (
    <Transition>
      <div className='background-minhaconta'>
        <Barralateral controlador={controladorDireitaMenu} />

        {historico ?
          <Historico /> : detalheConta ?
            <MyAccount /> : favorito ?
              <PagFavorito /> : pedidosAtv ?
                <PedidosAtivos /> : null}
      </div>
    </Transition>
  )
}
