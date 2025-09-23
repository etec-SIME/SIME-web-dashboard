import { chamado } from "./chamado";
import { departamento } from "./departamento";
import { tipoPerfil } from "./tipoPerfil";

export interface usuario {
    rmUsuario: string;
    chamadosAbertos: string;
    chamadosConcluidos: string;
    idTipoPerfil: number;
    senhaUsuario: string;
    cpfUsuario: string
    emailUsuario: string;
    nomeUsuario: string;
    telefoneUsuario: string;
    
    tipoPerfil: tipoPerfil;
    //feedbackList: feedback[];
    chamadoList: chamado[];
    chamadoResponsavelList: chamado[];
    departamentoList: departamento[];
}