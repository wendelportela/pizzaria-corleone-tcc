
import { con } from "../../conection.js";

export async function inserirmedia(media){


const comando = `
    INSERT INTO tb_media (id_produto, ds_media) VALUES (?, ?)
`;

const [resposta] = await con.query(comando, [media.id,media.media]);
media.id = resposta.insertId;
return media;

}


export async function alterarmedia(media,id){
const comando = `
UPDATE tb_media
SET ds_media = ?
WHERE id_produto = ?
`
const [ resposta ] = await con.query(comando,[media.media,id])
return resposta
}

export async function mediaPeloId(id){
    let comando =
    `   
    SELECT ds_media AS media
      FROM tb_media
     WHERE id_produto = ?
    `

    const [response] = await con.query(comando,[id])

    return response[0]
}
  




