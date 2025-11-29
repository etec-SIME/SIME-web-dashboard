import { equipamentoEnvioRequestDTO } from "./codEquipamentoResponseDTO";

export interface ambienteRequestDTO{
    numAmbiente: number;
    descricaoAmbiente: string;
    idTipoAmbiente: number;
    equipamentoList: equipamentoEnvioRequestDTO[];
}
