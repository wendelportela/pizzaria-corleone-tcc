import { con } from "../../conection.js";

export async function sugestoesPizza(id){

const comando = 
`
SELECT
    tb_produto_produto.nm_produto AS produto,
    tb_produto_img_produto.img_produto AS imagem,
    tb_produto_produto.vl_preco AS preco,
    tb_produto_produto.id_produto AS produto_id,
    tb_produto_sugestao.id_produto AS id_pizza_sugestao,
    tb_produto_sugestao.nm_produto AS sugestao_produto,
    tb_produto_sugestao.vl_preco AS sugestao_preco,
    tb_produto_img_sugestao.img_produto AS img_produto_sugestao,
    tb_produto_produto.ds_tipo_produto AS tipo,
    tb_sugestao.id_sugestao
FROM tb_sugestao
INNER JOIN tb_produto AS tb_produto_sugestao ON tb_sugestao.id_produto = tb_produto_sugestao.id_produto
LEFT JOIN tb_produto AS tb_produto_produto ON tb_sugestao.ds_sugestao = tb_produto_produto.id_produto
LEFT JOIN tb_imagem AS tb_produto_img_produto ON tb_produto_produto.id_produto = tb_produto_img_produto.id_produto
LEFT JOIN tb_imagem AS tb_produto_img_sugestao ON tb_sugestao.id_produto = tb_produto_img_sugestao.id_produto
WHERE tb_produto_sugestao.ds_tipo_produto = 3
AND tb_produto_produto.id_produto = ?
`;

const [ resposta ] = await con.query(comando,[id])
return  resposta
}



export async function sugestoesBebida(id){

const comando = 
`
SELECT
    tb_produto_produto.nm_produto AS produto,
    tb_produto_img_produto.img_produto AS img_produto,
    tb_produto_produto.vl_preco AS preco,
    tb_produto_produto.id_produto AS produto_id,
    tb_produto_sugestao.id_produto AS id_pizza_sugestao,
    tb_produto_sugestao.nm_produto AS sugestao_produto,
    tb_produto_sugestao.vl_preco AS sugestao_preco,
    tb_produto_img_sugestao.img_produto AS img_produto_sugestao,
    tb_produto_produto.ds_tipo_produto AS tipo,
    tb_sugestao.id_sugestao
FROM tb_sugestao
INNER JOIN tb_produto AS tb_produto_sugestao ON tb_sugestao.id_produto = tb_produto_sugestao.id_produto
LEFT JOIN tb_produto AS tb_produto_produto ON tb_sugestao.ds_sugestao = tb_produto_produto.id_produto
LEFT JOIN tb_imagem AS tb_produto_img_produto ON tb_produto_produto.id_produto = tb_produto_img_produto.id_produto
LEFT JOIN tb_imagem AS tb_produto_img_sugestao ON tb_sugestao.id_produto = tb_produto_img_sugestao.id_produto
WHERE tb_produto_sugestao.ds_tipo_produto = 1
AND tb_produto_produto.id_produto = ?;
`
    
const [ resposta ] = await con.query(comando,[id])
return  resposta

}


export async function sugestoesSobremesa(id){

const comando = 
`
SELECT
    tb_produto_produto.nm_produto AS produto,
    tb_produto_img_produto.img_produto AS img_produto,
    tb_produto_produto.vl_preco AS preco,
    tb_produto_produto.id_produto AS produto_id,
    tb_produto_sugestao.id_produto AS id_pizza_sugestao,
    tb_produto_sugestao.nm_produto AS sugestao_produto,
    tb_produto_sugestao.vl_preco AS sugestao_preco,
    tb_produto_img_sugestao.img_produto AS img_produto_sugestao,
    tb_produto_produto.ds_tipo_produto AS tipo,
    tb_sugestao.id_sugestao
FROM tb_sugestao
INNER JOIN tb_produto AS tb_produto_sugestao ON tb_sugestao.id_produto = tb_produto_sugestao.id_produto
LEFT JOIN tb_produto AS tb_produto_produto ON tb_sugestao.ds_sugestao = tb_produto_produto.id_produto
LEFT JOIN tb_imagem AS tb_produto_img_produto ON tb_produto_produto.id_produto = tb_produto_img_produto.id_produto
LEFT JOIN tb_imagem AS tb_produto_img_sugestao ON tb_sugestao.id_produto = tb_produto_img_sugestao.id_produto
WHERE tb_produto_sugestao.ds_tipo_produto = 2
AND tb_produto_produto.id_produto = ?
`
    
const [ resposta ] = await con.query(comando,[id])
return  resposta 

}






export async function excluirSugestao(id) {
    const comando = `
    DELETE FROM tb_sugestao WHERE 
    id_produto = ?

    `;
  
    const [res] = await con.query(comando, [id]);
    return res.affectedRows;
  }