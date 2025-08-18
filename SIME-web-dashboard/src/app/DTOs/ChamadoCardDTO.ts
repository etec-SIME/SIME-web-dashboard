export interface ChamadoCardDTO {
    idChamado: number;
    dtAberturaChamado: string;
    descChamado: string;
    localChamado: string;
    prioridadeChamado: 'ALTA_PRIORIDADE' | 'MEDIA_PRIORIDADE' | 'BAIXA_PRIORIDADE';
}