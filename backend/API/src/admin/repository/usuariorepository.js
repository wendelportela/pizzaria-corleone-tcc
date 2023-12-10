import { con } from '../../conection.js'

export async function loginadm(nome,email,senha,cnpj) {


    const comando = `
    SELECT
       id_associado AS id,
       nm_nome AS nome,
       ds_email AS email,
       ds_senha AS senha,
       ds_cnpj AS cnpj
    FROM tb_associado
    WHERE
    nm_nome = ?
    AND ds_email = ?
    AND ds_senha = ?
    AND ds_cnpj = ?
    `;

    
    const [linha] = await con.query(comando,
        [ 
            nome,
            email,
            senha,
            cnpj
          
        ]
         );
 
console.log(nome,email,senha,cnpj)
    return linha.length > 0;
    
    
}