import { ambiente } from "./ambiente";
import { chamado } from "./chamado";

export interface tipoAmbiente{
  idTipoAmbiente: number;
  nomeTipoAmbiente: string;
  chamadosList: chamado[]
  ambienteList: ambiente[]

}
