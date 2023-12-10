import { con } from "../../conection.js";


export  async function verificarCupom(cupom){

const  comando = `
select
id_cupom,
nm_cupom,
ds_valor
from tb_cupom
where nm_cupom = ? `;

const [ respo ] = await con.query(comando,[cupom ]) 
return respo

}
