import { PrioridadeChamadoEnum } from "../../models/enums/prioridade-chamado-enum";
import { StatusChamadoEnum } from "../../models/enums/status-chamado-enum";

export interface chamadoProjection {
    idChamado: number;
    prioridadeChamado: PrioridadeChamadoEnum,
    statusChamado: StatusChamadoEnum,
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
