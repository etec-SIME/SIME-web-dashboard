import { tipoEquipamento } from "../models/tipoEquipamento";

export interface equipamentoRequestDTO{
  codEquipamento: number;
  tipoEquipamento: tipoEquipamento;
}
