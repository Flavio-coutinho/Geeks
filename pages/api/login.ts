import type { NextApiRequest, NextApiResponse } from "next";
import { conectarMongoDB } from '../../middlewares/conectarMongoDB';
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
import md5 from 'md5';
import { UsuarioModel } from '../../models/UsuarioModel';

// eslint-disable-next-line import/no-anonymous-default-export
const endpointLogin = async (
    req: NextApiRequest,
    res: NextApiResponse<RespostaPadraoMsg>
) => {
    if(req.method === 'POST') {
        const {login, senha} = req.body;

        // Pesquisar usuario no Banco de dados
        const usuariosEncontrados = await UsuarioModel.find({email: login, senha : md5(senha)});
        if(usuariosEncontrados && usuariosEncontrados.length > 0){
            const usuarioEncontrado = usuariosEncontrados [0]
               return res.status(200).json({msg: `Usuário ${usuarioEncontrado.nome} autenticado com sucesso!`});
            }
            return res.status(405).json({erro : 'Usuário ou senha não encontrado'})
    }
    return res.status(405).json({erro : 'Metodo informado não é válido'});
}

export default conectarMongoDB(endpointLogin);