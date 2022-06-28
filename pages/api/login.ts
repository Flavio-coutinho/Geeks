import type { NextApiRequest, NextApiResponse } from "next";
import { conectarMongoDB } from '../../middlewares/conectarMongoDB';
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';

// eslint-disable-next-line import/no-anonymous-default-export
const endpointLogin = (
    req: NextApiRequest,
    res: NextApiResponse<RespostaPadraoMsg>
) => {
    if(req.method === 'POST') {
        const {login, senha} = req.body;

        if(login === 'admin@gmail.com' && 
            senha === 'admin12345'){
               return res.status(200).json({msg: 'Usuário autenticado com sucesso!'});
            }
            return res.status(405).json({erro : 'Usuário ou senha não encontrado'})
    }
    return res.status(405).json({erro : 'Metodo informado não é válido'});
}

export default conectarMongoDB(endpointLogin);