import { Router } from "express";
import { BuscarEnderecos, cadastrarEndereco } from "../repository/enderecoRepository.js";


const server = Router();

server.post('/endereco/cadastro', async (req, resp) => {
    try {

        const enderecoCadastrar = req.body;

        /*
        const camposObrigatorios = [
            "estado",
            "cidade",
            "bairro",
            "rua",
            "numero",
            "cep"
        ];

        const camposFaltando = [];

        camposObrigatorios.forEach((campo) => {
            if (!(campo in resposta) || !resposta[campo]) {
                camposFaltando.push(campo);
            }
        });


        if (camposFaltando.length > 0) {
            const mensagemErro = `Campos obrigatórios faltando: ${camposFaltando.join(", ")}`;
            throw new Error(mensagemErro)
        }

        const enderecoCadastrado = await cadastrarEndereco(resposta);
        */

        if(!enderecoCadastrar.estado)
            throw new Error ("Estado obrigatório")

        if(!enderecoCadastrar.cidade)
        throw new Error ("Cidade obrigatória")

        if(!enderecoCadastrar.bairro)
        throw new Error ("Bairro obrigatório")

        if(!enderecoCadastrar.rua)
        throw new Error ("Rua obrigatório")

        if(!enderecoCadastrar.numero)
            throw new Error ("Número obrigatório")

        if(!enderecoCadastrar.cep)
        throw new Error ("CEP obrigatório")
        
        const enderecoCadastrado = await cadastrarEndereco(enderecoCadastrar)


        resp.status(200).send(enderecoCadastrado)

    } catch (err) {
        resp.status(500).send({
            erro: err.message
        });
    }
});


server.get('/endereco', async (req, resp) => {

    try {

        const resposta = await BuscarEnderecos()

        

        resp.send(resposta);
    } catch (error) {
        console.error("Erro ao cadastrar endereço:", error.message);
        resp.status(500).send("Erro ao cadastrar endereço");
    }

})

export default server;  