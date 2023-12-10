-- // tabela media ///



    select   tb_produto.id_produto             as ID,
            tb_produto.nm_produto             as nome,
            tb_media.ds_media                 as media
    from tb_produto
    left JOIN tb_media ON tb_media.id_produto = tb_produto.id_produto
    where tb_produto.id_produto = 1;
    
    select tb_produto.id_produto     as id_produto,    
            tb_produto.nm_produto     as produto,    
            tb_comentario.id_avaliacao as avaliacao
    from tb_produto
    left JOIN tb_comentario ON tb_comentario.id_produto = tb_produto.id_produto
    where tb_produto.id_produto = 1;
    

     SELECT
    tb_produto.id_produto             as ID,
      tb_produto.nm_produto             as nome, 
    tb_tipo_produto.ds_tipo_produto   as tipo,
    tb_produto.ds_ingredientes        as ingredientes,
      tb_produto.ds_descricao           as descricao,
    tb_produto.vl_preco               as preço,
    tb_produto.vl_preco_promocional   as preco_promocional,
      tb_produto.bt_disponivel          as disponivel,
      tb_imagem.id_imagem               as idimagem,
      tb_imagem.img_produto                 as imagem,
      tb_restricao.id_restricao         as idrestricao,
    tb_restricao.ds_restricao         as restricao,
     tb_media.ds_media                   as media 
  FROM
      tb_produto
  INNER JOIN
        tb_tipo_produto ON tb_produto.ds_tipo_produto = tb_tipo_produto.id_tipo_produto
  left JOIN tb_imagem ON tb_imagem.id_produto = tb_produto.id_produto
  left JOIN tb_restricao ON tb_restricao.id_produto = tb_produto.id_produto
   left join tb_media ON   tb_media.id_produto = tb_produto.id_produto;


-- // tabela avaliacao //
               
                  
select * from tb_avaliacao ;


INSERT INTO  tb_associado (nm_nome,ds_email,ds_senha,ds_cnpj)
					VALUES('1' , '1','1','1');

-- GGFG  // tabela endereco ///


INSERT INTO tb_endereco (ds_estado, ds_cidade, ds_bairro, ds_rua, ds_numero, ds_cep)
VALUES ('São Paulo', 'São Paulo', 'Grajau', 'Rua da Amostra, 123', '123', '12345-678');
 
 
SELECT *
FROM tb_endereco;

DELETE FROM tb_endereco 
WHERE id_endereco = 1;





-- GGFG // tabela cartao ///


INSERT INTO tb_cartao (ds_numero, ds_nome, ds_validade, ds_cvv)
			   VALUES ('1234567890123456', 'João Silva', '12/25', '123');
               
               INSERT INTO tb_cartao ( ds_numero , ds_nome ,ds_validade ,ds_cvv)
			   VALUES ( ' 0000-0000 ', 'maximosmiguel' , '28/12' , '123' );

SELECT *
FROM tb_cartao;

DELETE 
FROM tb_cartao 
WHERE id_cartao = 1;



-- GGFG // TABELA CLIENTE //

SELECT
    tb_cliente.id_cliente    AS ID,
    tb_cliente.nm_cliente    AS Nome_cliente,
    tb_cliente.ds_email      AS Email,
    tb_endereco.ds_estado    AS Estado,
    tb_endereco.ds_municipio AS Municipio,
    tb_endereco.ds_rua       AS Rua,
    tb_endereco.ds_numero    AS Numero,
    tb_endereco.ds_cep       AS Cep,
    tb_cartao.ds_numero      AS Numero_cartao,
    tb_cartao.ds_nome        AS Nome_cartao,
    tb_cartao.ds_validade    AS Validade,
    tb_cartao.ds_cvv AS ds_cvv_cartao
FROM
    tb_cliente
INNER JOIN
    tb_endereco ON tb_cliente.id_endereco = tb_endereco.id_endereco
LEFT JOIN
    tb_cartao ON tb_cliente.id_cartao = tb_cartao.id_cartao;

select * from tb_cliente;

DELETE
FROM tb_cliente
WHERE id_cliente = 1;




-- GGFG  // TABELA RESTRICAO //

INSERT INTO tb_restricao (ds_restricao , id_produto)
				  VALUES (  'glutem' ,1) ;

SELECT
    tb_restricao.id_restricao  as id,
    tb_restricao.ds_restricao  as Restrição ,
    tb_produto.nm_produto      as Produto
FROM
    tb_restricao
INNER JOIN
    tb_produto ON tb_restricao.id_produto = tb_produto.id_produto;



UPDATE  tb_restricao
SET     ds_restricao = 'OVO'
where   id_restricao = 1;

DELETE FROM    tb_restricao
WHERE          id_restricao = 1;



-- GGFG  // tabela tipo do produto //



                     
SELECT  id_tipo_produto  as ID,
		ds_tipo_produto  as Classificação
FROM    tb_tipo_produto; 

SELECT  id_tipo_produto  as ID,
		ds_tipo_produto  as Classificação
FROM    tb_tipo_produto
WHERE ds_tipo_produto like'%bebida%'; 



UPDATE  tb_tipo_produto
SET     ds_tipo_produto = 'BEBIDAS'
WHERE   id_tipo_produto = 1;
      

DELETE FROM  tb_tipo_produto
WHERE        id_tipo_produto =1;


-- GGFG  // tabela comentrio //

select * from tb_cliente;

                   
SELECT
    tb_comentario.id_comentario AS ID,
    tb_comentario.ds_comentario AS Comentario,
    tb_produto.nm_produto AS produto,
    tb_cliente.nm_cliente AS cliente
FROM
    tb_comentario
INNER JOIN
    tb_produto ON tb_comentario.id_produto = tb_produto.id_produto
INNER JOIN
    tb_cliente ON tb_comentario.id_cliente = tb_cliente.id_cliente
    where tb_produto.id_produto = 1;
    

UPDATE tb_comentario
SET    ds_comentario  = 'gostei',
	   id_produto    = 1
WHERE  id_comentario  = 1 ;

DELETE FROM tb_comentario 
WHERE       id_comentario =1;


-- // tabela imagem ///

       
       
SELECT      tb_produto.id_produto  as Produto,
            tb_produto.nm_produto as Produto,
            tb_produto.ds_tipo_produto as Classificação,
            tb_produto.vl_preco as Preço,
            tb_produto.vl_preco_promocional as Preço_promocional,
            tb_produto.ds_ingredientes as Ingredientes,
            tb_produto.ds_descricao as Descrição,
            tb_produto.bt_disponivel as Disponivel,
			tb_imagem.id_imagem  as id_imagem,  
            tb_imagem.img_produto as imagem 
          
FROM       tb_imagem 
INNER JOIN tb_produto ON tb_imagem.id_produto = tb_produto.id_produto;


insert into tb_imagem (id_produto , img_produto)
			   VALUES ( 1 , '');

    SELECT
    tb_produto.id_produto             as ID,
      tb_produto.nm_produto             as nome, 
    tb_tipo_produto.ds_tipo_produto   as tipo,
    tb_produto.ds_ingredientes        as ingredientes,
      tb_produto.ds_descricao           as descricao,
    tb_produto.vl_preco               as preço,
    tb_produto.vl_preco_promocional   as preco_promocional,
      tb_produto.bt_disponivel          as disponivel,
      tb_imagem.img_produto             as imagem,
      tb_restricao.id_restricao         as idrestricao,
    tb_restricao.ds_restricao         as restricao
  FROM
      tb_produto
  INNER JOIN
        tb_tipo_produto ON tb_produto.ds_tipo_produto = tb_tipo_produto.id_tipo_produto
  left JOIN tb_imagem ON tb_imagem.id_produto = tb_produto.id_produto
  left JOIN tb_restricao ON tb_restricao.id_produto = tb_produto.id_produto
  where tb_produto.id_produto = 1;



             
                
--  // select to produto que tem restricao          
     
SELECT
	tb_produto.id_produto             as ID,
    tb_produto.nm_produto             as nome, 
	tb_tipo_produto.ds_tipo_produto   as tipo ,
	tb_produto.ds_ingredientes        as ingredientes,
    tb_produto.ds_descricao           as descricao ,
	tb_produto.vl_preco               as preço,
	tb_produto.vl_preco_promocional   as Preco_promocional,
    tb_produto.bt_disponivel          as disponivel,
    tb_restricao.ds_restricao         as restricao
FROM
    tb_produto
INNER JOIN
      tb_tipo_produto ON tb_produto.ds_tipo_produto = tb_tipo_produto.id_tipo_produto
left JOIN tb_restricao ON tb_restricao.id_produto = tb_produto.id_produto;
 
 
-- // selct tabela produto com imagem //

SELECT
	tb_produto.id_produto             as ID,
    tb_produto.nm_produto             as nome, 
	tb_tipo_produto.ds_tipo_produto   as tipo ,
	tb_produto.ds_ingredientes        as ingredientes,
    tb_produto.ds_descricao           as descricao ,
	tb_produto.vl_preco               as preço,
	tb_produto.vl_preco_promocional   as Preco_promocional,
    tb_produto.bt_disponivel          as disponivel,
    tb_imagem.img_produto             as imagem
FROM
    tb_produto
INNER JOIN
      tb_tipo_produto ON tb_produto.ds_tipo_produto = tb_tipo_produto.id_tipo_produto
left JOIN tb_imagem ON tb_imagem.id_produto = tb_produto.id_produto;    
    
    
    
    
    
-- // select da tabela produto com a jução das tres tabelas ( produto , imagem , restrição ) ///

    SELECT
	tb_produto.id_produto             as ID,
    tb_produto.nm_produto             as nome, 
	tb_tipo_produto.ds_tipo_produto   as tipo ,
	tb_produto.ds_ingredientes        as ingredientes,
    tb_produto.ds_descricao           as descricao ,
	tb_produto.vl_preco               as preço,
	tb_produto.vl_preco_promocional   as Preco_promocional,
    tb_produto.bt_disponivel          as disponivel,
    tb_imagem.img_produto             as imagem,
	tb_restricao.ds_restricao         as restricao
FROM
    tb_produto
INNER JOIN
      tb_tipo_produto ON tb_produto.ds_tipo_produto = tb_tipo_produto.id_tipo_produto
left JOIN tb_imagem ON tb_imagem.id_produto = tb_produto.id_produto
left JOIN tb_restricao ON tb_restricao.id_produto = tb_produto.id_produto;


    
 -- select tabela produto com o tipo 
 
select 
    	tb_produto.id_produto         as ID,
    tb_produto.nm_produto             as Nome, 
	tb_tipo_produto.ds_tipo_produto   as Tipo ,
	tb_produto.ds_ingredientes        as ingredientes,
    tb_produto.ds_descricao           as Descrição ,
	tb_produto.vl_preco               as Preço,
	tb_produto.vl_preco_promocional   as Preço_promocional,
    tb_produto.bt_disponivel          as disponivel
    
FROM tb_produto
INNER JOIN tb_tipo_produto ON tb_produto.ds_tipo_produto = tb_tipo_produto.id_tipo_produto;
  
  
-- select pelo nome do produto 

    SELECT
	tb_produto.id_produto             as ID,
    tb_produto.nm_produto             as nome, 
	tb_tipo_produto.ds_tipo_produto   as tipo ,
	tb_produto.ds_ingredientes        as ingredientes,
    tb_produto.ds_descricao           as descricao ,
	tb_produto.vl_preco               as preço,
	tb_produto.vl_preco_promocional   as Preco_promocional,
    tb_produto.bt_disponivel          as disponivel,
    tb_imagem.img_produto             as imagem,
	tb_restricao.ds_restricao         as restricao
FROM
    tb_produto
INNER JOIN
      tb_tipo_produto ON tb_produto.ds_tipo_produto = tb_tipo_produto.id_tipo_produto
left JOIN tb_imagem ON tb_imagem.id_produto = tb_produto.id_produto
left JOIN tb_restricao ON tb_restricao.id_produto = tb_produto.id_produto
where tb_produto.nm_produto like '%novo%';

-- busca por tipo 

  SELECT
	tb_produto.id_produto             as ID,
    tb_produto.nm_produto             as nome, 
	tb_tipo_produto.ds_tipo_produto   as tipo ,
	tb_produto.ds_ingredientes        as ingredientes,
    tb_produto.ds_descricao           as descricao ,
	tb_produto.vl_preco               as preço,
	tb_produto.vl_preco_promocional   as Preco_promocional,
    tb_produto.bt_disponivel          as disponivel,
    tb_imagem.img_produto             as imagem,
	tb_restricao.ds_restricao         as restricao
FROM
    tb_produto
INNER JOIN
      tb_tipo_produto ON tb_produto.ds_tipo_produto = tb_tipo_produto.id_tipo_produto
left JOIN tb_imagem ON tb_imagem.id_produto = tb_produto.id_produto
left JOIN tb_restricao ON tb_restricao.id_produto = tb_produto.id_produto
where tb_tipo_produto.ds_tipo_produto like '%N%';



   
-- update do produto com o tipo   

UPDATE tb_produto
INNER JOIN tb_tipo_produto ON tb_produto.ds_tipo_produto = tb_tipo_produto.id_tipo_produto
SET
    tb_produto.nm_produto = 'Novo Nome',
    tb_tipo_produto.ds_tipo_produto = 'Nova Classificação',
    tb_produto.ds_ingredientes = 'Novo Comentário',
  	tb_produto.vl_preco = 'Novo Preço',
    tb_produto.ds_descricao = 'Nova Descrição',
    tb_produto.vl_preco_promocional = 'Novo Preço Promocional',
    tb_produto.bt_disponivel = 1
WHERE tb_produto.id_produto = 1;



-- update do produto atualizando as tres tabelas ( imagem , produto , restricao )
UPDATE tb_produto
INNER JOIN tb_tipo_produto ON tb_produto.ds_tipo_produto = tb_tipo_produto.id_tipo_produto
left JOIN tb_imagem ON tb_imagem.id_produto = tb_produto.id_produto
left JOIN tb_restricao ON tb_restricao.id_produto = tb_produto.id_produto
SET
    tb_produto.nm_produto = 'Novo Nome',
    tb_tipo_produto.ds_tipo_produto = 'Nova Classificação',
    tb_produto.ds_ingredientes = 'Novo Comentário',
  	tb_produto.vl_preco = 'Novo Preço',
    tb_produto.ds_descricao = 'Nova Descrição',
    tb_produto.vl_preco_promocional = 'Novo Preço Promocional',
    tb_produto.bt_disponivel = 1,
	tb_imagem.img_produto    = 'imagem atualizada',
	tb_restricao.ds_restricao  ='ovo'     
WHERE tb_produto.id_produto = 1
and   tb_restricao.id_restricao=1
and   tb_imagem.id_imagem = 1;

-- filtro que mostra todos os comentarios e avliacao
    SELECT
    tb_produto.id_produto             as ID,
      tb_produto.nm_produto             as nome, 
    tb_tipo_produto.ds_tipo_produto   as tipo,
    tb_produto.ds_ingredientes        as ingredientes,
      tb_produto.ds_descricao           as descricao,
    tb_produto.vl_preco               as preço,
    tb_produto.vl_preco_promocional   as preco_promocional,
      tb_produto.bt_disponivel          as disponivel,
      tb_imagem.img_produto             as imagem,
      tb_restricao.id_restricao         as idrestricao,
    tb_restricao.ds_restricao         as restricao,
    tb_comentario.ds_comentario       as comentario,
     tb_comentario.id_avaliacao        as avaliacao
  FROM
      tb_produto
  INNER JOIN
        tb_tipo_produto ON tb_produto.ds_tipo_produto = tb_tipo_produto.id_tipo_produto
  left JOIN tb_imagem ON tb_imagem.id_produto = tb_produto.id_produto
  left JOIN tb_restricao ON tb_restricao.id_produto = tb_produto.id_produto
  left JOIN tb_comentario ON tb_comentario.id_produto = tb_produto.id_produto
  where tb_produto.id_produto = ?;




DELETE FROM tb_produto
WHERE   id_produto = 1;


/// tabela favorito

insert into tb_favorito(id_cliente , id_produto , ds_favorito)
	 values (7,8,true);



SELECT  
CASE 
    WHEN ds_favorito = 0 THEN 'false' 
    WHEN ds_favorito = 1 THEN 'Favorito'
    ELSE 'valor inválido'
END AS valor, 


tb_cliente.nm_cliente AS cliente,
tb_favorito.id_cliente,
tb_produto.nm_produto as produto,
tb_favorito.id_produto,
ds_favorito,
id_favorito
FROM tb_favorito

LEFT JOIN tb_cliente ON tb_favorito.id_cliente = tb_cliente.id_cliente
LEFT JOIN tb_produto ON tb_favorito.id_produto = tb_produto.id_produto
where tb_produto.id_produto = 8
and   tb_cliente.id_cliente = 7;






SELECT 
CASE 
    WHEN ds_favorito = 0 THEN 'false' 
    WHEN ds_favorito = 1 THEN 'Favorito'
    ELSE 'valor inválido'
END AS valor, 


tb_cliente.nm_cliente AS cliente,
tb_favorito.id_cliente,
tb_produto.nm_produto as produto,
tb_favorito.id_produto,
ds_favorito,
id_favorito
FROM tb_favorito

LEFT JOIN tb_cliente ON tb_favorito.id_cliente = tb_cliente.id_cliente
LEFT JOIN tb_produto ON tb_favorito.id_produto = tb_produto.id_produto;

update  tb_favorito 
set     ds_favorito = true
where   id_favorito = 4;


-- tabela carrinho

-- todos os produtos

insert tb_carrinho (id_produto , id_cliente,ds_carrinho,ds_qtd)
			values (3,4,true,1);
select 
case 
when  ds_carrinho = 0 then 'indisponível'
when  ds_carrinho = 1 then 'disponivel'
end   as carrinho ,
id_carrinho , 
tb_produto.nm_produto as produto,
tb_produto.vl_preco   as preco,
tb_carrinho.ds_qtd as quantidade ,
tb_produto.id_produto,
tb_cliente.nm_cliente as cliente,
tb_cliente.id_cliente 
from tb_carrinho
LEFT JOIN tb_cliente ON tb_carrinho.id_cliente = tb_cliente.id_cliente
LEFT JOIN tb_produto ON tb_carrinho.id_produto = tb_produto.id_produto;


-- produtos disponiveis no carrinho 

select 
case 
when  ds_carrinho = 0 then 'indisponível'
when  ds_carrinho = 1 then 'disponivel'
end   as carrinho ,
id_carrinho , 
tb_produto.nm_produto as produto,
tb_produto.vl_preco   as preco,
tb_carrinho.ds_qtd as quantidade ,
tb_produto.id_produto,
tb_cliente.nm_cliente as cliente,
tb_cliente.id_cliente 
from tb_carrinho
LEFT JOIN tb_cliente ON tb_carrinho.id_cliente = tb_cliente.id_cliente
LEFT JOIN tb_produto ON tb_carrinho.id_produto = tb_produto.id_produto
where tb_carrinho.ds_carrinho = 1;

update tb_carrinho
set    ds_carrinho   = true,
       ds_qtd = 1
where  id_carrinho   = 1 ;




select 
case 
when  ds_carrinho = 0 then 'indisponível'
when  ds_carrinho = 1 then 'disponivel'
end   as carrinho ,
id_carrinho , 
tb_produto.nm_produto as produto,
tb_produto.vl_preco   as preco,
tb_carrinho.ds_qtd as quantidade ,
tb_produto.id_produto,
tb_cliente.nm_cliente as cliente,
tb_cliente.id_cliente 
from tb_carrinho
LEFT JOIN tb_cliente ON tb_carrinho.id_cliente = tb_cliente.id_cliente
LEFT JOIN tb_produto ON tb_carrinho.id_produto = tb_produto.id_produto
where tb_cliente.id_cliente = 4


select 
case 
when  ds_carrinho = 0 then 'indisponível'
when  ds_carrinho = 1 then 'disponivel'
end   as carrinho ,
id_carrinho , 
tb_produto.nm_produto as produto,
tb_produto.vl_preco   as preco,
tb_carrinho.ds_qtd as quantidade ,
tb_produto.id_produto,
tb_cliente.nm_cliente as cliente,
tb_cliente.id_cliente 
from tb_carrinho
LEFT JOIN tb_cliente ON tb_carrinho.id_cliente = tb_cliente.id_cliente
LEFT JOIN tb_produto ON tb_carrinho.id_produto = tb_produto.id_produto
where tb_cliente.id_cliente = 4
and   tb_produto.id_produto =3;




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
WHERE tb_produto_sugestao.ds_tipo_produto = 3
AND tb_produto_produto.id_produto = 1;





SELECT
    tb_produto_produto.nm_produto AS produto,
    tb_produto_produto.vl_preco AS preco,
    tb_produto_produto.id_produto AS produto_id,
    tb_produto_sugestao.id_produto AS id_pizza_sugestao,
    tb_produto_sugestao.nm_produto AS sugestao_produto,
    tb_produto_sugestao.vl_preco AS sugestao_preco,
    tb_produto_img.img_produto,
    tb_produto_produto.ds_tipo_produto as tipo,
    tb_sugestao.id_sugestao
FROM tb_sugestao
LEFT JOIN tb_produto   AS tb_produto_sugestao ON tb_sugestao.id_produto   = tb_produto_sugestao.id_produto
LEFT JOIN tb_produto   AS tb_produto_produto  ON tb_sugestao.ds_sugestao  = tb_produto_produto.id_produto
LEFT JOIN tb_imagem    AS tb_produto_img      ON tb_sugestao.id_produto   = tb_produto_img.id_produto
where tb_produto_produto.ds_tipo_produto = 1
and   tb_produto_produto.id_produto      = 1;



SELECT
  tb_pedido_produto.id_pedido_produto,
  tb_cliente.id_cliente,
  tb_cliente.nm_cliente AS nome_cliente,
  tb_pedido_produto.ds_total,
  tb_pedido_produto.ds_produtos
FROM tb_pedido_produto
INNER JOIN tb_cliente ON tb_pedido_produto.id_cliente = tb_cliente.id_cliente;



INSERT INTO tb_pedido_produto (id_cliente, ds_produtos, ds_total)
VALUES (
  1, 
  '{
    "produtos": [
      {"id_produto": 1, "quantidade": 3},
      {"id_produto": 2, "quantidade": 2}
    ]
  }',
  '150'
);