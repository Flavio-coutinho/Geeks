import type { NextApiRequest, NextApiResponse } from "next";
import { conectarMongoDB } from '../../middlewares/conectarMongoDB';
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
import type { LoginResposta } from '../../types/LoginResposta';
import md5 from 'md5';
import { UsuarioModel } from '../../models/UsuarioModel';
import jwt from 'jsonwebtoken';

// eslint-disable-next-line import/no-anonymous-default-export
const endpointLogin = async (
    req: NextApiRequest,
    res: NextApiResponse<RespostaPadraoMsg | LoginResposta>
) => {


    // Pegar a chave do JWT
    const {MINHA_CHAVE_JWT} = process.env;
    if(!MINHA_CHAVE_JWT){
        return res.status(500).json({erro : 'Env Jwt nao informada'})
    }

    if(req.method === 'POST') {
        const {login, senha} = req.body;

        // Pesquisar usuario no Banco de dados
        const usuariosEncontrados = await UsuarioModel.find({email: login, senha : md5(senha)});
        if(usuariosEncontrados && usuariosEncontrados.length > 0){
            const usuarioEncontrado = usuariosEncontrados [0];

               const token = jwt.sign({_id : usuarioEncontrado._id}, MINHA_CHAVE_JWT);

               return res.status(200).json({
                nome : usuarioEncontrado.nome, 
                email: usuarioEncontrado.email, 
                token});
            }
            return res.status(405).json({erro : 'Usuário ou senha não encontrado'})
    }
    return res.status(405).json({erro : 'Metodo informado não é válido'});
}

export default conectarMongoDB(endpointLogin);