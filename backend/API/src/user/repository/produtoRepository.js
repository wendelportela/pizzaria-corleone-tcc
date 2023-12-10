import { con } from '../../conection.js'

export async function ListarCardapio(tp, restricao_1, restricao_2, nm, orderby) {
   
   let comando =
      `
   SELECT 
   p.id_produto AS ID,
   MAX(p.nm_produto) AS nome, 
   MAX(tp.ds_tipo_produto) AS tipo,
   MAX(p.ds_ingredientes) AS ingredientes,
   MAX(p.ds_descricao) AS descricao,
   MAX(p.vl_preco) AS preço,
   MAX(p.vl_preco_promocional) AS preco_promocional,
   MAX(p.bt_disponivel) AS disponivel,
   MAX(img.id_imagem) AS idimagem,
   MAX(img.img_produto) AS imagem,
   MAX(m.ds_media) AS media , 
   MAX(r1.ds_restricao) AS restricao_1, 
   MAX(r2.ds_restricao) AS restricao_2
FROM tb_produto p
INNER JOIN tb_tipo_produto AS tp ON p.ds_tipo_produto = tp.id_tipo_produto
LEFT JOIN tb_imagem AS img ON img.id_produto = p.id_produto
LEFT JOIN tb_media AS m ON m.id_produto = p.id_produto
INNER JOIN tb_restricao r1 ON p.id_produto = r1.id_produto AND r1.ds_restricao like ?
INNER JOIN tb_restricao r2 ON p.id_produto = r2.id_produto AND r2.ds_restricao like ?

WHERE p.nm_produto LIKE ?
AND tp.ds_tipo_produto LIKE ?
GROUP BY 
   p.id_produto, 
   tp.ds_tipo_produto, 
   p.ds_ingredientes, 
   p.ds_descricao, 
   p.vl_preco, 
   p.vl_preco_promocional, 
   p.bt_disponivel, 
   img.id_imagem, 
   img.img_produto, 
   m.ds_media, 
   r1.ds_restricao, 
   r2.ds_restricao
ORDER BY null
   `

   if(orderby == 1){
      comando =
      `
   SELECT 
   p.id_produto AS ID,
   MAX(p.nm_produto) AS nome, 
   MAX(tp.ds_tipo_produto) AS tipo,
   MAX(p.ds_ingredientes) AS ingredientes,
   MAX(p.ds_descricao) AS descricao,
   MAX(p.vl_preco) AS preço,
   MAX(p.vl_preco_promocional) AS preco_promocional,
   MAX(p.bt_disponivel) AS disponivel,
   MAX(img.id_imagem) AS idimagem,
   MAX(img.img_produto) AS imagem,
   MAX(m.ds_media) AS media , 
   MAX(r1.ds_restricao) AS restricao_1, 
   MAX(r2.ds_restricao) AS restricao_2
FROM tb_produto p
INNER JOIN tb_tipo_produto AS tp ON p.ds_tipo_produto = tp.id_tipo_produto
LEFT JOIN tb_imagem AS img ON img.id_produto = p.id_produto
LEFT JOIN tb_media AS m ON m.id_produto = p.id_produto
INNER JOIN tb_restricao r1 ON p.id_produto = r1.id_produto AND r1.ds_restricao like ?
INNER JOIN tb_restricao r2 ON p.id_produto = r2.id_produto AND r2.ds_restricao like ?

WHERE p.nm_produto LIKE ?
AND tp.ds_tipo_produto LIKE ?
GROUP BY 
   p.id_produto, 
   tp.ds_tipo_produto, 
   p.ds_ingredientes, 
   p.ds_descricao, 
   p.vl_preco, 
   p.vl_preco_promocional, 
   p.bt_disponivel, 
   img.id_imagem, 
   img.img_produto, 
   m.ds_media, 
   r1.ds_restricao, 
   r2.ds_restricao
ORDER BY p.vl_preco asc
   `
   }
   else if(orderby == 2){
      comando =
      `
   SELECT 
   p.id_produto AS ID,
   MAX(p.nm_produto) AS nome, 
   MAX(tp.ds_tipo_produto) AS tipo,
   MAX(p.ds_ingredientes) AS ingredientes,
   MAX(p.ds_descricao) AS descricao,
   MAX(p.vl_preco) AS preço,
   MAX(p.vl_preco_promocional) AS preco_promocional,
   MAX(p.bt_disponivel) AS disponivel,
   MAX(img.id_imagem) AS idimagem,
   MAX(img.img_produto) AS imagem,
   MAX(m.ds_media) AS media , 
   MAX(r1.ds_restricao) AS restricao_1, 
   MAX(r2.ds_restricao) AS restricao_2
FROM tb_produto p
INNER JOIN tb_tipo_produto AS tp ON p.ds_tipo_produto = tp.id_tipo_produto
LEFT JOIN tb_imagem AS img ON img.id_produto = p.id_produto
LEFT JOIN tb_media AS m ON m.id_produto = p.id_produto
INNER JOIN tb_restricao r1 ON p.id_produto = r1.id_produto AND r1.ds_restricao like ?
INNER JOIN tb_restricao r2 ON p.id_produto = r2.id_produto AND r2.ds_restricao like ?

WHERE p.nm_produto LIKE ?
AND tp.ds_tipo_produto LIKE ?
GROUP BY 
   p.id_produto, 
   tp.ds_tipo_produto, 
   p.ds_ingredientes, 
   p.ds_descricao, 
   p.vl_preco, 
   p.vl_preco_promocional, 
   p.bt_disponivel, 
   img.id_imagem, 
   img.img_produto, 
   m.ds_media, 
   r1.ds_restricao, 
   r2.ds_restricao
ORDER BY p.vl_preco desc
   `
   }
   else if(orderby == 3){
      comando =
      `
   SELECT 
   p.id_produto AS ID,
   MAX(p.nm_produto) AS nome, 
   MAX(tp.ds_tipo_produto) AS tipo,
   MAX(p.ds_ingredientes) AS ingredientes,
   MAX(p.ds_descricao) AS descricao,
   MAX(p.vl_preco) AS preço,
   MAX(p.vl_preco_promocional) AS preco_promocional,
   MAX(p.bt_disponivel) AS disponivel,
   MAX(img.id_imagem) AS idimagem,
   MAX(img.img_produto) AS imagem,
   MAX(m.ds_media) AS media , 
   MAX(r1.ds_restricao) AS restricao_1, 
   MAX(r2.ds_restricao) AS restricao_2
FROM tb_produto p
INNER JOIN tb_tipo_produto AS tp ON p.ds_tipo_produto = tp.id_tipo_produto
LEFT JOIN tb_imagem AS img ON img.id_produto = p.id_produto
LEFT JOIN tb_media AS m ON m.id_produto = p.id_produto
INNER JOIN tb_restricao r1 ON p.id_produto = r1.id_produto AND r1.ds_restricao like ?
INNER JOIN tb_restricao r2 ON p.id_produto = r2.id_produto AND r2.ds_restricao like ?

WHERE p.nm_produto LIKE ?
AND tp.ds_tipo_produto LIKE ?
GROUP BY 
   p.id_produto, 
   tp.ds_tipo_produto, 
   p.ds_ingredientes, 
   p.ds_descricao, 
   p.vl_preco, 
   p.vl_preco_promocional, 
   p.bt_disponivel, 
   img.id_imagem, 
   img.img_produto, 
   m.ds_media, 
   r1.ds_restricao, 
   r2.ds_restricao
ORDER BY p.id_produto desc
   `
   }
   else if(orderby == 4){
      comando =
      `
   SELECT 
   p.id_produto AS ID,
   MAX(p.nm_produto) AS nome, 
   MAX(tp.ds_tipo_produto) AS tipo,
   MAX(p.ds_ingredientes) AS ingredientes,
   MAX(p.ds_descricao) AS descricao,
   MAX(p.vl_preco) AS preço,
   MAX(p.vl_preco_promocional) AS preco_promocional,
   MAX(p.bt_disponivel) AS disponivel,
   MAX(img.id_imagem) AS idimagem,
   MAX(img.img_produto) AS imagem,
   MAX(m.ds_media) AS media , 
   MAX(r1.ds_restricao) AS restricao_1, 
   MAX(r2.ds_restricao) AS restricao_2
FROM tb_produto p
INNER JOIN tb_tipo_produto AS tp ON p.ds_tipo_produto = tp.id_tipo_produto
LEFT JOIN tb_imagem AS img ON img.id_produto = p.id_produto
LEFT JOIN tb_media AS m ON m.id_produto = p.id_produto
INNER JOIN tb_restricao r1 ON p.id_produto = r1.id_produto AND r1.ds_restricao like ?
INNER JOIN tb_restricao r2 ON p.id_produto = r2.id_produto AND r2.ds_restricao like ?

WHERE p.nm_produto LIKE ?
AND tp.ds_tipo_produto LIKE ?
GROUP BY 
   p.id_produto, 
   tp.ds_tipo_produto, 
   p.ds_ingredientes, 
   p.ds_descricao, 
   p.vl_preco, 
   p.vl_preco_promocional, 
   p.bt_disponivel, 
   img.id_imagem, 
   img.img_produto, 
   m.ds_media, 
   r1.ds_restricao, 
   r2.ds_restricao
ORDER BY m.ds_media desc
   `
   }

   let [response] = await con.query(comando, [restricao_1, restricao_2, nm, tp]);

   return response
}

export async function CompradosPeloCliente(id){
   let comando =
   `
         SELECT pp.ds_produtos        AS produtos
           FROM tb_pedido 	           AS p
     INNER JOIN tb_pedido_produto 	  AS pp ON p.id_pedido_produto = pp.id_pedido_produto
          WHERE p.ds_situacao = "Entregue"
            AND p.id_cliente  = ?
   `

   let [response] = await con.query(comando, id);

   return response[0]
}

export async function ListagemProdutosComprados(id){
   let comando = 
   `
      SELECT
            tp.nm_produto  AS nome,
            ti.img_produto AS imagem,
            tm.ds_media    AS media
        FROM
            tb_produto AS tp
   LEFT JOIN
            tb_imagem AS ti ON tp.id_produto = ti.id_produto
   LEFT JOIN
            tb_media  AS tm ON tp.id_produto = tm.id_produto
       WHERE
            tp.id_produto = ?

   `

   let [response] = await con.query(comando, id)

   return response[0]
}