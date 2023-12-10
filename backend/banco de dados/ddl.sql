
CREATE DATABASE  db_corleone ;

USE db_corleone;




CREATE TABLE tb_tipo_produto (

id_tipo_produto         INT PRIMARY KEY AUTO_INCREMENT,
ds_tipo_produto         VARCHAR(100)
);



CREATE TABLE tb_produto (
	
id_produto	   	      INT PRIMARY KEY AUTO_INCREMENT,
ds_tipo_produto		    INT NOT NULL,
ds_ingredientes       VARCHAR(500)  NOT NULL,     
nm_produto            VARCHAR(500)  NOT NULL,
vl_preco              VARCHAR(500)  NOT NULL,
ds_descricao          VARCHAR(500)  NOT NULL,
vl_preco_promocional  VARCHAR(500) ,
bt_disponivel         bool  NOT NULL,


FOREIGN KEY   (ds_tipo_produto) REFERENCES  tb_tipo_produto (id_tipo_produto)

);




CREATE TABLE tb_restricao (

id_restricao       INT PRIMARY KEY AUTO_INCREMENT,
id_produto         INT ,
ds_restricao       VARCHAR(200) ,

FOREIGN KEY (id_produto) REFERENCES tb_produto(id_produto)
);



CREATE TABLE tb_imagem (

id_imagem        INT PRIMARY KEY AUTO_INCREMENT,
id_produto       INT , 
img_produto 	 VARCHAR(500),

FOREIGN KEY (id_produto) REFERENCES tb_produto(id_produto)

);

           






CREATE TABLE tb_endereco (

id_endereco     INT PRIMARY KEY AUTO_INCREMENT,
ds_estado       VARCHAR(200)  ,
ds_cidade       VARCHAR(200)  ,
ds_bairro       VARCHAR(200)  ,
ds_rua          VARCHAR(200) NOT NULL ,
ds_numero       VARCHAR(200) NOT NULL ,
ds_cep          VARCHAR(200) NOT NULL

);

			
CREATE TABLE  tb_cliente (

id_cliente     INT PRIMARY KEY AUTO_INCREMENT,
id_endereco    INT  NOT NULL ,
nm_cliente     VARCHAR(200) NOT NULL,
ds_email       VARCHAR(200) NOT NULL,
ds_telefone    VARCHAR(200) NOT NULL,
ds_senha       VARCHAR(200) NOT NULL,
ds_cpf         VARCHAR(200) NOT NULL,
ds_nacimento   VARCHAR(200) NOT NULL,

FOREIGN  KEY (id_endereco)	REFERENCES tb_endereco(id_endereco) 
);



CREATE TABLE  tb_cartao(

id_cartao    INT PRIMARY KEY AUTO_INCREMENT,
id_cliente   INT , 
ds_numero    VARCHAR(100) NOT NULL,
ds_nome      VARCHAR(100) NOT NULL,
ds_validade  VARCHAR(100) NOT NULL,
ds_cvv       VARCHAR(100)  NOT NULL,

FOREIGN KEY (id_cliente) REFERENCES tb_cliente(id_cliente)
);



CREATE TABLE tb_tp_pagamento (

id_tp_pagamento   INT PRIMARY KEY AUTO_INCREMENT,
id_cartao         INT,
tp_pix            VARCHAR(200),
tp_dinheiro       BOOL ,
FOREIGN KEY ( id_cartao ) REFERENCES tb_cartao(id_cartao)

);



CREATE TABLE tb_avaliacao(
id_avaliacao   INT PRIMARY KEY AUTO_INCREMENT,
ds_avaliacao   VARCHAR(200)
);



CREATE  TABLE tb_comentario (

id_comentario   INT PRIMARY KEY AUTO_INCREMENT,
ds_comentario   VARCHAR(200) ,
id_produto      INT, 
id_cliente      INT,
id_avaliacao    INT,

FOREIGN KEY (id_produto)   REFERENCES tb_produto(id_produto),
FOREIGN KEY (id_cliente)   REFERENCES tb_cliente(id_cliente),
FOREIGN KEY (id_avaliacao) REFERENCES tb_avaliacao (id_avaliacao)
);




CREATE TABLE tb_media (
  id_media INT PRIMARY KEY AUTO_INCREMENT,
  ds_media VARCHAR(100),
  id_produto INT,
  FOREIGN KEY (id_produto) REFERENCES tb_produto(id_produto)
);



CREATE TABLE tb_pedido_produto (
    id_pedido_produto INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT,
    ds_subtotal VARCHAR(200),
    ds_total VARCHAR(200),
    ds_desconto VARCHAR(200),
    ds_frete VARCHAR(200),
    ds_produtos JSON,
    ds_qtd      INT,
    ds_status     boolean,
    
    FOREIGN KEY (id_cliente) REFERENCES tb_cliente(id_cliente)
);


CREATE TABLE tb_pedido (
    id_pedido INT PRIMARY KEY AUTO_INCREMENT,
    id_pedido_produto INT NOT NULL,
    id_cliente INT NOT NULL,
    id_cartao INT NOT NULL,
    dt_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    ds_situacao VARCHAR(200) NOT NULL,
    
    FOREIGN KEY (id_cliente) REFERENCES tb_cliente(id_cliente),
    FOREIGN KEY (id_cartao) REFERENCES tb_cartao(id_cartao),
    FOREIGN KEY (id_pedido_produto) REFERENCES tb_pedido_produto(id_pedido_produto)
);





CREATE TABLE tb_associado (

id_associado   INT PRIMARY KEY AUTO_INCREMENT ,
nm_nome        VARCHAR(100)  NOT NULL,
ds_email       VARCHAR (100) NOT NULL ,
ds_senha       VARCHAR (100) NOT NULL ,
ds_cnpj        VARCHAR (100) NOT NULL
);



CREATE TABLE tb_favorito (
id_favorito   INT  PRIMARY KEY AUTO_INCREMENT,
id_cliente    INT  ,
id_produto    INT  ,
ds_favorito   boolean ,

FOREIGN  KEY (id_cliente) REFERENCES tb_cliente(id_cliente),
FOREIGN  KEY (id_produto) REFERENCES tb_produto(id_produto )
);




CREATE TABLE tb_carrinho(
id_carrinho    INT PRIMARY KEY AUTO_INCREMENT,
id_produto     INT NOT NULL,
id_cliente     INT NOT NULL,
ds_carrinho    boolean NOT NULL,
ds_qtd         INT ,

FOREIGN KEY (id_produto) REFERENCES tb_produto(id_produto),
FOREIGN KEY (id_cliente) REFERENCES tb_cliente(id_cliente)
);



CREATE TABLE tb_sugestao (
  id_sugestao     int primary key auto_increment ,
  id_produto      INT,
  ds_sugestao     int,
  FOREIGN KEY (id_produto) REFERENCES tb_produto(id_produto),
  FOREIGN KEY (ds_sugestao) REFERENCES tb_produto(id_produto)
);


create table tb_cupom(
id_cupom   int primary key  auto_increment,
nm_cupom   varchar(100),
ds_valor   int  
);


CREATE TABLE tb_sugestoes (
    id_sugestoes    INT AUTO_INCREMENT PRIMARY KEY,
    ds_telefone     VARCHAR(20),
    ds_sugestao     TEXT
);