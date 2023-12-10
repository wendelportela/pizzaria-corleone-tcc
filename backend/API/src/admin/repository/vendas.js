import { con } from '../../conection.js'

export async function ListarVendas() {
    let comando = `
    SELECT
    tb_pedido.id_pedido,
    tb_pedido.id_cliente,
    tb_pedido.id_tipo_pagamento,
    tb_tp_pagamento.id_tp_pagamento,
    tb_tp_pagamento.tp_pix,
    tb_tp_pagamento.tp_dinheiro,
    tb_pedido.ds_nota_pag,
    tb_pedido.dt_pedido,
    tb_pedido.ds_situacao
FROM
    tb_pedido
INNER JOIN
    tb_tp_pagamento
ON
    tb_pedido.id_tipo_pagamento = tb_tp_pagamento.id_tp_pagamento
    `

    const [resposta] = await con.query(comando)
    return resposta;
}


export async function Grafico() {
    let comando = `
            SELECT
            DATE(p.dt_pedido) AS data,
            SUM(CAST(pp.ds_subtotal AS DECIMAL(10, 2))) AS subtotal,
            SUM(CAST(pp.ds_total AS DECIMAL(10, 2))) AS total
        FROM
            tb_pedido_produto pp
        LEFT JOIN
            tb_pedido p ON pp.id_pedido_produto = p.id_pedido_produto
        WHERE
            pp.ds_total IS NOT NULL            -- Mostrar apenas linhas com total não nulo
            AND pp.ds_total <> 0                -- Mostrar apenas linhas com total diferente de zero
            AND p.dt_pedido IS NOT NULL  -- Adicionado para garantir que a data não seja nula
        GROUP BY
            DATE(p.dt_pedido)
    `

    const [resposta] = await con.query(comando)
    return resposta;
}