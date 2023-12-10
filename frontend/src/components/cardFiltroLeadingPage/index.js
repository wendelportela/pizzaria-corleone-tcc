import { useState } from 'react';
import './index.scss';

export default function CardFiltroLeadingPage(props) {
  const [tpFiltro, setTpFiltro] = useState(props.filtro);

  return (
    <div className={`card ${tpFiltro === 'pizza' ? 'pizza' : tpFiltro === 'sobremesa' ? 'sobremesa' : tpFiltro === 'bebida' ? 'bebida' : tpFiltro === 'veg' ? 'veg' : null}`}>
      <h1>{props.tp}</h1>
      <p>Chefe Responsável:</p>
      <h3>{props.chefe}</h3>
    </div>
  );
}
