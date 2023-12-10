
import { con } from "../../conection.js";

export async function inserirrestricao(restricao){

    const comando = `
    INSERT INTO tb_restricao (id_produto,ds_restricao )
				  VALUES ( ? , ?) 
    `;
const [ resposta ] = await con.query( comando , [
    restricao.produto,
    restricao.restricao

    
]);

restricao.id = resposta.insertId

return restricao
}

export async function listaTdsRestricao(){

  const comando = `
  select 
					id_restricao          as id,
					ds_restricao          as restricao
				  from tb_restricao

  `
const [ resposta ] = await con.query( comando )
return resposta
}





export async function verificarrestricao(restricao){

    const comando = `
    SELECT
    tb_restricao.id_restricao  as id,
    tb_restricao.ds_restricao  as restricao,
    tb_produto.nm_produto      as Produto
    FROM
    tb_restricao
    INNER JOIN
    tb_produto ON tb_restricao.id_produto = tb_produto.id_produto
    where ds_restricao like ?
    `;
const [ resposta ] = await con.query( comando , ["%" +restricao+ "%"])
if  (resposta.length > 0){
    return true
}
else{
    return false
}

}



export async function listarestricao(nome){

    const comando = `
    SELECT
    tb_restricao.id_restricao  as id,
    tb_restricao.ds_restricao  as restricao
    FROM
    tb_restricao
    where ds_restricao like ?

    `
const [ resposta ] = await con.query( comando , ["%"+nome+"%"])
return resposta
}

export async function atualizarRestricao(restricao,id) {
    const comando = `
      UPDATE tb_restricao
      SET ds_restricao = ?
      WHERE id_restricao = ?;
    `;
    
    const [resposta] = await con.query(comando, [restricao,id]);
    return resposta.affectedRows;
  }
  
  export async function excluirRestricao(id) {
    const comando = `
      DELETE FROM tb_restricao
      WHERE id_restricao = ?;
    `;
  
    const [resposta] = await con.query(comando, [id]);
  
    return resposta.affectedRows;
  }
