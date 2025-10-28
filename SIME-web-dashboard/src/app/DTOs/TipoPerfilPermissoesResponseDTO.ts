import { permissao } from "../models/permissao";

export interface TipoPerfilPermissoesResponseDTO {
    idTipoPerfil: number;
    nomeTipoPerfil: string;
    permissaoList: permissao[];
}