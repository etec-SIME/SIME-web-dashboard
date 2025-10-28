export interface ChamadoRequestDTO {
    tituloChamado: string;
    descChamado: string;
    dataAbertura: string;
    emailUsuario: string;
    idTipoChamado: number;
    codEquipamento: string;
    idAmbiente: number; //"any" não é ideal e abre espaço para erros de vaidação
    idTipoAmbiente: number; //"any" não é ideal e abre espaço para erros de vaidação
}