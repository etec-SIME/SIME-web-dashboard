import { tipoAmbienteRequestDTO } from "./tipoAmbienteRequestDTO";
import { TipoChamadoSelectDTO } from "./TipoChamadoSelectDTO";

export interface chamadosAmbienteDTO {
    tituloChamado: string;
    descChamado: string;
    dataAbertura: string;
    emailUsuario: string;
    codEquipamento: string;
    idAmbiente: number;
    tipoChamado: TipoChamadoSelectDTO;
    tipoAmbiente: tipoAmbienteRequestDTO;
}