import { Router } from "express";
import { clientePorTelefone, emailCadastro,  editarInfoClient, infoCLiente, inserirCliente, listarCliente, listarNome, loginCliente, loginClienteGoogle, validarDados, listarid } from "../repository/clienteRepository.js";

const server = Router()

import passwordValidator from 'password-validator';//import

var schema = new passwordValidator(); // cria uma instância de um objeto chamado schema, Esse objeto schema é usado para definir e aplicar regras de validação personalizadas a senhas.

schema
    .is().min(8, 'A senha deve conter no mínimo 8 caracteres') // Mínimo de caracteres
    .is().max(300, 'A senha não pode ultrapassar 300 caracteres') // Máximo de caracteres
    .has().uppercase(1, 'A senha deve conter um caracter maiúsculo') // Pelo menos uma letra maiúscula
    .has().digits(1, 'A senha deve conter um digito numérico') // Pelo menos um dígito numérico
    .has().not().spaces(true, 'A senha não pode conter espaços') //Sem espaços
    .has().symbols(1, 'A senha deve conter um caracter especial'); // Pelo menos um caractere especial


// server.post('/teste', async (req, resp) => {
//     try {
//         // send mail with defined transport object
//         const info = await transporter.sendMail({
//             from: 'doncorleonespizza@hotmail.com',
//             to: "math.santosmed@gmail.com",
//             subject: "Cupom de Desconto Don Corleone's Pizza",
//             text: "Hello world?",
//             html: `
//                 <b>Olá!</b>
//                 <p>Seja bem-vindo à Pizzaria Corleone!</p>
//                 <p>Aproveite o código de cupom <strong>CORLEONE15</strong> e ganhe 15% de desconto em sua próxima compra.</p>
//                 <p>Esta oferta é válida até [data de expiração]. Não perca!</p>
//                 <p>Esperamos vê-lo em breve!</p>`,
//         });

//         console.log("Message sent: %s", info.messageId);
//         resp.send("Email enviado com sucesso!");
//     } catch (error) {
//         console.error(error);
//         resp.status(500).send("Erro ao enviar o e-mail.");
//     }
// });


server.post('/cliente/senha/verificar', (req, resp) => {
    try {
        let { senha } = req.query

        let errosSenha = schema.validate(senha, { details: true })

        if (errosSenha.length != 0) {

            for (let item of errosSenha) {

                throw new Error(`${item.message}`)

            }
        }

        resp.send()

    } catch (err) {
        resp.status(404).send(err.message)
    }


})

    server.post('/cliente/cadastro', async (req, resp) => {
        try {
            let resposta = req.body;

            if (!resposta) {
                throw new Error("Os dados do cadastro estão faltando");
            }

            const camposObrigatorios = [
                "cliente",
                "email",
                "telefone",
                "senha",
                "cpf",
                "nascimento"
            ];

            const camposFaltando = [];

            camposObrigatorios.forEach((campo) => {
                if (!(campo in resposta) || !resposta[campo]) {
                    camposFaltando.push(campo);
                }
            });

            if (camposFaltando.length > 0) {
                const mensagemErro = `Campos obrigatórios faltando: ${camposFaltando.join(", ")}`;
                throw new Error(mensagemErro);
            }

            let respo = await inserirCliente(resposta);

            emailCadastro(resposta.email)

            if (respo === `122`) {
                const mensErro = 'Já existe cliente com essas credenciais';
                throw new Error(mensErro);
            }

            resp.status(200).send(respo);
        } catch (err) {
            resp.status(404).send(err.message);
        }
    });


server.post('/cliente/login', async (req, resp) => {
    try {

        const { email, senha } = req.body

        if (!email)
            throw new Error('Campo do email vazio');
        if (!senha)
            throw new Error('Campo da senha vazio');

        let respo = await loginCliente(email, senha)

        if (!respo)
            throw new Error('Credenciais inválidas');


        resp.status(200).send(respo)
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
});

server.post('/cliente/login/google', async (req, resp) => {
    try {

        const { email } = req.query

        if (!email)
            throw new Error('Campo do email vazio');

        let respo = await loginClienteGoogle(email)

        if (!respo)
            throw new Error('Credenciais inválidas');


        resp.status(200).send(respo)
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
});

server.get('/cliente/info', async (req, resp) => {
    try {
        let { id } = req.query;

        let respo = await infoCLiente(id)

        if (!respo) {
            throw new Error('Credenciais inválidas');
        }

        resp.status(200).send(respo)
    } catch (err) {
        resp.status(404).send(err.message)
    }
});

server.put('/cliente/alterar', async (req, resp) => {
    try {
        const newInfos = req.body;
        const { id } = req.query;

        validarDados(newInfos)

        const respo = await editarInfoClient(newInfos, id);

        resp.status(200).send(respo);
    } catch (err) {
        resp.status(404).send(err.message);
    }
});


server.get('/clientes', async (req, resp) => {
    try {

        const cliente = await listarCliente();
        resp.send(cliente)

    } catch (err) {
        resp.status(400).send({ erro: err.message })
    }
})


server.get('/clientes/nome/:nome', async (req, resp) => {
    try {
        const { nome } = req.params
        const cliente = await listarNome(nome);
        resp.send(cliente)

    } catch (err) {
        resp.status(400).send({ erro: err.message })
    }
})

server.get('/clientes/:id', async (req, resp) => {
    try {
        const { id } = req.params
        const cliente = await listarid(id);
        resp.send(cliente)

    } catch (err) {
        resp.status(400).send({ erro: err.message })
    }
})

server.get('/clientes/cartao/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const clientePorCartao = await listarPorIdCartao(id);

        if (clientePorCartao) {
            resp.status(200).send(clientePorCartao);
        } else {
            resp.status(404).send('Cliente não encontrado com base no id_cartao.');
        }
    } catch (err) {
        resp.status(500).send({ erro: err.message });
    }
});

server.get('/cliente/consulta/telefone', async (req, resp) => {
    try {
        let { telefone } = req.query;

        let respo = await clientePorTelefone(telefone);

        resp.status(200).send(respo);
    } catch (err) {
        resp.status(404).send(err.message);
    }
});









export default server;