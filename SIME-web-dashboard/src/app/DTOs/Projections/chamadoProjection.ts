import { PrioridadeChamadoEnum } from "../../models/enums/prioridade-chamado-enum";

export interface chamadoProjection {
    idChamado: number;
    prioridadeChamado: PrioridadeChamadoEnum,
    statusChamado: string,
    dtAberturaChamado: Date,
    descChamado: string,
    dtConclusaoChamado: Date,
    imgChamado: string,
    localChamado: string,
    tituloChamado: string,
    rmUsuario: string,
    rmUsuarioResponsavel: string,
    idAmbiente: number,
    idTipoChamado: number
}
