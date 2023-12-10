import { con } from "../../conection.js";


export async function cadastrarEndereco(endereco){
    let comando =
    `
    INSERT INTO tb_endereco (ds_estado, ds_cidade, ds_bairro, ds_rua, ds_numero, ds_cep)
        VALUES (?, ?, ?, ?, ?, ?)
        `;
    
    let respos = await con.query(comando,[
        endereco.estado,
        endereco.cidade,
        endereco.bairro,
        endereco.rua,
        endereco.numero,
        endereco.cep
    ])
    endereco.id = respos[0].insertId
    return endereco
}


export async function BuscarEnderecos (){

    let comando =
    `
    SELECT * FROM tb_endereco
        `;
    
    let respos = await con.query(comando)

    return respos
}