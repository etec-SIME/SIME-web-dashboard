import { usuario } from "./usuario";

export interface chamado {
    idChamado?: number;
    dtAberturaChamado?: Date;
    descChamado?: string;
    dtConclusaoChamado?: Date;
    imgChamado?: string;
    localChamado?: string;
    tituloChamado?: string;
    statusChamado?: string;
    prioridadeChamado?: string;
    rmUsuarioResponsavel?: string;
    idAmbiente?: number;
    idTipoChamado?: number;

    usuario: usuario;
    usuarioResponsavel: usuario;
    // ambiente?: ambiente;
    // tipoChamado?: tipoChamado;
    // feedbackList: feedback[];
}