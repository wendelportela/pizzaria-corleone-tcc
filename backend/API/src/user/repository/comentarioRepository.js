import { con } from "../../conection.js";


export async function inserircometario( comentario){
    const comando =
     `INSERT INTO tb_comentario ( ds_comentario , id_produto, id_cliente , id_avaliacao)
                         VALUES ( ?,?,?,?)
    ` 

const [ resposta] = await con.query( comando , [comentario.comentario,comentario.id , comentario.cliente,comentario.avaliacao])

comentario.id = resposta.insertId
return comentario
}


export  async function listarcomentario(id){

	const comando = `
    SELECT
    tb_comentario.id_comentario AS ID,
    tb_comentario.ds_comentario AS Comentario,
    tb_produto.nm_produto AS produto,
    tb_cliente.nm_cliente AS cliente,
    tb_comentario.id_avaliacao AS avaliacao
FROM
    tb_comentario
INNER JOIN
    tb_produto ON tb_comentario.id_produto = tb_produto.id_produto
INNER JOIN
    tb_cliente ON tb_comentario.id_cliente = tb_cliente.id_cliente
    where tb_produto.id_produto = ?;
	`

const [ resposta ]  = await con.query( comando,[id] )
return  resposta



}




export async function alterarcomentario(id , comentario){

	const comando = `
	UPDATE tb_comentario
    SET    ds_comentario  = ?
    WHERE  id_comentario  = ? `

const [resposta] = await con.query( comando , [
 comentario.comentario,
    id 
])



return resposta.affectedRows
}



export async function deletarcomentario (id){

    const comando =`
    DELETE FROM tb_comentario 
    WHERE       id_comentario = ?;
    `
const [ resposta ] = await con.query( comando ,[id])
return resposta.affectedRows


}
