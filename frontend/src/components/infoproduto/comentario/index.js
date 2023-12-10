import './index.scss'
import estrelabranca from '../../../assets/img/Vector (14).png'
import estrela from '../../../assets/img/star_77949 1.png'
import peril from '../../../assets/img//Vector (15).png'
import { useEffect, useState } from 'react';

export default function Comentarios(props){
    
    const [estrela1, setEstrela1] = useState(true);
    const [estrela2, setEstrela2] = useState(true);
    const [estrela3, setEstrela3] = useState(true);
    const [estrela4, setEstrela4] = useState(true);
    const [estrela5, setEstrela5] = useState(true);
  
    useEffect(() => {
      const avaliacao = props.usuario.avaliacao;
      if (avaliacao === 5) {
        setEstrela1(true);
        setEstrela2(true);
        setEstrela3(true);
        setEstrela4(true);
        setEstrela5(true);

      } else if (avaliacao === 4) {
        setEstrela1(true);
        setEstrela2(true);
        setEstrela3(true);
        setEstrela4(true);
        setEstrela5(false)

      } else if (avaliacao === 3) {
        setEstrela1(true);
        setEstrela2(true);
        setEstrela3(true);
        setEstrela4(false);
        setEstrela5(false)

      } else if (avaliacao === 2) {
        setEstrela1(true);
        setEstrela2(true);
        setEstrela3(false);
        setEstrela4(false);
        setEstrela5(false)

      } else if (avaliacao === 1) {
        setEstrela1(true);
        setEstrela2(false);
        setEstrela3(false);
        setEstrela4(false);
        setEstrela5(false)
      } else {
        setEstrela1(false);
        setEstrela2(false);
        setEstrela3(false);
        setEstrela4(false);
        setEstrela5(false);
      }
    }, [props.usuario.avaliacao]);

    return (
      <div className='comentarios'>
        <div className='comentarios-perfil'>
          <img src={peril} alt="Perfil" />
          <h4>{props.usuario.nome}</h4>
        </div>

        <div className='comentarios-estrelas'>
          <img src={estrela1 ? estrela : estrelabranca}  />
          <img src={estrela2 ? estrela : estrelabranca} />
          <img src={estrela3 ? estrela : estrelabranca} />
          <img src={estrela4 ? estrela : estrelabranca} />
          <img src={estrela5 ? estrela : estrelabranca} />
        </div>

        <p>{props.usuario.comentario}</p>
      </div>
    );
}
