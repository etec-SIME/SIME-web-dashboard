import { AmbienteSelectDTO } from "./AmbienteSelectDTO";
import { tipoAmbienteRequestDTO } from "./tipoAmbienteRequestDTO";
import { TipoChamadoSelectDTO } from "./TipoChamadoSelectDTO";

export interface ChamadosAmbienteDTO {
    tituloChamado: string;
    descChamado: string;
    dataAbertura: string;
    codEquipamento: string;
    ambiente: AmbienteSelectDTO;
    tipoChamado: TipoChamadoSelectDTO;
    tipoAmbiente: tipoAmbienteRequestDTO;
}