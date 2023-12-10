        --    \\inserts obrigatorios para o funcionamento// ---


-- // tabela avaliacao //
INSERT INTO tb_avaliacao (ds_avaliacao)
				  values ('1');
INSERT INTO tb_avaliacao (ds_avaliacao)
				  values ('2');
INSERT INTO tb_avaliacao (ds_avaliacao)
				  values ('3');
INSERT INTO tb_avaliacao (ds_avaliacao)
				  values ('4');
INSERT INTO tb_avaliacao (ds_avaliacao)
				  values ('5');
INSERT INTO tb_avaliacao (ds_avaliacao)
				  values ('6');     



-- GGFG  // tabela tipo do produto //


INSERT INTO tb_tipo_produto ( ds_tipo_produto ) 
					 VALUES ( 'bebida');
                     
INSERT INTO tb_tipo_produto ( ds_tipo_produto ) 
					 VALUES ( 'sobremesa');          
                     
INSERT INTO tb_tipo_produto ( ds_tipo_produto ) 
					 VALUES ( 'salgado');
                     

INSERT INTO tb_tipo_produto ( ds_tipo_produto ) 
					 VALUES ( 'vegano');       
                     
INSERT INTO tb_tipo_produto ( ds_tipo_produto ) 
					 VALUES ( 'vegetariano');



-- // tabela produto ///

INSERT INTO tb_produto (ds_tipo_produto	, nm_produto , ds_ingredientes  , vl_preco , ds_descricao , vl_preco_promocional , bt_disponivel) 
                VALUES ( 3 , 'Margherita', 'Farinha, água, sal, fermento ,molho de tomate, muçarela fresca, manjericão fresco, azeite de oliva extra virgem' , '71,00' , ' Saboreie a autêntica Pizza Margherita, feita com ingredientes frescos e de qualidade superior. A combinação perfeita de molho de tomate suculento, queijo mozzarella e manjericão fresco cria uma experiência única. ' ,'30' , true);
                

-- Inserir Pizza Pepperoni
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES (
  'Pepperoni',
  'Pepperoni, queijo mozzarella, molho de tomate',
  3,
  71.00,
  'Deliciosa pizza de Pepperoni, com ingredientes de alta qualidade.',
  30.00,
  true
);

-- Inserir Pizza Prosciutto e Funghi
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES (
  'Prosciutto e Funghi',
  'Presunto Parma, cogumelos, queijo mozzarella, molho de tomate',
  3,
  75.00,
  'Uma combinação incrível de presunto Parma, cogumelos e queijo mozzarella.',
  32.00,
  true
);

-- Inserir Pizza Capricciosa
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES (
   
  'Capricciosa',
  'Presunto cozido, alcachofras, azeitonas, cogumelos, queijo mozzarella, molho de tomate',
  3,
  80.00,
  'Uma pizza recheada com sabores variados, incluindo presunto, alcachofras e cogumelos.',
  35.00,
  true
);

-- Inserir Pizza Marinara
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES (
  'Marinara',
  'Molho de tomate, alho, orégano, azeite de oliva extra virgem',
  3,
  65.00,
  'Pizza clássica italiana com molho de tomate, alho e orégano.',
  28.00,
  true
);

-- Inserir Pizza Carbonara
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES (
  'Carbonara',
  'Ovos, queijo Pecorino Romano, bacon, queijo mozzarella, molho de tomate',
  3,
  78.00,
  'Uma pizza rica em sabores, com bacon e queijo Pecorino Romano.',
  33.00,
  true
);

-- Inserir Pizza Calzone
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES (
  'Calzone',
  'Presunto, queijo mozzarella, ricota, molho de tomate',
  3,
  70.00,
  'Um delicioso calzone recheado com presunto, queijo mozzarella e ricota.',
  30.00,
  true
);

-- Inserir Pizza Margherita com Burrata
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES (

  'Margherita com Burrata',
  'Farinha, água, sal, fermento, molho de tomate, muçarela fresca, manjericão fresco, azeite de oliva extra virgem, burrata',
  3,
  85.00,
  'Uma versão indulgente da clássica Margherita, com adição de burrata cremosa.',
  38.00,
  true
);
-- Inserir cupom 1
INSERT INTO tb_cupom (nm_cupom, ds_valor) VALUES ('CUPOM10', 10);

-- Inserir cupom 2
INSERT INTO tb_cupom (nm_cupom, ds_valor) VALUES ('DESCONTO20', 20);

-- Inserir cupom 3
INSERT INTO tb_cupom (nm_cupom, ds_valor) VALUES ('OFERTA50', 50);

INSERT INTO tb_cupom (nm_cupom, ds_valor) VALUES ('CORLEONE15', 15/100);

insert into  tb_restricao (id_produto,ds_restricao)
                     values (1,'lactose'); 
                     
insert into  tb_restricao (id_produto,ds_restricao)
                     values (2,'vegano'); 
                     
insert into  tb_restricao (id_produto,ds_restricao)
                     values (3,'vegetariano'); 
                     
insert into  tb_restricao (id_produto,ds_restricao)
                     values (4,'vegano'); 

insert into  tb_restricao (id_produto,ds_restricao)
                     values (5, 'gluten'); 

insert into  tb_restricao (id_produto,ds_restricao)
                     values (6,'ovo'); 

 insert into  tb_restricao (id_produto,ds_restricao)
                     values (7,'gluten');                     


INSERT INTO tb_associado (nm_nome, ds_email, ds_senha, ds_cnpj)
VALUES ('corleone', 'corleonemkmw@.com', 'mkmw123', '123456');


-- INSERTS TABELA SUGESTAO


INSERT INTO tb_sugestao (id_produto, ds_sugestao) VALUES (1, 1);

INSERT INTO tb_sugestao (id_produto, ds_sugestao) VALUES (2, 2);


INSERT INTO tb_sugestao (id_produto, ds_sugestao) VALUES (3, 3);


INSERT INTO tb_sugestao (id_produto, ds_sugestao) VALUES (4, 4);

INSERT INTO tb_sugestao (id_produto, ds_sugestao) VALUES (5, 5);

INSERT INTO tb_sugestao (id_produto, ds_sugestao) VALUES (6, 6);

INSERT INTO tb_sugestao (id_produto, ds_sugestao) VALUES (7, 7);

INSERT INTO tb_sugestao (id_produto, ds_sugestao) VALUES (8, 8);


-- Exemplo 1
INSERT INTO tb_endereco (ds_estado, ds_cidade, ds_bairro, ds_rua, ds_numero, ds_cep)
VALUES ('São Paulo', 'São Paulo', 'Moema', 'Alameda dos Anapurus', '789', '04087-031');

-- Exemplo 2
INSERT INTO tb_endereco (ds_estado, ds_cidade, ds_bairro, ds_rua, ds_numero, ds_cep)
VALUES ('Rio de Janeiro', 'Rio de Janeiro', 'Ipanema', 'Rua Visconde de Pirajá', '456', '22410-003');

-- Exemplo 3
INSERT INTO tb_endereco (ds_estado, ds_cidade, ds_bairro, ds_rua, ds_numero, ds_cep)
VALUES ('Minas Gerais', 'Belo Horizonte', 'Savassi', 'Rua Pernambuco', '101', '30130-150');

-- Exemplo 4
INSERT INTO tb_endereco (ds_estado, ds_cidade, ds_bairro, ds_rua, ds_numero, ds_cep)
VALUES ('Bahia', 'Salvador', 'Barra', 'Avenida Oceânica', '2001', '40170-010');

-- Exemplo 5
INSERT INTO tb_endereco (ds_estado, ds_cidade, ds_bairro, ds_rua, ds_numero, ds_cep)
VALUES ('Pernambuco', 'Recife', 'Boa Viagem', 'Avenida Boa Viagem', '1234', '51030-300');

-- Exemplo 6
INSERT INTO tb_endereco (ds_estado, ds_cidade, ds_bairro, ds_rua, ds_numero, ds_cep)
VALUES ('Paraná', 'Curitiba', 'Batel', 'Rua Buenos Aires', '567', '80240-040');

-- Exemplo 7
INSERT INTO tb_endereco (ds_estado, ds_cidade, ds_bairro, ds_rua, ds_numero, ds_cep)
VALUES ('Ceará', 'Fortaleza', 'Meireles', 'Avenida Beira Mar', '987', '60165-120');

-- Exemplo 8
INSERT INTO tb_endereco (ds_estado, ds_cidade, ds_bairro, ds_rua, ds_numero, ds_cep)
VALUES ('Santa Catarina', 'Florianópolis', 'Centro', 'Rua Felipe Schmidt', '321', '88010-003');

-- Exemplo 9
INSERT INTO tb_endereco (ds_estado, ds_cidade, ds_bairro, ds_rua, ds_numero, ds_cep)
VALUES ('Amazonas', 'Manaus', 'Adrianópolis', 'Avenida Mário Ypiranga', '654', '69057-002');

-- Exemplo 10
INSERT INTO tb_endereco (ds_estado, ds_cidade, ds_bairro, ds_rua, ds_numero, ds_cep)
VALUES ('Goiás', 'Goiânia', 'Setor Marista', 'Rua 1133', '789', '74180-150');


--  tabela tb_cliente
INSERT INTO tb_cliente (id_endereco, nm_cliente, ds_email, ds_telefone, ds_senha, ds_cpf, ds_nacimento)
VALUES 
(1, 'John Doe', 'john.doe@example.com', '123456789', 'senha123', '111.222.333-00', '1990-01-01'),
(2, 'Jane Smith', 'jane.smith@example.com', '987654321', 'senha456', '444.555.666-00', '1985-05-15'),
(3, 'Alice Johnson', 'alice.johnson@example.com', '555444333', 'senha789', '999.888.777-00', '1992-08-20'),
(4, 'Bob Anderson', 'bob.anderson@example.com', '111222333', 'senhaABC', '777.666.555-00', '1988-03-10'),
(5, 'Eva Martin', 'eva.martin@example.com', '999888777', 'senhaXYZ', '333.444.555-00', '1995-12-05'),
(6, 'Michael White', 'michael.white@example.com', '123123123', 'senha456ABC', '888.999.000-00', '1983-07-22'),
(7, 'Sophia Turner', 'sophia.turner@example.com', '444555666', 'senhaXYZ123', '222.333.444-00', '1998-02-18'),
(8, 'David Harris', 'david.harris@example.com', '777888999', 'senha123ABC', '666.777.888-00', '1980-09-14'),
(9, 'Olivia Taylor', 'olivia.taylor@example.com', '111000222', 'senhaXYZ456', '555.444.333-00', '1994-06-28'),
(10, 'William Lewis', 'william.lewis@example.com', '555666777', 'senha789ABC', '444.333.222-00', '1987-11-02');



-- TABELA CARTAO


-- tabela tb_cartao
INSERT INTO tb_cartao (id_cliente, ds_numero, ds_nome, ds_validade, ds_cvv)
VALUES 
(1, '1111222233334444', 'John Doe', '12/25', '123'),
(2, '5555666677778888', 'Jane Smith', '06/23', '456'),
(3, '9999000011112222', 'Alice Johnson', '09/24', '789'),
(4, '1234123412341234', 'Bob Anderson', '03/22', '321'),
(5, '9876987698769876', 'Eva Martin', '11/21', '654'),
(6, '4567456745674567', 'Michael White', '08/23', '987'),
(7, '2345234523452345', 'Sophia Turner', '05/25', '210'),
(8, '8765876587658765', 'David Harris', '02/26', '543'),
(9, '3456345634563456', 'Olivia Taylor', '06/24', '876'),
(10, '7890789078907890', 'William Lewis', '09/22', '109');



-- UM CLICK ACABA AQUI


-- tabela pedido produto

--  tabela tb_pedido_produto
INSERT INTO tb_pedido_produto (id_cliente, ds_produtos, ds_subtotal, ds_total, ds_desconto, ds_frete)
VALUES 
(1, '["Produto1", "Produto2"]', '50.00', '60.00', '5.00', '5.00'),
(2, '["Produto3", "Produto4"]', '70.00', '100.00', '3.00', '7.00'),
(3, '["Produto5", "Produto6"]', '75.00', '80.00', '8.00', '2.00'),
(4, '["Produto7", "Produto8"]', '90.00', '110.00', '10.00', '8.00'),
(5, '["Produto9", "Produto10"]', '120.00', '140.00', '15.00', '10.00'),
(6, '["Produto11", "Produto12"]', '80.00', '100.00', '7.00', '6.00'),
(7, '["Produto13", "Produto14"]', '60.00', '70.00', '6.00', '4.00'),
(8, '["Produto15", "Produto16"]', '110.00', '130.00', '12.00', '9.00'),
(9, '["Produto17", "Produto18"]', '95.00', '115.00', '9.00', '7.00'),
(10, '["Produto19", "Produto20"]', '85.00', '95.00', '8.00', '5.00');





-- TABELA PEDIDO
-- tabela tb_pedido
INSERT INTO tb_pedido (id_cliente, id_cartao, id_pedido_produto, dt_pedido, ds_situacao)
VALUES 
(1, 1, 1, '2023-11-15', 'Entregue'),
(2, 2, 2, '2023-11-16', 'Em preparo'),
(3, 3, 3, '2023-11-17', 'Entregue'),
(4, 4, 4, '2023-11-18', 'Em preparo'),
(5, 5, 5, '2023-11-19', 'Entregue'),
(6, 6, 6, '2023-11-20', 'Em preparo'),
(7, 7, 7, '2023-11-21', 'Entregue'),
(8, 8, 8, '2023-11-22', 'Em preparo'),
(9, 9, 9, '2023-11-23', 'Entregue'),
(10, 10, 10, '2023-11-24', 'Em preparo');



 ---PIZZAS

 -- pizza Margheria
 INSERT INTO tb_produto (ds_tipo_produto, ds_ingredientes, nm_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES (3, 'Molho de tomate, queijo mozzarella, tomate fatiado, manjericão fresco e azeite de oliva.', 'Margherita', '71.00', 'Saboreie a autêntica Pizza Margherita, feita com ingredientes frescos e de qualidade superior. A combinação perfeita de molho de tomate suculento, queijo mozzarella e manjericão fresco cria uma experiência única.',10.00, true);
INSERT INTO tb_imagem (id_produto, img_produto) VALUES (1, 'storage/produto/ea1eea5a561b1046686c5329b38bd8b1');
INSERT INTO tb_restricao (id_produto, ds_restricao)
VALUES (1, 'Ovo');

-- pizza Pepperoni
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES ('Pepperoni','Pepperoni, queijo mozzarella, molho de tomate',3,71.00,'Deliciosa pizza de Pepperoni, com ingredientes de alta qualidade.',30.00,true);
INSERT INTO tb_imagem (id_produto, img_produto)
VALUES (2, 'storage\\produto\\bebe39095954fd2d2b8f293f5c5f76bb');
INSERT INTO tb_restricao (id_produto, ds_restricao)
VALUES (2, 'vegano');

--  Pizza Prosciutto e Funghi
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES ('Prosciutto e Funghi','Presunto Parma, cogumelos, queijo mozzarella, molho de tomate', 3,75.00,'Uma combinação incrível de presunto Parma, cogumelos e queijo mozzarella.',32.00,true);
INSERT INTO tb_imagem (id_produto, img_produto) 
VALUES (3, 'storage\\produto\\eb52f0eb36ddb79cdb875e4144861d33');
INSERT INTO tb_restricao (id_produto, ds_restricao)
VALUES (3, 'glúten');


-- Pizza Capricciosa
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES ('Capricciosa','Presunto cozido, alcachofras, azeitonas, cogumelos, queijo mozzarella, molho de tomate',3,70.00,'Uma pizza recheada com sabores variados, incluindo presunto, alcachofras e cogumelos.',35.00,true);
INSERT INTO tb_imagem (id_produto, img_produto) 
VALUES (4, 'storage\\produto\\300409c1275d752d8e44a91b37a1dcb2');
INSERT INTO tb_restricao (id_produto, ds_restricao)
VALUES (4, 'ovo');


-- Pizza Marinara
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES ('Marinara','Molho de tomate, alho, orégano, azeite de oliva extra virgem',3,65.00,'Pizza clássica italiana com molho de tomate, alho e orégano.',28.00,true);
INSERT INTO tb_imagem (id_produto, img_produto) 
VALUES (5, 'storage\\produto\\90d187ff8745e578f0a488014e58c7bb');
INSERT INTO tb_restricao (id_produto, ds_restricao)
VALUES (5, 'glúten');


-- Pizza Carbonara
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES ('Carbonara','Ovos, queijo Pecorino Romano, bacon, queijo mozzarella, molho de tomate',3,78.00,'Uma pizza rica em sabores, com bacon e queijo Pecorino Romano.',33.00,  true);
INSERT INTO tb_imagem (id_produto, img_produto) 
VALUES (6, 'storage\\produto\\b80f247b36623e2b77252b059516f26b');
INSERT INTO tb_restricao (id_produto, ds_restricao)
VALUES (6, 'Leite e seus derivados');


-- Pizza Calzone
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES ('Calzone','Presunto, queijo mozzarella, ricota, molho de tomate',3,70.00,'Um delicioso calzone recheado com presunto, queijo mozzarella e ricota.',30.00,true);
INSERT INTO tb_imagem (id_produto, img_produto) 
VALUES (7, 'storage\\produto\\274faefb289cb66e97dce30e89d71d6d');
INSERT INTO tb_restricao (id_produto, ds_restricao)
VALUES (7, 'Leite e seus derivados');


-- Pizza Margherita com Burrata
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES ('Margherita com Burrata','Farinha, água, sal, fermento, molho de tomate, muçarela fresca, manjericão fresco, azeite de oliva extra virgem, burrata',3,75.00,'Uma versão indulgente da clássica Margherita, com adição de burrata cremosa.',38.00,true);
INSERT INTO tb_imagem (id_produto, img_produto) 
VALUES (8, 'storage\\produto\\b2492a9a0c0555be5a5f210710c432c0');
INSERT INTO tb_restricao (id_produto, ds_restricao)
VALUES (8, 'ovo');

-- Pizza Napoletana
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES ('Napoletana', 'Molho de tomate, alho, anchovas, azeitonas pretas e orégano', 3, 65.00, 'Uma clássica pizza napolitana com molho de tomate, alho, anchovas e azeitonas pretas.', 15, true);
INSERT INTO tb_imagem (id_produto, img_produto)
VALUES (9, 'storage\\produto\\ec3123605c0320282e387a2e3d071556');
INSERT INTO tb_restricao (id_produto, ds_restricao)
VALUES (9, 'glúten');

-- Pizza PizzaBBQChicken
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES ('PizzaBBQChicken', 'Frango desfiado, molho barbecue, queijo mozzarella, cebola roxa, coentro fresco', 3,70.00, 'Deliciosa pizza de frango com molho barbecue e ingredientes frescos.', 18.00, true);
INSERT INTO tb_imagem (id_produto, img_produto)
VALUES (10, 'storage\\produto\\7d07f50a02b4f71d2f960f554fcf5c31');
INSERT INTO tb_restricao (id_produto, ds_restricao)
VALUES (10, 'lactose');

-- Pizza Diavola
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES ('Diavola', 'Molho de tomate, queijo mozzarella, linguiça picante, azeitonas e orégano.', 3, 70.00, 'Uma explosão de sabores com a linguiça picante e as azeitonas.', 20.00, true);
INSERT INTO tb_imagem (id_produto, img_produto)
VALUES (11, 'storage\\produto\\9b9469f57a5f0ae6a57cb23c67ea368e');
INSERT INTO tb_restricao (id_produto, ds_restricao)
VALUES (11, 'ovo');

-- Pizza Quattro Formaggi
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES ('Quattro Formaggi', 'Mozzarella, Gorgonzola, Parmesão, Gruyère', 3, 65.00, 'Desfrute da deliciosa Quattro Formaggi, uma pizza rica em sabores com uma combinação perfeita de mozzarella cremosa, gorgonzola ousado, parmesão envelhecido e gruyère robusto. Cada mordida é uma experiência única para os amantes de queijo.', 10.00, true);
INSERT INTO tb_imagem (id_produto, img_produto)
VALUES (12, 'storage/produto/2684ccf950e32a5f2620a4fbaa3baf88');
INSERT INTO tb_restricao (id_produto, ds_restricao)
VALUES (12, 'vegetariano');

-- Pizza Vegetariana
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES ('Vegetariana', 'Molho de tomate, queijo mozzarella, abobrinha, berinjela, pimentão, cebola, azeitonas pretas', 3, 60.00, 'Experimente a deliciosa Vegetariana, uma pizza cheia de sabor e cores. Com molho de tomate fresco, queijo mozzarella derretido e uma variedade de vegetais frescos, cada pedaço é uma explosão de sabores naturais.', 8.00, true);
INSERT INTO tb_imagem (id_produto, img_produto)
VALUES (13, 'storage\\produto\\51688670fa7ac2445b16fc90405a3c1c');
INSERT INTO tb_restricao (id_produto, ds_restricao)
VALUES (13, 'vegano');

--SOBREMESA

-- Sobremesa Cannoli
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES ('Cannoli', 'Massa de cannoli crocante recheada com ricota, açúcar, chocolate e frutas cristalizadas.', 2, 15.00, 'Deliciosos cannoli recheados com uma mistura cremosa de ricota, açúcar, chocolate e frutas cristalizadas.', 5.00, true);
INSERT INTO tb_imagem (id_produto, img_produto)
VALUES (14, 'storage\\produto\\fc500063a0ff57069109d6e3eaf5a67b');
INSERT INTO tb_restricao (id_produto, ds_restricao)
VALUES (14, 'glúten');

-- Pizza Crostata
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES ('Crostata','Massa crocante, geleia de frutas vermelhas, frutas frescas',2,30.00,'Uma deliciosa crostata com massa crocante, recheada com geleia de frutas vermelhas e frutas frescas.',5.00, true);
INSERT INTO tb_imagem (id_produto, img_produto)
VALUES (15, 'storage\\produto\\adebc2925a18655dcd97625d21f4badf');
INSERT INTO tb_restricao (id_produto, ds_restricao)
VALUES (15, 'vegetariano');

-- sobremesa Panna Cotta
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES ('Panna Cotta', 'Creme de leite, açúcar, gelatina, baunilha', 2, 40.00, 'A clássica Panna Cotta, uma sobremesa italiana delicada e cremosa feita com creme de leite, açúcar, gelatina e baunilha.', 6.00, true);
INSERT INTO tb_imagem (id_produto, img_produto)
VALUES (16, 'storage\\produto\\1311d5120b54140b32805aca33504a9d');
INSERT INTO tb_restricao (id_produto, ds_restricao)
VALUES (16, 'Leite e seus derivados');

-- sobremesa Sfogliatelle
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES ('Sfogliatelle', 'Massa folhada, ricota, açúcar, canela, raspas de limão', 2, 20.00, 'Sfogliatelle é uma deliciosa sobremesa italiana com camadas finas de massa folhada recheada com ricota, açúcar, canela e raspas de limão.', 5.00, true);
INSERT INTO tb_imagem (id_produto, img_produto)
VALUES (17 ,'storage\\produto\\1031a651691c5a2cda548638df4079fd');
INSERT INTO tb_restricao (id_produto, ds_restricao)
VALUES (17, 'Glúten');

-- sobremesa Zabaione
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES ('Zabaione', 'Ovos, açúcar, vinho doce, frutas vermelhas para decorar', 2, 25.00, 'O Zabaione é uma deliciosa sobremesa italiana feita com gemas de ovos, açúcar e vinho doce. Servido com frutas vermelhas frescas para um toque final irresistível.', 4.00, true);
INSERT INTO tb_imagem (id_produto, img_produto)
VALUES (18, 'storage\\produto\\c650f9c15ab0dc338fde36bc4b5499a6');
INSERT INTO tb_restricao (id_produto, ds_restricao)
VALUES (18, 'Leite e seus derivados');

-- SOBREMESA
-- Vinho-CabernetSauvignon
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES ('Cabernet Sauvignon', 'Uvas Cabernet Sauvignon', 1, 60.00, 'Um vinho encorpado com aromas intensos de frutas vermelhas e notas de carvalho.', NULL, true);
INSERT INTO tb_imagem (id_produto, img_produto)
VALUES (19, 'storage\\produto\\a727fb40872d6b3caa56e6be2820f86e');
INSERT INTO tb_restricao (id_produto, ds_restricao)
VALUES (19, 'vegano');

--  Vinho Château Lafite Rothschild
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES ('Château Lafite Rothschild', 'Uvas Cabernet Sauvignon, Merlot, Cabernet Franc, Petit Verdot', 1, 1000.00, 'Um vinho tinto de alta qualidade com complexidade e elegância. Feito a partir de uma mistura de uvas, este vinho é envelhecido em barris de carvalho.', NULL, true);
INSERT INTO tb_imagem (id_produto, img_produto)
VALUES (20, 'storage\\produto\\ed58e3b065a1f333da68b86e65798cfa');
INSERT INTO tb_restricao (id_produto, ds_restricao)
VALUES (20, 'vegano');

-- vinho  Domaine de la Romanée-Conti
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES ('Domaine de la Romanée-Conti - Romanée-Conti', 'Blend de uvas Pinot Noir', 1, 80.00, 'Um vinho premium da Borgonha, conhecido por sua elegância e notas frutadas intensas.', NULL, true);
INSERT INTO tb_imagem (id_produto, img_produto)
VALUES (21, 'storage\\produto\\432a26bfc030ec111e141c57ea16d0da');
INSERT INTO tb_restricao (id_produto, ds_restricao)
VALUES (21, 'vegano');

-- vinho Opus One
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES ('Opus One', 'Cabernet Sauvignon, Merlot, Cabernet Franc, Malbec, Petit Verdot', 1, 90.00, 'Um vinho icônico com uma mistura complexa de variedades de uvas, resultando em um sabor rico e equilibrado.', NULL, true);
INSERT INTO tb_imagem (id_produto, img_produto)
VALUES (22, 'storage\\produto\\cc60e9c1bf949b4deb8d6f2d488916d0');
INSERT INTO tb_restricao (id_produto, ds_restricao)
VALUES (22, 'vegetariano');

-- vinho o VinSanto (Vinho do Porto Italiano)
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES ('VinSanto (Vinho do Porto Italiano)', 'Uvas passas, mel', 1, 50.00, 'Um vinho doce italiano conhecido por suas notas de frutas secas e mel.', NULL, true);
INSERT INTO tb_imagem (id_produto, img_produto)
VALUES (23, 'storage\\produto\\85b1004f45e9abf5cf2a1534e3bde926');
INSERT INTO tb_restricao (id_produto, ds_restricao)
VALUES (23, 'glúten');

-- Insert para o Amaro
INSERT INTO tb_produto (nm_produto, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel, ds_ingredientes)
VALUES ('Amaro', 1, 20.00, 'Licor amargo italiano tradicional, conhecido por suas notas complexas de ervas e especiarias.', NULL, true, 'Ervas e especiarias');
INSERT INTO tb_imagem (id_produto, img_produto)
VALUES (24, 'storage\\produto\\aca2f7835278b022ee30234685d9dccf');
INSERT INTO tb_restricao (id_produto, ds_restricao)
VALUES (24, 'glúten');

-- Aperol Spritz
INSERT INTO tb_produto (nm_produto, ds_ingredientes, ds_tipo_produto, vl_preco, ds_descricao, vl_preco_promocional, bt_disponivel)
VALUES ('Aperol Spritz', 'Aperol, Prosecco, água com gás', 1, 30.00, 'Uma bebida refrescante e efervescente feita com Aperol, Prosecco e água com gás.', NULL, true);
INSERT INTO tb_imagem (id_produto, img_produto)
VALUES (25, 'storage\\produto\\814c27704468e14515fbd246397973d4');
INSERT INTO tb_restricao (id_produto, ds_restricao)
VALUES (25, 'glúten');








