import { verificarproduto } from "../repository/produtorepository.js"



export async function analise (produto){


const tipo = [
"Bebida"      ,
"Sobremesa"   ,
"Salgado"     ,
"Vegano"      ,
"Vegetariano" ,

]


 for ( let cont = 1 ; cont <11 ; cont ++){
  if (produto.tipo === tipo[cont -1]){
      produto.tipo = cont
  }

 }



  const erros = []
    
 const campos = ['nome', 'tipo' , 'ingredientes', 'descricao', 'preco']
  for ( const validar of campos){

    if(!produto[validar])
    erros.push( `Campo ${validar} vazio . É necessario preencher todos os campos `)
  }

  if (erros.length === 0){
    const verificar = await verificarproduto(produto)
    if(verificar === true){
     erros.push('Produto ja cadastrado')
    }
  }
  
  return erros

}