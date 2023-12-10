 export async function analise (comentario){


const erro = []

       

if (!comentario.comentario)
   erro.push('É necessário preencher todos os campos')
if(!comentario.id)
erro.push('É necessário preencher todos os campos')

return erro
}