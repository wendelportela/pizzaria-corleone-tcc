
import { con } from "../../conection.js";

export async function inserirtipoproduto (tipo){

const comando =`

INSERT INTO tb_tipo_produto ( ds_tipo_produto ) 
					 VALUES ( ? )
`

const [ resposta ] = await con.query( comando, [
tipo.tipo
])

tipo.id = resposta.insertId



return tipo
}


export  async function listartipo(){

	const comando = `
	
	SELECT  id_tipo_produto  as ID,
		    ds_tipo_produto  as tipo
    FROM    tb_tipo_produto
	`

const [ resposta ]  = await con.query( comando )
return[resposta]
}


export  async function verificar(verificar){

	const comando = `
	
	SELECT  id_tipo_produto  as ID,
		    ds_tipo_produto  as tipo
    FROM    tb_tipo_produto
	WHERE ds_tipo_produto like? 
	`

const [ resposta ]  = await con.query( comando ,['%'+verificar+'%'])
return resposta.length > 0
}

export async function alterartipo(id , tipo){

	const comando = `
	UPDATE  tb_tipo_produto
    SET     ds_tipo_produto ?
    WHERE   id_tipo_produto = ?`

	const [resposta] = await con.query( comando , [
	   id,
	   tipo.tipo
	])


	return resposta.affectedRows

}

