import { TipoEquipamentoSelectDTO } from "./TipoEquipamentoSelectDTO";

export interface AmbienteChamadoSelectDTO {
    idAmbiente: number;
    numAmbiente: string;
    idTipoAmbiente: number;
    nomeTipoAmbiente: string;
    tipoEquipamentoList: TipoEquipamentoSelectDTO[]
}