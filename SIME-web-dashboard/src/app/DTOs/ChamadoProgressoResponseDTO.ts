export interface ChamadoProgressoResponseDTO {
    idChamado: number;
    statusAtualProgressoChamado: string;
    historicoChamadoList: historicoChamadoList[];
}

export interface historicoChamadoList {
    diaSemana: string;
    statusProgresso: string;
    dtAlteracao: string;
}
