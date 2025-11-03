import { AmbienteSelectDTO } from "./AmbienteSelectDTO";
import { tipoAmbienteRequestDTO } from "./tipoAmbienteRequestDTO";
import { TipoChamadoSelectDTO } from "./TipoChamadoSelectDTO";

export interface chamadosAmbienteDTO {
    tituloChamado: string;
    descChamado: string;
    dtAberturaChamado: string;
    codEquipamento: string;
    ambiente: AmbienteSelectDTO;
    tipoChamado: TipoChamadoSelectDTO;
    tipoAmbiente: tipoAmbienteRequestDTO;
}