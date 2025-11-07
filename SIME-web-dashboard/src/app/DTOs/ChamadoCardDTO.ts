export interface ChamadoCardDTO {
    idChamado: number;
    dtAberturaChamado: string;
    descChamado: string;
    tituloChamado: string;
    prioridadeChamado: 'ALTA_PRIORIDADE' | 'MEDIA_PRIORIDADE' | 'BAIXA_PRIORIDADE';
    statusAtualGeralChamado: string;
    numAmbiente: number;
    nomeTipoAmbiente: string;
}
