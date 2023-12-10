import { con } from "../../conection.js";


// tabela avaliacao , esta interligada com a tabela comentario , seu id esta dentro da tabela comentario//

export async function inseriravaliacao(avaliacao){

    const comando = `
    INSERT INTO tb_avaliacao 
    (ds_avaliacao)			              
    values (?)
    `
    const [ resposta ] = await con.query(comando,[avaliacao.avaliacao])
    avaliacao.id = resposta.insertId

    return avaliacao

}


export async function listaravaliaco (){
    const comando = `
    select * from tb_avaliacao ;
    `

    const [respo] = await con.query(comando)
    return respo
}