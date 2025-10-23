export interface ChamadoResponseDTO {
    idChamado: number;
    tituloChamado: string;
    statusChamado: string;
    descChamado: string;
    nomeTipoChamado: string;
    prioridadeChamado: string;
    dtAberturaChamado: string;
    dtConclusaoChamado: string;
    caminhoImagensList: string[];
}