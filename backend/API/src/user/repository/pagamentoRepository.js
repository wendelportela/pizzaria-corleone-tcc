import { con } from "../../conection.js";

export function validarDadosCartao(dados) {
    for (const campo in dados) {
        if (!dados[campo]) {
            throw new Error(`Campo "${campo}" está vazio.`);
        }
    }
}

export async function listarTodosCartoes() {
    const comando = `
        SELECT * FROM tb_cartao;
    `;

    const cartoes = await con.query(comando);

    return cartoes;
}


export async function listarCartaoPorId(id) {
    let comando = `
        SELECT * FROM tb_cartao
        WHERE id_cartao = ?;
    `;

    const resultado = await con.query(comando, [id]);

    return resultado; 
}

export async function CadastrarCartao(params){
    let comando =
    `
    INSERT INTO tb_cartao(id_cliente, ds_numero, ds_nome, ds_validade, ds_cvv)
                  VALUES (?,?,?,?,?)
    `
    let cartaoAdd = await con.query(comando, [
        params.id,
        params.num,
        params.nome,
        params.validade,
        params.cvv
    ])

    params.cartao = cartaoAdd[0].insertId

    return params

}

export async function AlterarCartao(newInfoCartao){
    let comando = 
    `
    UPDATE tb_cartao
       SET ds_numero = ?,
           ds_nome = ?,
           ds_validade = ?,
           ds_cvv = ?
     WHERE id_cliente = ?
    `
    let [update] = await con.query(comando, [
        newInfoCartao.num,
        newInfoCartao.nome,
        newInfoCartao.validade,
        newInfoCartao.cvv,
        newInfoCartao.id
    ]);
    
    return newInfoCartao
    
}

export async function ExcluirCartao(id){
    let comando = 
    `
    DELETE FROM tb_cartao
          WHERE id_cartao = ?
    `;
    
    let [response] = await con.query(comando, id)
    
    response = response.affectedRows
    
    return response
}


export async function ListarCartaoCliente(idCliente){
    let comando = 
    `
       SELECT 
              cl.id_cliente     as idCliente,
              ca.id_cartao      as idCartao,
              ca.ds_numero      as num,
              ca.ds_nome        as nome,
              ca.ds_validade    as validade,  
              ca.ds_cvv         as cvv
         FROM tb_cliente cl
    LEFT JOIN tb_cartao ca ON cl.id_cliente = ca.id_cliente
        WHERE cl.id_cliente = ?
    `
    
    let [verify] = await con.query(comando, idCliente)

    return verify[0]
}

export async function ListarCartaoClienteid(idCliente) {
    let comando = `
        SELECT 
            cl.id_cliente     as idCliente,
            ca.id_cartao      as idCartao,
            ca.ds_numero      as num,
            ca.ds_nome        as nome,
            ca.ds_validade    as validade,  
            ca.ds_cvv         as cvv
        FROM tb_cliente cl
        LEFT JOIN tb_cartao ca ON cl.id_cliente = ca.id_cliente
        WHERE cl.id_cliente = ?
    `;
    
    let [verify] = await con.query(comando, idCliente);

    return verify; // Corrigir para retornar o array completo
}






